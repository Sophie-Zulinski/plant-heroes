const favourites = [
  { id: 1, user_receiver_id: 10, user_giver_id: 8 },
  {
    id: 2,
    user_receiver_id: 5,
    user_giver_id: 4,
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
