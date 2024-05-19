'use client';

import withAuth from 'src/hoc/withAuth';
import { UserCreateView } from 'src/sections/user/view';

function UserCreatePage() {
  return <UserCreateView />;
}

export default withAuth(UserCreatePage, ['superAdmin']);
