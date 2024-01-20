import { useState } from 'react';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { fetchUserData } from '@pages/api';
import CompletePage from '@reservation/CompletePage';
import OtherInfoPage from '@reservation/OtherInfoPage';
import Page from '@reservation/Page';
import Layout from '@shared/components/Layout';

const index = ({ userData }: any) => {
  const [page, setPage] = useState(1);
  return (
    <Layout headerData={userData}>
      {page === 1 && <Page setPage={setPage} />}
      {page === 2 && <OtherInfoPage userData={userData} setPage={setPage} />}
      {page === 3 && <CompletePage />}
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
