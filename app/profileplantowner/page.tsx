import DatePicker from '../profileplantsitter/DatePicker';

export default function ProfilePlantowners() {
  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col p-20 gap-4 bg-white rounded-md mt-10 justify-center items-center">
          <span>Please upload a picture of your favourite plant</span>
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
            src="../images/pic07.jpg"
            alt="plant"
          />
          <h1>Please insert your data</h1>
          <input placeholder="Name" />
          <input placeholder="Password" />
          <input placeholder="Email" />
          <hr />
          <input placeholder="Disctrict" />
          <div>I will be on vacation from/to these dates: </div>
          <DatePicker />
          <button className="bg-white hover:bg-gray-100 text-gray-800  py-2 px-4 border border-gray-400 rounded shadow">
            Add more dates
          </button>
          <input placeholder="Price range" />
          <input placeholder="Floor nr." />
          <input placeholder="Elevator" />
          <input placeholder="Number of plants" />
          <textarea placeholder="Write something about yourself" />
          <button>Register</button>

          <div>I also want to register as a plant hero</div>
        </div>
      </div>
    </main>
  );
}
