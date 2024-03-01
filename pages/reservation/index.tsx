import React, { useEffect, useState } from 'react';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { useRouter } from 'next/router';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { fetchUserData } from '@pages/api';
import { AllProducts, callShopifyAdmin } from '@pages/api/shopify/shopify';
import CompletePage from '@reservation/CompletePage';
import { DELIVERY_TYPE } from '@reservation/constants';
import { ReservationPageContext } from '@reservation/context';
import OtherInfoPage from '@reservation/OtherInfoPage';
import Page from '@reservation/Page';
import Layout from '@shared/components/Layout';
import { reservationState } from '@shared/recoil';
import { shopifyProductState } from '@shared/recoil/shopifyProduct';
import { UserProfile } from '@shared/types';

interface ReservationPageProps extends UserProfile {
  products: any;
}

const IndexPage = ({ userData, products }: ReservationPageProps) => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [reservation, setReservation] = useRecoilState(reservationState);
  const setShopifyProducts = useSetRecoilState(shopifyProductState);

  useEffect(() => {
    const { method, quantity, date } = router.query;

    if (method && quantity && date) {
      const currentDate = new Date();
      const utcOffsetInMinutes = currentDate.getTimezoneOffset();
      const adjustedReservationDate = new Date(
        (new Date(date as string) as Date).getTime() - utcOffsetInMinutes * 60 * 1000,
      );

      setPage(2);
      setReservation({
        ...reservation,
        method: method as keyof typeof DELIVERY_TYPE,
        quantity: Number(quantity),
        date: adjustedReservationDate,
        price: 25000 * Number(quantity),
      });
    } else setPage(1);
  }, [router.query]);

  useEffect(() => {
    setShopifyProducts(products);
  }, []);

  return (
    <ReservationPageContext.Provider value={setPage}>
      <Layout userData={userData}>
        {page === 1 && <Page />}
        {page === 2 && <OtherInfoPage userData={userData} />}
        {page === 3 && <CompletePage />}
      </Layout>
    </ReservationPageContext.Provider>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const userData = await fetchUserData(context);

  const response = await callShopifyAdmin(AllProducts);
  const products = response.data.products.edges;

  if (!userData) {
    return { props: { userData: null } };
  }

  return { props: { userData, products } };
};
