import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { useRecoilValue } from 'recoil';

import { fetchUserData } from '@pages/api';
import CompletePage from '@reservation/CompletePage';
import OtherInfoPage from '@reservation/OtherInfoPage';
import Page from '@reservation/Page';
import Layout from '@shared/components/Layout';
import { reservationPageState } from '@shared/recoil/reservationPage';
import { PageProp } from '@shared/types';

const index = ({ userData }: PageProp) => {
  const { page: reservationPage } = useRecoilValue(reservationPageState);

  return (
    <Layout headerData={userData}>
      {reservationPage === 1 && <Page />}
      {reservationPage === 2 && <OtherInfoPage userData={userData} />}
      {reservationPage === 3 && <CompletePage />}
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
