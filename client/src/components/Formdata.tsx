import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { datatype } from "../types/data";
import { formdatatype } from "../types/data";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const Formdata = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<formdatatype>({
    name: "",
    email: "",
    phone: null,
  });

  const [EditData, setEditData] = useState<formdatatype>({
    name: "",
    email: "",
    phone: null,
    id: "",
  });

  const [data, setData] = useState<datatype[]>([]);

  const fetchData = async () => {
    try {
     const response = await axios.get("http://localhost:5000/");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (EditData.id) {
       await axios.put(`http://localhost:5000/update`, {
          _id: EditData.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        });

        toast.success("Data updated successfully!");
      } else {
        await axios.post("http://localhost:5000/create", formData);
        toast.success("Data submitted successfull");
      }

      setFormData({ name: "", email: "", phone: null });
      setEditData({ name: "", email: "", phone: null, id: "" });
      setShow(false);

     fetchData();
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data. Please try again.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      toast.success("Data deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Error deleting data. Please try again.");
    }
  };

  const handleEdit = (id: string) => {
   
    const itemToEdit = data.find((item) => item._id === id);

    if (itemToEdit) {
     setFormData({
        name: itemToEdit.name,
        email: itemToEdit.email,
        phone: itemToEdit.phone,
      });

     setEditData({
        name: itemToEdit.name,
        email: itemToEdit.email,
        phone: itemToEdit.phone,
        id: itemToEdit._id,
      });

      // Show the form
      setShow(true);
    }
  };

  return (
    <>
      {!show && (
        <div className="flex justify-center items-center">
          <button
            onClick={() => setShow((show) => !show)}
            className="mt-20 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-white font-extrabold py-2 px-6 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
          >
            ADD
          </button>
        </div>
      )}

      {show && (
        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 rounded-lg shadow-xl max-w-md mx-auto"
        >
          <IoMdClose
            className="text-indigo-600 text-2xl float-right cursor-pointer hover:text-white mb-5 transition-colors duration-300"
            onClick={() => setShow(false)}
          />
          <label htmlFor="name" className="block text-white font-bold mb-2">
            Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-950"
          />
          <label htmlFor="email" className="block text-white font-bold mb-2">
            Email
          </label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-purple-950"
          />
          <label htmlFor="phone" className="block text-white font-bold mb-2">
            Phone
          </label>
          <input
            onChange={handleChange}
            type="number"
            id="phone"
            name="phone"
            value={formData.phone ?? ""}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-purple-950"
          />
          <button
            type="submit"
            className="w-full bg-purple-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-900 transition duration-300"
          >
            Submit
          </button>
        </form>
      )}

      {data && (
        <table className="table-auto border-collapse border border-gray-300 mt-10 mx-auto">
          <thead>
            <tr>
              <th className="bg-purple-500 text-white px-4 py-2">Name</th>
              <th className="bg-purple-500 text-white px-4 py-2">Email</th>
              <th className="bg-purple-500 text-white px-4 py-2">Phone</th>
              <th className="bg-purple-500 text-white px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: datatype, index: number) => (
              <tr
                key={index}
                className="hover:bg-opacity-40 bg-purple-900 bg-opacity-15"
              >
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.phone}</td>

                <td className="flex border px-4 py-2 text-center">
                  <button
                    onClick={() => {
                      handleEdit(item._id);
                      setShow(true);
                    }}
                    className="mr-4 text-[1rem] flex items-center justify-center text-emerald-300 hover:text-emerald-700 transition-transform duration-300 transform hover:scale-110"
                    title="Edit"
                  >
                    <FaRegEdit className="text-[1.25rem]" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center justify-center text-red-800 hover:text-red-700 transition-transform duration-300 transform hover:scale-110"
                    title="Delete"
                  >
                    <MdDeleteOutline className="text-[1.5rem]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Formdata;
