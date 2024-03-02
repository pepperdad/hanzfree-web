import React from 'react';

const SubmitForm = ({ isLoading }: any) => {
  return (
    <>
      <div className='mt-4 text-neutral-600 font-normal'>
        By continuing, you acknowledge and agree to HANZFREE Geneal Terms of Use and Privacy Policy.
      </div>

      <div className='w-full px-5 py-3 rounded-[20px] border border-blue-300 bg-blue-50'>
        Please enter your info carefully. Once submitted it cannot be changed.
      </div>

      <div className='flex w-full mt-4'>
        <div className='grow text-neutral-600 font-normal pr-2'>
          Your booking will be submitted once you continue to the next step. <br />
          (You can choose your payment method in the next step){' '}
        </div>

        <button
          className='px-3 py-2 text-white bg-blue-700 hover:bg-blue-800 rounded-lg'
          type='submit'
        >
          {isLoading && (
            <svg
              className='inline animate-spin -ml-1 mr-3 h-5 w-5 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              />
            </svg>
          )}
          <span>Go to Checkout</span>
        </button>
      </div>
    </>
  );
};

export default SubmitForm;
