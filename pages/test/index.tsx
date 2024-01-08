import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { fetchUserData } from '@pages/api';
import Layout from '@shared/components/Layout';

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
  const userDataResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/authenticate`, {
    headers: {
      Cookie: context.req.headers.cookie || '',
    },
  });
  const res = await userDataResponse.json();

  if (res.success === false) {
    return { props: { userData: null } };
  }

  const userData = {
    email: res.data.email,
    firstName: res.data.firstName,
    lastName: res.data.lastName,
    currentRefreshTokenExp: res.data.currentRefreshTokenExp,
    role: res.data.role,
    createdAt: res.data.createdAt,
  };

  return { props: { userData } };
};
