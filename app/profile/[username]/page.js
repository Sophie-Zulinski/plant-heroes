import { getUserByUsername, getUsers } from '../../../database/users';
import { ProfileDashboard } from '../ProfileDashboard';

export default async function UserProfile({ params }) {
  const user = await getUserByUsername(params.username);

  console.log('user', user);
  return (
    <>
      <h1>{user.username}</h1>
      <p>id: {user.id}</p>
      <p>district: {user.district}</p>
      <p>price: {user.price},- €</p>
      <p>experience: {user.experience} years of experience</p>
      <div>Minimum Experience: </div>
    </>
  );
}
