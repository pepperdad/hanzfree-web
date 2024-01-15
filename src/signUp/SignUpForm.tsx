import Button from '@shared/components/Button';
import Input from '@shared/components/Input';

interface SignUpFormProps {
  onClick: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SignUpForm = ({ onClick }: SignUpFormProps) => {
  return (
    <form className='flex flex-col items-center w-full gap-2' onSubmit={onClick}>
      <div className='flex w-full gap-4 md:gap-10'>
        <Input
          fullWidth
          placeholder='First name'
          name='firstName'
          label='First Name'
          inputStyle='bg-slate-100'
        />
        <Input
          fullWidth
          placeholder='Last name'
          name='lastName'
          label='Last Name'
          inputStyle='bg-slate-100'
        />
      </div>

      <Input
        fullWidth
        placeholder='ID'
        name='email'
        label='Email Address'
        inputStyle='bg-slate-100'
      />
      <Input
        fullWidth
        placeholder='Enter your number only'
        name='phone'
        label='Phone'
        inputStyle='bg-slate-100'
      />
      <Input
        fullWidth
        placeholder='Enter your password'
        type='password'
        name='password'
        label='Password'
        inputStyle='bg-slate-100'
      />
      <Input
        fullWidth
        placeholder='Re-enter your password to verify'
        type='password'
        name='password-confirm'
        label='Password Confirm'
        inputStyle='bg-slate-100'
      />
      <Button fullWidth type='submit' buttonStyle='mt-4'>
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
