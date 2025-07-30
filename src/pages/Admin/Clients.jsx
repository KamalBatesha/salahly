import React from "react";
import { Eye, Pencil, Trash2, MoreVertical, Filter } from "lucide-react";

const orders = Array(8).fill({
  client: " محمد أحمد",
  image: "/images/avatar.jpg",
  location: "محرم بيك , اسكندريه",
  date: "22-5-2025",
  time: "03:00 م",
  phone: "01010101010",
  email: "Mo@gmail.com",
});

const statusColors = {
  جديد: "bg-blue-100 text-blue-500",
  "قيد تنفيذ": "bg-yellow-100 text-yellow-600",
  المعلقة: "bg-yellow-200 text-yellow-800",
  "تم التنفيذ": "bg-green-100 text-green-600",
  ملغى: "bg-red-100 text-red-500",
};

export default function Clients() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">العملاء</h1>
        <div className="flex gap-2">
          <button className="bg-gray-100 p-2 rounded-md">
            <Filter size={16} />
          </button>
          <input
            type="text"
            placeholder="ابحث"
            className="border rounded-md px-3 py-1"
          />
        </div>
      </div>

      {/* <div className="flex gap-2 mb-4">
        {["الكل", "الجديدة", "الجارِية", "المعلقة", "السابقة"].map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-md ${
              i === 0 ? "bg-main-500 text-white" : "bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div> */}

      <div className="overflow-auto">
        <table className="w-full text-right border-t">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2">اسم العميل</th>
              <th className="p-2">مكان اقامه</th>
              <th className="p-2">البريد الاكترونى</th>
              <th className="p-2">رقم الهاتف</th>
              <th className="p-2">التاريخ انضمام</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 flex items-center gap-2">
                  <img
                    src={order.image}
                    alt="client"
                    className="w-8 h-8 rounded-full"
                  />
                  {order.client}
                </td>
                <td className="p-2">{order.location}</td>
                <td className="p-2">
                  <span
                    className={`text-sm px-3 py-1 rounded-full font-medium ${
                      statusColors[order.email]
                    }`}
                  >
                    {order.email}
                  </span>
                </td>
                <td className="p-2">{order.phone}</td>
                <td className="p-2">{order.date}</td>
                {/* <td className="p-2">{order.time}</td> */}
                <td className="p-2 flex gap-2 text-gray-500">
                  {/* <Eye
                    className="cursor-pointer hover:text-blue-500"
                    size={16}
                  /> */}
                  <Pencil
                    className="cursor-pointer hover:text-green-500"
                    size={16}
                  />
                  <Trash2
                    className="cursor-pointer hover:text-red-500"
                    size={16}
                  />
                  <MoreVertical className="cursor-pointer" size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex gap-1">
            {[1, 2, 3, "...", 10].map((num, i) => (
              <button
                key={i}
                className={`px-2 py-1 rounded-md ${
                  num === 1 ? "bg-main-500 text-white" : "bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <p>Showing 1 to 8 of 50 entries</p>
        </div>
      </div>
    </div>
  );
}
