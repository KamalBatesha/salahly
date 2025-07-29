import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import image from '../../assets/image.png';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

function SignUpDetails() {
  const navigate=useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImages2, setSelectedImages2] = useState({});
  const [loader, setLoader] = useState(false);

  const fileInputRef = useRef(null);
  const categoryRef = useRef(null);
  const aboutRef = useRef(null);

  const profilePicRef = useRef(null);
  const idFrontRef = useRef(null);
  const idBackRef = useRef(null);

  const nextStep =async () => {
    if (step === 1) {
      if (categoryRef.current.value && aboutRef.current.value) {
        if(aboutRef.current.value.length<15){
          toast.error("يجب كتابة الوصف اطول من 15 حرف");
          return;
        }
        setData({
          ...data,
          profession: categoryRef.current.value,
          about: aboutRef.current.value
        });
      } else if (!categoryRef.current.value) {
        toast.error("يجب اختيار القسم");
        return;
      } else {
        toast.error("يجب كتابة الوصف");
        return;
      }

      if (selectedImages.length < 1) {
        toast.error("يجب اختيار صورة");
        return;
      }
      setStep((prev) => Math.min(prev + 1, 2));
    }else if(step===2){
      console.log(selectedImages2);
      const pastData=JSON.parse(localStorage.getItem('userSignUpData'));
      let formData = new FormData();
      formData.append("name", pastData.name);
formData.append("email", pastData.email);
formData.append("password", pastData.password.toString());
formData.append("rePassword", pastData.rePassword.toString());
formData.append("phone", pastData.phone);
formData.append("address", pastData.address);
formData.append("role",pastData.role );
formData.append("profession", data.profession);

if (data.about && data.about.length >= 15) {
  formData.append("aboutMe", data.about);
}else{
  toast.error("يجب كتابة الوصف اطول من 15 حرف");
  return;
}

// 🖼️ الصور
if (selectedImages2.profilePic?.[0]?.file) {
  formData.append("profilePic", selectedImages2.profilePic[0].file);
}

// صور الهوية: يجب إرسالها كمصفوفة بنفس الاسم
selectedImages2.identityPic?.forEach((img) => {
  formData.append("identityPic", img.file);
});

      console.log(formData);
      setLoader(true);
      const {token} = await signUp(formData);
      console.log(token);
      if(!token){
        return;
      }
      selectedImages.forEach(async(image) => {
        await addWorkShop(image.file, token,pastData.role);
      })

      setLoader(false);
      toast.success("تم انشاء الحساب بنجاح اذهب لتفعيل الحساب من البريد الالكتروني",{
        duration:10000
      });
      localStorage.removeItem('userSignUpData');
      navigate("/login");
      
      

    }

  };

  async function signUp(data){
    try {
      const response = await axios.post('http://localhost:3000/auth/signUp', data);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error(error);
      console.error(error.response.data);
      toast.error(error.response.data.message);
      setLoader(false);
    }
  }

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedImages((prev) => [...prev, ...newImages]);
  };

    const handleFileChange2 = (event,path) => {
    const files = Array.from(event.target.files);
    const newImage = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

      if (path === "profilePic") {
        setSelectedImages2((prev) => ({ ...prev, profilePic: newImage }));
      } else if (path === "identityPic") {
        setSelectedImages2((prev) => ({
          ...prev,
          identityPic: [...(prev.identityPic || []), ...newImage]
        }));
      } else {
        toast.error("يجب اختيار صورة");
        return;
      }
      console.log(selectedImages2);

  };

  const addWorkShop = async(file, token,role) => {
    const formData = new FormData();
    formData.append('mainImage', file);
    await axios.post('http://localhost:3000/provider/addWorkShop', formData, {
      headers: {
        'authorization': `bearer ${token}`,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/category').then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <>
      {loader && <i className="fa fa-spinner fa-spin text-6xl text-main-500 block text-center grow-1" aria-hidden="true"></i>}

    <div dir="rtl" className={`flex flex-col h-full py-8 w-full  ${loader && 'hidden'}`}>
      {/* Header */}
      <div className="self-start w-full">
        <div className="flex gap-3 items-center">
          <div className="flex justify-center items-center p-2 rounded-full bg-main-500 text-white aspect-square">
            <i className="fas fa-angle-right text-xl"></i>
          </div>
          <h2 className="font-bold text-4xl text-right">تفاصيل صنايعي</h2>
        </div>

        <div className="flex justify-between items-center mt-5">
          <h3 className={`mx-3.5 w-1/2 text-2xl text-center pb-1 ${step === 1 ? 'border-b-[6px] border-main-500' : 'border-b-[6px] border-[#A9A9BC]'}`}>
            بيانات صنايعى
          </h3>
          <h3 className={`mx-3.5 w-1/2 text-2xl text-center pb-1 ${step === 2 ? 'border-b-[6px] border-main-500' : 'border-b-[6px] border-[#A9A9BC]'}`}>
            اثبات شخصيه
          </h3>
        </div>
      </div>

      {step === 1 && (
        <div className="flex flex-col h-full pt-8 w-full">
          <div>
            <label className="font-normal text-xl" htmlFor="category">التخصص</label>
            <select
              className="w-full rounded-lg border border-[#D1D1DB] px-4 py-2 mt-2"
              id="category"
              ref={categoryRef}
              defaultValue=""
            >
              <option value="" disabled className="text-[#D1D1DB]">اختر التخصص</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.title}</option>
              ))}
            </select>
          </div>

          <div className="w-full p-4 text-right">
            <h2 className="text-lg font-semibold mb-2">اعمالك</h2>

            <div className="flex flex-wrap gap-4 mb-2">
              {selectedImages.map((img, idx) => (
                <div key={idx} className="relative w-32 h-32 border rounded overflow-hidden">
                  <img src={img.preview} alt={`upload-${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div
              className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer ${selectedImages.length > 0 ? 'hidden' : ''}`}
              onClick={() => fileInputRef.current.click()}
              >
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="bg-blue-100 p-3 rounded-full">
                  <img src={image} alt="icon" className="w-full" />
                </div>
                <p className="text-gray-500">اضغط لاضافه صوره من اعمالك</p>
                <button
                  type="button"
                  className="bg-main-500 text-white px-6 py-2 rounded-full mt-2"
                  onClick={() => fileInputRef.current.click()}
                >
                  اضافه
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                multiple
              />
            </div>

            <button
              type="button"
              className="mt-4 text-main-500 hover:underline flex items-center gap-1 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <span>اضافه صوره اخرى</span>
              <span className="text-xl font-bold">+</span>
            </button>
          </div>

          {/* نبذة */}
          <div>
            <label className="font-normal text-xl" htmlFor="about">نبذه</label>
            <textarea
              className="w-full rounded-lg border border-[#D1D1DB] px-4 py-2 mt-2 min-h-20 h-auto"
              id="about"
              placeholder='نبذه عنك'
              ref={aboutRef}
            ></textarea>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col h-full pt-8 w-full gap-6 text-right">
          {[
            { title: "صوره شخصيه", ref: profilePicRef, path: "profilePic", key: "profilePic" },
            { title: "اثبات هويه اماميه", ref: idFrontRef, path: "identityPic", key: "idFront" },
            { title: "اثبات هويه خلفيه", ref: idBackRef, path: "identityPic", key: "idBack" },
          ].map((item, index) => {
            let previewImage = null;
if (item.path === "profilePic") {
  previewImage = selectedImages2.profilePic?.[0]?.preview;
} else if (item.path === "identityPic") {
  if (item.key === "idFront") {
    previewImage = selectedImages2.identityPic?.[0]?.preview;
  } else if (item.key === "idBack") {
    previewImage = selectedImages2.identityPic?.[1]?.preview;
  }
}


return (
  <div key={index}>
      <p className="mb-2 font-semibold text-lg">{item.title}</p>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
        onClick={() => item.ref.current.click()}
        >
        {previewImage ? (
          <img src={previewImage} alt="preview" className="w-full h-48 object-cover rounded-lg" />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="bg-blue-100 p-3 rounded-full w-10 h-10 flex items-center justify-center">
              <img src={image} alt="icon" className="w-6 h-6" />
            </div>
            <p className="text-gray-500">اضغط لاضافه {item.title}</p>
            <button
              type="button"
              className="bg-main-500 text-white px-6 py-2 rounded-full mt-2"
              onClick={() => item.ref.current.click()}
            >
              اضافه
            </button>
          </div>
        )}
        <input
          type="file"
          ref={item.ref}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileChange2(e, item.path)}
          />
      </div>
    </div>
  );
})}

        </div>
      )}

      <button
        onClick={nextStep}
        className='bg-main-500 text-white rounded-xl px-4 py-3 mt-6 w-full cursor-pointer self-end'
        >
        تابع
      </button>
    </div>
        </>
  );
}

export default SignUpDetails;





// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react';
// import image from '../../assets/image.png';
// import toast from 'react-hot-toast';

// const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

// function SignUpDetails() {
//     const [step, setStep] = useState(1);
//     const[data,setData]=useState({});
//     const fileInputRef = useRef(null);
//     const categoryRef = useRef(null);
//     const aboutRef=useRef(null);
//     const [selectedImages, setSelectedImages] = useState([]);
//     const nextStep = () => {
//         if(step==1){
//             if(categoryRef.current.value && aboutRef.current.value){
//                 setData({...data,profession:categoryRef.current.value,about:aboutRef.current.value});
//                 console.log(data);
//             }else if(!categoryRef.current.value){
//                 toast.error("يجب اختيار القسم");
//                 return;
//             }else{
//                 toast.error("يجب كتابة الوصف");
//                 return;
//             }
//             if(selectedImages.length<1){
//                 toast.error("يجب اختيار صورة");
//                 return;
//             }
//         }
//         setStep((prev) => Math.min(prev + 1, 2))
//         console.log(step);
        
//     };
//     const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

// //   const handleClick = () => {
// //     fileInputRef.current.click();
// //   };

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     const newImages = files.map(file => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));

//     setSelectedImages(prev => [...prev, ...newImages]);
//   };

//   function addWorkShop(file) {
//     const formData = new FormData();
//     formData.append('mainImage', file);
//     axios
//       .post('http://localhost:3000/provider/addWorkShop', formData, {
//         headers: {
//           'authorization': token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//       });
//   }


//   let [categories, setCategories] = useState([]);
//   useEffect(() => {
//     axios.get('http://localhost:3000/category').then((res) => {
//       setCategories(res.data);
//       console.log(res.data);
//     });
//   }, []);

//   return (
//     <div dir="rtl" className="flex flex-col h-full py-8 w-full">
//       <div className="self-start w-full">
//         <div className="flex gap-3 items-center">
//           <div className="flex justify-center items-center p-2 rounded-full bg-main-500 text-white aspect-square">
//             <i className="fas fa-angle-right text-xl"></i>
//           </div>
//           <h2 className="font-bold text-4xl text-right">تفاصيل صنايعي</h2>
//         </div>
//         <div className="flex justify-between items-center mt-5">
//           <h3 className="mx-3.5 w-1/2 text-2xl border-b-[6px] border-main-500 text-center pb-1">
//             بيانات صنايعى
//           </h3>
//           <h3
//             className={`mx-3.5 w-1/2 text-2xl border-b-[6px] text-center pb-1 ${
//               step === 1 ? 'border-[#A9A9BC]' : 'border-main-500'
//             }`}
//           >
//             اثبات شخصيه
//           </h3>
//         </div>
//       </div>

//       {step === 1 && (
//         <div className="flex flex-col h-full pt-8 w-full">
//           <div>
//             <label className="font-normal text-xl" htmlFor="category">
//               التخصص
//             </label>
//             <select
//               className="w-full rounded-lg border border-[#D1D1DB] px-4 py-2 mt-2"
//               id="category"
//               ref={categoryRef}
//             >
//               <option value="" disabled selected className="text-[#D1D1DB]">
//                 اختر التخصص
//               </option>
//               {categories.length > 0 &&
//                 categories.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.title}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           <div className="w-full p-4 text-right">
//             <h2 className="text-lg font-semibold mb-2">اعمالك</h2>

//             <div className="flex flex-wrap gap-4 mb-2">
//               {selectedImages.map((img, idx) => (
//                 <div key={idx} className="relative w-32 h-32 border rounded overflow-hidden">
//                   <img src={img.preview} alt={`upload-${idx}`} className="w-full h-full object-cover" />
//                 </div>
//               ))}
//             </div>

//             <div
//               className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer ${selectedImages.length > 0 ? 'hidden' : ''}`}
//               onClick={()=>{fileInputRef.current.click()}}
//             >
//               <div className="flex flex-col items-center justify-center space-y-2">
//                 <div className="bg-blue-100 p-3 rounded-full">
//                   <img src={image} alt="icon" className="w-full" />
//                 </div>
//                 <p className="text-gray-500">اضغط لاضافه صوره من اعمالك</p>
//                 <button
//                   type="button"
//                   className="bg-main-500 text-white px-6 py-2 rounded-full mt-2"
//                   onClick={()=>{fileInputRef.current.click()}}
//                 >
//                   اضافه
//                 </button>
//               </div>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 className="hidden"
//                 accept="image/*"
//                 multiple
//               />
//             </div>

//             <button
//               type="button"
//               className="mt-4 text-main-500 hover:underline flex items-center gap-1 cursor-pointer"
//               onClick={()=>{fileInputRef.current.click()}}
//             >
//               <span>اضافه صوره اخرى</span>
//               <span className="text-xl font-bold">+</span>
//             </button>
//           </div>
//           <div>
//             <label className="font-normal text-xl" htmlFor="about">
//               نبذه
//             </label>
//             <textarea
//               className="w-full rounded-lg border border-[#D1D1DB] px-4 py-2 mt-2 min-h-20 h-auto"
//               id="about"
//               placeholder='نبذه عنك'
//               ref={aboutRef}
//             ></textarea>
//           </div>

//         </div>
//       )}
//       {step === 2 && (
//         <div className="flex flex-col h-full pt-8 w-full">
//           <div>
//             <label className="font-normal text-xl" htmlFor="about">
//               نبذه
//             </label>
//             <textarea
//               className="w-full rounded-lg border border-[#D1D1DB] px-4 py-2 mt-2 min-h-20 h-auto"
//               id="about"
//               placeholder='نبذه عنك'
//             ></textarea>
//           </div>
//         </div>
//       )}
//       <button onClick={nextStep} className='bg-main-500 text-white rounded-xl px-4 py-3 mt-4 w-full cursor-pointer self-end'>تابع</button>
//     </div>
//   );
// }

// export default SignUpDetails;



// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react'
// import image from '../../assets/image.png'

// const token="bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzI3OTQwMDQ2ZWM0ZjcxMzQ5MjBiMiIsImVtYWlsIjoiYmF0ZXNoYWthbWFsQGdtYWlsLmNvbSIsImlhdCI6MTc1MzY1NTI2MCwiZXhwIjoxNzUzNzQxNjYwfQ.odri8k9_uE74paHn7kDSn49YzBoXvb75PWbAKySZ-AY"

// function SignUpDetails() {
//     const fileInputRef = useRef(null);

//     const handleClick = () => {
//         fileInputRef.current.click();
//     };

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             console.log('Selected file:', file);
//             addWorkShop(file);
//             // يمكنك هنا رفع الملف أو عرضه
//         }
//     };
//     function addWorkShop(file){
//         const formData = new FormData();
//         formData.append('mainImage', file);
//         axios.post('http://localhost:3000/provider/addWorkShop', formData, { headers: { 'authorization': token } }).then((res) => {
//             console.log(res.data);
//         });

//     }

//     const [step, setStep] = useState(1);

//     const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
//     const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

//     let [categories, setCategories] = useState([]);
//     useEffect(() => {
//         axios.get('http://localhost:3000/category').then((res) => {
//             setCategories(res.data);
//             console.log(res.data);
//         });
//     }, []);

//     return (
//         <div dir='rtl' className='flex flex-col h-full py-8 w-full'>
//             <div className="self-start w-full">

//                 <div className="flex gap-3 items-center ">
//                     <div className="flex justify-center items-center p-2 rounded-full bg-main-500 text-white aspect-square">
//                         <i className="fas fa-angle-right text-xl"></i>
//                     </div>
//                     <h2 className='font-bold text-4xl text-right'>تفاصيل صنايعي</h2>
//                 </div>
//                 <div className="flex justify-between items-center mt-5">
//                     <h3 className="mx-3.5 w-1/2 text-2xl  border-b-[6px] border-main-500 text-center pb-1">بيانات صنايعى</h3>
//                     <h3 className={`mx-3.5 w-1/2 text-2xl  border-b-[6px] text-center pb-1 ${step === 1 ? ' border-[#A9A9BC]' : 'border-main-500'}`}>اثبات شخصيه</h3>
//                 </div>
//             </div>
//             {step === 1 && (
//                 <div className="flex flex-col h-full pt-8 w-full">
//                     <div>
//                         <label className='font-normal text-xl' htmlFor='category'>التخصص</label>
//                         <select className="w-full rounded-lg border border-[#D1D1DB] px-4 py-2 mt-2" id="category">
//                             <option value="" disabled selected className='text-[#D1D1DB]'>اختر التخصص</option>
//                             {categories.length > 0 && categories.map((category) => (
//                                 <option key={category._id} value={category._id}>{category.title}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="w-full p-4 text-right">
//                         <h2 className="text-lg font-semibold mb-4">اعمالك</h2>

//                         <div
//                             className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
//                             onClick={handleClick}
//                         >
//                             <div className="flex flex-col items-center justify-center space-y-2">
//                                 <div className="bg-blue-100 p-3 rounded-full">
//                                     <img src={image} alt="image" className='w-full' />
//                                 </div>
//                                 <p className="text-gray-500">اضغط لاضافه صوره من اعمالك</p>
//                                 <button
//                                     className="bg-main-500 text-white px-6 py-2 rounded-full mt-2"
//                                     onClick={handleClick}
//                                 >
//                                     اضافه
//                                 </button>
//                             </div>

//                             <input
//                                 type="file"
//                                 ref={fileInputRef}
//                                 onChange={handleFileChange}
//                                 className="hidden"
//                                 accept="image/*"
//                             />
//                         </div>

//                         <button className="mt-4 text-main-500 hover:underline flex items-center gap-1">
//                             <span>اضافه صوره اخرى</span>
//                             <span className="text-xl font-bold">+</span>
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default SignUpDetails


//  <div className="min-h-screen flex items-center justify-center p-4 bg-white">
//       <div className="w-full max-w-xl">
//         <h2 className="text-xl font-semibold text-gray-700 text-right mb-6">تفاصيل صنايعي</h2>

//         {/* Step Navigation */}
//         <div className="flex justify-between mb-6 border-b border-gray-300">
//           <button
//             className={`pb-2 px-4 text-sm font-medium text-right border-b-2 ${step === 1 ? 'border-main-500 text-main-500' : 'border-transparent text-gray-500'}`}
//             onClick={() => setStep(1)}
//           >
//             بيانات شخصية
//           </button>
//           <button
//             className={`pb-2 px-4 text-sm font-medium text-right border-b-2 ${step === 2 ? 'border-main-500 text-main-500' : 'border-transparent text-gray-500'}`}
//             onClick={() => setStep(2)}
//           >
//             أدوات ومواعيد
//           </button>
//         </div>

//         <form className="space-y-6">
//           {step === 1 && (
//             <div className="space-y-4">
//               <label className="block text-right">
//                 <span className="text-sm text-gray-600">الاسم</span>
//                 <input
//                   type="text"
//                   placeholder="أدخل اسمك"
//                   className="w-full mt-1 p-2 border border-gray-300 rounded-md text-right"
//                 />
//               </label>

//               <label className="block text-right">
//                 <span className="text-sm text-gray-600">صورتك</span>
//                 <input type="file" className="w-full mt-1" />
//               </label>

//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="w-full bg-main-500 hover:bg-blue-800 text-white py-2 rounded-md"
//               >
//                 التالي
//               </button>
//             </div>
//           )}

//           {step === 2 && (
//             <div className="space-y-4">
//               <label className="block text-sm text-gray-600 text-right">أدوات تملكها</label>
//               <input
//                 type="text"
//                 placeholder="أدخل الأداة الأولى"
//                 className="w-full p-2 border border-gray-300 rounded-md text-right"
//               />
//               <button
//                 type="button"
//                 className="text-blue-600 text-sm underline hover:text-blue-800"
//               >
//                 + أضف أداة
//               </button>

//               <label className="block text-sm text-gray-600 text-right">مواعيد العمل</label>
//               <div className="flex gap-2">
//                 <input
//                   type="time"
//                   className="w-1/2 p-2 border border-gray-300 rounded-md text-right"
//                 />
//                 <input
//                   type="time"
//                   className="w-1/2 p-2 border border-gray-300 rounded-md text-right"
//                 />
//               </div>

//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={prevStep}
//                   className="px-4 py-2 bg-gray-200 rounded-md text-gray-700"
//                 >
//                   رجوع
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-main-500 hover:bg-blue-800 text-white rounded-md"
//                 >
//                   إرسال
//                 </button>
//               </div>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>