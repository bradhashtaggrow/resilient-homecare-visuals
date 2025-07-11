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
                    <p className="text-3xl font-bold text-foreground">{stats.total}</p>
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
                    <p className="text-3xl font-bold text-foreground">{stats.new}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-3/10 to-chart-3/20 group-hover:from-chart-3/20 group-hover:to-chart-3/30 transition-all duration-300">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-primary/25 transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Qualified</p>
                    <p className="text-3xl font-bold text-foreground">{stats.qualified}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300">
                    <Target className="h-8 w-8 text-primary" />
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
                    <p className="text-3xl font-bold text-foreground">{stats.demo_scheduled}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-5/10 to-chart-5/20 group-hover:from-chart-5/20 group-hover:to-chart-5/30 transition-all duration-300">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-primary/25 transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Closed Won</p>
                    <p className="text-3xl font-bold text-foreground">{stats.closed_won}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-primary/25 transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Closed Lost</p>
                    <p className="text-3xl font-bold text-foreground">{stats.closed_lost}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300">
                    <StarOff className="h-8 w-8 text-primary" />
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
                          <DialogContent className="max-w-[90vw] w-full sm:max-w-[85vw] md:max-w-3xl max-h-[85vh] overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[10%] data-[state=open]:slide-in-from-top-[10%] md:data-[state=closed]:slide-out-to-top-[5%] md:data-[state=open]:slide-in-from-top-[5%]">
                            <div className="flex flex-col h-full">
                              <DialogHeader className="border-b border-border pb-4 mb-6 flex-shrink-0">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                                      Lead Details - {lead.first_name} {lead.last_name}
                                    </DialogTitle>
                                    <p className="text-muted-foreground mt-1">
                                      {lead.job_title} at {lead.company}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant={getStatusBadgeVariant(lead.status)} className="text-sm px-3 py-1">
                                      {getStatusLabel(lead.status)}
                                    </Badge>
                                    {lead.decision_maker && (
                                      <Badge variant="outline" className="text-sm px-3 py-1">
                                        Decision Maker
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </DialogHeader>

                              <div className="flex-1 overflow-auto">
                                <Tabs defaultValue="details" className="w-full h-full">
                                  <TabsList className="grid w-full grid-cols-2 mb-6 flex-shrink-0">
                                    <TabsTrigger value="details" className="text-xs md:text-sm font-medium">Details</TabsTrigger>
                                    <TabsTrigger value="notes" className="text-xs md:text-sm font-medium">Notes</TabsTrigger>
                                  </TabsList>

                                   <TabsContent value="details" className="space-y-4 md:space-y-6 overflow-auto max-h-[calc(90vh-200px)]">
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                      {/* Contact Information Card */}
                                      <Card className="glass border-0 shadow-sm">
                                       <CardHeader className="pb-3 md:pb-4">
                                           <div className="flex items-center gap-2 md:gap-3">
                                             <div className="p-1.5 md:p-2 rounded-lg bg-primary/10">
                                               <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                             </div>
                                             <CardTitle className="text-base md:text-lg font-semibold">Contact Information</CardTitle>
                                           </div>
                                         </CardHeader>
                                        <CardContent className="space-y-4">
                                          <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                                            <p className="text-base font-medium mt-1">{lead.first_name} {lead.last_name}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                                            <div className="flex items-center gap-2 mt-1">
                                              <Mail className="h-4 w-4 text-primary" />
                                              <a href={`mailto:${lead.email}`} className="text-base text-primary hover:underline">
                                                {lead.email}
                                              </a>
                                            </div>
                                          </div>
                                          {lead.phone && (
                                            <div>
                                              <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                                              <div className="flex items-center gap-2 mt-1">
                                                <Phone className="h-4 w-4 text-primary" />
                                                <a href={`tel:${lead.phone}`} className="text-base text-primary hover:underline">
                                                  {lead.phone}
                                                </a>
                                              </div>
                                            </div>
                                          )}
                                          {lead.job_title && (
                                            <div>
                                              <Label className="text-sm font-medium text-muted-foreground">Job Title</Label>
                                              <p className="text-base font-medium mt-1">{lead.job_title}</p>
                                            </div>
                                          )}
                                        </CardContent>
                                      </Card>

                                      {/* Company Information Card */}
                                      <Card className="glass border-0 shadow-sm">
                                         <CardHeader className="pb-3 md:pb-4">
                                           <div className="flex items-center gap-2 md:gap-3">
                                             <div className="p-1.5 md:p-2 rounded-lg bg-chart-2/10">
                                               <Building className="h-4 w-4 md:h-5 md:w-5 text-chart-2" />
                                             </div>
                                             <CardTitle className="text-base md:text-lg font-semibold">Company Information</CardTitle>
                                           </div>
                                         </CardHeader>
                                        <CardContent className="space-y-4">
                                          <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Company</Label>
                                            <p className="text-base font-medium mt-1">{lead.company}</p>
                                          </div>
                                          {lead.industry && (
                                            <div>
                                              <Label className="text-sm font-medium text-muted-foreground">Industry</Label>
                                              <p className="text-base mt-1">{lead.industry}</p>
                                            </div>
                                          )}
                                          {lead.company_size && (
                                            <div>
                                              <Label className="text-sm font-medium text-muted-foreground">Company Size</Label>
                                              <p className="text-base mt-1">{lead.company_size}</p>
                                            </div>
                                          )}
                                          {lead.annual_revenue && (
                                            <div>
                                              <Label className="text-sm font-medium text-muted-foreground">Annual Revenue</Label>
                                              <div className="flex items-center gap-2 mt-1">
                                                <DollarSign className="h-4 w-4 text-chart-2" />
                                                <p className="text-base">{lead.annual_revenue}</p>
                                              </div>
                                            </div>
                                          )}
                                        </CardContent>
                                      </Card>
                                    </div>

                                    {/* Requirements Section */}
                                     <Card className="glass border-0 shadow-sm">
                                       <CardHeader className="pb-3 md:pb-4">
                                         <div className="flex items-center gap-2 md:gap-3">
                                           <div className="p-1.5 md:p-2 rounded-lg bg-chart-3/10">
                                             <Target className="h-4 w-4 md:h-5 md:w-5 text-chart-3" />
                                           </div>
                                           <CardTitle className="text-base md:text-lg font-semibold">Requirements</CardTitle>
                                         </div>
                                       </CardHeader>
                                       <CardContent>
                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                          <div className="space-y-4">
                                            {lead.primary_challenge && (
                                              <div>
                                                <Label className="text-sm font-medium text-muted-foreground">Primary Challenge</Label>
                                                <p className="text-base mt-1">{lead.primary_challenge}</p>
                                              </div>
                                            )}
                                            {lead.timeline && (
                                              <div>
                                                <Label className="text-sm font-medium text-muted-foreground">Timeline</Label>
                                                <p className="text-base mt-1">{lead.timeline}</p>
                                              </div>
                                            )}
                                            {lead.budget_range && (
                                              <div>
                                                <Label className="text-sm font-medium text-muted-foreground">Budget Range</Label>
                                                <p className="text-base mt-1">{lead.budget_range}</p>
                                              </div>
                                            )}
                                          </div>
                                          <div className="space-y-4">
                                            <div>
                                              <Label className="text-sm font-medium text-muted-foreground">Decision Maker</Label>
                                              <p className="text-base mt-1">{lead.decision_maker ? 'Yes' : 'No'}</p>
                                            </div>
                                            {lead.interested_services && lead.interested_services.length > 0 && (
                                              <div>
                                                <Label className="text-sm font-medium text-muted-foreground">Interested Services</Label>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                  {lead.interested_services.map((service, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                      {service}
                                                    </Badge>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>

                                    {/* Demo Scheduling Section */}
                                    {(lead.preferred_date || lead.preferred_time || lead.demo_type) && (
                                       <Card className="glass border-0 shadow-sm">
                                         <CardHeader className="pb-3 md:pb-4">
                                           <div className="flex items-center gap-2 md:gap-3">
                                             <div className="p-1.5 md:p-2 rounded-lg bg-chart-4/10">
                                               <Calendar className="h-4 w-4 md:h-5 md:w-5 text-chart-4" />
                                             </div>
                                             <CardTitle className="text-base md:text-lg font-semibold">Demo Scheduling</CardTitle>
                                           </div>
                                         </CardHeader>
                                         <CardContent>
                                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                            <div className="space-y-4">
                                              {lead.preferred_date && (
                                                <div>
                                                  <Label className="text-sm font-medium text-muted-foreground">Preferred Date</Label>
                                                  <p className="text-base mt-1">{format(new Date(lead.preferred_date), 'PPP')}</p>
                                                </div>
                                              )}
                                              {lead.preferred_time && (
                                                <div>
                                                  <Label className="text-sm font-medium text-muted-foreground">Preferred Time</Label>
                                                  <div className="flex items-center gap-2 mt-1">
                                                    <Clock className="h-4 w-4 text-chart-4" />
                                                    <p className="text-base">{lead.preferred_time}</p>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                            <div className="space-y-4">
                                              {lead.timezone && (
                                                <div>
                                                  <Label className="text-sm font-medium text-muted-foreground">Timezone</Label>
                                                  <p className="text-base mt-1">{lead.timezone}</p>
                                                </div>
                                              )}
                                              {lead.demo_type && (
                                                <div>
                                                  <Label className="text-sm font-medium text-muted-foreground">Demo Type</Label>
                                                  <p className="text-base mt-1 capitalize">{lead.demo_type}</p>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    )}
                                  </TabsContent>

                                  <TabsContent value="notes" className="space-y-4">
                                    <Card className="glass border-0 shadow-sm">
                                      <CardHeader>
                                        <CardTitle className="text-lg font-semibold">Lead Notes</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <Textarea
                                          placeholder="Add notes about this lead..."
                                          value={selectedLead?.notes || ''}
                                          onChange={(e) => {
                                            if (selectedLead) {
                                              setSelectedLead({ ...selectedLead, notes: e.target.value });
                                            }
                                          }}
                                          className="min-h-[200px] resize-none"
                                        />
                                        <div className="flex justify-end mt-4">
                                          <Button
                                            onClick={() => {
                                              if (selectedLead) {
                                                updateLeadNotes(selectedLead.id, selectedLead.notes || '');
                                              }
                                            }}
                                            className="btn-3d-gradient"
                                          >
                                            Save Notes
                                          </Button>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </TabsContent>
                                </Tabs>
                              </div>
                            </div>
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
