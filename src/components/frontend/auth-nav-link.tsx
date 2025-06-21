'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

export function AuthNavLink() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Skeleton className="h-6 w-24" />;
  }

  if (user) {
    return (
      <Link href="/admin" className="transition-colors hover:text-primary">
        masuk
      </Link>
    );
  }

  return (
    <Link href="/login" className="transition-colors hover:text-primary">
      Login Admin
    </Link>
  );
}
