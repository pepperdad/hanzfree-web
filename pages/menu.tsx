// 서비스 소개 페이지

import React from 'react';

import Layout from '@shared/components/Layout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { fetchUserData } from './api';

const menu = () => {
  return <Layout>menu</Layout>;
};

export default menu;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const userData = await fetchUserData(context);

  if (!userData) {
    return { props: { userData: null } };
  }

  return { props: { userData } };
};
