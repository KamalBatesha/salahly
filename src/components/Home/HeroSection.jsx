const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden" dir="rtl">
      {/* صورة الفنيين + الأيقونات حوالين الصورة بس */}
      <div className="relative z-10 flex justify-center mb-10">
        {/* أيقونات حول الصورة */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* أيقونات على اليمين */}
          <img
            src="/images/blacksmith.png"
            className="w-10 absolute top-4 right-90 opacity-90"
            alt=""
          />
          <img
            src="/images/carpenter.png"
            className="w-10 absolute top-1/3 right-70 opacity-90"
            alt=""
          />
          <img
            src="/images/electrician.png"
            className="w-10 absolute top-1/2 right-60 opacity-90"
            alt=""
          />
          <img
            src="/images/plumber.png"
            className="w-10 absolute bottom-1/3 right-40 top-100 opacity-90"
            alt=""
          />
          <img
            src="/images/nekasha.png"
            className="w-10 absolute bottom-4 right-50 opacity-90"
            alt=""
          />

          {/* أيقونات على الشمال */}
          <img
            src="/images/blacksmith.png"
            className="w-10 absolute top-4 left-80 opacity-90"
            alt=""
          />
          <img
            src="/images/carpenter.png"
            className="w-10 absolute top-1/3 left-60 opacity-90"
            alt=""
          />
          <img
            src="/images/electrician.png"
            className="w-10 absolute top-1/2 left-45 opacity-90"
            alt=""
          />
          <img
            src="/images/plumber.png"
            className="w-10 absolute bottom-1/3 left-30 top-110 opacity-90"
            alt=""
          />
          <img
            src="/images/nekasha.png"
            className="w-10 absolute bottom-4 left-60 opacity-90"
            alt=""
          />
        </div>

        {/* صورة الفنيين */}
        <img
          src="/images/hero.png"
          alt="Hero"
          className="min-w-2/4 max-w-screen-xl h-auto object-contain"
        />
      </div>

      {/* المحتوى */}
      <div className="container mx-auto px-4 text-center max-w-3xl z-10 relative">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-relaxed">
          بيتك محتاج شغل؟ احنا نجهزلك الصنايعي الصح!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          مع "صلحلي" مش هتدور كتير.. اختار نوع الشغل، وحدد موقعك، فوراً من أمهر
          الحرفيين في منطقتك.
        </p>

        {/* البحث */}
        <div className="flex items-center justify-center gap-2 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="اكتب مشكلتك"
            className="w-full sm:w-80 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
          />
          <button className="px-6 py-3 bg-main-500 text-white rounded-md hover:bg-blue-700 transition">
            بحث
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
