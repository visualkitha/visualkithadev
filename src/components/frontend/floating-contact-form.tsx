
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';

interface FloatingContactFormProps {
  whatsAppNumber: string;
  defaultMessage: string;
}

export function FloatingContactForm({ whatsAppNumber, defaultMessage }: FloatingContactFormProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState(defaultMessage || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let text = `Halo Visual Kitha,\n\nBerikut detail saya:\n`;
    text += `*Nama:* ${name}\n`;
    text += `*Alamat:* ${address}\n`;
    text += `\n*Pesan:*\n${message}\n\nTerima kasih.`;

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${whatsAppNumber.replace(/\D/g, '')}?text=${encodedText}`;
    
    window.open(url, '_blank');
  };

  return (
    <div className="grid gap-4">
        <div className="space-y-2">
            <h4 className="font-medium leading-none font-headline">Chat Cepat via WhatsApp</h4>
            <p className="text-sm text-muted-foreground">
                Isi form di bawah untuk memulai.
            </p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="float-name">Nama</Label>
                <Input id="float-name" placeholder="Nama Anda" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="float-address">Alamat</Label>
                <Input id="float-address" type="text" placeholder="Alamat Anda" required value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="float-message">Pesan</Label>
                <Textarea id="float-message" placeholder="Tulis pesan Anda..." required value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <Button type="submit" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Kirim
            </Button>
        </form>
    </div>
  );
}
