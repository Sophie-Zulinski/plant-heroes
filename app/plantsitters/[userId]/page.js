import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken, getUsers, User } from '../../../database/users';
import { createTokenFromSecret } from '../../../utils/csrf';
import Dashboard from './Dashboardfavourites';

export default async function PlantSitter(props) {
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
  const singleUser = users.find((user2) => {
    return user2.id === parseInt(props.params.userId);
  });
  console.log('singeUser', singleUser.img);
  console.log('singleUser', singleUser);
  console.log('csrfToken', csrfToken);
  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col p-20 gap-4 bg-white rounded-md mt-10 justify-center items-center">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
            src={singleUser.img ? singleUser.img : '/images/pic07.jpg'}
            alt={singleUser.username}
          />

          <h1>{singleUser.username}</h1>

          <span>{singleUser.district}</span>

          <span>Price: {singleUser.price},- €/hour </span>
          <span>{singleUser.experience} years of experience</span>
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
