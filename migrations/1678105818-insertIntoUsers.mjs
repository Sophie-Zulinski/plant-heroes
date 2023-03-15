const users = [
  {
    id: 1,
    username: 'Sophie',
    password_hash: 'bsdfdbsfodsbfoidsbfisod',
    district: '1010 Vienna',
    price: 27,
    experience: 10,
    description: 'Hi I am Sophie and I love plants',
    start_date: '2023-04-08',
    end_date: '2023-04-10',
    role: 'Plantsitter',
    plants: 9,
    img: 'https://res.cloudinary.com/dtz9u2nae/image/upload/v1678872928/Sophie-1_oce66z.jpg',
  },
  {
    id: 2,
    username: 'Elisabeth',
    password_hash: 'bsdfdbsfoddfsfdsbfoidsbfisod',
    district: '1010 Vienna',
    price: 20,
    experience: 7,
    description: 'Hi I am Elisabeth and I love plants',
    start_date: '2023-04-08',
    end_date: '2023-04-10',
    role: 'Plantsitter',
    plants: 4,
    img: 'https://res.cloudinary.com/dtz9u2nae/image/upload/v1678872928/Elisabeth-2_yvxx0g.jpg',
  },
  {
    id: 3,
    username: 'Susanne',
    password_hash: 'bsdfdbsdfdsffoddfsfdsbfoidsbfisod',
    district: '1010 Vienna',
    price: 30,
    experience: 5,
    description: 'Hi I am Susanne and I love plants',
    start_date: '2023-04-08',
    end_date: '2023-04-10',
    role: 'Plantowner',
    plants: 5,
    img: 'https://res.cloudinary.com/dtz9u2nae/image/upload/v1678872928/Susanne-3_hk9ak7.jpg',
  },
  {
    id: 4,
    username: 'Julia',
    password_hash: 'bsdfdbsdfdsfddsgsgoddfsfdsbfoidsbfisod',
    district: '1010 Vienna',
    price: 0,
    experience: 10,
    description: 'Hi I am Julia and I love plants',
    start_date: '2023-05-08',
    end_date: '2023-05-10',
    role: 'Plantowner',
    plants: 2,
    img: 'https://res.cloudinary.com/dtz9u2nae/image/upload/v1678872928/Julia-4_uxpc1l.jpg',
  },
];
export async function up(sql) {
  await sql`
  INSERT INTO users ${sql(
    users,
    'username',
    'password_hash',
    'district',
    'price',
    'experience',
    'description',
    'start_date',
    'end_date',
    'role',
    'plants',
    'img',
  )}

`;
}

export async function down(sql) {
  for (const user of users) {
    await sql`
  DELETE FROM
        users
      WHERE
        id = ${user.id}
`;
  }
}
