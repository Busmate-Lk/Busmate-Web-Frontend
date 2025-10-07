import React, { Suspense } from 'react';
import BusFareDetailsClient from './BusFareDetailsClient';

export default function Page() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <BusFareDetailsClient />
      </Suspense>
  );
}
