import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { useRecoilState } from 'recoil';

import { useForm } from 'react-hook-form';

import intlTelInput from 'intl-tel-input';

import Instance from '@pages/api/config';
import { reservationState } from '@shared/recoil';
import { shopifyProductState } from '@shared/recoil/shopifyProduct';
import { UserProfileData } from '@shared/types';

import AirportToHotelForm from './AirportToHotelForm';
import { TERMS } from './constants';
import ContactInfo from './ContactInfo';
import HotelToAirportForm from './HotelToAirportForm';
import HotelToHotelForm from './HotelToHotelForm';
import SubmitForm from './SubmitForm';
import TermCheck from './TermCheck';

const Loading = dynamic(() => import('@shared/components/animation/loading'), { ssr: false });

interface EnterFormProps {
  userData: UserProfileData;
}

const EnterForm = ({ userData }: EnterFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'all' });

  const [reservation, setReservation] = useRecoilState(reservationState);
  const [shopifyProducts, setShopifyProducts] = useRecoilState(shopifyProductState);
  const [selectedProduct, setSelectedProduct] = useState<any>({});

  const [country, setCountry] = useState<string>('');
  const [dialCode, setDialCode] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [location, setLocation] = useState({
    placeName: '',
    input: '',
    address: '',
  });
  const [arrivalLocation, setArrivalLocation] = useState({
    placeName: '',
    input: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const checkout = async () => {
    const fetchUrl = 'http://localhost:3000/api/shopify/checkout';
    // const fetchUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/api/shopify/checkout`;
    const fetchOptions = {
      endpoint: fetchUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variantId: selectedProduct,
        quantity: reservation.quantity,
      }),
    };

    try {
      setIsLoading(true);

      const response = await fetch(fetchUrl, fetchOptions);

      if (!response.ok) {
        let message = await response.json();
        message = message.error;
        throw new Error(message);
      }

      const data = await response.json();
      const { checkoutURL } = data;
      const checkoutId = checkoutURL.split('/')[5];
      const indexOfQuestionMark = checkoutId.indexOf('?');
      const strWithoutQuery = checkoutId.slice(0, indexOfQuestionMark);

      window.location.href = checkoutURL;

      return strWithoutQuery;
    } catch (e: any) {
      throw new Error(e.message || 'An error occurred.');
    }
  };

  const onValid = async (data: any) => {
    if (isSubmitting) return;

    document.body.style.overflow = 'hidden';

    try {
      const checkoutId = await checkout();

      const currentDate = new Date();
      const utcOffsetInMinutes = currentDate.getTimezoneOffset();
      const adjustedReservationDate = new Date(
        (new Date(reservation?.date as string) as Date).getTime() - utcOffsetInMinutes * 60 * 1000,
      );

      const formData = {
        ...data,
        bookingNumber: checkoutId,
        hotelName: location.input,
        hotelAddress: location.address,
        country,
        dialCode,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        method: reservation.method,
        date: adjustedReservationDate,
        quantity: reservation.quantity,
        price: reservation.price,
        arrivalhotelName: reservation.method === 'hotelToHotel' ? arrivalLocation.input : '',
        arrivalhotelAddress: reservation.method === 'hotelToHotel' ? arrivalLocation.address : '',
      };

      const res = await Instance.post('/reservation', formData);
      // console.log('res', res);

      if (res.status === 201) {
        setReservation(res.data);
        // setPage(3);
      }
    } catch (e) {
      document.body.style.overflow = 'visible';

      console.log(e);
    }
  };

  useEffect(() => {
    const input = document.querySelector('#phoneNumber') as Element;

    const iti = intlTelInput(input, {
      initialCountry: 'auto',
      separateDialCode: true,
      autoPlaceholder: 'aggressive',
      geoIpLookup: (callback) => {
        fetch(`https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}`)
          .then((res) => res.json())
          .then((data) => callback(data.country))
          .catch(() => callback('us'));
      },
      utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js',
    });

    input.addEventListener('countrychange', () => {
      const { dialCode: itiDialCode, name } = iti.getSelectedCountryData();

      setDialCode(itiDialCode);
      setCountry(name);
    });
  }, []);

  useEffect(() => {
    let handle = '';
    if (reservation.method === 'airportToHotel') handle = 'airport-to-hotel';
    else if (reservation.method === 'hotelToAirport') handle = 'hotel-to-airport';
    else if (reservation.method === 'hotelToHotel') handle = 'hotel-to-hotel';

    setSelectedProduct(
      shopifyProducts
        .filter((product: any) => product.node.handle === handle)
        .map((product: any) => product.node.variants.edges[0].node.id)[0],
    );
  }, []);

  document.addEventListener(
    'keydown',
    function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    },
    true,
  );

  return (
    <div className='md:w-4/5 mt-3'>
      {isSubmitting && (
        <div className='absolute bottom-0 left-0 z-10 flex-center w-screen h-screen opacity-80 bg-slate-50'>
          <Loading />
        </div>
      )}

      <form
        onSubmit={handleSubmit(onValid)}
        className='flex flex-col md:flex-row flex-wrap justify-between gap-y-2 md:gap-y-3'
      >
        {reservation.method === 'airportToHotel' ? (
          <AirportToHotelForm
            location={location}
            setLocation={setLocation}
            register={register}
            errors={errors}
          />
        ) : reservation.method === 'hotelToAirport' ? (
          <HotelToAirportForm
            location={location}
            setLocation={setLocation}
            register={register}
            errors={errors}
          />
        ) : (
          <HotelToHotelForm
            location={location}
            setLocation={setLocation}
            arrivalLocation={arrivalLocation}
            setArrivalLocation={setArrivalLocation}
            register={register}
            errors={errors}
          />
        )}

        <div className='flex flex-col md:w-1/2-20'>
          <label htmlFor='phoneNumber' className='mb-1'>
            Phone Number
          </label>
          <input
            id='phoneNumber'
            type='tel'
            className={`input w-full ${
              errors?.phoneNumber ? 'border border-red-500' : 'border-gray-300'
            } `}
            {...register('phoneNumber', {
              required: 'please enter your phone number',
            })}
            placeholder='E.g +852 1234 5678'
            onChange={(e) => setPhone(e.target.value)}
          />
          <span className='text-red-500 text-sm'>
            {errors?.phoneNumber?.message && `⚠ ${String(errors?.phoneNumber?.message)}`}
          </span>
        </div>

        {TERMS.map((term, index) => (
          <TermCheck
            key={index}
            inputName={`term${index + 1}`}
            rules={{ required: 'Please agree to the terms and conditions' }}
            content={term.content}
            register={register}
            errors={errors}
          />
        ))}

        <ContactInfo
          userData={userData}
          dialCode={dialCode}
          phone={phone}
          contactId={watch('contactId')}
        />

        <SubmitForm isLoading={isLoading} />
      </form>
    </div>
  );
};

export default EnterForm;
