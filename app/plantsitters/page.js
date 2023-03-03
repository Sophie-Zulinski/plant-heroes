import Image from 'next/image';
import Link from 'next/link';
import { users } from '../../database/users';
import DatePicker from '../components/DatePicker';
import PlantSitterDashboard from '../components/PlantSittersDashboard';

export default function PlantSitters() {
  return (
    <main className="min-h-screen m">
      <div className="sm:flex flex-row justify-evenly m ">
        <div className="flex flex-col max-h-fit p-5 gap-4 my-20 bg-white rounded-md mt-5 justify-center items-center">
          {' '}
          <PlantSitterDashboard />
        </div>
      </div>
    </main>
  );
}
