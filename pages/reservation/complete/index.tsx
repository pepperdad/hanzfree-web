import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import dynamic from 'next/dynamic';

import { fetchUserData } from '@pages/api';
import Layout from '@shared/components/Layout';
import { UserProfile } from '@shared/types';

const Complete = dynamic(() => import('@shared/components/animation/complete'), { ssr: false });

const index = ({ userData }: UserProfile) => {
  return (
    <Layout userData={userData}>
      <div>
        reservation complete!!
        <div className='w-40 h-40'>
          <Complete />
        </div>
      </div>
    </Layout>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const userData = await fetchUserData(context);

  if (!userData) {
    return { props: { userData: null } };
  }

  return { props: { userData } };
};
