'use client';
import 'react-nice-dates/build/style.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import dateFormat, { masks } from 'dateformat';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function PlantOwnerDashboard(props) {
  const [district, setDistrict] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [price, setPrice] = useState('');
  const [plants, setPlants] = useState('');
  const router = useRouter();

  const usersplantowners = props.users.filter(
    (user) => user.role === 'Plantowner',
  );

  const usersfiltereddistrict = usersplantowners.filter(
    (user) => user.district === district,
  );
  // <PlantSitterDashboard district={user.district} />

  const usersfilteredstartdate = usersfiltereddistrict.filter(
    (user) => user.startDate <= startDate,
  );

  const usersfilteredenddate = usersfilteredstartdate.filter(
    (user) => user.endDate >= endDate,
  );

  const usersfilteredprice = usersfilteredenddate.filter(
    (user) => parseInt(user.price) <= parseInt(price),
  );

  const usersfilteredplants = usersfilteredprice.filter(
    (user) => parseInt(user.plants) >= parseInt(plants),
  );
  const [filter, setFilter] = useState('');
  function handleFilter(x) {
    setFilter('yes');
  }
  function resetlist(ev) {
    ev.preventDefault();
    setFilter('');
  }

  function handleDistrict(x) {
    setDistrict(x.target.value);
  }

  function handleStartDate(x) {
    setStartDate(x.target.value);
  }

  function handleEndDate(x) {
    setEndDate(x.target.value);
  }
  function handlePrice(x) {
    setPrice(x.target.value);
  }

  function handlePlants(x) {
    setPlants(x.target.value);
  }

  return (
    <div className="sm:flex flex-row justify-evenly m ">
      <div className="flex flex-col h-max p-5 gap-4 my-20 bg-white rounded-md mt-5 justify-center items-center">
        <h2>Find plants near you </h2>

        <hr />
        <hr />
        <label htmlFor="district">Choose a disctrict:</label>
        <select name="discrict" onClick={handleDistrict}>
          <option value="1010 Vienna">1010 Vienna</option>
          <option value="1020 Vienna">1020 Vienna</option>
          <option value="1030 Vienna">1030 Vienna</option>
          <option value="1040 Vienna">1040 Vienna</option>
        </select>
        <div className="border-solid  border-secondary">
          <div>
            {' '}
            <label htmlFor="start">
              I want to be a plant hero from/to these dates:
            </label>
          </div>

          <input
            type="date"
            id="start"
            name="start"
            onChange={handleStartDate}
          />
          <input type="date" id="end" name="end" onChange={handleEndDate} />
        </div>
        <div>Price: </div>
        <Box width={300}>
          <Slider
            min={0}
            max={30}
            defaultValue={15}
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
          <span> 0 ???</span>

          <span> 30 ???</span>
        </div>
        <div>Number of Plants: </div>

        <Box width={300}>
          <Slider
            min={0}
            max={20}
            defaultValue={5}
            aria-label="Default"
            valueLabelDisplay="auto"
            marks
            onChange={handlePlants}
            sx={{
              width: 300,
              color: '#b5ba9e',
            }}
          />
        </Box>

        <div className="w-full flex justify-between text-xs px-2">
          <span>0 plants</span>

          <span> 20 plants</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
      {filter ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {usersfilteredprice.map((user) => {
            return (
              <div
                className="flex flex-row p-5 gap-4 h-max bg-white rounded-md mt-5 justify-center items-center "
                key={`user-${user.id}`}
              >
                <Image
                  className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
                  src={`/images/${user.username}-${user.id}.jpg`}
                  alt={user.username}
                  width="300"
                  height="300"
                />

                <Link href={`/plantowners/${user.id}`}>
                  <h2>{user.username}</h2>
                  <h4>{user.district}</h4>
                  <div className="flex flex-row">
                    <h4>{user.startDate} </h4> {' - '}
                    <h4>{user.endDate} </h4>
                  </div>
                  <h4>Price: {user.price},- ???/hour </h4>
                  <h4>{user.plants} plants</h4>
                  <br />
                  <button>Check out profile</button>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {usersplantowners.map((user) => {
            return (
              <div
                className="flex flex-row p-5 gap-4 h-max bg-white rounded-md mt-5 justify-center items-center "
                key={`user-${user.id}`}
              >
                <Image
                  className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
                  src={`/images/${user.username}-${user.id}.jpg`}
                  alt={user.username}
                  width="300"
                  height="300"
                />

                <Link href={`/plantowners/${user.id}`}>
                  <h2>{user.username}</h2>
                  <h4>{user.district}</h4>
                  <div className="flex flex-row">
                    {user.startDate ? (
                      <h4>
                        {dateFormat(user.startDate, 'mmmm dS')} {'-'}{' '}
                      </h4>
                    ) : (
                      ''
                    )}{' '}
                    {user.endDate ? (
                      <h4>{dateFormat(user.endDate, 'mmmm dS yyyy')} </h4>
                    ) : (
                      ''
                    )}
                  </div>
                  <h4>Price: {user.price},- ???/hour </h4>
                  <h4>{user.plants} plants</h4>
                  <br />
                  <button>Check out profile</button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
