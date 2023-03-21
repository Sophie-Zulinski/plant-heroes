import { cache } from 'react';
import { sql } from './connect';

export type Favourites = {
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
  async (id: number, user_giver_id: number, user_receiver_id: number) => {
    const [favourite] = await sql<Favourites[]>`
      INSERT INTO favourites
        (id, user_giver_id, user_receiver_id)
      VALUES
        (${id}, ${user_giver_id}, ${user_receiver_id})
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
