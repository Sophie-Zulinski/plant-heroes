'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const dynamic = 'force-dynamic';
export default function ProfilePlantsitter(props) {
  const [role, setRole] = useState(props.user.role);
  const router = useRouter();
  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  return (
    <>
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
        src={props.user.img ? props.user.img : '/images/pic07.jpg'}
        alt={props.user.username}
      />

      <h1> Welcome to Plant Heroes, {props.user.username}!</h1>
      <h2>Your current profile infos: </h2>
      {role === null ? 'No infos yet' : ''}
      {role === 'Plantsitter' ? (
        <>
          <p>Role: {props.user.role} </p>
          <p>District: {props.user.district} </p>
          <p>Experience: {props.user.experience} years </p>
          <p>Price: {props.user.price},- € </p>
          <p>Your description: {props.user.description} </p>
        </>
      ) : (
        ''
      )}

      {role === 'Plantowner' ? (
        <>
          <p>Role: {props.user.role} </p>
          <p>District: {props.user.district} </p>
          <p>Plants: {props.user.plants} plants </p>
          <p>Price: {props.user.price},- € </p>
          <p>Your description: {props.user.description} </p>
        </>
      ) : (
        ''
      )}

      <a
        className="bg-primary rounded-lg p-3"
        href={`/profile/${props.user.username}/update`}
      >
        Change profile infos
      </a>
    </>
  );
}
