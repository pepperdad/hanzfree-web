import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import Page from 'signUp/Page';

import Layout from '@shared/components/Layout';

import { fetchUserData } from './api';

const index = ({ userData }: any) => {
  return (
    <Layout headerData={userData}>
      <Page />
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
