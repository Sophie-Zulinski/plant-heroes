import dateFormat from 'dateformat';
import Image from 'next/image';
import Link from 'next/link';
import { getFavourites } from '../../../database/favourites';
import { getUserByUsername, getUsers } from '../../../database/users';

export default async function Favourites({ params }) {
  const favourites = await getFavourites();
  const users = await getUsers();
  const singleUser = await getUserByUsername(params.username);

  console.log('SingleUser', singleUser);

  const receiver = favourites.find((user) => {
    return user.userGiverId === singleUser.id;
  });

  console.log('receiver', receiver);

  const userfavourites = users.filter(
    (user) => user.id === receiver.userReceiverId,
  );

  console.log('favourites', favourites);
  console.log('favourites', receiver.userReceiverId);
  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col p-20 gap-4 bg-white rounded-md mt-10 justify-center items-center">
          <h1> Here are your favourites, {singleUser.username}!</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userfavourites.map((user) => {
              return (
                <div
                  className="flex flex-row p-5 gap-4 h-max bg-neutral rounded-md mt-5 justify-center items-center "
                  key={`user-${user.id}`}
                >
                  <Image
                    className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
                    src={user.img ? user.img : '/images/pic07.jpg'}
                    alt={user.username}
                    width="300"
                    height="300"
                  />

                  <Link
                    href={`/${
                      user.role === 'Plantsitter'
                        ? 'plantsitters'
                        : 'plantowners'
                    }/${user.id}`}
                  >
                    <h2>{user.username}</h2>
                    <h4>{user.district}</h4>
                    <div className="flex flex-row">
                      {user.startDate !== '1111-11-11' ? (
                        <h4>
                          {dateFormat(user.startDate, 'mmmm dS')} {'-'}{' '}
                        </h4>
                      ) : (
                        ''
                      )}{' '}
                      {user.endDate !== '1111-11-11' ? (
                        <h4>{dateFormat(user.endDate, 'mmmm dS yyyy')} </h4>
                      ) : (
                        ''
                      )}
                    </div>
                    <h4>Price: {user.price},- €/hour </h4>
                    <h4>{user.plants} plants</h4>
                    <br />

                    <button>Check out profile</button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
