import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import LeadCaptureForm from './LeadCaptureForm';

interface LeadCaptureModalProps {
  children: React.ReactNode;
  source?: string;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ children, source = 'button' }) => {
  const [open, setOpen] = useState(false);
  
  console.log('LeadCaptureModal rendered, open:', open, 'source:', source);

  const handleSuccess = () => {
    console.log('LeadCaptureModal handleSuccess called');
    setOpen(false);
  };

  const handleClose = () => {
    console.log('LeadCaptureModal handleClose called');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      console.log('Dialog onOpenChange called, newOpen:', newOpen);
      setOpen(newOpen);
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <LeadCaptureForm 
          onSuccess={handleSuccess}
          onClose={handleClose}
          source={source}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;