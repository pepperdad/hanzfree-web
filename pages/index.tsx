import type { GetServerSideProps, GetServerSidePropsContext } from 'next';

import Layout from '@shared/components/Layout';
import { PageProp } from '@shared/types';
import Page from 'main/components/Page';

import { fetchUserData } from './api';

const index = ({ userData }: PageProp) => {
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
