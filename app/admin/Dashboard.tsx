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
  const [username, setUserName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [accessory, setAccessory] = useState<string>('');
  const [editFirstName, setEditFirstName] = useState<string>('');
  const [editType, setEditType] = useState<string>('');
  const [editAccessory, setEditAccessory] = useState<string>('');
  const [error, setError] = useState<string>();

  return (
    <div>
      <label>
        First Name:
        <input
          value={username}
          onChange={(event) => setUserName(event.currentTarget.value)}
        />
      </label>
      <label>
        Type:
        <input
          value={type}
          onChange={(event) => setType(event.currentTarget.value)}
        />
      </label>
      <label>
        Accessory:
        <input
          value={accessory}
          onChange={(event) => setAccessory(event.currentTarget.value)}
        />
      </label>
      <button
        onClick={async () => {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
          });

          const data = await response.json();

          if (data.error) {
            setError(data.error);
            return;
          }
          // you should use this
          // router.refresh();

          setUsers([...users, data.user]);
        }}
      >
        Create Animal
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
              user.type
            ) : (
              <input
                value={editType}
                onChange={(event) => setEditType(event.currentTarget.value)}
              />
            )}{' '}
            {idOnEditMode !== user.id ? (
              user.accessory
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
                      UserName: editFirstName,
                    }),
                  });

                  const data = await response.json();

                  if (data.error) {
                    setError(data.error);
                    return;
                  }
                  setIdOnEditMode(undefined);

                  // router.refresh();
                  setUsers(
                    users.map((animalOnState) => {
                      return animalOnState.id !== data.user.id
                        ? animalOnState
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
