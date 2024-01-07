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
      <header className='fixed top-0 left-0 right-0 flex items-center justify-between px-20 py-2 bg-blue-600 duration-500 ease-in-out'>
        <div className='flex items-center cursor-pointer'>
          <Link href='/'>
            <a>
              <Image src='/logo.svg' alt='Catcher Logo' width={240} height={50} />
            </a>
          </Link>
        </div>
        <div className='gap-12 flex-center'>
          {headerData ? (
            <>
              <Link href='/menu'>
                <a>
                  <button>메뉴1</button>
                </a>
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
