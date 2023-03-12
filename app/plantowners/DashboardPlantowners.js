'use client';
import 'react-nice-dates/build/style.css';
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

  function handleDistrict(x) {
    setDistrict(x.target.value);
  }

  function handlePrice(x) {
    setPrice(x.target.value);
  }

  function handlePlants(x) {
    setPlants(x.target.value);
  }
  function handleStartDate(x) {
    setStartDate(x.target.value);
  }

  function handleEndDate(x) {
    setEndDate(x.target.value);
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
            className="bg-primary"
            type="date"
            id="start"
            name="start"
            onChange={handleStartDate}
          />
          <input type="date" id="end" name="end" onChange={handleEndDate} />
        </div>
        <div>Price: </div>
        <input
          type="range"
          min="0"
          max="31"
          className="range range-xs range-primary"
          onClick={handlePrice}
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>up to 10 €</span>
          <span>10-19 € </span>
          <span>20 -29 €</span>

          <span> over 30 €</span>
        </div>
        <div>Number of Plants: </div>
        <input
          type="range"
          min="0"
          max="10"
          className="range range-xs range-primary"
          onChange={handlePlants}
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>0-5 plants</span>
          <span>5-15 plants</span>
          <span> 15 + plants </span>
        </div>
        <button
          onClick={() => {
            handleFilter('yes');
          }}
        >
          Filter
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
      {filter ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {usersfilteredplants.map((user) => {
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
                  <h4>Price: {user.price},- €/hour </h4>
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
                  <h4>Price: {user.price},- €/hour </h4>
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
