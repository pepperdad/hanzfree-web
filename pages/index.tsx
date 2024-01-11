import { useEffect } from 'react';

import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import Page from 'main/components/Page';

import Layout from '@shared/components/Layout';

import { fetchUserData } from './api';
import Instance from './api/config';

const Home: NextPage = ({ userData }: any) => {
  console.log('userData', userData);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await Instance.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/check`);
        console.log('srr res', res);
      } catch (err) {
        console.log('err', err);
      }
    }
    fetchData();
  });

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
  const res = await Instance.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/check`);
  console.log('srr res', res);

  console.log('ssr cookies', context.req.headers.cookie);
  const userData = await fetchUserData(context);

  if (!userData) {
    return { props: { userData: null } };
  }

  return { props: { userData } };
};
