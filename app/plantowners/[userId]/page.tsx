import dateFormat, { masks } from 'dateformat';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken, getUsers, User } from '../../../database/users';
import { createTokenFromSecret } from '../../../utils/csrf';
import Dashboard from './Dashboardfavourites';

type Props = {
  params: {
    userId: string;
  };
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

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  // if user is not undefined, the person is logged in
  // if user is undefined, the person is logged out

  console.log('userplantownerspage', user);

  const csrfToken = createTokenFromSecret(session.csrfSecret);
  const users = await getUsers();
  const singleUser: User = users.find((user) => {
    return user.id === parseInt(props.params.userId);
  });
  console.log('singeUser', singleUser.img);
  console.log('singleUser', singleUser);
  console.log('props', props);
  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col p-20 gap-4 bg-white rounded-md mt-10 justify-center items-center">
          <Image
            className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
            src={singleUser.img ? singleUser.img : '/images/pic07.jpg'}
            alt={singleUser.username}
            width="300"
            height="300"
          />{' '}
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
          <div className="flex flex-row">
            {singleUser.startDate !== '1111-11-11' ? (
              <h4>
                {dateFormat(singleUser.startDate, 'mmmm dS')} {'-'}{' '}
              </h4>
            ) : (
              ''
            )}{' '}
            {singleUser.endDate !== '1111-11-11' ? (
              <h4>{dateFormat(singleUser.endDate, 'mmmm dS yyyy')} </h4>
            ) : (
              ''
            )}
          </div>
          <span>{singleUser.district}</span>
          <span>Max. price: {singleUser.price},- €/hour</span>
          <span>{singleUser.plants} plants</span>
          <span>{singleUser.description}</span>
          <a
            className="bg-primary rounded-lg p-3"
            href="mailto:sophie.zulinski@gmx.at?&subject=Request from plant heroes &body=Hi, do you want to be my plant hero?"
          >
            Send request
          </a>
          <Dashboard singleUser={singleUser} user={user} />
        </div>
      </div>
    </main>
  );
}
