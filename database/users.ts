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
  price: string;
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
    const [user] = await sql<User[]>`
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
      price: string;
      experience: string;
    }[]
  >`
    SELECT
      id,
      username,
      district,
      price,
      experience
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
  async (id: number, username: string, district: string, price: string) => {
    const [user] = await sql<User[]>`
      UPDATE
        users
      SET
      username = ${username},
      district = ${district},
      price = ${price}


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
