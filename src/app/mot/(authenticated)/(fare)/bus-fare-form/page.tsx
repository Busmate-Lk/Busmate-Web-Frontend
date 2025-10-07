import React, { Suspense } from 'react';
import AddFareClient from './AddFareClient';

export default function Page() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <AddFareClient />
      </Suspense>
  );
}
