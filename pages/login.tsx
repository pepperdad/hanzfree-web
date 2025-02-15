import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import Layout from '@shared/components/Layout';
import { UserProfile } from '@shared/types';
import Page from 'login/Page';

import { fetchUserData } from './api';

const index = ({ userData }: UserProfile) => {
  return (
    <Layout userData={userData}>
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
