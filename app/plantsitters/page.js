import Image from 'next/image';
import DatePicker from '../profileplantsitter/DatePicker';

export default function PlantSitters() {
  return (
    <main className="min-h-screen">
      <div className="sm:flex flex-row justify-evenly ">
        <div className="flex flex-col p-10 gap-4">
          <h1 className="bg-primary p-2 rounded-lg">
            Find plantsitters near you:{' '}
          </h1>
          <input placeholder="Disctrict" />

          <label id="date">
            I look for a plantsitter from/to these dates:{' '}
          </label>
          <DatePicker />

          <input placeholder="Price range" />
          <input placeholder="Experience" />
          <button>Find</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="flex flex-col p-5 gap-4 bg-white rounded-md mt-5 justify-center items-center">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
              src="images/sophie.jpg"
              alt="profile pic"
            />
            <h1>Sophie</h1>
            <span>xx.xx. 2023 - xx.xx. 2023</span>
            <span>1030 Wien</span>
            <button>Check out profile</button>
          </div>
          <div className="flex flex-col p-5 gap-4 bg-white rounded-md mt-5 justify-center items-center">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
              src="images/sophie.jpg"
              alt="profile pic"
            />
            <h1>Sophie</h1>
            <span>xx.xx. 2023 - xx.xx. 2023</span>
            <span>1030 Wien</span>
            <button>Check out profile</button>
          </div>
          <div className="flex flex-col p-5 gap-4 bg-white rounded-md mt-5 justify-center items-center">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
              src="images/sophie.jpg"
              alt="profile pic"
            />
            <h1>Sophie</h1>
            <span>xx.xx. 2023 - xx.xx. 2023</span>
            <span>1030 Wien</span>
            <button>Check out profile</button>
          </div>
          <div className="flex flex-col p-5 gap-4 bg-white rounded-md mt-5 justify-center items-center">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
              src="images/sophie.jpg"
              alt="profile pic"
            />
            <h1>Sophie</h1>
            <span>xx.xx. 2023 - xx.xx. 2023</span>
            <span>1030 Wien</span>
            <button>Check out profile</button>
          </div>
        </div>
      </div>
    </main>
  );
}
