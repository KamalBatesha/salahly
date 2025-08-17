import { Grid2x2Plus, MoreVertical, Search } from "lucide-react";
import React, { useState, useRef, useEffect, useContext } from "react";
import image from "../../assets/image.png";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const Categories = () => {
  const fileInputRef = useRef(null);
  const { token } = useContext(UserContext);


  const [categories, setCategories] = useState([]);

  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  // رفع صورة
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  // إضافة تخصص جديد
  const handleAddCategory = async () => {
    if (!newCategoryName || selectedImages.length === 0) return;

    // const newCategory = {
    //   id: categories.length + 1,
    //   name: newCategoryName,
    //   icon: selectedImages[0].preview, // أول صورة مختارة
    //   servicesCount: 0,
    //   workersCount: 0,
    // };

    // setCategories((prev) => [...prev, newCategory]);
    await addCategory(newCategoryName, selectedImages[0].file);
    setNewCategoryName("");
    setSelectedImages([]);
    setShowWithdrawPopup(false);
  };
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
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function addCategory(name, imageFile) {
  const formData = new FormData();
  formData.append("title", name);
  formData.append("image", imageFile);

  axios
    .post("http://localhost:3000/category", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "authorization": `admin ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      getAllCategories();
    })
    .catch((err) => {
      console.log(err.response?.data || err.message);
    });
}

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      {/* Popup إضافة تخصص */}
      {showWithdrawPopup && (
        <div className="absolute inset-0 z-50 flex justify-center items-center bg-black/10 backdrop-blur-sm">
          <div className="bg-white w-[95%] sm:w-[420px] rounded-xl overflow-hidden shadow-lg border border-gray-200 text-right relative">
            {/* الهيدر */}
            <div className="bg-gradient-to-b from-[#F4F7FB] to-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">إضافة تخصص</h2>

              <button
                onClick={() => {
                  setShowWithdrawPopup(false);
                  setSelectedImages([]);
                  setNewCategoryName("");
                }}
                className="text-gray-500 hover:text-gray-800 text-lg"
              >
                ✕
              </button>
            </div>

            {/* محتوى البوب أب */}
            <div className="p-6 space-y-5">
              <div>
                <label className="text-lg font-semibold mb-2">اسم التخصص</label>
                <input
                  type="text"
                  placeholder="اسم تخصص"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-4 py-2 my-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
                />
              </div>

              <div className="w-full p-4 text-right">
                <h2 className="text-lg font-semibold mb-2">صورة التخصص</h2>

                <div className="flex flex-wrap gap-4 mb-2">
                  {selectedImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-32 h-32 border rounded overflow-hidden"
                    >
                      <img
                        src={img.preview}
                        alt={`upload-${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div
                  className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer ${
                    selectedImages.length > 0 ? "hidden" : ""
                  }`}
                  onClick={() => fileInputRef.current.click()}
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <img src={image} alt="icon" className="w-6 h-6" />
                    </div>
                    <p className="text-gray-500">اضغط لإضافة صورة التخصص</p>
                    <button
                      type="button"
                      className="bg-main-500 text-white px-6 py-2 rounded-full mt-2"
                      onClick={() => fileInputRef.current.click()}
                    >
                      إضافة
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>

              <button
                onClick={handleAddCategory}
                className="w-full mt-3 bg-[#004AAD] text-white py-2 rounded-md text-sm hover:bg-[#003b95] transition"
              >
                إضافة تخصص
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between flex-col mb-6 gap-3">
        <h1 className="text-2xl font-bold">التخصصات</h1>
        <div className="flex justify-between items-center gap-4">
          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="ابحث..."
                className="block w-80 pr-10 border border-gray-300 rounded-lg py-2 px-3 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          {/* زر إضافة تخصص */}
          <div
            onClick={() => setShowWithdrawPopup(true)}
            className="flex items-center justify-center gap-3 bg-main-500 text-white px-8 py-2 rounded-xl cursor-pointer"
          >
            <Grid2x2Plus size={20} />
            <span className="cursor-pointer">إضافة تخصص</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.length > 0 && categories.map((service) => (
            <div
              key={service.id}
              className="relative rounded-xl shadow-sm bg-white flex justify-between items-center p-4"
            >
              {/* صورة */}
              <div>
                <img
                  src={service.icon}
                  alt={service.name}
                  className="w-16 h-16 object-contain"
                />
                <h3 className="mt-2 text-lg font-bold text-gray-800">
                  {service.name}
                </h3>
              </div>

              {/* نصوص */}
              <div className="flex flex-col text-right">
                <span className="text-sm text-gray-600">
                  خدمات <b>{service.servicesCount}</b>
                </span>
                <span className="text-sm text-gray-600">
                  صنايعية <b>{service.workersCount}</b>
                </span>
              </div>

              {/* زر الأكشن */}
              <button className="absolute top-3 left-3 text-gray-500 hover:text-gray-700">
                <MoreVertical size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <p>
            Showing 1 to {categories.length} of {categories.length} entries
          </p>
          <div className="flex gap-1">
            {[1, 2, 3, "...", 10].map((num, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded-md ${
                  num === 1
                    ? "bg-main-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
