import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../database/sessions';
import { getUsers } from '../../database/users';
import { createTokenFromSecret } from '../../utils/csrf';
import Dashboard from './Dashboard';

export default async function AdminPage() {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // for example you may also check if session user is an admin role

  if (!session) {
    redirect('/login?returnTo=/admin');
  }

  const csrfToken = createTokenFromSecret(session.csrfSecret);
  const users = await getUsers();
  return <Dashboard users={users} />;
}
