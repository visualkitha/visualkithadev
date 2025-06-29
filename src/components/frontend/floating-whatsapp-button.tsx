'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FloatingContactForm } from './floating-contact-form';
import { MessageSquare } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  phoneNumber: string;
  defaultMessage: string;
}

export function FloatingWhatsAppButton({ phoneNumber, defaultMessage }: FloatingWhatsAppButtonProps) {
  if (!phoneNumber) {
    return null;
  }

  return (
     <div className="fixed bottom-6 right-6 z-50 animate-in fade-in-50 slide-in-from-bottom-10 duration-500">
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-16 w-16 rounded-full shadow-lg bg-[#25D366] hover:bg-[#128C7E] transition-all">
                    <MessageSquare className="h-8 w-8 text-white" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mr-4 mb-2" side="top" align="end">
                <FloatingContactForm whatsAppNumber={phoneNumber} defaultMessage={defaultMessage} />
            </PopoverContent>
        </Popover>
     </div>
  );
}
