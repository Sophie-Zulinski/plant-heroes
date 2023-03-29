export async function up(sql) {
  await sql`
  CREATE TABLE favourites (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_giver_id integer REFERENCES users (id) ON DELETE CASCADE,
  user_receiver_id integer REFERENCES users (id) ON DELETE CASCADE
)
  `;
}

export async function down(sql) {
  await sql`
DROP TABLE favourites
`;
}
