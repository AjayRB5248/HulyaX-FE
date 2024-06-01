// sections
import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Login to HulyaX',
};

export default function LoginPage() {
  return <JwtLoginView />;
}
