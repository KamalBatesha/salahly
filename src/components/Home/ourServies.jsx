// components/OurServices.tsx

import React from "react";

const services = [
  { icon: "/icons/light-transport.png", label: "نقل خفيف" },
  { icon: "/icons/mechanic.png", label: "ميكانيكى" },
  { icon: "/icons/tailor.png", label: "خياطه" },
  { icon: "/icons/carpet.png", label: "تجديد سجاد" },
  { icon: "/icons/drill.png", label: "حفر" },
  { icon: "/icons/painting.png", label: "نقاشه" },
  { icon: "/icons/furniture.png", label: "نقل العفش" },
  { icon: "/icons/carpenter.png", label: "نجار مسلح" },
  { icon: "/icons/aluminum.png", label: "نجار الألوميتال" },
  { icon: "/icons/welder.png", label: "اللحام" },
  { icon: "/icons/elevator.png", label: "فنى مصاعد" },
  { icon: "/icons/repair.png", label: "لترميم" },
];

export default function OurServices() {
  return (
    <section className="py-12 px-4 bg-white text-right">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-8">خدماتنا</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex flex-col items-center hover:shadow-md transition"
            >
              <img
                src={service.icon}
                alt={service.label}
                className="w-12 h-12 mb-4"
              />
              <span className="text-sm font-medium">{service.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
