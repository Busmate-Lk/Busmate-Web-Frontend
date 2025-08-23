import React, { Suspense } from 'react';
import EditMessagesClient from './EditMessagesClient';
import { Layout } from '@/components/shared/layout';

export default function Page() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <EditMessagesClient />
      </Suspense>
    </Layout>
  );
}
