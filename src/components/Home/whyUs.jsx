

const benefits = [
  {
    title: "صنايعية موثوق فيهم",
    description:
      "كل الصنايعية اللي عندنا متقيمين من عملاء قبل كده، وبيتم مراجعة بياناتهم بعناية.",
    number: "1",
  },
  {
    title: "خدمات حسب موقعك",
    description:
      '"صلحلي" بيرشح لك أقرب الصنايعية ليك علشان توصلك الخدمة في أسرع وقت.',
    number: "2",
  },
  {
    title: "خدمة سريعة وأونلاين",
    description:
      "احجز صنايعي وانت في بيتك، من غير تليفونات ولا دوشة.. كله بيتم من خلال التطبيق.",
    number: "3",
  },
];

export default function WhyUseSahlly() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <div className="rounded-[40px] overflow-hidden">
            <img
              src="/images/sanay3yHome.png"
              alt="فني صيانة"
              className="w-[90%] h-auto object-cover"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 text-right ">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-8">
            ليه تستخدم "صلحلي"؟
          </h2>

          <div className="space-y-10">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="border border-[var(--color-main-500)] rounded-xl p-4 flex items-start gap-6 flex-row-reverse"
              >
                <div className="w-12 h-12 rounded-full bg-[#E6EDF7] text-main-500 font-semibold flex items-center justify-center text-2xl">
                  {item.number}
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
