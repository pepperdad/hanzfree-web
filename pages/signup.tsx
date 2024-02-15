import { useState } from 'react';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import Layout from '@shared/components/Layout';
import { UserProfile } from '@shared/types';
import CompletePage from 'signUp/CompletePage';
import Page from 'signUp/Page';

import { fetchUserData } from './api';

const index = ({ userData }: UserProfile) => {
  const [page, setPage] = useState(1);

  return (
    <Layout userData={userData}>
      {page === 1 && <Page setPage={setPage} />}
      {page === 2 && <CompletePage />}
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
