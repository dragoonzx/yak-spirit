import { Head } from '~/components/shared/Head';
import { Link } from 'react-router-dom';
// import YakTotemImg from '~/assets/images/yak-spirit/YakTotem.svg?inline';
import YakTotemSvg from '~/components/domain/YakTotemSvg';
import { useTranslation } from 'react-i18next';
import yyImg from '~/assets/images/yield-yak/YYLogo.png';

function Landing() {
  const { t } = useTranslation();

  const FEATURES_LIST = [
    // {
    //   title: t('landFeat1'),
    //   icon: '',
    // },
    {
      title: t('landFeat2'),
      icon: '',
    },
    {
      title: t('landFeat3'),
      icon: '',
    },
    {
      title: t('landFeat4'),
      icon: '',
    },
    {
      title: t('landFeat5'),
      icon: '',
    },
    {
      title: t('landFeat6'),
      icon: '',
    },
  ];

  return (
    <>
      <Head />
      <section className="flex flex-col-reverse sm:flex-row items-center justify-between mt-8">
        <div className="max-w-200">
          <h1 className="text-7xl mb-8 max-w-140 font-bold">
            {t('landTitle')}
            <span className="text-primary"> {t('landTitleCommunity')}</span>
          </h1>
          <p className="text-lg mb-8 max-w-140">
            {t('landDesc')} <span className="font-bold text-primary">{t('betterUx')}</span> {t('ofTokenSwap')}{' '}
            <span className="text-primary font-bold">{t('theBestOffer')}</span>
            {t('andYakSpirit')}
          </p>
          <Link to="/app">
            <button className="btn btn-primary">{t('landBtn')}</button>
          </Link>
        </div>
        <div className="w-full sm:w-1/2">
          {/* <img src={YakTotemImg} className="" alt="" /> */}
          <YakTotemSvg className="w-full h-full" />
        </div>
      </section>
      <section className="mb-20 mt-16">
        <h2 className="text-6xl font-bold">
          Yak Spirit <span className="text-primary">{t('landFeatTitle')}</span>
        </h2>
        <ul className="mt-8 pl-4 max-w-120">
          {FEATURES_LIST.map((feature, i) => (
            <li
              key={i}
              className="py-4 pl-8 relative before:content-[''] before:w-[1px] before:h-full before:absolute before:left-0 before:top-0 before:bg-primary"
            >
              <span className="absolute top-1/2 w-3 h-3 -mt-1.5 rounded-full -left-[5.5px] bg-primary shadow-[0_0_20px_1px_#3CE17E]" />
              <span className="font-semibold">{feature.title}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-20">
        <div className="card w-full mx-auto glass">
          <div className="card-body">
            <div className="max-w-[80%] mx-auto">
              <div className="flex flex-col text-center sm:text-left sm:flex-row items-center justify-between">
                <div className="mr-4">
                  <h3 className="text-xl font-bold">{t('community')}</h3>
                  <p className="mt-2 sm:max-w-[80%]">
                    {t('cardGlass')}{' '}
                    <a href="https://t.me/yieldyak" target="_blank" rel="noreferrer">
                      Telegram
                    </a>{' '}
                    or{' '}
                    <a href="https://twitter.com/yak_spirit" target="_blank" rel="noreferrer">
                      Twitter
                    </a>
                  </p>
                </div>
                <a href="https://yieldyak.com" target="_blank" rel="noreferrer">
                  <img src={yyImg} className="w-36" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-20 flex justify-center">
        <h2 className="mt-12 text-6xl font-bold bg-[#171212] sm:bg-transparent p-4 sm:p-0">
          {t('feel')} <span className="text-primary">{t('feelYak')}</span> !
        </h2>
      </section>
    </>
  );
}

export default Landing;
