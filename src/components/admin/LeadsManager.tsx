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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leads Management</h2>
          <p className="text-gray-600">Track and manage your demo requests and leads</p>
        </div>
        <Badge variant="outline" className={`flex items-center gap-2 ${
          syncStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-200' :
          syncStatus === 'syncing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
          'bg-red-50 text-red-700 border-red-200'
        }`}>
          {syncStatus === 'connected' ? 'Live Data' : 'Offline'}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New</p>
                <p className="text-2xl font-bold">{stats.new}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Qualified</p>
                <p className="text-2xl font-bold">{stats.qualified}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Demo Scheduled</p>
                <p className="text-2xl font-bold">{stats.demo_scheduled}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Closed Won</p>
                <p className="text-2xl font-bold">{stats.closed_won}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Closed Lost</p>
                <p className="text-2xl font-bold">{stats.closed_lost}</p>
              </div>
              <StarOff className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Leads List</CardTitle>
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

          {/* Leads Table */}
          <div className="rounded-md border">
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
  );
};

export default LeadsManager;