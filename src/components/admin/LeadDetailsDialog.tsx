import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Mail, 
  Phone, 
  Building, 
  Target,
  Calendar,
  DollarSign,
  Clock
} from 'lucide-react';
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

interface LeadDetailsDialogProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateNotes: (leadId: string, notes: string) => void;
}

const LeadDetailsDialog: React.FC<LeadDetailsDialogProps> = ({ 
  lead, 
  isOpen, 
  onClose, 
  onUpdateNotes 
}) => {
  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    if (lead) {
      setNotes(lead.notes || '');
    }
  }, [lead]);

  if (!lead) return null;

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

  const handleSaveNotes = () => {
    onUpdateNotes(lead.id, notes);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[85vw] md:max-w-4xl max-h-[70vh] overflow-hidden rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !m-0">
        <DialogDescription className="sr-only">
          View detailed information about the lead including contact details, company information, and requirements.
        </DialogDescription>
        <div className="flex flex-col max-h-[70vh]">
          <DialogHeader className="border-b border-border pb-4 mb-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  Lead Details - {lead.first_name} {lead.last_name}
                </DialogTitle>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  {lead.job_title} at {lead.company}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusBadgeVariant(lead.status)} className="text-xs md:text-sm px-2 md:px-3 py-1">
                  {getStatusLabel(lead.status)}
                </Badge>
                {lead.decision_maker && (
                  <Badge variant="outline" className="text-xs md:text-sm px-2 md:px-3 py-1">
                    Decision Maker
                  </Badge>
                )}
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-auto px-1">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 flex-shrink-0">
                <TabsTrigger value="details" className="text-xs md:text-sm font-medium">Details</TabsTrigger>
                <TabsTrigger value="notes" className="text-xs md:text-sm font-medium">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 overflow-auto max-h-[50vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <TabsContent value="notes" className="space-y-4 overflow-auto max-h-[50vh]">
                <Card className="glass border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base md:text-lg font-semibold">Lead Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Add notes about this lead..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[150px] resize-none text-sm"
                    />
                    <div className="flex justify-end mt-4">
                      <Button onClick={handleSaveNotes}>
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
  );
};

export default LeadDetailsDialog;