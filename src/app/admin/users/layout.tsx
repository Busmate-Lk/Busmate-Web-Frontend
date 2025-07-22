import React from 'react';

import { Header } from '../../../components/admin/shared/header';

export default function UsersLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header title="User Management" />
            <main>{children}</main>
        </>
    );
}
