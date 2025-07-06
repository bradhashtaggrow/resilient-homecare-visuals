import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Calendar, Clock, Building, User, Target, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
      const { error } = await supabase
        .from('leads')
        .insert([{
          ...formData,
          form_source: source,
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        }]);

      if (error) throw error;

      // Show success modal with fireworks
      setShowSuccessModal(true);
      
      // Auto-close after 15 seconds (3x longer)
      setTimeout(() => {
        setShowSuccessModal(false);
        onSuccess?.();
        onClose?.();
      }, 15000);
      
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
                <Label htmlFor="first_name" className="modern-label">First Name *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => updateFormData('first_name', e.target.value)}
                  placeholder="John"
                  className="modern-field"
                />
              </div>
              <div>
                <Label htmlFor="last_name" className="modern-label">Last Name *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => updateFormData('last_name', e.target.value)}
                  placeholder="Doe"
                  className="modern-field"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="modern-label">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="john.doe@company.com"
                className="modern-field"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="modern-label">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="modern-field"
              />
            </div>
            <div>
              <Label htmlFor="company" className="modern-label">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                placeholder="Company Name"
                className="modern-field"
              />
            </div>
            <div>
              <Label htmlFor="job_title" className="modern-label">Job Title</Label>
              <Select value={formData.job_title} onValueChange={(value) => updateFormData('job_title', value)}>
                <SelectTrigger className="modern-field">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent 
                  style={{ 
                    zIndex: 2147483647,
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                >
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
                  <SelectItem value="operations-manager">Operations Manager</SelectItem>
                  <SelectItem value="clinical-director">Clinical Director</SelectItem>
                  <SelectItem value="nursing-director">Nursing Director</SelectItem>
                  <SelectItem value="administrator">Administrator</SelectItem>
                  <SelectItem value="project-manager">Project Manager</SelectItem>
                  <SelectItem value="consultant">Consultant</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
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
              <Label htmlFor="company_size" className="modern-label">Company Size *</Label>
              <Select value={formData.company_size} onValueChange={(value) => updateFormData('company_size', value)}>
                <SelectTrigger className="modern-field">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent 
                  style={{ 
                    zIndex: 2147483647,
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="501-1000">501-1000 employees</SelectItem>
                  <SelectItem value="1000+">1000+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="industry" className="modern-label">Industry *</Label>
              <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
                <SelectTrigger className="modern-field">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent 
                  style={{ 
                    zIndex: 2147483647,
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="hospital">Hospital System</SelectItem>
                  <SelectItem value="clinic">Clinic/Practice</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="pharma">Pharmaceutical</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="current_solution" className="modern-label">Current Solution</Label>
              <Input
                id="current_solution"
                value={formData.current_solution}
                onChange={(e) => updateFormData('current_solution', e.target.value)}
                placeholder="What solution are you currently using?"
                className="modern-field"
              />
            </div>
            <div>
              <Label htmlFor="annual_revenue" className="modern-label">Annual Revenue</Label>
              <Select value={formData.annual_revenue} onValueChange={(value) => updateFormData('annual_revenue', value)}>
                <SelectTrigger className="modern-field">
                  <SelectValue placeholder="Select annual revenue" />
                </SelectTrigger>
                <SelectContent 
                  style={{ 
                    zIndex: 2147483647,
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <SelectItem value="under-1m">Under $1M</SelectItem>
                  <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                  <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                  <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                  <SelectItem value="50m-100m">$50M - $100M</SelectItem>
                  <SelectItem value="100m+">$100M+</SelectItem>
                </SelectContent>
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
              <Label htmlFor="primary_challenge" className="modern-label">Primary Challenge *</Label>
              <Select value={formData.primary_challenge} onValueChange={(value) => updateFormData('primary_challenge', value)}>
                <SelectTrigger className="modern-field">
                  <SelectValue placeholder="What's your biggest challenge?" />
                </SelectTrigger>
                <SelectContent 
                  style={{ 
                    zIndex: 2147483647,
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <SelectItem value="patient-outcomes">Improving patient outcomes</SelectItem>
                  <SelectItem value="operational-efficiency">Operational efficiency</SelectItem>
                  <SelectItem value="cost-reduction">Cost reduction</SelectItem>
                  <SelectItem value="capacity-expansion">Capacity expansion</SelectItem>
                  <SelectItem value="technology-modernization">Technology modernization</SelectItem>
                  <SelectItem value="regulatory-compliance">Regulatory compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="modern-label">Interested Services * (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['Remote Monitoring', 'Telemedicine', 'Home Healthcare', 'Clinical Analytics', 'Care Coordination', 'Patient Engagement'].map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={formData.interested_services.includes(service)}
                      onCheckedChange={(checked) => handleServicesChange(service, checked as boolean)}
                      className="modern-checkbox"
                    />
                    <Label htmlFor={service} className="text-sm font-medium text-gray-700">{service}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="timeline" className="modern-label">Implementation Timeline *</Label>
              <Select value={formData.timeline} onValueChange={(value) => updateFormData('timeline', value)}>
                <SelectTrigger className="modern-field">
                  <SelectValue placeholder="When do you need this?" />
                </SelectTrigger>
                <SelectContent 
                  style={{ 
                    zIndex: 2147483647,
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <SelectItem value="immediate">Immediate (0-30 days)</SelectItem>
                  <SelectItem value="short-term">Short-term (1-3 months)</SelectItem>
                  <SelectItem value="medium-term">Medium-term (3-6 months)</SelectItem>
                  <SelectItem value="long-term">Long-term (6+ months)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="budget_range" className="modern-label">Budget Range</Label>
              <Select value={formData.budget_range} onValueChange={(value) => updateFormData('budget_range', value)}>
                <SelectTrigger className="modern-field">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent 
                  style={{ 
                    zIndex: 2147483647,
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <SelectItem value="under-50k">Under $50K</SelectItem>
                  <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                  <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                  <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                  <SelectItem value="500k+">$500K+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="decision_maker"
                checked={formData.decision_maker}
                onCheckedChange={(checked) => updateFormData('decision_maker', checked)}
                className="modern-checkbox"
              />
              <Label htmlFor="decision_maker" className="text-sm font-medium text-gray-700">I am a decision maker for this purchase</Label>
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
              <Label htmlFor="preferred_date" className="modern-label">Preferred Date *</Label>
              <Input
                id="preferred_date"
                type="date"
                value={formData.preferred_date}
                onChange={(e) => updateFormData('preferred_date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="modern-field"
              />
            </div>
            <div>
              <Label htmlFor="preferred_time" className="modern-label">Preferred Time *</Label>
              <Select value={formData.preferred_time} onValueChange={(value) => updateFormData('preferred_time', value)}>
                <SelectTrigger className="modern-field">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent 
                  style={{ 
                    zIndex: 2147483647,
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                  <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                  <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                  <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                  <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                  <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                  <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone" className="modern-label">Timezone</Label>
              <Input
                id="timezone"
                value={formData.timezone}
                onChange={(e) => updateFormData('timezone', e.target.value)}
                placeholder="Your timezone"
                className="modern-field"
              />
            </div>
            <div>
              <Label htmlFor="demo_type" className="modern-label">Demo Type</Label>
              <Select value={formData.demo_type} onValueChange={(value) => updateFormData('demo_type', value)}>
                <SelectTrigger className="modern-field">
                  <SelectValue placeholder="Select demo type" />
                </SelectTrigger>
                <SelectContent 
                  style={{ 
                    zIndex: 2147483647,
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <SelectItem value="virtual">Virtual Demo</SelectItem>
                  <SelectItem value="in-person">In-Person Demo</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="w-full font-apple">
      {/* Success Modal with Fireworks */}
      {showSuccessModal && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            zIndex: 2147483647,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div className="relative">
            {/* Success Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center border border-gray-200 animate-bounce-gentle">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg checkmark-container">
                <CheckCircle className="w-8 h-8 text-white checkmark-swoop" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your demo request has been sent!
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Please wait for our team to send you email confirmation with calendar invite and Zoom link. 
                <br /><br />
                <span className="font-semibold text-primary">We look forward to meeting with you!</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-500">Step {currentStep} of 4</span>
          <span className="font-semibold" style={{
            background: 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full transition-all duration-700 ease-out shadow-sm rounded-full"
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)'
            }}
          />
        </div>
      </div>

      {/* Form content */}
      <div className="min-h-[400px]">
        {renderStep()}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={currentStep === 1 ? onClose : handlePrevious}
          disabled={isSubmitting}
          className="px-6 py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors duration-200 rounded-xl hover:bg-gray-50 cursor-pointer"
        >
          {currentStep === 1 ? 'Cancel' : '← Previous'}
        </button>

        {currentStep < 4 ? (
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="modern-button-primary"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="modern-button-primary min-w-[140px]"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Submitting...
              </div>
            ) : (
              'Submit Request'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default LeadCaptureForm;