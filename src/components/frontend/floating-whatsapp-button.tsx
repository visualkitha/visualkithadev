
'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FloatingContactForm } from './floating-contact-form';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.67-.165-.917-.325-.52-.165-.718-.165c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871-.118.571-.355 1.758-1.44 2.03-1.845.271-.405.271-.75.196-.896-.075-.149-.274-.248-.572-.4zM12.012 0C5.385 0 0 5.385 0 12.012s5.385 12.012 12.012 12.012c6.627 0 12.012-5.385 12.012-12.012S18.639 0 12.012 0z" />
  </svg>
);

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
                    <WhatsAppIcon className="h-8 w-8 text-white" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mr-4 mb-2" side="top" align="end">
                <FloatingContactForm whatsAppNumber={phoneNumber} defaultMessage={defaultMessage} />
            </PopoverContent>
        </Popover>
     </div>
  );
}
