import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUsers } from '../../../database/users';
import { createTokenFromSecret } from '../../../utils/csrf';

type Props = {
  params: {
    userId: string;
  };
};

type SingleUser = {
  id: number;
  username: string;
  startDate: string;
  endDate: string;
  district: string;
  price: string;
  experience: string;
  description: string;
};

export default async function PlantOwners(props: Props) {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // for example you may also check if session user is an admin role

  if (!session) {
    redirect(`/login?returnTo=/plantsowners/`);
  }

  const csrfToken = createTokenFromSecret(session.csrfSecret);
  const users = await getUsers();
  const singleUser: SingleUser = users.find((user) => {
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
            src={`/images/${singleUser.username}-${singleUser.id}.jpg`}
            alt={singleUser.username}
          />

          <h1>{singleUser.username}</h1>
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
              {singleUser.startDate}-{singleUser.endDate}{' '}
            </span>
          </div>

          <button className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow">
            Show more dates
          </button>

          <span>{singleUser.district}</span>

          <span>{singleUser.price},- €</span>
          <span>{singleUser.experience} years of experience</span>
          <span>{singleUser.description}</span>
          <a href="mailto:sophie.zulinski@gmx.at?&subject=Request from plant heroes &body=Hi, do you want to be my plant hero?">
            Send request
          </a>
        </div>
      </div>
    </main>
  );
}
