import DatePicker from '../profileplantsitter/DatePicker';

export default function Event() {
  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col p-20 gap-4 bg-white rounded-md mt-10 justify-center items-center">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row space-x-4">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span>I have a plant </span>
            </div>
            <div className="flex flex-row space-x-4">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <div>I have a watering can</div>
            </div>

            <DatePicker />
            <button className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow">
              Add more dates
            </button>
            <input placeholder="Disctrict" />

            <button>Submit</button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <div className="flex flex-col p-20 gap-4 bg-white rounded-md mt-10 justify-center items-center">
          <div className="flex flex-col gap-4">
            xx.xx2023 - xx.xx.2023 - Looking for a plantsitter
          </div>
          <div className="flex flex-col gap-4">
            xx.xx2023 - xx.xx.2023 - Looking for a plant parent
          </div>
        </div>
      </div>
    </main>
  );
}
