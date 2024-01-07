import Link from 'next/link';

import Layout from '@shared/components/Layout';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import { fetchUserData } from './api';

const Home: NextPage = ({ userData }: any) => {
  return (
    <Layout headerData={userData}>
      <div>
        <ol>
          <li>
            <Link href='/test'>
              <button>test</button>
            </Link>
          </li>
          <li>
            <Link href='/login'>
              <button>login</button>
            </Link>
          </li>
          <li>
            <Link href='/admin'>
              <button>admin</button>
            </Link>
          </li>
          <li>
            <Link href='/admin/dashboard'>
              <button>admin dashboard</button>
            </Link>
          </li>

          <li>
            <Link href='/reservation'>
              <button>reservation</button>
            </Link>
          </li>
        </ol>
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const userData = await fetchUserData(context);

  if (!userData) {
    return { props: { userData: null } };
  }

  return { props: { userData } };
};
