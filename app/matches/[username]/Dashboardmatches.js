'use client';
import dateFormat, { masks } from 'dateformat';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Matches(props) {
  const [users, setUser] = useState(props);
  const [error, setError] = useState();
  const router = useRouter();

  const [startDate, setStartDate] = useState('no date');
  const [endDate, setEndDate] = useState('no date');

  const [result, setResult] = useState('');

  const usersplantowners = props.users.filter(
    (users) => props.users === props.user.role,
  );
  console.log('props.users.role)', props.users.role);
  console.log('props.users', props.users);
  console.log('usersplantwoeners', usersplantowners);
  return (
    <>
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
        src={`/images/${props.user.username}-${props.user.id}.jpg`}
        alt={props.user.username}
      />
      <h1> Here are your matches, {props.user.username}!</h1>
      <p>Role: {props.user.role} </p>

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
              startDate: props.startDate,
              endDate: props.endDate,
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
        Update Vacation
      </button>
    </>
  );
}
