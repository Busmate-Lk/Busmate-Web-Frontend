import React, { Suspense } from 'react';
import StaffDetailsClient from './StaffDetailsClient';
import { Layout } from '@/components/shared/layout';

export default function Page() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <StaffDetailsClient />
      </Suspense>
    </Layout>
  );
}
