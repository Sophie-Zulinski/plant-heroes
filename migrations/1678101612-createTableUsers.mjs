export async function up(sql) {
  await sql`
  CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username varchar(80) NOT NULL UNIQUE,
  password_hash varchar(70) NOT NULL UNIQUE,
  district varchar (20) NOT NULL,
  price int,
  experience int,
  description varchar(100),
  start_date varchar ,
  end_date varchar,
  role varchar
)
  `;
}

export async function down(sql) {
  await sql`
DROP TABLE users
`;
}
