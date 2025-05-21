import Link from "next/link";

export default function NotFound() {
  return <div className={'wrapper min-h-screen flex flex-col justify-center relative overflow-hidden'}>
    <div className={'flex flex-col max-w-[515px]'}>
      <div className={'relative z-20 mb-8 flex justify-center md:justify-start mt-3'}>
        <img src={'/logo.png'} className={'w-[117px] h-[72px] md:w-[155px] md:h-[95px]'} alt={'logo'}/>
      </div>

      <img src={'/bg_404.png'} alt={'img'}
           className={'md:absolute z-10 w-full md:w-2/3 right-0 top-1/2 md:-translate-y-1/2 mb-4 md:mb-0'}/>

      <div className={'flex flex-col relative z-20'}>
        <h1 className={'text-[#133348] text-2xl md:text-4xl font-semibold mb-3 md:mb-4'}>Объявление исчезло, как горячий пирожок!</h1>

        <p className={'text-[#133348] mb-8'}>Не переживайте, мы знаем, как быстро продать или найти вашу идеальную
          недвижимость. Команда MaksV - это ваш проводник в мире выгодных сделок! Хотите, чтобы ваша сделка прошла также
          легко и быстро?</p>

        <div className={'flex flex-col items-center md:w-fit mb-4'}>
          <Link href={'/contacts'}
                className={'w-full lg:w-fit py-3 px-24 bg-[#FFC53C] rounded-[10px] text-white whitespace-nowrap hover:bg-white hover:text-[#FFC53C] border border-[#FFC53C] mb-3 text-center'}>Связаться
            с нами</Link>

          <Link href={'/contacts'} className={'text-[#133348] underline link'}>Доступны бесплатные консультации!</Link>
        </div>
      </div>
    </div>
  </div>
}