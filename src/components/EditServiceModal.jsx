import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const EditServiceModal = ({ show, handleClose, service, onSuccess }) => {
  const { token, userRole } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: '',
    minPrice: '',
    maxPrice: '',
    description: '',
  });
  
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keepExistingMainImage, setKeepExistingMainImage] = useState(true);

  useEffect(() => {
    if (show) {
      if (service) {
        setFormData({
          title: service.name || service.title || '',
          minPrice: service.minPrice || service.minCost || '',
          maxPrice: service.maxPrice || service.maxCost || '',
          description: service.description || '',
        });
        
        if (service.mainImage) {
          const imageUrl = typeof service.mainImage === 'string' 
            ? service.mainImage 
            : service.mainImage.secure_url;
          setMainImagePreview(imageUrl);
          setKeepExistingMainImage(true);
        } else {
          setMainImagePreview('');
          setKeepExistingMainImage(false);
        }
        
        if (service.images && service.images.length > 0) {
          const imageUrls = service.images.map(img => 
            typeof img === 'string' ? img : img.secure_url
          );
          setAdditionalImagePreviews([...imageUrls]);
        } else {
          setAdditionalImagePreviews([]);
        }
        
        setMainImage(null);
        setAdditionalImages([]);
      } else {
        resetForm();
      }
    }
  }, [service, show]);

  useEffect(() => {
    return () => {
      if (mainImagePreview && mainImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(mainImagePreview);
      }
      additionalImagePreviews.forEach(preview => {
        if (preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [mainImagePreview, additionalImagePreviews]);

  const resetForm = () => {
    setFormData({
      title: '',
      minPrice: '',
      maxPrice: '',
      description: '',
    });
    setMainImage(null);
    setAdditionalImages([]);
    setMainImagePreview('');
    setAdditionalImagePreviews([]);
    setKeepExistingMainImage(false);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("عنوان الخدمة مطلوب");
      return false;
    }
    
    if (!formData.minPrice || Number(formData.minPrice) <= 0) {
      toast.error("السعر الأدنى مطلوب ويجب أن يكون أكبر من صفر");
      return false;
    }
    
    if (!formData.maxPrice || Number(formData.maxPrice) <= 0) {
      toast.error("السعر الأعلى مطلوب ويجب أن يكون أكبر من صفر");
      return false;
    }
    
    if (Number(formData.maxPrice) < Number(formData.minPrice)) {
      toast.error("السعر الأعلى يجب أن يكون أكبر من أو يساوي السعر الأدنى");
      return false;
    }
    
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const compressImage = (file, maxSizeMB = 1) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const maxWidth = 800;
        const maxHeight = 600;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = height * (maxWidth / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = width * (maxHeight / height);
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, 'image/jpeg', 0.8);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("يرجى اختيار ملف صورة صالح");
        return;
      }

      let processedFile = file;
      if (file.size > 2 * 1024 * 1024) {
        try {
          processedFile = await compressImage(file);
          toast.success("تم ضغط الصورة لتوفير المساحة");
        } catch (error) {
          console.error('Compression failed:', error);
        }
      }

      if (processedFile.size > 5 * 1024 * 1024) {
        toast.error("حجم الصورة كبير جداً حتى بعد الضغط");
        return;
      }

      setMainImage(processedFile);
      setKeepExistingMainImage(false);
      
      if (mainImagePreview && mainImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(mainImagePreview);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      if (additionalImages.length + files.length > 5) {
        toast.error("يمكنك إضافة 5 صور إضافية كحد أقصى");
        return;
      }

      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`حجم الصورة ${file.name} كبير جداً (أكثر من 5 ميجابايت)`);
          return;
        }
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} ليس ملف صورة صالح`);
          return;
        }
      }

      setAdditionalImages(prev => [...prev, ...files]);
      
      try {
        const previews = await Promise.all(
          files.map(file => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          })
        );
        
        setAdditionalImagePreviews(prev => [...prev, ...previews]);
      } catch (error) {
        toast.error("حدث خطأ أثناء تحميل الصور");
        console.error('Error reading files:', error);
      }
    }
  };

  const removeMainImage = () => {
    if (mainImagePreview && mainImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(mainImagePreview);
    }
    setMainImage(null);
    setMainImagePreview('');
    setKeepExistingMainImage(false);
  };

  const removeAdditionalImage = (index) => {
    const previewToRemove = additionalImagePreviews[index];
    if (previewToRemove && previewToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(previewToRemove);
    }
    
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleApiError = (error) => {
    console.error('API Error:', error);
    
    if (error.code === 'ENOSPC' || error.message?.includes('no space left')) {
      toast.error("الخادم ممتلئ، يرجى المحاولة لاحقاً أو استخدام صور أصغر");
    } else if (error.response?.status === 413) {
      toast.error("حجم الملف كبير جداً");
    } else if (error.response?.status === 401) {
      toast.error("انتهت صلاحية الجلسة، يرجى تسجيل الدخول مجدداً");
    } else if (error.response?.status === 400) {
      if (error.response?.data?.details) {
        console.error('Validation Details:', error.response.data.details);
        
        let errorMessage = "خطأ في البيانات: ";
        const details = error.response.data.details;
        
        if (Array.isArray(details)) {
          const messages = details.map(detail => {
            if (typeof detail === 'string') {
              return detail;
            } else if (detail && detail.message) {
              return detail.message;
            } else if (detail && detail.msg) {
              return detail.msg;
            } else if (detail && detail.path) {
              return `خطأ في الحقل: ${detail.path}`;
            } else {
              return 'خطأ في التحقق من البيانات';
            }
          });
          errorMessage += messages.join(', ');
        } else if (typeof details === 'object' && details !== null) {
          const messages = Object.entries(details).map(([key, value]) => {
            if (typeof value === 'string') {
              return `${key}: ${value}`;
            } else if (value && value.message) {
              return `${key}: ${value.message}`;
            } else if (value && value.msg) {
              return `${key}: ${value.msg}`;
            } else {
              return `${key}: خطأ في التحقق من البيانات`;
            }
          });
          errorMessage += messages.join(', ');
        } else if (typeof details === 'string') {
          errorMessage += details;
        } else {
          errorMessage += 'بيانات غير صحيحة';
        }
        
        toast.error(errorMessage);
      } else {
        toast.error(`خطأ في البيانات: ${error.response?.data?.message || 'بيانات غير صحيحة'}`);
      }
    } else if (error.response?.data?.message) {
      if (typeof error.response.data.message === 'string') {
        toast.error(error.response.data.message);
      } else if (Array.isArray(error.response.data.message)) {
        const errorMessages = error.response.data.message.map(err => {
          if (typeof err === 'string') {
            return err;
          } else if (err.message) {
            return err.message;
          } else if (err.msg) {
            return err.msg;
          } else if (err.path) {
            return `خطأ في الحقل: ${err.path}`;
          } else {
            return 'خطأ في التحقق من البيانات';
          }
        }).join('; ');
        toast.error(errorMessages);
      } else {
        toast.error("حدث خطأ أثناء الحفظ");
      }
    } else if (error.message?.includes('no space left')) {
      toast.error("لا توجد مساحة كافية على الخادم");
    } else if (error.message?.includes('Network Error')) {
      toast.error("خطأ في الشبكة، يرجى المحاولة مرة أخرى");
    } else {
      toast.error("حدث خطأ غير متوقع");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!token) {
      toast.error("لا يوجد توكن صالح، يرجى تسجيل الدخول مجددًا");
      return;
    }

    try {
      setLoading(true);

      // Create FormData for file upload with proper encoding
      const formDataToSend = new FormData();
      
      // Add text fields with proper validation and encoding
      formDataToSend.append('title', formData.title.trim());
      if (formData.description.trim()) {
        formDataToSend.append('description', formData.description.trim());
      }
      formDataToSend.append('minPrice', String(Number(formData.minPrice)));
      formDataToSend.append('maxPrice', String(Number(formData.maxPrice)));

      // Add main image only if user selected a new one
      if (mainImage && mainImage instanceof File) {
        formDataToSend.append('mainImage', mainImage, mainImage.name);
      }

      // Add additional images if any
      if (additionalImages.length > 0) {
        additionalImages.forEach((image, index) => {
          if (image instanceof File) {
            formDataToSend.append('images', image, image.name);
          }
        });
      }

      const headers = {
        Authorization: `bearer ${token}`,
        role: userRole || '',
        // Don't set Content-Type for FormData, let browser set it with boundary
      };

      let apiUrl;
      let method;

      if (service && (service.id || service._id)) {
        // FIXED: Send ID in URL parameters, not in form data
        const serviceId = service.id || service._id;
        apiUrl = `http://localhost:3000/provider/updateService/${serviceId}`;
        method = 'put';
        
      } else {
        // Add new service
        apiUrl = 'http://localhost:3000/provider/addService';
        method = 'post';
      }

      console.log('Sending to:', apiUrl);
      console.log('Method:', method);
      
      // Debug: Log what we're sending
      console.log('=== DEBUGGING FORM DATA ===');
      for (let [key, value] of formDataToSend.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }
      console.log('=== END DEBUG ===');

      const response = await axios[method](apiUrl, formDataToSend, { headers });

      console.log('✅ Success Response:', response.data);
      toast.success(service ? "تم تحديث الخدمة بنجاح" : "تم حفظ الخدمة بنجاح");
      
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      resetForm();
      handleClose();

    } catch (error) {
      console.error('❌ FULL ERROR DETAILS:');
      console.error('Status:', error.response?.status);
      console.error('Status Text:', error.response?.statusText);
      console.error('Error Message:', error.response?.data?.message);
      console.error('Error Details:', error.response?.data?.details);
      console.error('Full Error Data:', error.response?.data);
      console.error('Request URL:', error.config?.url);
      console.error('Request Method:', error.config?.method);
      
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    if (!loading) {
      resetForm();
      handleClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-3xl rounded-xl p-6 relative flex flex-col max-h-[90vh]" dir="rtl">
        <button
          onClick={handleModalClose}
          className="absolute left-4 top-4 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          disabled={loading}
        >
          <i className="fas fa-times"></i>
        </button>
        
        <h2 className="text-2xl font-bold text-main-500 mb-4">
          {service ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
        </h2>

        <div className="overflow-y-auto pr-2" style={{ maxHeight: '70vh' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">
                اسم الخدمة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-main-500 focus:border-main-500 focus:outline-none"
                required
                disabled={loading}
                maxLength="100"
                placeholder="أدخل اسم الخدمة..."
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 font-medium">
                  السعر الأدنى (ج.م) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="minPrice"
                  value={formData.minPrice}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-main-500 focus:border-main-500 focus:outline-none"
                  required
                  min="1"
                  step="0.01"
                  disabled={loading}
                  placeholder="0"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">
                  السعر الأعلى (ج.م) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  value={formData.maxPrice}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-main-500 focus:border-main-500 focus:outline-none"
                  required
                  min="1"
                  step="0.01"
                  disabled={loading}
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">وصف مختصر</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-main-500 focus:border-main-500 focus:outline-none resize-vertical"
                placeholder="اكتب وصفاً مختصراً للخدمة..."
                disabled={loading}
                maxLength="500"
              ></textarea>
              <div className="text-sm text-gray-500 mt-1">
                {formData.description.length}/500 حرف
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">الصورة الرئيسية</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="w-full"
                  id="mainImage"
                  name="mainImage"
                  disabled={loading}
                />
                <div className="text-xs text-gray-500 mt-1">
                  الحد الأقصى: 5 ميجابايت
                  {service && service.mainImage && keepExistingMainImage && (
                    <span className="text-blue-600"> • سيتم الاحتفاظ بالصورة الحالية إذا لم تختر صورة جديدة</span>
                  )}
                </div>
                {mainImagePreview && (
                  <div className="mt-3 relative inline-block">
                    <img
                      src={mainImagePreview}
                      alt="Main preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeMainImage}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 disabled:opacity-50"
                      disabled={loading}
                    >
                      ×
                    </button>
                    {service && service.mainImage && keepExistingMainImage && (
                      <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                        موجودة
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                صور إضافية ({additionalImages.length}/5)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                  className="w-full"
                  id="images"
                  name="images"
                  disabled={loading || additionalImages.length >= 5}
                />
                <div className="text-xs text-gray-500 mt-1">
                  الحد الأقصى: 5 صور، 5 ميجابايت لكل صورة
                </div>
                {additionalImagePreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-4 gap-3">
                    {additionalImagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Additional preview ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 disabled:opacity-50"
                          disabled={loading}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleModalClose}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-300 transition disabled:opacity-50"
                disabled={loading}
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-main-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-main-600 transition disabled:opacity-50"
              >
                {loading ? 'جاري الحفظ...' : 'حفظ'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditServiceModal;