'use client';
import withAuth from 'src/hoc/withAuth';
import { UserProfileView } from 'src/sections/user/view';

function UserProfilePage() {
  return <UserProfileView />;
}
export default withAuth(UserProfilePage, ['superAdmin']);
