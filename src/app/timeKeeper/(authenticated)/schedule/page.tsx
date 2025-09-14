import React, { Suspense } from 'react';
import ScheduleManagementClient from './ScheduleManagementClient';
import { Layout } from '@/components/shared/layout';

export default function Page() {
  return (
    <Layout
      activeItem="schedule"
      pageTitle="Matara Bus Station - Schedule Management"
      pageDescription="Manage and monitor bus schedules for Matara Bus Station"
      role="timeKeeper"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ScheduleManagementClient />
      </Suspense>
    </Layout>
  );
}
