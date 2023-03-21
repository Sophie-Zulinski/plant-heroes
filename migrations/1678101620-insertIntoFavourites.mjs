const favourites = [
  {
    id: 1,
    user_receiver_id: 2,
    user_giver_id: 4,
  },
  {
    id: 2,
    user_receiver_id: 3,
    user_giver_id: 1,
  },
];
export async function up(sql) {
  await sql`

  INSERT INTO favourites ${sql(favourites, 'user_receiver_id', 'user_giver_id')}

`;
}

export async function down(sql) {
  for (const favourite of favourites) {
    await sql`
  DELETE FROM
       favourites
      WHERE
        id = ${favourite.id}
`;
  }
}
