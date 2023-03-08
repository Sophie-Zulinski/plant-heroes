'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProfilePlantsitter(props) {
  const [users, setUsers] = useState(props.users);
  const [district, setDistrict] = useState('');

  const [price, setPrice] = useState('');
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState();
  const router = useRouter();

  function handleDistrict(x) {
    setDistrict(x.target.value);
  }

  function handlePrice(x) {
    setPrice(x.target.value);
  }

  function handleExperience(x) {
    setExperience(x.target.value);
  }

  function handleDescription(x) {
    setDescription(x.target.value);
  }
  return (
    <>
      <span>Please upload a picture of yourself</span>
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
        src="../images/sophie.jpg"
        alt="profile pic"
      />
      <h1>Please insert your data</h1>
      <label htmlFor="district">Choose a disctrict:</label>
      <select name="discrict" onClick={handleDistrict}>
        <option value="1010 Vienna">1010 Vienna</option>
        <option value="1020 Vienna">1020 Vienna</option>
        <option value="1030 Vienna">1030 Vienna</option>
        <option value="1040 Vienna">1040 Vienna</option>
      </select>

      <div>Price: </div>
      <input
        type="range"
        min="0"
        max="30"
        className="range range-xs range-primary"
        onClick={handlePrice}
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>up to 10 €</span>
        <span>10-19 € </span>
        <span>20 -29 €</span>

        <span> over 30 €</span>
      </div>
      <div>Minimum Experience: </div>
      <input
        type="range"
        min="1"
        max="10"
        className="range range-xs range-primary"
        onChange={handleExperience}
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>0-4 years</span>
        <span>5-10 years</span>
        <span> 10 + years </span>
      </div>

      <input
        placeholder="Write something about yourself"
        onChange={handleDescription}
      />

      <button
        onClick={async () => {
          const response = await fetch(`/api/users/${props.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              district: district,
              price: price,
            }),
          });
          console.log('response', response);
          const data = await response.json();
          console.log('data', data);
          if (data.error) {
            setError(data.error);
            return;
          }
          // you should use this
          // router.refresh();

          setUsers([...users, data.user]);
        }}
      >
        Update Profile
      </button>
    </>
  );
}
