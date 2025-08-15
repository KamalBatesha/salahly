// components/OurServices.tsx

import React from "react";

const services = [
  { icon: "/images/mechanic.png", label: "ميكانيكى" },
  { icon: "/images/plumber.png", label: "حفر" },
  { icon: "/images/nekasha.png", label: "نقاشه" },
  { icon: "/images/carpenter.png", label: "نجار مسلح" },
  { icon: "/images/tiler.png", label: "نجار الألوميتال" },
  { icon: "/images/electrician.png", label: "اللحام" },
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
