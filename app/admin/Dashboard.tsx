'use client';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '../../database/users';

type Props = {
  users: User[];
};

export default function Dashboard(props: Props) {
  // const router = useRouter();
  const [users, setUsers] = useState<User[]>(props.users);
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [username, setUsername] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [editFirstName, setEditFirstName] = useState<string>('');
  const [editType, setEditType] = useState<string>('');
  const [editAccessory, setEditAccessory] = useState<string>('');
  const [error, setError] = useState<string>();

  return (
    <div>
      <label>
        Name:
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        Distrcit
        <input
          value={district}
          onChange={(event) => setDistrict(event.currentTarget.value)}
        />
      </label>
      <label>
        Price:
        <input
          value={price}
          onChange={(event) => setPrice(event.currentTarget.value)}
        />
      </label>
      <button
        onClick={async () => {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, district, price }),
          });

          const data = await response.json();

          if (data.error) {
            setError(data.error);
            return;
          }
          // you should use this
          // router.refresh();

          setUsers([...users, data.User]);
        }}
      >
        Create User
      </button>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {users.map((user) => (
          <div key={user.id}>
            {idOnEditMode !== user.id ? (
              user.username
            ) : (
              <input
                value={editFirstName}
                onChange={(event) =>
                  setEditFirstName(event.currentTarget.value)
                }
              />
            )}{' '}
            {idOnEditMode !== user.id ? (
              user.district
            ) : (
              <input
                value={editType}
                onChange={(event) => setEditType(event.currentTarget.value)}
              />
            )}{' '}
            {idOnEditMode !== user.id ? (
              user.price
            ) : (
              <input
                value={editAccessory}
                onChange={(event) =>
                  setEditAccessory(event.currentTarget.value)
                }
              />
            )}{' '}
            <button
              onClick={async () => {
                const response = await fetch(`/api/users/${user.id}`, {
                  method: 'DELETE',
                });

                const data = await response.json();

                if (data.error) {
                  setError(data.error);
                  return;
                }

                // router.refresh();

                setUsers(
                  users.filter(
                    (userOnState) => userOnState.id !== data.user.id,
                  ),
                );
              }}
            >
              X
            </button>
            {idOnEditMode !== user.id ? (
              <button
                onClick={() => {
                  setIdOnEditMode(user.id);
                  setEditFirstName(user.username);
                  setEditType(user.district);
                  setEditAccessory(user.price || '');
                }}
              >
                edit
              </button>
            ) : (
              <button
                onClick={async () => {
                  const response = await fetch(`/api/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      username: editFirstName,
                      district: editType,
                      price: editAccessory,
                    }),
                  });

                  const data = await response.json();
                  console.log(data);
                  if (data.error) {
                    setError(data.error);
                    return;
                  }
                  console.log(data.error.issues);
                  setIdOnEditMode(undefined);

                  // router.refresh();
                  setUsers(
                    users.map((userOnState) => {
                      return userOnState.id !== data.user.id
                        ? userOnState
                        : data.user;
                    }),
                  );
                }}
              >
                save
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
