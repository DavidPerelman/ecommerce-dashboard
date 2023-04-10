import { auth } from '@/utils/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      route.push('/auth/login');
    }
  }, [user, route]);

  return <div>Dashboard</div>;
}
