import React, { Suspense } from 'react';
import TripManagementClient from '@/app/timeKeeper/(authenticated)/trip/TripManagementClient';
import { Layout } from '@/components/shared/layout';

export default function Page() {
  return (
    <Layout
      activeItem="trip"
      pageTitle="Trip Management"
      pageDescription="Monitor and manage trips passing through your assigned bus station"
      role="timeKeeper"
    >
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading trip management...</p>
          </div>
        </div>
      }>
        <TripManagementClient />
      </Suspense>
    </Layout>
  );
}
