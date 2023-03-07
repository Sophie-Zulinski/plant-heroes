import { getUsers } from '../../database/users';
import Dashboard from './Dashboard';

export default async function AnimalAdminPage() {
  const users = await getUsers();

  return <Dashboard users={users} />;
}
