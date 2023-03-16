'use client';
import dateFormat, { masks } from 'dateformat';
import Image from 'next/image';
import Link from 'next/link';

export default function Matches(props) {
  const usersdistrict = props.users.filter(
    (user) => user.district === props.user.district,
  );

  const usersrole = usersdistrict.filter(
    (user) => user.role !== props.user.role,
  );

  return (
    <>
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
        src={props.user.img}
        alt={props.user.username}
      />
      <h1> Check out your perfect match, {props.user.username}!</h1>
      <div>We have selected some users, that might be perfect for you </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {usersrole.map((user) => {
          return (
            <div
              className="flex flex-row p-5 gap-4 h-max bg-neutral rounded-md mt-5 justify-center items-center "
              key={`user-${user.id}`}
            >
              <Image
                className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
                src={user.img}
                alt={user.username}
                width="300"
                height="300"
              />

              <Link
                href={`/${
                  props.user.role === 'Plantsitter'
                    ? 'plantowners'
                    : 'plantsitters'
                }/${user.id}`}
              >
                <h2>{user.username}</h2>
                <h4>{user.district}</h4>
                <div className="flex flex-row">
                  {user.startDate !== '1111-11-11' ? (
                    <h4>
                      {dateFormat(user.startDate, 'mmmm dS')} {'-'}{' '}
                    </h4>
                  ) : (
                    ''
                  )}{' '}
                  {user.endDate !== '1111-11-11' ? (
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
    </>
  );
}
