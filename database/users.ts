import fs from 'node:fs';
import { cache } from 'react';
import { sql } from './connect';

{
  /*export const users = [
  {
    id: 1,
    name: 'Sophie',
    start_date: '2023-03-08',
    end_date: '2023-03-10',
    district: '1010 Vienna',
    price: '27',
    experience: '10',
    description: 'Hi I am Sophie and I love plants',
  },
  {
    id: 2,
    name: 'Elisabeth',
    start_date: '2023-03-08',
    end_date: '2023-03-10',
    district: '1010 Vienna',
    price: '20',
    experience: '7',
  },
  {
    id: 3,
    name: 'Susanne',
    start_date: '2023-03-08',
    end_date: '2023-03-10',
    district: '1010 Vienna',
    price: '30',
    experience: '5',
  },
  {
    id: 4,
    name: 'Julia',
    startDate: '09.03.2024',
    endDate: '10.03.2023',
    district: '1040 Vienna',
    price: '0',
    experience: '10',
  },
];*/
}

export type User = {
  id: number;
  username: string;
  district: string;

  description: string;
  role: string;
  plants: string | null;
  start_date: string | null;
  end_date: string | null;
  img: string | null;
};
type UserWithPasswordHash = User & {
  passwordHash: string;
};

// get all animals
export const getUsers = cache(async () => {
  const users = await sql<User[]>`
    SELECT * FROM users
  `;

  return users;
});

// get a single animal
export const getUserByID = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

export const getUserByUsernameWithPasswordHash = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<
    {
      id: number;
      username: string;
      district: string;
      price: number;
      experience: string;
      description: string;
      role: string;
      plants: string | null;
      start_date: string | null;
      end_date: string | null;
    }[]
  >`
    SELECT
      id,
      username,
      district,
      price,
      experience,
      description,
      role,
      plants,
      start_date,
      end_date
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
});

export const createUser = cache(
  async (username: string, passwordHash: string) => {
    const [user] = await sql<{ id: number; username: string }[]>`
      INSERT INTO users
        (username, password_hash)
      VALUES
        (${username}, ${passwordHash})
      RETURNING
        id,
        username
    `;
    return user;
  },
);

export const updateUserById = cache(
  async (
    id: number,
    username: string,
    district: string,
    price: number,
    experience: string,
    description: string,
    role: string,
    plants: string | null,
    start_date: string | null,
    end_date: string | null,
  ) => {
    const [user] = await sql<User[]>`
      UPDATE
        users
      SET
      username = ${username},
      district = ${district},
      price = ${price},
      experience = ${experience},
      description = ${description},
      role= ${role},
      plants= ${plants},
      start_date=${start_date},
      end_date=${end_date}

      WHERE
        id = ${id}
      RETURNING *
    `;
    return user;
  },
);

export const deleteUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING *
  `;
  return user;
});

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<
    { id: number; username: string; csrfSecret: string }[]
  >`
    SELECT
      users.id,
      users.username,
      sessions.csrf_secret
    FROM
      users
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return user;
});
