'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { users } from '../../database/users';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';
import DatePicker from '../components/DatePicker';

export default function PlantSitterDashboard() {
  const [district, setDistrict] = useState('1030 Vienna');
  const router = useRouter();

  function handlefirstChange(x) {
    setDistrict(x.target.value);
  }
  return (
    <>
      <h2>Find plantsitters near you </h2>
      <hr />
      <hr />
      <label htmlFor="district">Choose a disctrict:</label>
      <select id={district} name="discrict" onChange={handlefirstChange}>
        <option value="1010">1010 Vienna</option>
        <option value="1020">1020 Vienna</option>
        <option value="1030">1030 Vienna</option>
        <option value="1040">1040 Vienna</option>
      </select>
      <input
        value={district}
        onChange={handlefirstChange}
        id={district}
        placeholder="1030 Vienna"
        required
      />
      <div>I look for a plantsitter from/to these dates: </div>
      <DatePicker />
      <div>Price: </div>
      <input
        type="range"
        min="0"
        max="40"
        className="range range-xs range-primary"
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
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>0 -5 years</span>
        <span>6 -10 years</span>
        <span> 10 + years </span>
      </div>
      <button
        data-test-id="product-add-to-cart"
        onClick={() => {
          // get the cookie
          const productsInCookies = getParsedCookie('District');
          console.log('cart', productsInCookies);
          // if there is no cookie we initialize the value with a 1
          if (!productsInCookies) {
            // create the cookie with a new object for the fruit
            // add the inserted amount when there is none yet
            setStringifiedCookie('District', [
              { id: users.id, amount: district },
            ]);
            router.refresh();
            // if there is no cookie function stop here
            return;
          }

          const foundProduct = productsInCookies.find((productInCookie) => {
            return productInCookie.id === users.id;
          });

          if (district < 0) {
            return Error;
          }

          // my fruit is not inside of the cookie
          else {
            // Add a the fruit to the array of fruits in cookies, add amountInsert
            productsInCookies.push({
              id: users.id,
              district: district,
            });
            router.refresh();
          }
          console.log('District', district);
          // Update the cookie after transformation
          setStringifiedCookie('District', productsInCookies);
          router.refresh();
        }}
      >
        Find
      </button>
    </>
  );
}
