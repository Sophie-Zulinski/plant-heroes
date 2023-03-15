import { notFound } from 'next/navigation';
import { getUserByUsername, getUsers } from '../../../database/users';
import Dashboardmatches from './Dashboardmatches';
import Length from './Length';

export default async function UserMatches({ params }) {
  const user = await getUserByUsername(params.username);
  const users = await getUsers();
  if (!user) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col p-20 gap-4 bg-white rounded-md mt-10 justify-center items-center">
          <Dashboardmatches user={user} users={users} />
          <Length user={user} users={users} />
        </div>
      </div>
    </main>
  );
}
