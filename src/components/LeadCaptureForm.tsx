import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Calendar, Clock, Building, User, Target, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Custom SelectContent without portal for forms in modals
const FormSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Content
    ref={ref}
    className={cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" &&
        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    )}
    position={position}
    {...props}
  >
    <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
    <SelectPrimitive.Viewport
      className={cn(
        "p-1",
        position === "popper" &&
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
      )}
    >
      {children}
    </SelectPrimitive.Viewport>
    <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  </SelectPrimitive.Content>
))
FormSelectContent.displayName = "FormSelectContent";

interface FormData {
  // Step 1 - Contact Info
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  job_title: string;
  
  // Step 2 - Company Info
  company_size: string;
  industry: string;
  current_solution: string;
  annual_revenue: string;
  
  // Step 3 - Requirements
  primary_challenge: string;
  interested_services: string[];
  timeline: string;
  budget_range: string;
  decision_maker: boolean;
  
  // Step 4 - Scheduling
  preferred_date: string;
  preferred_time: string;
  timezone: string;
  demo_type: string;
}

interface LeadCaptureFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
  source?: string;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ onClose, onSuccess, source = 'website' }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    job_title: '',
    company_size: '',
    industry: '',
    current_solution: '',
    annual_revenue: '',
    primary_challenge: '',
    interested_services: [],
    timeline: '',
    budget_range: '',
    decision_maker: false,
    preferred_date: '',
    preferred_time: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    demo_type: 'virtual'
  });

  const { toast } = useToast();

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServicesChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interested_services: checked 
        ? [...prev.interested_services, service]
        : prev.interested_services.filter(s => s !== service)
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.first_name && formData.last_name && formData.email && formData.company);
      case 2:
        return !!(formData.company_size && formData.industry);
      case 3:
        return !!(formData.primary_challenge && formData.timeline && formData.interested_services.length > 0);
      case 4:
        return !!(formData.preferred_date && formData.preferred_time);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast({
        title: "Please complete all required fields",
        description: "Fill in all required information before proceeding",
        variant: "destructive"
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      toast({
        title: "Please complete all required fields",
        description: "Fill in all required information before submitting",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Attempting to submit lead form...');
      const { error } = await supabase
        .from('leads')
        .insert([{
          ...formData,
          form_source: source,
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        }]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Lead submitted successfully, showing success message...');
      
      // Show success message in the modal
      setShowSuccess(true);
      
      // Also show toast
      toast({
        title: "Demo request submitted successfully!",
        description: "We'll contact you within 24 hours to schedule your demo.",
      });
      
      console.log('Success message shown, waiting before closing modal...');
      // Wait longer for user to see the success message
      setTimeout(() => {
        console.log('Closing modal...');
        onSuccess?.();
        onClose?.();
      }, 4000); // 4 second delay to let user see both messages
      
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Error submitting request",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Contact Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => updateFormData('first_name', e.target.value)}
                  placeholder="John"
                />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => updateFormData('last_name', e.target.value)}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="john.doe@company.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                placeholder="Company Name"
              />
            </div>
            <div>
              <Label htmlFor="job_title">Job Title</Label>
              <Select 
                value={formData.job_title} 
                onValueChange={(value) => updateFormData('job_title', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <FormSelectContent>
                  <SelectItem value="ceo">Chief Executive Officer (CEO)</SelectItem>
                  <SelectItem value="cto">Chief Technology Officer (CTO)</SelectItem>
                  <SelectItem value="cfo">Chief Financial Officer (CFO)</SelectItem>
                  <SelectItem value="coo">Chief Operating Officer (COO)</SelectItem>
                  <SelectItem value="cmo">Chief Medical Officer (CMO)</SelectItem>
                  <SelectItem value="cio">Chief Information Officer (CIO)</SelectItem>
                  <SelectItem value="vp-technology">VP of Technology</SelectItem>
                  <SelectItem value="vp-operations">VP of Operations</SelectItem>
                  <SelectItem value="director-it">Director of IT</SelectItem>
                  <SelectItem value="director-operations">Director of Operations</SelectItem>
                  <SelectItem value="it-manager">IT Manager</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </FormSelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Company Information</h3>
            </div>
            <div>
              <Label htmlFor="company_size">Company Size *</Label>
              <Select value={formData.company_size} onValueChange={(value) => updateFormData('company_size', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <FormSelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </FormSelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <FormSelectContent>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="hospital">Hospital System</SelectItem>
                  <SelectItem value="clinic">Clinic/Practice</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="pharma">Pharmaceutical</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </FormSelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="current_solution">Current Solution</Label>
              <Input
                id="current_solution"
                value={formData.current_solution}
                onChange={(e) => updateFormData('current_solution', e.target.value)}
                placeholder="What solution are you currently using?"
              />
            </div>
            <div>
              <Label htmlFor="annual_revenue">Annual Revenue</Label>
              <Select value={formData.annual_revenue} onValueChange={(value) => updateFormData('annual_revenue', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select annual revenue" />
                </SelectTrigger>
                <FormSelectContent>
                  <SelectItem value="under-1m">Under $1M</SelectItem>
                  <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                  <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                  <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                  <SelectItem value="50m-100m">$50M - $100M</SelectItem>
                  <SelectItem value="100m+">$100M+</SelectItem>
                </FormSelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Requirements</h3>
            </div>
            <div>
              <Label htmlFor="primary_challenge">Primary Challenge *</Label>
              <Select value={formData.primary_challenge} onValueChange={(value) => updateFormData('primary_challenge', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="What's your biggest challenge?" />
                </SelectTrigger>
                <FormSelectContent>
                  <SelectItem value="patient-outcomes">Improving patient outcomes</SelectItem>
                  <SelectItem value="operational-efficiency">Operational efficiency</SelectItem>
                  <SelectItem value="cost-reduction">Cost reduction</SelectItem>
                  <SelectItem value="capacity-expansion">Capacity expansion</SelectItem>
                  <SelectItem value="technology-modernization">Technology modernization</SelectItem>
                  <SelectItem value="regulatory-compliance">Regulatory compliance</SelectItem>
                </FormSelectContent>
              </Select>
            </div>
            <div>
              <Label>Interested Services * (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['Remote Monitoring', 'Telemedicine', 'Home Healthcare', 'Clinical Analytics', 'Care Coordination', 'Patient Engagement'].map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={formData.interested_services.includes(service)}
                      onCheckedChange={(checked) => handleServicesChange(service, checked as boolean)}
                    />
                    <Label htmlFor={service} className="text-sm">{service}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="timeline">Implementation Timeline *</Label>
              <Select value={formData.timeline} onValueChange={(value) => updateFormData('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="When do you need this?" />
                </SelectTrigger>
                <FormSelectContent>
                  <SelectItem value="immediate">Immediate (0-30 days)</SelectItem>
                  <SelectItem value="short-term">Short-term (1-3 months)</SelectItem>
                  <SelectItem value="medium-term">Medium-term (3-6 months)</SelectItem>
                  <SelectItem value="long-term">Long-term (6+ months)</SelectItem>
                </FormSelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="budget_range">Budget Range</Label>
              <Select value={formData.budget_range} onValueChange={(value) => updateFormData('budget_range', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <FormSelectContent>
                  <SelectItem value="under-50k">Under $50K</SelectItem>
                  <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                  <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                  <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                  <SelectItem value="500k+">$500K+</SelectItem>
                </FormSelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="decision_maker"
                checked={formData.decision_maker}
                onCheckedChange={(checked) => updateFormData('decision_maker', checked)}
              />
              <Label htmlFor="decision_maker">I am a decision maker for this purchase</Label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Schedule Your Demo</h3>
            </div>
            <div>
              <Label htmlFor="preferred_date">Preferred Date *</Label>
              <Input
                id="preferred_date"
                type="date"
                value={formData.preferred_date}
                onChange={(e) => updateFormData('preferred_date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="preferred_time">Preferred Time *</Label>
              <Select value={formData.preferred_time} onValueChange={(value) => updateFormData('preferred_time', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <FormSelectContent>
                  <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                  <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                  <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                  <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                  <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                  <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                  <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                </FormSelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={formData.timezone}
                onChange={(e) => updateFormData('timezone', e.target.value)}
                placeholder="Your timezone"
              />
            </div>
            <div>
              <Label htmlFor="demo_type">Demo Type</Label>
              <Select value={formData.demo_type} onValueChange={(value) => updateFormData('demo_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select demo type" />
                </SelectTrigger>
                <FormSelectContent>
                  <SelectItem value="virtual">Virtual Demo</SelectItem>
                  <SelectItem value="onsite">On-site Demo</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                </FormSelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepProgress = () => (currentStep / 4) * 100;

  // Success message component
  if (showSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold gradient-text mb-2">
              Demo Request Submitted Successfully!
            </h2>
            <p className="text-lg text-gray-600">
              We'll contact you within 24 hours to schedule your demo.
            </p>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="gradient-text font-medium">
              Thank you for your interest in our healthcare technology platform.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Request Demo - Step {currentStep} of 4</CardTitle>
          <span className="text-sm text-muted-foreground">{Math.round(getStepProgress())}% Complete</span>
        </div>
        <Progress value={getStepProgress()} className="mt-2" />
      </CardHeader>
      <CardContent>
        {renderStep()}
        
        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!validateStep(currentStep)}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!validateStep(4) || isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Submit Request
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;