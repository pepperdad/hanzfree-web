import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { fetchUserData } from '@pages/api';
import Layout from '@shared/components/Layout';
import Page from 'login/Page';

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
