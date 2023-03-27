import { cache } from 'react';
import { sql } from './connect';

export type Favourites = {
  id: number;
  user_giver_id: number;
  user_receiver_id: number;
};

export const getFavourites = cache(async () => {
  const favourites = await sql<Favourites[]>`
    SELECT * FROM favourites
  `;

  return favourites;
});

export const getFavouriteID = cache(async (user_giver_id: number) => {
  const [favourite] = await sql<Favourites[]>`
    SELECT
      *
    FROM
     favourites
    WHERE
    user_giver_id = ${user_giver_id}
  `;
  return favourite;
});

export const createFavourite = cache(
  async (user_giver_id: number, user_receiver_id: number) => {
    const [favourite] = await sql<Favourites[]>`
      INSERT INTO favourites
        (user_giver_id, user_receiver_id)
      VALUES
        (${user_giver_id}, ${user_receiver_id})
      RETURNING
        id,
        user_giver_id,
        user_receiver_id
    `;
    return favourite;
  },
);

export const updateFavourites = cache(async function (
  id: number,
  user_giver_id: number,
  user_receiver_id: number,
) {
  const [favourite] = await sql<Favourites[]>`
      UPDATE
        favourites
      SET
     user_giver_id = ${user_giver_id},
      user_receiver_id = ${user_receiver_id},

      WHERE
        id = ${id}
      RETURNING *
    `;
  return favourite;
});

export type FavouritesWithUserinfo = {
  userGiverId: number;
  userReceiverId: number;
  userId: number;
  username: string;
};

export const getFavouritesWithUserinfo = cache(
  async (
    id: number,
    user_receiver_id: number,
    user_giver_id: number,
    username: string,
  ) => {
    const favouriteswithuserinfo = await sql<FavouritesWithUserinfo[]>`
    SELECT
      users.id AS user_id,
      favourites.user_giver_id AS user_giver_id,
      favourites.user_receiver_id AS user_receiver_id,
      users.username AS username,

    FROM
      users
    INNER JOIN
      favourites ON users.id = user_receiver_id.user_id


    WHERE
      users.id = ${id}
  `;
    return favouriteswithuserinfo;
  },
);
