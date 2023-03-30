'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Dashboard(props) {
  const [errors, setErrors] = useState([]);

  const router = useRouter();
  console.log('props.singeUser.id', props.singleUser.id);
  const [showMore, setShowMore] = useState(false);
  function handleMoreClick() {
    setShowMore(!showMore);
  }
  return (
    <div className=" flex justify-center items-center ">
      <div>
        {showMore && (
          <div className=" flex justify-center items-center bg-secondary m-5 p-5 br-2 rounded-lg">
            User added to favourites
          </div>
        )}
        {showMore ? (
          ''
        ) : (
          <button
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

              handleMoreClick();
              const data = await response.json();

              if ('errors' in data) {
                setErrors(data.errors);
                return;
              }
              console.log('body', JSON.body);

              router.refresh();
            }}
          >
            Add to favourites
          </button>
        )}
      </div>
    </div>
  );
}
