import Image from 'next/image';
import Link from 'next/link';
import { users } from '../../database/users';
import DatePicker from '../components/DatePicker';
import PlantSitterDashboard from '../components/PlantSittersDashboard';

export default function PlantSitters() {
  const usersfiltered = users.filter((user) => user.district === '1010 Vienna');
  // <PlantSitterDashboard district={user.district} />
  return (
    <main className="min-h-screen m">
      <div className="sm:flex flex-row justify-evenly m ">
        <div className="flex flex-col max-h-fit p-5 gap-4 my-20 bg-white rounded-md mt-5 justify-center items-center">
          {' '}
          <PlantSitterDashboard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {usersfiltered.map((user) => {
            return (
              <div
                className="flex flex-col p-5 gap-4 h-max bg-white rounded-md mt-5 justify-center items-center "
                key={user.id}
              >
                <Image
                  className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
                  src={`/images/${user.name}-${user.id}.jpg`}
                  alt={user.name}
                  width="300"
                  height="300"
                />

                <Link
                  data-test-id="product-<product id>"
                  href={`/plantsitters/profile/${user.id}`}
                >
                  <h2>{user.name}</h2>
                  <h4>{user.district}</h4>
                  <div className="flex flex-row">
                    {' '}
                    <h4>{user.date_start}</h4> - <h4>{user.date_end}</h4>
                  </div>
                  <br />
                  <button>Check out profile</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
