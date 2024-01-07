// 헤더 컴포넌트

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Instance from '@pages/api/config';
import Button from '@shared/components/Button';

const Header = ({ headerData }: any) => {
  const router = useRouter();

  const handleLogout = async () => {
    sessionStorage.removeItem('recoil-persist');
    const res = await Instance.post('/auth/logout');

    if (res.status === 201) router.reload();
  };

  return (
    <div className='pb-[66px]'>
      <header className='fixed top-0 left-0 right-0 flex items-center justify-between px-20 py-2 transition-background duration-500 ease-in-out'>
        <div className='flex items-center cursor-pointer'>
          <Link href='/'>
            <Image src='/hanzfree.png' alt='Catcher Logo' width={50} height={50} />
          </Link>
        </div>
        <div className='gap-12 flex-center'>
          {headerData ? (
            <>
              <Link href='/menu'>
                <button>메뉴1</button>
              </Link>
              <button>메뉴2</button>
              <div>{headerData?.email}</div>
              <Button onClick={handleLogout}>로그아웃</Button>
            </>
          ) : (
            <Button onClick={() => router.push('/login')}>로그인</Button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
