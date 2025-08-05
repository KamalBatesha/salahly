import React from "react";
import aboutUs_1 from "../assets/aboutUs-1.jpg";
import aboutUs_2 from "../assets/aboutUs-2.jpg";
import aboutUs_3 from "../assets/aboutUs-3.jpg";
import eye from "../assets/eye.png";
import arrow from "../assets/arrow.png";

export default function AboutUs() {
  return (
    <div dir="rtl" className="xl:py-20 xl:px-30  lg:py-10 lg:px-15 p-10 overflow-hidden">

    <div  className="flex flex-col lg:flex-row items-center justify-center gap-15">
        <div className="lg:w-1/2 w-full">
        <h2 className="text-main-500 font-almarai font-bold text-4xl relative w-fit after:bg-main-500 after:w-full after:h-[2px] after:absolute after:-bottom-1 after:left-0 mb-6">من نحن</h2>
        <div>
            <p className="text-lg font-almarai text-[#5D5D5D] leading-8 mb-6">
                لّحلي هو وجهتك الأولى في مصر للحصول على جميع خدمات الصيانة والإصلاح بكل سهولة وأمان.<br/> نقدم من خلال منصتنا المتخصصة مجموعة متنوعة من الخدمات تشمل السباكة، النجارة، الكهرباء، النقاشة، صيانة الأجهزة المنزلية، وغيرها الكثير — مع ضمان الجودة والاحترافية في كل طلب.
            </p>
            <p className="text-lg font-almarai text-[#5D5D5D] leading-8 mb-6">تأسست "صلّحلي" على يد فريق شغوف بتحسين تجربة الصيانة للأفراد والأسر المصرية.<br/> هدفنا هو تسهيل الوصول إلى أمهر الحرفيين والفنيين، مع التأكيد على الأمان، الموثوقية، وسهولة الاستخدام.</p>
            <p className="text-lg font-almarai text-[#5D5D5D] leading-8 mb-6">نفخر باستخدام أحدث التقنيات لربط العملاء بأفضل مقدمي الخدمات في منطقتهم.<br/> سواء كنت تحتاج إلى إصلاح بسيط أو مشروع صيانة متكامل، "صلّحلي" هنا لمساعدتك في كل خطوة.</p>
        </div>
        </div>
        <div className="lg:w-1/2 w-full flex justify-center items-stretch gap-6">
        <img src={aboutUs_1} alt="aboutUs_1" className="w-1/2 relative bottom-8 object-cover object-center rounded-3xl" />
        <img src={aboutUs_2} alt="aboutUs_2" className="w-1/2 relative top-8 object-cover object-center rounded-3xl" />
        </div>

    </div>
        <div className="flex flex-col lg:flex-row gap-15 py-40 relative">
            <div className=" flex-1 border border-[#DEF5FF] rounded-3xl p-9 pb-12 bg-white">
                <div className="flex items-center gap-3">
                    <img src={eye} alt="eye icon" className="w-9"/>
                    <h2 className="font-bold text-2xl text-main-500 font-almarai">رؤيتنا</h2>
                </div>
                <p className="font-almarai text-lg text-[#5D5D5D] mt-6 leading-8">في "صلّحلي"، نؤمن أن الحصول على خدمات صيانة موثوقة يجب أن يكون بسيطًا وسريعًا في كل بيت مصري.<br/> رؤيتنا هي بناء منصة متكاملة تُسهّل على الجميع الوصول إلى أفضل الحرفيين والفنيين، بضغطة زر.</p>
            </div>
            <div className=" flex-1 border border-[#DEF5FF] rounded-3xl p-9 pb-12 bg-white">
                <div className="flex items-center gap-3">
                    <img src={arrow} alt="arrow icon" className="w-9"/>
                    <h2 className="font-bold text-2xl text-main-500 font-almarai">رسالتنا</h2>
                </div>
                <p className="font-almarai text-lg text-[#5D5D5D] mt-6 leading-8">في "صلّحلي"، رسالتنا هي تبسيط تجربة الصيانة والإصلاح لكل فرد وأسرة في مصر.<br/> نهدف إلى بناء منصة موثوقة تجمع بين الحرفيين المحترفين والعملاء في مكان واحد، مع التركيز على الجودة، الشفافية، وسهولة الاستخدام.
من خلال تمكين الحرفيين وتعزيز ثقة العملاء</p>
            </div>
        <div className=" absolute rounded-full lg:w-1/2 w-full aspect-square top-1/2 left-full -translate-y-1/2 -translate-x-1/3 overflow-hidden border-[15px] border-main-100 -z-10">
            <img src={aboutUs_3} alt="aboutUs_3" className="w-full h-full object-cover object-[40px_center] rotate-y-180" />
        </div>
        </div>
    </div>
  );
}
