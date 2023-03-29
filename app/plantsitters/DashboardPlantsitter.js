'use client';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function PlantSitterDashboard(props) {
  const [district, setDistrict] = useState('');

  const [price, setPrice] = useState('');
  const [experience, setExperience] = useState('');

  const router = useRouter();

  const usersplantsitters = props.users.filter(
    (user) => user.role === 'Plantsitter',
  );

  const usersfiltered = usersplantsitters.filter(
    (user) => user.district === district,
  );

  const usersfilteredprice = usersfiltered.filter(
    (user) => parseInt(user.price) <= parseInt(price),
  );

  const usersfilteredexperience = usersfilteredprice.filter(
    (user) => parseInt(user.experience) >= parseInt(experience),
  );
  const [filter, setFilter] = useState('');
  function handleFilter() {
    setFilter('yes');
  }
  function resetlist(ev) {
    ev.preventDefault();
    setFilter('');
  }

  function handleDistrict(x) {
    setDistrict(x.target.value);
  }

  function handlePrice(x) {
    setPrice(x.target.value);
  }

  function handleExperience(x) {
    setExperience(x.target.value);
  }

  return (
    <main className="min-h-screen">
      <div className="sm:flex flex-row justify-evenly m ">
        <div className="flex flex-col h-max p-12 gap-4 my-20 bg-white rounded-md mt-5 justify-center items-center">
          <h2>Find plant heroes near you </h2>

          <hr />
          <hr />
          <label htmlFor="district">Choose a disctrict:</label>
          <select name="discrict" onChange={handleDistrict}>
            <option value="1010 Vienna">1010 Vienna</option>
            <option value="1020 Vienna">1020 Vienna</option>
            <option value="1030 Vienna">1030 Vienna</option>
            <option value="1040 Vienna">1040 Vienna</option>
          </select>

          <div>Maximum Price: </div>

          <Box width={300}>
            <Slider
              min={0}
              max={30}
              defaultValue={30}
              aria-label="Default"
              valueLabelDisplay="auto"
              marks
              onChange={handlePrice}
              sx={{
                width: 300,
                color: '#b5ba9e',
              }}
            />
          </Box>
          <div className="w-full flex justify-between text-xs px-2">
            <span> 0 €</span>

            <span> 30 €</span>
          </div>
          <div>Minimum Experience: </div>

          <Box width={300}>
            <Slider
              min={0}
              max={10}
              defaultValue={0}
              aria-label="Default"
              valueLabelDisplay="auto"
              marks
              onChange={handleExperience}
              sx={{
                width: 300,
                color: '#b5ba9e',
              }}
            />
          </Box>

          <div className="w-full flex justify-between text-xs px-2">
            <span>0 years</span>

            <span> 10 years </span>
          </div>
          <span>
            <button className="m-3" onClick={resetlist}>
              Reset{' '}
            </button>
            <button
              onClick={() => {
                handleFilter('yes');
              }}
            >
              Filter
            </button>
          </span>
        </div>

        {filter ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {usersfilteredexperience.map((user) => {
              return (
                <div
                  className="flex flex-row p-5 gap-4 h-max bg-white rounded-md mt-5 justify-center items-center "
                  key={`user-${user.id}`}
                >
                  <Image
                    className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
                    src={user.img ? user.img : '/images/pic07.jpg'}
                    alt={user.username}
                    width="300"
                    height="300"
                  />

                  <Link href={`/plantsitters/${user.id}`}>
                    <h2>{user.username}</h2>
                    <h4>{user.district}</h4>

                    <h4>Price: {user.price},- €/hour </h4>
                    <h4>Experience {user.experience} years</h4>
                    <br />
                    <button>Check out profile</button>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {usersplantsitters.map((user) => {
              return (
                <div
                  className="flex flex-row p-5 gap-4 h-max bg-white rounded-md mt-5 justify-center items-center "
                  key={`user-${user.id}`}
                >
                  <Image
                    className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
                    src={user.img ? user.img : '/images/pic07.jpg'}
                    alt={user.username}
                    width="300"
                    height="300"
                  />

                  <Link href={`/plantsitters/${user.id}`}>
                    <h2>{user.username}</h2>
                    <h4>{user.district}</h4>

                    <h4>Price: {user.price},- €/hour </h4>
                    <h4>Experience: {user.experience} years</h4>
                    <br />
                    <button>Check out profile</button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
