

export default function DownloadApp() {
  return (
    <section className=" text-white py-12 px-4">
      <div className="bg-[#0052CC] px-28 py-10 rounded-3xl max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left - Phones Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/images/appImg.png"
            alt="تطبيق صلحلي"
            className="w-full max-w-md"
          />
        </div>

        {/* Right - Text & Buttons */}
        <div className="w-full md:w-1/2 text-right">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">سريع وموثوق</h2>
          <p className="mb-6 leading-loose text-sm md:text-base">
            حمّل تطبيق "صلحلي" الآن
            <br />
            احتجت صيانة؟ احجز خدمات صيانة احترافية في أي وقت ومن أي مكان مع
            "صلحلي". صيانة السباكة، الكهرباء، التكييف وغيرها أصبحت أسهل مما
            تتخيل. سواء كانت فاتتك تسريب، عطل كهربائي، أو مياه جوه المنزل –
            توصلّك صنايعي موثوق في أسرع وقت، ومن دون عناء.
          </p>

          <div className="flex justify-end gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/google-play.png"
                alt="Google Play"
                className="h-12"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/app-store.png"
                alt="App Store"
                className="h-12"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
