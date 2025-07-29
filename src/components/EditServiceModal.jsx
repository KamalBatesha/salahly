import React, { useState, useEffect } from 'react';
import formImage from '../assets/formImage.jpg';

const EditServiceModal = ({ show, handleClose, service, handleSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    minCost: '',
    maxCost: '',
    image: null,
    description: '',
  });

  useEffect(() => {
    if (service) {
      const [minCost = '', maxCost = ''] = service.priceRange?.split('-') || [];
      setFormData({
        name: service.name || '',
        minCost: minCost.trim(),
        maxCost: maxCost.trim(),
        image: service.image || null,
        description: service.description || '',
      });
    } else {
      setFormData({
        name: '',
        minCost: '',
        maxCost: '',
        image: null,
        description: '',
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.minCost || !formData.maxCost) return;
    handleSave(formData);
  };

  if (!show) return null;

  const getImageSrc = () => {
    if (!formData.image) return formImage;
    return typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 space-y-6 relative" dir="rtl">
        <button
          onClick={handleClose}
          className="absolute left-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-2xl font-bold text-main-500">
          {service ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">اسم الخدمة</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-main-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">السعر الأدنى (ج.م)</label>
              <input
                type="number"
                name="minCost"
                value={formData.minCost}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-main-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">السعر الأعلى (ج.م)</label>
              <input
                type="number"
                name="maxCost"
                value={formData.maxCost}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-main-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">وصف مختصر</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-main-500 focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">صورة الخدمة</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
            />
            <img src={getImageSrc()} alt="service preview" className="mt-3 w-full h-40 object-cover rounded-lg border" />
          </div>

          <div className="text-left">
            <button
              type="submit"
              className="bg-main-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-main-600 transition"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;