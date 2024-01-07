import { fetchUserData } from '@pages/api';
import Layout from '@shared/components/Layout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const index = ({ userData }: any) => {
  return (
    <Layout headerData={userData}>
      <div>
        <ul>
          <li>email: {userData.email}</li>
        </ul>
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
