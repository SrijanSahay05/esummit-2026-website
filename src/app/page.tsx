import { Suspense } from 'react';
import PageClient from '@/components/PageClient';

export default function Home() {
  return (
    <Suspense>
      <PageClient />
    </Suspense>
  );
}
