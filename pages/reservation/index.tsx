import React, { useState } from 'react';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { fetchUserData } from '@pages/api';
import CompletePage from '@reservation/CompletePage';
import { ReservationPageContext } from '@reservation/context';
import OtherInfoPage from '@reservation/OtherInfoPage';
import Page from '@reservation/Page';
import Layout from '@shared/components/Layout';
import { PageProp } from '@shared/types';

const index = ({ userData }: PageProp) => {
  const [page, setPage] = useState(1);

  return (
    <ReservationPageContext.Provider value={setPage}>
      <Layout headerData={userData}>
        {page === 1 && <Page />}
        {page === 2 && <OtherInfoPage userData={userData} />}
        {page === 3 && <CompletePage />}
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
