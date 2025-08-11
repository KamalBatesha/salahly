import React, { useState } from "react";

const SettingsPanel = () => {
  const [profileImage, setProfileImage] = useState("/images/provider-pic.png");

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [personalAccount, setPersonalAccount] = useState("");
  const [geoLocation2, setGeoLocation2] = useState("");

  const handleImageChange = () => {
    alert("Image change not implemented yet");
  };

  const handleImageRemove = () => {
    setProfileImage("/images/provider-pic.png");
  };

  return (
    <div className="p-6 max-w-3xl ml-auto font-almarai" dir="rtl">
      <div className="flex flex-col items-end gap-6">
        {/* Profile Picture Section */}
        <div className="flex items-center gap-4 w-full justify-start">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow"
          />
          <div className="flex flex-col gap-2 items-end">
            <button
              onClick={handleImageChange}
              className="text-sm text-[var(--color-main-500)] border border-[var(--color-main-500)] px-4 py-1 rounded-full hover:bg-[var(--color-main-100)] transition font-bold whitespace-nowrap"
            >
              تغيير صوره
            </button>
            <button
              onClick={handleImageRemove}
              className="text-sm text-red-600 hover:underline font-bold"
            >
              مسح صوره
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm mb-1 text-gray-700">
                الاسم كامل
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="em"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">
                رقم هاتف
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="em"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">
                حساب شخصى
              </label>
              <input
                type="text"
                value={personalAccount}
                onChange={(e) => setPersonalAccount(e.target.value)}
                placeholder="em"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>

            {/* Geo Location and Password Button Side by Side */}
            <div className="flex items-end gap-4">
              <div className="w-full">
                <label className="block text-sm mb-1 text-gray-700">
                  الموقع الجغرافي
                </label>
                <input
                  type="text"
                  value={geoLocation2}
                  onChange={(e) => setGeoLocation2(e.target.value)}
                  placeholder="em"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>
              <button className="h-[38px] mt-auto border-[1px] border-blue-700 text-blue-700 px-4 rounded-full text-sm hover:bg-blue-50 transition font-bold whitespace-nowrap">
                تغيير كلمه سر
              </button>
            </div>
          </div>

          {/* Save Button - aligned to the right */}
          <div className="mt-6 text-right">
            <button className="bg-[var(--color-main-500)] text-white px-8 py-2 rounded-lg text-sm hover:bg-blue-800 transition font-bold">
              حفظ تعديلات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
