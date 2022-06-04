import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0';
import styles from './Header.module.scss';

const Header: FC = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <header className={styles.header}>
        Welcome {user.name}! <Link href="/api/auth/logout">Logout</Link>
        <div>
          <Image
            className={styles.profileImage}
            src={user.picture as string}
            alt={user.name as string}
            width="32"
            height="32"
          />
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <Link href="/api/auth/login">Login</Link>
    </header>
  );
};

export default Header;
