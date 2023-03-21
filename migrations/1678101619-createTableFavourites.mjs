export async function up(sql) {
  await sql`
  CREATE TABLE favourites (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_giver_id integer,
  user_receiver_id integer
)
  `;
}

export async function down(sql) {
  await sql`
DROP TABLE favourites
`;
}
