'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function AuthNavLink({ className }: { className?: string }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Skeleton className="h-6 w-24" />;
  }

  if (user) {
    return (
      <Link href="/admin" className={cn("transition-colors hover:text-primary", className)}>
        masuk
      </Link>
    );
  }

  return (
    <Link href="/login" className={cn("transition-colors hover:text-primary", className)}>
      Login Admin
    </Link>
  );
}
