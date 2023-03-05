'use client';
import 'react-nice-dates/build/style.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { users } from '../../database/users';

export default function PlantSitters() {
  const [district, setDistrict] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [price, setPrice] = useState('');
  const [experience, setExperience] = useState('');
  const router = useRouter();
  const usersfiltered = users.filter((user) => user.district === district);
  // <PlantSitterDashboard district={user.district} />

  const usersfilteredstartdate = usersfiltered.filter(
    (user) => user.start_date === startDate,
  );

  const usersfilteredenddate = usersfilteredstartdate.filter(
    (user) => user.end_date === endDate,
  );

  const usersfilteredprice = usersfilteredenddate.filter(
    (user) => user.price >= price,
  );

  const usersfilteredexperience = usersfilteredprice.filter(
    (user) => user.experience <= experience,
  );

  function handleDistrict(x) {
    setDistrict(x.target.value);
  }

  function handlePrice(x) {
    setPrice(x.target.value);
  }

  function handleExperience(x) {
    setExperience(x.target.value);
  }
  function handleStartDate(x) {
    setStartDate(x.target.value);
  }

  function handleEndDate(x) {
    setEndDate(x.target.value);
  }
  return (
    <div className="sm:flex flex-row justify-evenly m ">
      <div className="flex flex-col max-h-fit p-5 gap-4 my-20 bg-white rounded-md mt-5 justify-center items-center">
        <h2>Find plantsitters near you </h2>
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
              I look for a plantsitter from/to these dates:
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
        <input
          type="range"
          min="0"
          max="40"
          className="range range-xs range-primary"
          onClick={handlePrice}
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>5,-</span>
          <span>10,-</span>
          <span>20,-</span>
          <span>30,-</span>
          <span>40,-</span>
        </div>
        <div>Experience: </div>
        <input
          type="range"
          min="0"
          max="10"
          className="range range-xs range-primary"
          onChange={handleExperience}
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>0-5 years</span>
          <span>6-10 years</span>
          <span> 10 + years </span>
        </div>
        <button>Find</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {usersfilteredexperience.map((user) => {
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
                  <h4>{user.start_date} </h4> {' - '}
                  <h4>{user.end_date} </h4>
                </div>
                <h4>Price: {user.price},- €/hour </h4>
                <h4>Experience {user.experience} years</h4>
                <br />
                <button>Check out profile</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
