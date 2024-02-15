import React, { useState } from 'react';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { fetchUserData } from '@pages/api';
import CompletePage from '@reservation/CompletePage';
import { ReservationPageContext } from '@reservation/context';
import OtherInfoPage from '@reservation/OtherInfoPage';
import Page from '@reservation/Page';
import PaymentPage from '@reservation/PaymentPage';
import Layout from '@shared/components/Layout';
import { UserProfile } from '@shared/types';

const index = ({ userData }: UserProfile) => {
  const [page, setPage] = useState(3);

  return (
    <ReservationPageContext.Provider value={setPage}>
      <Layout userData={userData}>
        {page === 1 && <Page />}
        {page === 2 && <OtherInfoPage userData={userData} />}
        {page === 3 && <PaymentPage />}
        {page === 4 && <CompletePage />}
      </Layout>
    </ReservationPageContext.Provider>
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
