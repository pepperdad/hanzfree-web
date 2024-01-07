import React from 'react';

import Link from 'next/link';

const Page = () => {
  return (
    <div>
      <div>
        <ol>
          <li>
            <Link href='/test'>
              <button>test</button>
            </Link>
          </li>
          <li>
            <Link href='/login'>
              <button>login</button>
            </Link>
          </li>
          <li>
            <Link href='/admin'>
              <button>admin</button>
            </Link>
          </li>
          <li>
            <Link href='/admin/dashboard'>
              <button>admin dashboard</button>
            </Link>
          </li>

          <li>
            <Link href='/reservation'>
              <button>reservation</button>
            </Link>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Page;
