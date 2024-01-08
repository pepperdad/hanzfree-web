import React from 'react';

import { fetchUserData } from '@pages/api';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const index = ({ userData }: any) => {
  return <div>index</div>;
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
