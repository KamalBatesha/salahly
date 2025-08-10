
const feedbackList = [
  {
    name: "أحمد س.",
    role: "عميل",
    image: "/images/user1.png",
    rating: 5,
    text: "الخدمة ممتازة والفني وصل في الوقت المحدد. أصلح المشكلة بسرعة وباحترافية. أكيد هستخدم التطبيق مرة تانية!",
  },
  {
    name: "ليلى ع.",
    role: "عميلة",
    image: "/images/user2.png",
    rating: 5,
    text: "كنت محتاجة صيانة مستعجلة للتكييف، والحمد لله عن طريق صلحلي تم الحل في نفس اليوم! تطبيق رائع وسهل الاستخدام.",
  },
  {
    name: "فهد م.",
    role: "عميل",
    image: "/images/user3.png",
    rating: 5,
    text: "التطبيق وفر عليّ وقت وجهد. كل شيء سهل وسلس. أنصح فيه بشدة.",
  },
];

export default function Feedback() {
  return (
    <section className="bg-[#EAF2FB] py-12 px-4 text-right">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-10">
          ماذا يقول عملاؤنا؟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedbackList.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
              {/* Stars */}
              <div className="mb-3 flex justify-end">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-main-500 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-gray-800 mb-4 leading-loose">
                {item.text}
              </p>

              {/* User Info */}
              <div className="flex items-center justify-end gap-3">
                <div className="text-right">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 bg-blue-800 rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-blue-300 rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-blue-300 rounded-full"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
