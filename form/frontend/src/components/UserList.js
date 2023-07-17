
import { useEffect, useState } from "react";
import axios from "axios";

export const UserList = () => {
  const [userData, setUserData] = useState(null)

  const fetchData = async () => {
    const resp = await axios.get("/getUsers")
    console.log(resp);
    setUserData(resp.data.users)

  }
  const userEdit = async (user) => {
    let name = prompt("Enter New Name")
    let email = prompt("Enter New Email")

    if (!name || !email) {
      alert("Provide Name and Email")
    } else if (!email.endsWith("@gmail.com") && !email.endsWith("@GMAIL.COM")) {
      alert(` Invalid Email "${email}" ! `)
    }
    else {
      const data = {
        name: name,
        email: email,
      }
      const resp = await axios.put(`/edituser/${user._id}`, data)
      console.log(resp);
    }
  }
  const userDelete = async (user) => {
    const resp = await axios.delete(`/deleteUser/${user}`)
    console.log(resp);
  }
  
  let sum = 1;
  useEffect(() => {
    fetchData();
  },[userData]);
  
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            All Users
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Number
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((user) => (
                  <tr>
                    <td className="px-4 py-3">{sum++}</td>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <button
                        className="hover:text-green-500"
                        onClick={() => userEdit(user)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      <button
                        className="hover:text-red-500"
                        onClick={() => userDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
