'use client';
import dateFormat, { masks } from 'dateformat';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProfilePlantsitter(props) {
  const [users, setUser] = useState(props);

  const [district, setDistrict] = useState(props.user.district);

  const [price, setPrice] = useState('1');
  const [plants, setPlants] = useState('1');
  const [experience, setExperience] = useState('1');
  const [startDate, setStartDate] = useState(props.user.startDate);
  const [endDate, setEndDate] = useState(props.user.endDate);
  const [description, setDescription] = useState(props.user.description);
  const [error, setError] = useState();
  const router = useRouter();
  const [role, setRole] = useState(props.user.role);
  function handleRole(x) {
    setRole(x.target.value);
  }

  function handleDistrict(x) {
    setDistrict(x.target.value);
  }

  function handlePrice(x) {
    setPrice(parseInt(x.target.value));
  }

  function handleExperience(x) {
    setExperience(x.target.value);
  }

  function handleDescription(x) {
    setDescription(x.target.value);
  }
  function handleStartDate(x) {
    setStartDate(x.target.value);
  }

  function handleEndDate(x) {
    setEndDate(x.target.value);
  }

  function handlePlants(x) {
    setPlants(x.target.value);
  }
  const [result, setResult] = useState('');
  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = event.currentTarget['fileInput'].files[0];

    const formData = new FormData();
    formData.append('file', file);

    fetch('https://echo-api.3scale.net/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <>
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
          src={`/images/${props.user.username}-${props.user.id}.jpg`}
          alt={props.user.username}
        />
        <h1> Welcome to Plant Heroes, {props.user.username}!</h1>
        <h2>Your current data: </h2>
        <p>Role: {props.user.role} </p>
        <p>District: {props.user.district} </p>
        {role === 'Plantsitter' ? (
          <>
            <p>Price: {props.user.price},- € </p>
            <p>Experience: {props.user.experience} years </p>
          </>
        ) : (
          ''
        )}
        {role === 'Plantowner' ? (
          <>
            <p>Plants: {props.user.plants} </p>
            <h4>
              Your next vacation: {'     '}
              {dateFormat(props.user.startDate, 'mmmm dS')}
              {' -'}
              {dateFormat(props.user.endDate, 'mmmm dS yyyy')}{' '}
            </h4>
            {console.log('userprops', props.user.startDate)}
          </>
        ) : (
          ''
        )}
        <p>Description: {props.user.description} </p>
        <div className="divider" />
        <h2>Update your data:</h2>
        <h2>Upload Image:</h2>
        <form onSubmit={handleImageUpload}>
          <input id="fileInput" type="file" />
          <input type="submit" />
        </form>
        <br />
        <br />
        Result:
        <br />
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </>
      <div className="flex flex-row space-x-4">
        <label>
          <input
            type="radio"
            name="radio-2"
            value="Plantsitter"
            className="radio radio-primary m-1.5 "
            onClick={handleRole}
          />{' '}
          I have a watering can and want to become a plant hero
        </label>
        {console.log('role', role)}
      </div>
      <div className="flex flex-row space-x-4">
        <label>
          <input
            type="radio"
            name="radio-2"
            value="Plantowner"
            className="radio radio-primary  m-1.5 "
            onClick={handleRole}
          />
          I have a plant and need a plant hero
        </label>
      </div>
      <>
        <p>
          District: {props.user.district}{' '}
          <select name="discrict" onClick={handleDistrict}>
            <option value="1010 Vienna">1010 Vienna</option>
            <option value="1020 Vienna">1020 Vienna</option>
            <option value="1030 Vienna">1030 Vienna</option>
            <option value="1040 Vienna">1040 Vienna</option>
          </select>
        </p>
        {role === 'Plantsitter' ? (
          <>
            <p>
              Price:{' '}
              <input
                type="number"
                min="1"
                max="30"
                placeholder={props.user.price}
                onChange={handlePrice}
              />{' '}
              ,- €
            </p>
            <p>
              Experience:{' '}
              <input
                type="number"
                placeholder={props.user.experience}
                min="1"
                max="10"
                onChange={handleExperience}
              />{' '}
              years
            </p>
          </>
        ) : (
          ''
        )}
        {role === 'Plantowner' ? (
          <>
            <p>
              Plants:{' '}
              <input
                type="number"
                placeholder={props.user.plants}
                min="1"
                max="30"
                onChange={handlePlants}
              />{' '}
            </p>
            <input
              className="bg-primary"
              type="date"
              id="start"
              name="start"
              onChange={handleStartDate}
            />
            <input type="date" id="end" name="end" onChange={handleEndDate} />
          </>
        ) : (
          ''
        )}

        <p>
          Description:{' '}
          <input
            placeholder={props.user.description}
            onChange={handleDescription}
          />
        </p>

        <button
          onClick={async () => {
            const response = await fetch(`/api/users/${props.user.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: props.user.username,
                district: district,
                price: price,
                experience: experience,
                description: description,
                plants: plants,
                role: role,
                startDate: startDate,
                endDate: endDate,
              }),
            });
            console.log('PROPS', props.user.id);
            console.log('response', response);
            const data = await response.json();
            console.log('data', data);
            if (data.error) {
              setError(data.error);
              return;
            }

            router.refresh();

            setUser([data.user]);
          }}
        >
          Update Profile
        </button>
      </>
    </>
  );
}
