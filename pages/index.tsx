import type { NextPage } from 'next'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0';

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}! <Link href="/api/auth/logout">Logout</Link>
      </div>
    );
  }

  return <Link href="/api/auth/login">Login</Link>;
}

export default Home
