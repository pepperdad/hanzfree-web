import React, { Suspense } from 'react';

import { fetchUserData } from '@pages/api';
import Layout from '@shared/components/Layout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const Animation = React.lazy(() => import('@shared/components/animation/lottie'));

const index = ({ userData }: any) => {
  return (
    <Layout headerData={userData}>
      <div>
        reservation complete!!
        <div className='w-40 h-40'>
          <Suspense fallback={<div>Loading...</div>}>
            <Animation />
          </Suspense>
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
