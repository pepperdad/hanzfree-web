import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import DetailPage from '@booking/DetailPage';
import { fetchUserData } from '@pages/api';
import Layout from '@shared/components/Layout';
import { UserProfile } from '@shared/types';

const index = ({ userData }: UserProfile) => {
  return (
    <Layout userData={userData}>
      <DetailPage />
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
