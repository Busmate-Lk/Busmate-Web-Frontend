import { TripAssignment } from '@/components/timeKeeper/trip-assignment';
import { Metadata } from 'next';
import { Layout } from '@/components/shared/layout';

export const metadata: Metadata = {
  title: 'Trip Assignment | BusMate',
  description:
    'Manage trip assignments and handle bus unavailability situations',
};

export default function TimeKeeperTripAssignmentPage() {
  return (
    <Layout
      activeItem="trip-assignment"
      pageTitle="Trip Assignment Management"
      pageDescription="Remove permits from unavailable buses and assign alternative buses to scheduled trips"
      role="timeKeeper"
      padding={0}
    >
      <TripAssignment />
    </Layout>
  );
}
