'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [role, setRole] = useState('');
  function handleRole(x) {
    setRole(x.target.value);
  }
  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col p-20 gap-4 bg-white rounded-md mt-10 justify-center items-center">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row space-x-4">
              <label>
                <input
                  type="radio"
                  name="radio-2"
                  value="plantsitters"
                  className="radio radio-primary m-1.5 "
                  onClick={handleRole}
                />{' '}
                I have a plant
              </label>
              {console.log('role', role)}
            </div>

            <div className="flex flex-row space-x-4">
              <label>
                <a href="/plantowners">
                  <input
                    type="radio"
                    name="radio-2"
                    value="plantowners"
                    className="radio radio-primary  m-1.5 "
                    onClick={handleRole}
                  />
                </a>
                I have a watering can
              </label>
            </div>
          </div>

          <a className="bg-primary rounded-lg p-3" href={`/${role}`}>
            Find
          </a>
        </div>
      </div>
    </main>
  );
}
