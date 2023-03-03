import Image from 'next/image';
import Link from 'next/link';
import { users } from '../../database/users';
import DatePicker from '../components/DatePicker';
import PlantSitterDashboard from '../components/PlantSittersDashboard';

export default function PlantSitters() {
  return (
    <main>
      {' '}
      <PlantSitterDashboard />
    </main>
  );
}
