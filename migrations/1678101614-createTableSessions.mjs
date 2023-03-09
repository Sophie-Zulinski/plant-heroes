export async function up(sql) {
  await sql`
  CREATE TABLE sessions (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  token VARCHAR(110) NOT NULL UNIQUE,
  expiry_timestamp timestamp NOT NULL DEFAULT NOW() + '24 hours',
  user_id integer REFERENCES users(id) ON DELETE CASCADE
)
  `;
}

export async function down(sql) {
  await sql`
DROP TABLE sessions
`;
}
