'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../utils/validation';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

export default function RegisterForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <main className="min-h-screen">
      <div className=" flex justify-center items-center ">
        <div className=" flex flex-col p-20 gap-4 bg-white rounded-md mt-10 justify-center items-center">
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
              });

              const data: RegisterResponseBodyPost = await response.json();

              if ('errors' in data) {
                setErrors(data.errors);
                return;
              }

              const returnTo = getSafeReturnToPath(props.returnTo);

              if (returnTo) {
                router.push(returnTo);
                return;
              }

              router.replace(`/profile/${data.user.username}`);
              router.refresh();
            }}
          >
            <div className="flex flex-col p-5 gap-4">
              <h1>Please register here: </h1>
              {errors.map((error) => (
                <div key={`error-${error.message}`}>Error: {error.message}</div>
              ))}

              <input
                value={username}
                placeholder="Username"
                onChange={(event) => setUsername(event.currentTarget.value)}
              />

              <input
                value={password}
                placeholder="Password"
                onChange={(event) => setPassword(event.currentTarget.value)}
              />

              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
