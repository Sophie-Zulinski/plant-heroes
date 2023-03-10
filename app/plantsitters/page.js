import { getUsers } from '../../database/users';
import PlantSitterDashboard from './DashboardPlantsitter';

export default async function PlantSitters() {
  const users = await getUsers();
  console.log(users);
  return <PlantSitterDashboard users={users} />;
}
