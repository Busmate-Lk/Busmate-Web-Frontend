import React, { Suspense } from 'react';
import StaffFormClient from './StaffFormClient';
import { Layout } from '@/components/shared/layout';

export default function Page() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <StaffFormClient />
      </Suspense>
    </Layout>
  );
}
