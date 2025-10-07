import React, { Suspense } from 'react';
import MessageViewClient from './MessageViewClient';

export default function Page() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <MessageViewClient />
      </Suspense>
  );
}
