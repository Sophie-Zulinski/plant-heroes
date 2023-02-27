import Image from 'next/image';
import styles from '../page.module.css';

export default function Plantowners() {
  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <input
          type="text"
          placeholder="Disctrict"
          className="input input-bordered input-md w-full max-w-xs"
        />

        <input
          type="date"
          placeholder="Type from"
          className="input input-bordered input-md w-full max-w-xs"
        />

        <input
          type="date"
          placeholder="Date to"
          className="input input-bordered input-md w-full max-w-xs"
        />

        <input
          type="text"
          placeholder="Price range"
          className="input input-bordered input-md w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Experience"
          className="input input-bordered input-md w-full max-w-xs"
        />
        <button className="btn btn-primary">Find</button>
      </div>
      <div className={styles.box}>
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="/images/Smurf-4.jpg" alt="plant" />
          </div>
        </div>
        <div> Name</div>
        <div> xx.xx.2023 - xx.xx. 2023</div>
        <button className="btn btn-primary">Register to see profile</button>
      </div>
    </main>
  );
}
