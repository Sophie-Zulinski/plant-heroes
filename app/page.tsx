import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="hero-content min-h-screen bg-base-200/[0.8] rounded-lg ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">PLANT HEROES</h1>
            <p className="py-6">
              Going on a vacation and in need of a plant hero? Looking for an
              easy job and you love plants? Find out who is available near you!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">I have a plant</span>
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">I have a watering can</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <input
                  type="text"
                  placeholder="1030 Vienna"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Find</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
