import React, { useContext } from 'react';

import Image from 'next/image';

import { Button } from '@shared/components/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/components/shadcn/ui/card';
import { Input } from '@shared/components/shadcn/ui/input';
import { Label } from '@shared/components/shadcn/ui/label';

import AvailableCard from './AvailableCard';
import { ReservationPageContext } from './context';

const PaymentPage = () => {
  const setPage = useContext(ReservationPageContext);

  return (
    <div>
      <p>PaymentPage</p>

      <div className='py-10 flex flex-col items-center'>
        <div className='relative w-60 h-14'>
          <Image src='/assets/reservation/apple_pay.svg' alt='apple_pay' layout='fill' />
        </div>

        <div className='flex items-center w-full md:w-[750px] pt-4 px-6 md:py-4'>
          <hr className='flex-grow border-gray-300' />
          <span className='mx-3 text-gray-500'>OR</span>
          <hr className='flex-grow border-gray-300' />
        </div>

        <Card className='m-2 md:m-0 md:w-[750px]'>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <CardTitle>Payment</CardTitle>
              <AvailableCard />
            </div>
            <CardDescription>All transactions are secure and encrypted.</CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='cardNumber'>Card number</Label>
                  <Input id='cardNumber' placeholder='Card number' />
                </div>

                <div className='flex flex-col space-y-1.5'>
                  <div className='flex gap-10'>
                    <div className='flex flex-col space-y-1.5 w-full'>
                      <Label htmlFor='expires'>Expiration date</Label>
                      <Input id='expires' placeholder='Expiration date(MM / YY)' />
                    </div>
                    <div className='flex flex-col space-y-1.5 w-full'>
                      <Label htmlFor='cvc'>CVC</Label>
                      <Input id='cvc' placeholder='CVC' />
                    </div>
                  </div>
                </div>

                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name'>Name on Card</Label>
                  <Input id='name' placeholder='Name on Card' />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <Button
              className='w-full'
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
            >
              Pay now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;
