import Image from 'next/image';

export default function Home() {
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
          </div>
          <label htmlFor="district">Choose a disctrict:</label>
          <select id="disctrict" name="discrict">
            <option value="1010">1010 Vienna</option>
            <option value="1020">1020 Vienna</option>
            <option value="1030">1030 Vienna</option>
            <option value="1040">1040 Vienna</option>
          </select>

          <button>Find</button>
        </div>
      </div>
    </main>
  );
}
