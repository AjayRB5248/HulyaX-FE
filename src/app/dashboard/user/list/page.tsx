'use client';

import withAuth from 'src/hoc/withAuth';
import { UserListView } from 'src/sections/user/view';

function UserListPage() {
  return <UserListView />;
}

export default withAuth(UserListPage, ['superAdmin']);
