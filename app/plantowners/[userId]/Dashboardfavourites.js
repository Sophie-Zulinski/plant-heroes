'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Dashboard(props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState([]);

  const router = useRouter();
  console.log('props.singeUser.id', props.singleUser.id);

  return (
    <div className=" flex justify-center items-center ">
      <div>
        <input
          type="submit"
          value=" Add to favourites"
          className="bg-primary rounded-lg p-3"
          onClick={async () => {
            const response = await fetch('/api/favourites', {
              method: 'POST',
              body: JSON.stringify({
                user_giver_id: props.user.id,
                user_receiver_id: props.singleUser.id,
              }),
            });

            const data = await response.json();

            if ('errors' in data) {
              setErrors(data.errors);
              return;
            }
            console.log('body', JSON.body);

            router.refresh();
          }}
        />
      </div>
    </div>
  );
}
