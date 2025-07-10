import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Mail, 
  Phone, 
  Building, 
  Target,
  Clock,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Star,
  StarOff
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company: string;
  job_title?: string;
  company_size?: string;
  industry?: string;
  current_solution?: string;
  annual_revenue?: string;
  primary_challenge?: string;
  interested_services?: string[];
  timeline?: string;
  budget_range?: string;
  decision_maker: boolean;
  preferred_date?: string;
  preferred_time?: string;
  timezone?: string;
  demo_type?: string;
  form_source?: string;
  status: string;
  lead_score: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface LeadsManagerProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const LeadsManager: React.FC<LeadsManagerProps> = ({ syncStatus = 'disconnected' }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    qualified: 0,
    demo_scheduled: 0,
    closed_won: 0,
    closed_lost: 0
  });

  const { toast } = useToast();

  const loadLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLeads(data || []);
      
      // Calculate stats
      const total = data?.length || 0;
      const statusCounts = data?.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      setStats({
        total,
        new: statusCounts.new || 0,
        qualified: statusCounts.qualified || 0,
        demo_scheduled: statusCounts.demo_scheduled || 0,
        closed_won: statusCounts.closed_won || 0,
        closed_lost: statusCounts.closed_lost || 0
      });

    } catch (error) {
      console.error('Error loading leads:', error);
      toast({
        title: "Error loading leads",
        description: "Failed to load leads data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();

    // Set up real-time subscription
    const channel = supabase
      .channel('leads-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'leads'
      }, (payload) => {
        console.log('Real-time leads change:', payload);
        loadLeads(); // Refresh leads
        
        if (payload.eventType === 'INSERT') {
          toast({
            title: "New lead received!",
            description: `${payload.new.first_name} ${payload.new.last_name} from ${payload.new.company}`,
          });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Lead updated",
        description: "Lead status has been updated successfully",
      });

      loadLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: "Error updating lead",
        description: "Failed to update lead status",
        variant: "destructive"
      });
    }
  };

  const updateLeadNotes = async (leadId: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ notes, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Notes updated",
        description: "Lead notes have been saved successfully",
      });

      loadLeads();
    } catch (error) {
      console.error('Error updating notes:', error);
      toast({
        title: "Error updating notes",
        description: "Failed to save notes",
        variant: "destructive"
      });
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'qualified': return 'secondary';
      case 'demo_scheduled': return 'outline';
      case 'closed_won': return 'default';
      case 'closed_lost': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'qualified': return 'Qualified';
      case 'demo_scheduled': return 'Demo Scheduled';
      case 'closed_won': return 'Closed Won';
      case 'closed_lost': return 'Closed Lost';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-chart-2/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-chart-3/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 space-y-8 p-8 max-w-7xl mx-auto">
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
                Leads Management
              </h2>
              <p className="text-lg text-muted-foreground">Track and manage your demo requests and leads</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Users className="h-5 w-5 text-success" />
              </div>
              <Badge variant="outline" className="glass border-0 text-sm bg-gradient-to-r from-primary/10 to-primary-light/10 text-primary border-primary/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  {syncStatus === 'connected' ? 'Live Data' : 'Offline'}
                </div>
              </Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-primary/25 transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Total Leads</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">{stats.total}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary-light/10 group-hover:from-primary/20 group-hover:to-primary-light/20 transition-all duration-300">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-chart-3/25 transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">New</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-chart-3 to-chart-4 bg-clip-text text-transparent">{stats.new}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-3/10 to-chart-3/20 group-hover:from-chart-3/20 group-hover:to-chart-3/30 transition-all duration-300">
                    <Star className="h-8 w-8 text-chart-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-chart-4/25 transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Qualified</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-chart-4 to-chart-5 bg-clip-text text-transparent">{stats.qualified}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-4/10 to-chart-4/20 group-hover:from-chart-4/20 group-hover:to-chart-4/30 transition-all duration-300">
                    <Target className="h-8 w-8 text-chart-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-chart-5/25 transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Demo Scheduled</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-chart-5 to-chart-1 bg-clip-text text-transparent">{stats.demo_scheduled}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-5/10 to-chart-5/20 group-hover:from-chart-5/20 group-hover:to-chart-5/30 transition-all duration-300">
                    <Calendar className="h-8 w-8 text-chart-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-success/25 transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Closed Won</p>
                    <p className="text-3xl font-bold text-success">{stats.closed_won}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-success/10 to-success/20 group-hover:from-success/20 group-hover:to-success/30 transition-all duration-300">
                    <TrendingUp className="h-8 w-8 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-destructive/25 transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Closed Lost</p>
                    <p className="text-3xl font-bold text-destructive">{stats.closed_lost}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/20 group-hover:from-destructive/20 group-hover:to-destructive/30 transition-all duration-300">
                    <StarOff className="h-8 w-8 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="animate-slide-in-right" style={{ animationDelay: '0.7s' }}>
          <Card className="glass border-0 shadow-glow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Filter className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Leads List</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="demo_scheduled">Demo Scheduled</SelectItem>
                <SelectItem value="closed_won">Closed Won</SelectItem>
                <SelectItem value="closed_lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

              {/* Enhanced Leads Table */}
              <div className="glass border-0 rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </TableCell>
                  </TableRow>
                ) : filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No leads found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">
                        {lead.first_name} {lead.last_name}
                        {lead.decision_maker && <Badge variant="outline" className="ml-2 text-xs">Decision Maker</Badge>}
                      </TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.industry || '-'}</TableCell>
                      <TableCell>{lead.timeline || '-'}</TableCell>
                      <TableCell>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => updateLeadStatus(lead.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <Badge variant={getStatusBadgeVariant(lead.status)}>
                              {getStatusLabel(lead.status)}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="demo_scheduled">Demo Scheduled</SelectItem>
                            <SelectItem value="closed_won">Closed Won</SelectItem>
                            <SelectItem value="closed_lost">Closed Lost</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{format(new Date(lead.created_at), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Dialog open={dialogOpen && selectedLead?.id === lead.id} onOpenChange={(open) => {
                          setDialogOpen(open);
                          if (!open) setSelectedLead(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedLead(lead)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Lead Details - {lead.first_name} {lead.last_name}</DialogTitle>
                            </DialogHeader>
                            {selectedLead && (
                              <Tabs defaultValue="details" className="w-full">
                                <TabsList>
                                  <TabsTrigger value="details">Details</TabsTrigger>
                                  <TabsTrigger value="notes">Notes</TabsTrigger>
                                </TabsList>
                                <TabsContent value="details" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <h4 className="font-semibold flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        Contact Information
                                      </h4>
                                      <div className="space-y-2 text-sm">
                                        <p><strong>Name:</strong> {selectedLead.first_name} {selectedLead.last_name}</p>
                                        <p><strong>Email:</strong> {selectedLead.email}</p>
                                        <p><strong>Phone:</strong> {selectedLead.phone || 'Not provided'}</p>
                                        <p><strong>Job Title:</strong> {selectedLead.job_title || 'Not provided'}</p>
                                      </div>
                                    </div>
                                    <div className="space-y-4">
                                      <h4 className="font-semibold flex items-center gap-2">
                                        <Building className="h-4 w-4" />
                                        Company Information
                                      </h4>
                                      <div className="space-y-2 text-sm">
                                        <p><strong>Company:</strong> {selectedLead.company}</p>
                                        <p><strong>Industry:</strong> {selectedLead.industry || 'Not provided'}</p>
                                        <p><strong>Company Size:</strong> {selectedLead.company_size || 'Not provided'}</p>
                                        <p><strong>Annual Revenue:</strong> {selectedLead.annual_revenue || 'Not provided'}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <h4 className="font-semibold flex items-center gap-2">
                                        <Target className="h-4 w-4" />
                                        Requirements
                                      </h4>
                                      <div className="space-y-2 text-sm">
                                        <p><strong>Primary Challenge:</strong> {selectedLead.primary_challenge || 'Not provided'}</p>
                                        <p><strong>Timeline:</strong> {selectedLead.timeline || 'Not provided'}</p>
                                        <p><strong>Budget Range:</strong> {selectedLead.budget_range || 'Not provided'}</p>
                                        <p><strong>Decision Maker:</strong> {selectedLead.decision_maker ? 'Yes' : 'No'}</p>
                                        {selectedLead.interested_services && selectedLead.interested_services.length > 0 && (
                                          <div>
                                            <strong>Interested Services:</strong>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                              {selectedLead.interested_services.map((service, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">{service}</Badge>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="space-y-4">
                                      <h4 className="font-semibold flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Demo Scheduling
                                      </h4>
                                      <div className="space-y-2 text-sm">
                                        <p><strong>Preferred Date:</strong> {selectedLead.preferred_date || 'Not provided'}</p>
                                        <p><strong>Preferred Time:</strong> {selectedLead.preferred_time || 'Not provided'}</p>
                                        <p><strong>Timezone:</strong> {selectedLead.timezone || 'Not provided'}</p>
                                        <p><strong>Demo Type:</strong> {selectedLead.demo_type || 'Virtual'}</p>
                                      </div>
                                    </div>
                                  </div>
                                </TabsContent>
                                <TabsContent value="notes">
                                  <div className="space-y-4">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                      id="notes"
                                      placeholder="Add notes about this lead..."
                                      value={selectedLead.notes || ''}
                                      onChange={(e) => setSelectedLead({...selectedLead, notes: e.target.value})}
                                      rows={8}
                                    />
                                    <Button onClick={() => updateLeadNotes(selectedLead.id, selectedLead.notes || '')}>
                                      Save Notes
                                    </Button>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            )}
                           </DialogContent>
                         </Dialog>
                       </TableCell>
                     </TableRow>
                   ))
                 )}
               </TableBody>
             </Table>
           </div>
         </CardContent>
       </Card>
     </div>
     
     {/* Bottom spacing for better UX */}
     <div className="h-16"></div>
   </div>
 </div>
 );
};

export default LeadsManager;