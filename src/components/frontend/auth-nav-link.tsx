'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function AuthNavLink({ className }: { className?: string }) {
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || loading) {
    return <Skeleton className="h-6 w-24" />;
  }

  if (user) {
    return (
      <Link href="/admin" className={cn("transition-colors", className)}>
        masuk
      </Link>
    );
  }

  return (
    <Link href="/login" className={cn("transition-colors", className)}>
      login
    </Link>
  );
}
