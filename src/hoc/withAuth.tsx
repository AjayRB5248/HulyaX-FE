import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  allowedUserTypes: string[];
}

const withAuth = (
  WrappedComponent: React.ComponentType<any>,
  allowedUserTypes: string[]
) => {
  return (props: any) => {
    const [verified, setVerified] = useState(false);
    const router = useRouter();

    const checkToken = async () => {
      const user =
        localStorage.getItem('user') &&
        JSON?.parse(localStorage.getItem('user') || '');
      const accessToken = localStorage.getItem('accessToken');

      if (allowedUserTypes.length === 0 && accessToken !== null) {
        return router.push('/');
      } else if (allowedUserTypes.length === 0) {
        setVerified(true);
        return;
      }

      if (!accessToken) {
        router.push('/login');
      } else {
        const loggedInUserType: string = user?.role;

        if (allowedUserTypes.includes(loggedInUserType)) {
          setVerified(true);
        } else {
          router.push('/dashboard');
        }
      }
    };

    useEffect(() => {
      checkToken();
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <div className='spinner'></div>
        </div>
      );
    }
  };
};

export default withAuth;
