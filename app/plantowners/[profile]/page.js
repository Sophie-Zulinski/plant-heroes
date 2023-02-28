import Image from 'next/image';

export default function PlantownersProfile() {
  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col p-20 gap-4 bg-white rounded-md mt-10 justify-center items-center">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg border-solid border-2 border-secondary"
            src="../images/Smurf-4.jpg"
            alt="plant"
          />
          <h1>Sophie</h1>
          <span>xx.xx. 2023 - xx.xx. 2023</span>
          <span>1030 Wien</span>
          <span>Experience: 10 years</span>
          <span>Price: 10,- EUR</span>
          <button>Write a message</button>
        </div>
      </div>
    </main>
  );
}
