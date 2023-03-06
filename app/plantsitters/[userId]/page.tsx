import Image from 'next/image';
import { getUsers } from '../../../database/users';

type Props = {
  params: {
    userId: string;
  };
};

type singleUser = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  district: string;
  price: string;
  experience: string;
};

export default async function PlantSitter(props: Props) {
  const users = await getUsers();
  const singleUser = users.find((user) => {
    return user.id === parseInt(props.params.userId);
  });

  console.log('singleUser', singleUser);
  console.log('props', props);
  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col p-20 gap-4 bg-white rounded-md mt-10 justify-center items-center">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
            src={`/images/${singleUser.name}-${singleUser.id}.jpg`}
            alt={singleUser.name}
          />

          <h1>{singleUser.name}</h1>
          <div className="rating">
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>

          <div className="flex flex-row space-x-4">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span>
              {singleUser.start_date}-{singleUser.end_date}{' '}
            </span>
          </div>

          <button className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow">
            Show more dates
          </button>

          <span>{singleUser.district}</span>

          <span>{singleUser.price},- €</span>
          <span>{singleUser.experience} years of experience</span>
          <span>{singleUser.description}</span>
          <button>Send request</button>
        </div>
      </div>
    </main>
  );
}
