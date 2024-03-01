import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { fetchUserData } from '@pages/api';
import CompletePage from '@reservation/CompletePage';
import Layout from '@shared/components/Layout';
import { UserProfile } from '@shared/types';

const index = ({ userData }: UserProfile) => {
  return (
    <Layout userData={userData}>
      <CompletePage />
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
