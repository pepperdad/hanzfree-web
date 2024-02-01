import React from 'react';

const SubmitForm = () => {
  return (
    <>
      <div className='mt-4 text-neutral-600 font-normal'>
        By continuing, you acknowledge and agree to HANZFREE Geneal Terms of Use and Privacy Policy.
      </div>

      <div className='w-full px-5 py-3 rounded-[20px] border border-blue-300 bg-blue-50'>
        Please enter your info carefully. Once submitted it cannot be changed.
      </div>

      <div className='flex w-full mt-4'>
        <div className='grow text-neutral-600 text-md font-normal'>
          Your booking will be submitted once you continue to the next step. <br />
          (You can choose your payment method in the next step){' '}
        </div>
        <button
          className='px-3 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg'
          type='submit'
        >
          Go to payment
        </button>
      </div>
    </>
  );
};

export default SubmitForm;
