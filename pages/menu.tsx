// 서비스 소개 페이지

import React from 'react';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import Layout from '@shared/components/Layout';

import { fetchUserData } from './api';

const menu = ({ userData }: any) => {
  return <Layout userData={userData}>menu</Layout>;
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
