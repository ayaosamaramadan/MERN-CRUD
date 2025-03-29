import { IoMdClose } from "react-icons/io";

const Formdata = () => {
  return (
    <>
      <form className="mt-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 rounded-lg shadow-xl max-w-md mx-auto">
      <IoMdClose className="text-indigo-600 text-2xl float-right cursor-pointer hover:text-white mb-5 transition-colors duration-300" />
      <label htmlFor="name" className="block text-white font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-950"
        />
        <label htmlFor="email" className="block text-white font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-purple-950"
        />
        <label htmlFor="phone" className="block text-white font-bold mb-2">
          Phone
        </label>
        <input
          type="number"
          id="phone"
          name="phone"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-purple-950"
        />
        <button
          type="submit"
          className="w-full bg-purple-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-900 transition duration-300"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Formdata;
