import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Saurav Sultane",
    image: assets.profile_pic,
    email: "sauravsultane@gmail.com",
    phone: "+91 9158565635",
    address: {
      line1: "Gunjkhed tq lonar",
      line2: "Dist buldhana , Maharashtra",
    },
    gender: "Male",
    dob: "2003-07-06",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="w-full min-h-screen text-sm">
      <div className="w-full bg-white py-6 px-10">
        <h1 className="text-4xl font-bold text-gray-800">My Profile</h1>
      </div>

      <div className="px-10 py-6 flex flex-col gap-8">
        <div className="flex items-center gap-8">

        {
  isEdit ? (
    <div className="flex flex-col gap-2">
      <img
        className="w-40 h-40 object-cover rounded-full shadow"
        src={userData.image}
        alt="profile preview"
      />
      
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUserData((prev) => ({ ...prev, image: imageUrl }));
          }
        }}
        className="text-sm text-gray-600 cursor-pointer"
      />
    </div>
  ) : (
    <img
      className="w-40 h-40 object-cover rounded-full shadow"
      src={userData.image}
      alt="profile pic"
    />
  )
}

          <div>
            {isEdit ? (
              <input
                className="bg-white border text-3xl font-semibold p-2 rounded-md"
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <h2 className="text-3xl font-semibold text-gray-800">
                {userData.name}
              </h2>
            )}
          </div>
        </div>

        <hr className="border-gray-300" />

        <section>
          <h3 className="text-xl font-semibold text-gray-600 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-[150px_1fr] gap-y-4 text-gray-700">
            <p>Email:</p>
            <p>{userData.email}</p>

            <p>Phone:</p>
            {isEdit ? (
              <input
                className="bg-white border p-1 rounded-md"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p>{userData.phone}</p>
            )}

            <p>Address:</p>
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <input
                  className="bg-white border p-1 rounded-md"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  className="bg-white border p-1 rounded-md"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            ) : (
              <p>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </section>

        <hr className="border-gray-300" />

        <section>
          <h3 className="text-xl font-semibold text-gray-600 mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-[150px_1fr] gap-y-4 text-gray-700">
            <p>Gender:</p>
            {isEdit ? (
              <select
                className="bg-white border p-1 rounded-md"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}

            <p>Birthday:</p>
            {isEdit ? (
              <input
                className="bg-white border p-1 rounded-md"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </section>

        <div className="mt-6">
          {isEdit ? (
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => setIsEdit(false)}
            >
              Save Information
            </button>
          ) : (
            <button
              className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
