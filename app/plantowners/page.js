import { getUsers } from '../../database/users';
import PlantOwnerDashboard from './DashboardPlantowners';

export default async function PlantSitters() {
  const users = await getUsers();
  console.log(users);
  return <PlantOwnerDashboard users={users} />;
}
