import { notFound } from 'next/navigation';
import { getUserByID, getUsers } from '../../../database/users';
import Dashboard from './Dashboard';

export default async function UserProfile({ params }) {
  const user = await getUserByID(params.id);

  if (!user) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col p-20 gap-4 bg-white rounded-md mt-10 justify-center items-center">
          <h1>{user.username}</h1>
          <p>id: {user.id}</p>
          <p>district: {user.district}</p>
          <p>price: {user.price},- €</p>
          <p>experience: {user.experience} years</p>
          <Dashboard user={user} />;
        </div>
      </div>
    </main>
  );
}
