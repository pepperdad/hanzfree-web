import React from 'react';

import Link from 'next/link';

const Section1 = () => {
  return (
    <div id='section1' className='h-screen'>
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
  );
};

export default Section1;
