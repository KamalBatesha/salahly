import React, { useState } from "react";
import { ChevronLeft, LogOut } from "lucide-react";

const Profile = () => {
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState("card1");
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  const menuItems = [
    { label: "تعديل بياناتي", icon: "/images/icons/edit.png" },
    { label: "تغيير كلمه سر", icon: "/images/icons/password.png" },
    { label: "تحويلات", icon: "/images/icons/tahwelat.png" },
    { label: "الدعم الفني", icon: "/images/icons/d3m.png" },
  ];

  return (
    <div className="font-almarai p-4 sm:p-6 md:p-10 bg-[#F9FBFD] min-h-screen relative">
      {/* Popup سحب رصيد */}
      {showWithdrawPopup && (
        <div className="absolute inset-0 z-50 flex justify-center items-center bg-black/10 backdrop-blur-sm">
          <div className="bg-white w-[95%] sm:w-[420px] rounded-xl overflow-hidden shadow-lg border border-gray-200 text-right relative">
            {/* الهيدر مع جرايدنت */}
            <div className="bg-gradient-to-b from-[#F4F7FB] to-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-reverse space-x-2">
                <button
                  onClick={() =>
                    showAddCardForm
                      ? setShowAddCardForm(false)
                      : setShowWithdrawPopup(false)
                  }
                  className="text-[#004AAD] hover:text-blue-800 cursor-pointer pl-2"
                >
                  <img
                    src="/images/icons/back-arrow.png"
                    alt="رجوع"
                    className="w-5 h-5"
                  />
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                  {showAddCardForm ? "اضافة بطاقة" : "سحب رصيد"}
                </h2>
              </div>

              <button
                onClick={() => {
                  setShowAddCardForm(false);
                  setShowWithdrawPopup(false);
                }}
                className="text-gray-500 hover:text-gray-800 text-lg"
              >
                ✕
              </button>
            </div>

            {/* محتوى البوب أب */}
            <div className="p-6 space-y-5">
              {!showAddCardForm && (
                <>
                  <div>
                    <label className="block mb-2 text-sm text-gray-700">
                      ادخل المبلغ المراد سحبه
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: 500"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-700">
                      اختر البطاقة
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-reverse space-x-2">
                          <img
                            src="/images/icons/wallet.png"
                            alt="بطاقة"
                            className="w-4 h-4 ml-1"
                          />
                          <span className="text-sm text-gray-700">
                            **** 44 855
                          </span>
                        </div>
                        <input
                          type="radio"
                          name="card"
                          checked={selectedCard === "card1"}
                          onChange={() => setSelectedCard("card1")}
                          className="accent-blue-600"
                        />
                      </label>

                      <label className="flex items-center justify-between border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-reverse space-x-2">
                          <img
                            src="/images/icons/wallet.png"
                            alt="بطاقة"
                            className="w-4 h-4 ml-1"
                          />
                          <span className="text-sm text-gray-700">
                            **** 98 122
                          </span>
                        </div>
                        <input
                          type="radio"
                          name="card"
                          checked={selectedCard === "card2"}
                          onChange={() => setSelectedCard("card2")}
                          className="accent-blue-600"
                        />
                      </label>
                    </div>

                    <p
                      onClick={() => setShowAddCardForm(true)}
                      className="mt-3 text-sm text-[#004AAD] flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <img
                        src="/images/icons/wallet.png"
                        alt="add card"
                        className="w-4 h-4"
                      />
                      اضافه بطاقة جديدة
                    </p>
                  </div>

                  <button className="w-full mt-3 bg-[#004AAD] text-white py-2 rounded-md text-sm hover:bg-[#003b95] transition">
                    تأكيد سحب
                  </button>
                </>
              )}

              {showAddCardForm && (
                <div className="space-y-4 text-right animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-800">
                    ادخال بيانات بطاقة
                  </h3>

                  <div>
                    <label className="block mb-1 text-sm text-gray-700">
                      اسم صاحب بطاقة
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: احمد محمد"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm text-gray-700">
                      رقم بطاقة
                    </label>
                    <input
                      type="text"
                      placeholder="**** **** **** 1234"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block mb-1 text-sm text-gray-700">
                        تاريخ انتهاء
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
                      />
                    </div>

                    <div className="w-1/2">
                      <label className="block mb-1 text-sm text-gray-700">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                    <span>حفظ البطاقة لوقت لاحق</span>
                    <input
                      type="checkbox"
                      className="accent-[#004AAD] w-5 h-5"
                    />
                  </div>

                  <button className="w-full bg-[#004AAD] text-white py-2 rounded-md text-sm hover:bg-[#003b95] transition">
                    إضافة كارت جديد
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* العنوان */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-right">
        الإعدادات
      </h1>

      {/* المحتوى الرئيسي */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* صورة + بيانات */}
        <div className="flex flex-col pr-6 items-start justify-center py-6 border-b border-[#fbfcfe]">
          <img
            src="/images/avatar.jpg"
            alt="User"
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
          />
          <h2 className="mt-2 text-xl font-bold text-gray-800">احمد علي</h2>
          <p className="text-sm text-gray-500">محطة الرمل، الاسكندرية</p>
        </div>

        {/* الرصيد */}
        <div className="bg-[#E6EDF7] rounded-2xl px-6 sm:px-10 py-4 mx-4 sm:mx-6 flex flex-row-reverse items-center justify-between text-center mt-4">
          <div className="hidden sm:block">
            <img
              src="/images/Vector.png"
              alt="شاكوش"
              className="w-16 h-16 object-contain"
            />
          </div>

          <div className="flex flex-col text-right w-full max-w-[300px] ml-auto">
            <h3 className="text-lg font-semibold text-gray-700">رصيدك الآن</h3>
            <p className="text-2xl text-[#004AAD] font-bold mt-1">20000 ج.م</p>
            <button
              onClick={() => setShowWithdrawPopup(true)}
              className="mt-3 w-full text-center bg-white text-[#004AAD] border border-[#004AAD] px-4 py-2 rounded-md text-sm hover:bg-[#dbeafe] transition"
            >
              - سحب رصيد
            </button>
          </div>
        </div>

        {/* القوائم */}
        <div className="divide-y divide-[#fbfcfe]">
          {menuItems.map(({ label, icon }) => (
            <button
              key={label}
              className="w-full text-right px-6 py-3 text-sm hover:bg-[#fbfcfe] flex cursor-pointer justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <img src={icon} alt={label} className="w-4 h-4" />
                <span>{label}</span>
              </div>
              <ChevronLeft size={16} className="text-gray-400" />
            </button>
          ))}

          {/* تسجيل خروج */}
          <button className="w-full text-right px-6 py-3 text-sm text-red-600 hover:bg-red-50 flex cursor-pointer justify-between items-center">
            <div className="flex items-center gap-2">
              <LogOut size={16} className="text-red-500" />
              <span>تسجيل خروج</span>
            </div>
            <ChevronLeft size={16} className="text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
