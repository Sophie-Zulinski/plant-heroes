'use client';
import dateFormat from 'dateformat';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Vacations(props) {
  const [users, setUsers] = useState(props);

  const [error, setError] = useState();
  const router = useRouter();

  const [startDate, setStartDate] = useState('no date');
  const [endDate, setEndDate] = useState('no date');

  function handleStartDate(x) {
    setStartDate(x.target.value);
  }

  function handleEndDate(x) {
    setEndDate(x.target.value);
  }

  return (
    <>
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
        src={props.user.img}
        alt={props.user.username}
      />
      <h1> Let us know your next vacation, {props.user.username}!</h1>
      <p>Role: {props.user.role} </p>
      <div className="flex flex-row">
        {props.user.startDate !== '1111-11-11' ? (
          <h4>
            Your next vacation: {dateFormat(props.user.startDate, 'mmmm dS')}{' '}
            {'-'}{' '}
          </h4>
        ) : (
          ''
        )}{' '}
        {props.user.endDate !== '1111-11-11' ? (
          <h4>{dateFormat(props.user.endDate, 'mmmm dS yyyy')} </h4>
        ) : (
          ''
        )}
      </div>
      {console.log('userprops', props.user.startDate)}
      <span>
        {' '}
        <input type="date" id="start" name="start" onChange={handleStartDate} />
        <input type="date" id="end" name="end" onChange={handleEndDate} />
      </span>

      <button
        onClick={async () => {
          const response = await fetch(`/api/users/${props.user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: props.user.username,

              district: props.user.district,
              price: props.user.price,
              experience: props.user.experience,
              description: props.user.description,
              plants: props.user.plants.toString(),
              role: props.user.role,
              img: props.user.img,
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

          setUsers([data.user]);
        }}
      >
        Update Vacation
      </button>
    </>
  );
}
