import React, { Suspense } from 'react';
import ScheduleAssignFormClient from './ScheduleAssignFormClient';

export default function Page() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <ScheduleAssignFormClient />
      </Suspense>
  );
}
