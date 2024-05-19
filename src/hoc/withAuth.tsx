import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  allowedUserTypes: string[]; 

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: Props & any) => {
    const [verified, setVerified] = useState(false);
    const router = useRouter();

    const { allowedUserTypes } = props;

    const checkToken = async () => {
      const accessToken = localStorage.getItem('user');
      if (!accessToken) {
        router.push('/login');
      } else {
        const loggedInUserType: string = 'superadmin';
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
