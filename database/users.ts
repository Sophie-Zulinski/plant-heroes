import fs from 'node:fs';
import { cache } from 'react';
import { sql } from './connect';

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
      img: string | null;
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
      end_date,
      img
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
    img: string | null,
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
      end_date=${end_date},
      img=${img}

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
    { id: number; username: string; img: string; csrfSecret: string }[]
  >`
    SELECT
      users.id,
      users.username,
      users.img,
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
