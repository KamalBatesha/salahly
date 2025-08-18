// components/OurServices.tsx

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const services = [
//   { icon: "/images/mechanic.png", label: "ميكانيكى" },
//   { icon: "/images/plumber.png", label: "حفر" },
//   { icon: "/images/nekasha.png", label: "نقاشه" },
//   { icon: "/images/carpenter.png", label: "نجار مسلح" },
//   { icon: "/images/tiler.png", label: "نجار الألوميتال" },
//   { icon: "/images/electrician.png", label: "اللحام" },
// ];

export default function OurServices() {
  const [categories, setCategories] = useState([]);
  const navigate=useNavigate();

    async function getAllCategories() {
    axios
      .get("http://localhost:3000/category")
      .then((res) => {
        console.log(res.data);
        
      const apiCategories = res.data.categories.map((category) => ({
        id: category._id,
        name: category.title,
        icon: category.image.secure_url,
        servicesCount: category.servicesCount,
        workersCount: category.providerCount
      }));

        setCategories(apiCategories);
        console.log(categories);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <section className="py-12 px-4 bg-white text-right">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-8">خدماتنا</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.length > 0 && categories.map((categories) => (
            <div
              key={categories.id}
              className="border rounded-lg p-4 flex flex-col items-center hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/services`)}
            >
              <img
                src={categories.icon}
                alt={categories.name}
                className="w-12 h-12 mb-4"
              />
              <span className="text-sm font-medium">{categories.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
