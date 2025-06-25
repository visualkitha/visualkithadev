'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';

const logoUrl = "https://itoizdelnicxhqadarbo.supabase.co/storage/v1/object/sign/img/IMG_1090.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kM2QwMjc5Yi04NjlkLTQxNjQtODI3OS04ZTJiNTVjNjZhYjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWcvSU1HXzEwOTAuanBnIiwiaWF0IjoxNzUwODU5MDg4LCJleHAiOjE3ODIzOTUwODh9.rwKNivhMSvM7QABznOIJ48i--0LtC7MPEEMfHkp1PnA";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
        toast({ variant: 'destructive', title: 'Error', description: 'Email dan kata sandi diperlukan.' });
        return;
    }
    if (!auth) {
        toast({ variant: 'destructive', title: 'Error', description: 'Firebase tidak dikonfigurasi dengan benar.' });
        return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Login Berhasil',
        description: 'Mengarahkan ke dasbor admin...',
      });
      router.push('/admin');
    } catch (error: any) {
      console.error('Login gagal:', error);
      toast({
        variant: 'destructive',
        title: 'Login Gagal',
        description:
          error.code === 'auth/invalid-credential'
            ? 'Email atau kata sandi tidak valid. Silakan coba lagi.'
            : error.message || 'Terjadi kesalahan yang tidak diketahui.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleLogin}>
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Image src={logoUrl} alt="Visual Kitha Logo" width={64} height={64} className="rounded-full" />
              </div>
              <CardTitle className="font-headline text-2xl">Visual Kitha CMS</CardTitle>
              <CardDescription>Masukkan kredensial Anda untuk mengakses panel admin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
               <Button variant="link" size="sm" asChild className="w-full">
                <Link href="/">Kembali ke situs web</Link>
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
