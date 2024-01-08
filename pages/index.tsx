import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import Page from 'main/components/Page';

import Layout from '@shared/components/Layout';

import { fetchUserData } from './api';

const Home: NextPage = ({ userData }: any) => {
  console.log('userData', userData);
  return (
    <Layout headerData={userData}>
      <Page />
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  console.log('ssr cookies', context.req.headers.cookie);
  const userData = await fetchUserData(context);

  if (!userData) {
    return { props: { userData: null } };
  }

  return { props: { userData } };
};
