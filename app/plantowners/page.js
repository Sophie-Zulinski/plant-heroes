import Image from 'next/image';
import DatePicker from '../components/DatePicker';

export default function PlantOwners() {
  return (
    <main className="min-h-screen">
      <div className="sm:flex flex-row justify-evenly ">
        <div className="flex flex-col p-10 gap-4">
          <h1 className="bg-primary p-2 rounded-lg">Find plants near you: </h1>
          <input placeholder="Disctrict" />

          <label id="date">I can be a plant hero from/to these dates: </label>
          <DatePicker />

          <input placeholder="Price range" />
          <input placeholder="Floor nr." />
          <input placeholder="Elevator" />
          <input placeholder="Number of plants" />
          <button>Find</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="flex flex-col p-5 gap-4 bg-white rounded-md mt-5 justify-center items-center">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
              src="images/pic07.jpg"
              alt="profile pic"
            />
            <h1>Jan</h1>
            <span>xx.xx. 2023 - xx.xx. 2023</span>
            <span>1030 Wien</span>
            <button>Check out profile</button>
          </div>
          <div className="flex flex-col p-5 gap-4 bg-white rounded-md mt-5 justify-center items-center">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
              src="images/pic07.jpg"
              alt="profile pic"
            />
            <h1>Jan</h1>
            <span>xx.xx. 2023 - xx.xx. 2023</span>
            <span>1030 Wien</span>
            <button>Check out profile</button>
          </div>
          <div className="flex flex-col p-5 gap-4 bg-white rounded-md mt-5 justify-center items-center">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
              src="images/pic07.jpg"
              alt="profile pic"
            />
            <h1>Jan</h1>
            <span>xx.xx. 2023 - xx.xx. 2023</span>
            <span>1030 Wien</span>
            <button>Check out profile</button>
          </div>
          <div className="flex flex-col p-5 gap-4 bg-white rounded-md mt-5 justify-center items-center">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
              src="images/pic07.jpg"
              alt="profile pic"
            />
            <h1>Jan</h1>
            <span>xx.xx. 2023 - xx.xx. 2023</span>
            <span>1030 Wien</span>
            <button>Check out profile</button>
          </div>
        </div>
      </div>
    </main>
  );
}
