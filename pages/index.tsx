import { useEffect } from 'react';

import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import Page from 'main/components/Page';

import Layout from '@shared/components/Layout';

import { fetchUserData } from './api';

const Home: NextPage = ({ userData }: any) => {
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
  const userData = await fetchUserData(context);

  if (!userData) {
    return { props: { userData: null } };
  }

  return { props: { userData } };
};
