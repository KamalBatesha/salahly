import React from 'react'
import Style from './formImage.module.css'
import logo from '../../assets/logo-white.png'

function FormImage() {
  return (
    <div className={`flex justify-center flex-col items-end w-full h-auto min-h-screen rounded-br-3xl rounded-tr-3xl px-12 ${Style.formImage}`}>
      <div className='flex justify-end items-center gap-2.5'>
        <img src={logo} className='w-[100px]'></img>
        <h1 className='text-white text-6xl'>صلحلي</h1>
      </div>
      <h2 dir='rtl' className='font-almarai font-bold text-3xl lg:text-4xl text-white mt-6 lg:mt-8 text-right'>"سجّل مرة، وخلّي صلّحلي يشتغل معاك!"</h2>
<p
  dir="rtl"
  className="font-almarai font-normal text-xl lg:text-2xl text-white mt-6 lg:mt-8 text-right leading-relaxed whitespace-pre-line"
>
  سواء كنت بتدور على حد يصلّح لك حاجة في بيتك، أو عندك مهارة وعايز تشتغل وتوصل لعملاء بسهولة…
  {"\n"}"صلّحلي" هو المكان اللي بيجمع الكل في تجربة آمنة، سريعة، واحترافية.
  ابدأ التسجيل دلوقتي، وخلّي صلّحلي يوصلك باللي تحتاجه.
</p>



    </div>
  )
}

export default FormImage