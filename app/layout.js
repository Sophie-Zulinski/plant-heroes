import './globals.css';
import { Cloudinary } from '@cloudinary/url-gen';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  // if user is not undefined, the person is logged in
  // if user is undefined, the person is logged out

  return (
    <html lang="en" data-theme="mytheme">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className="bg-hero bg-no-repeat bg-cover bg-center bg-fixed ">
        <header>
          <div className="navbar bg-base-100 bg-neutral">
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl" href="/">
                Home
              </a>
            </div>
            <div className="flex-none gap-2">
              <div className="form-control">
                <input placeholder="Search" className="input input-bordered" />
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    {user ? (
                      <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
                        src={`/images/${user.username}-${user.id}.jpg`}
                        alt={user.username}
                      />
                    ) : (
                      <img src="/images/pic07.jpg" alt="avatar" />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    {user ? (
                      <>
                        Logged in as: {user.username}
                        <Link
                          href={`/profile/${user.username}`}
                          prefetch={false}
                        >
                          My Profile
                        </Link>
                        <Link href={`/vacations/${user.username}`}>
                          My Vacations
                          <span className="badge bg-secondary">1</span>
                        </Link>
                        <Link href={`/matches/${user.username}`}>
                          My Matches
                          <span className="badge bg-secondary">1</span>
                        </Link>
                        <Link href="/">
                          My Favourites
                          <span className="badge bg-secondary">1</span>
                        </Link>
                        <Link href="/logout" prefetch={false}>
                          Logout
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href="/register">Register</Link>
                        <Link href="/login">Login</Link>
                      </>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        {children}
        <footer className="footer footer-center p-2 bg-base-100 text-base-content rounded bg-neutral">
          <div className="grid grid-flow-col gap-4">
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </div>
          <div>
            <div className="grid grid-flow-col gap-4">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <p>Copyright ?? 2023 - All right reserved by Sophie Zulinski</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
