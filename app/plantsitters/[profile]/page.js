import Image from 'next/image';

export default function PlantownersProfiles() {
  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center ">
        <div className="rating gap-1">
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-red-400"
          />
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-orange-400"
            checked
          />
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-yellow-400"
          />
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-lime-400"
          />
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-green-400"
          />
        </div>
        <div className="flex flex-col p-20 gap-4 bg-white rounded-md mt-10 justify-center items-center">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
            src="../images/sophie.jpg"
            alt="plant"
          />

          <div className="rating rating-sm">
            <input
              type="radio"
              name="rating-6"
              className="mask mask-star-2 bg-orange-400"
              checked
            />
            <input
              type="radio"
              name="rating-6"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-6"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-6"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-6"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
          <h1>Sophie</h1>
          <div className="flex flex-row space-x-4">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span>xx.xx. 2023 - xx.xx. 2023 </span>
          </div>

          <button className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow">
            Show more dates
          </button>
          <span>1030 Wien</span>
          <span>Experience: 10 years</span>
          <span>Age: 35</span>
          <span>Price: 10,- EUR</span>
          <span>Hi, I'm Sophie and I love plants!</span>
          <button>Send request</button>
        </div>
      </div>
    </main>
  );
}
