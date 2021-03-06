import spiritLogo from '~/assets/images/yak-spirit/yak-favicon.png';
import avaImg from '~/assets/images/yak-spirit/Avalanche_Vertical_RedWhite.png';
import moralisImg from '~/assets/images/yak-spirit/Moralis-Icon-Light.png';
import coingeckoImg from '~/assets/images/yak-spirit/CoinGecko.png';
import yyImg from '~/assets/images/yield-yak/YYLogo.png';
import { useTranslation } from 'react-i18next';

const BEGINNERS_LINKS = [
  {
    title: 'How do I set up MetaMask on Avalanche?',
    link: 'https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche',
  },
  {
    title: 'Yield Yak Docs',
    link: 'https://docs.yieldyak.com/',
  },
  {
    title: 'Yield Yak Swap Docs',
    link: 'https://docs.yieldyak.com/for-traders/swap',
  },
];

const DEVELOPER_LINKS = [
  {
    title: 'Yak Spirit Github',
    link: 'https://github.com/dragoonzx/yak-spirit',
  },
  {
    title: 'Yak Spirit API',
    link: 'https://yakspirit.com/api/swagger',
  },
  {
    title: 'Yield Yak Aggregator Github',
    link: 'https://github.com/yieldyak/yak-aggregator',
  },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="container-wide mx-auto pt-8 pb-8 footer text-base-content pl-4 sm:pl-2 lg:pl-0">
      <div className="">
        <p className="footer-title">Yak Spirit</p>
        <p className="text-xs max-w-[250px]">{t('footerYak')}</p>
        <p className="text-xs">{t('footerYak2')}</p>
        <p className="footer-title mt-4">{t('poweredBy')}</p>
        {/* Avalanche | Coingecko | 1inch | paraswap | Yield Yak | cowswap (?) | rubic (?) */}
        <div className="max-w-[250px] flex items-center">
          <a href="https://www.avax.network/" target="_blank" rel="noreferrer">
            <img src={avaImg} className="w-[32px] mr-4" alt="" />
          </a>
          <a href="https://yieldyak.com/" target="_blank" rel="noreferrer">
            <img src={yyImg} className="w-[32px] mr-4" alt="" />
          </a>
          <a href="https://moralis.io/" target="_blank" rel="noreferrer">
            <img src={moralisImg} className="w-[32px] mr-4" alt="" />
          </a>
          <a href="https://www.coingecko.com/" target="_blank" rel="noreferrer">
            <img src={coingeckoImg} className="w-[32px] mr-4" alt="" />
          </a>
        </div>
      </div>
      <div>
        <p className="footer-title">{t('joinCommunity')}</p>
        <div className="flex items-center">
          <a href="https://twitter.com/yak_spirit" className="hover:text-primary mr-4" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a
            href="https://github.com/dragoonzx/yak-spirit"
            className="hover:text-primary mr-4"
            target="_blank"
            rel="noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="fill-current">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.0432 0.179932C10.8147 0.179932 0.0876465 11.0878 0.0876465 24.5445C0.0876465 35.3096 6.95165 44.4426 16.4699 47.6643C17.6671 47.8899 18.1067 47.1358 18.1067 46.4922C18.1067 45.9112 18.0845 43.9919 18.0742 41.956C11.4097 43.4299 10.0034 39.0812 10.0034 39.0812C8.9137 36.265 7.34358 35.5161 7.34358 35.5161C5.17009 34.0039 7.50742 34.035 7.50742 34.035C9.91297 34.2065 11.1796 36.5458 11.1796 36.5458C13.3162 40.2707 16.7837 39.1938 18.1507 38.5712C18.3657 36.9969 18.9866 35.9212 19.6716 35.3132C14.3508 34.6971 8.7574 32.6079 8.7574 23.2719C8.7574 20.6118 9.6932 18.4383 11.2256 16.732C10.9769 16.1179 10.1569 13.6402 11.4577 10.2841C11.4577 10.2841 13.4693 9.62928 18.0472 12.7816C19.9581 12.2418 22.0074 11.971 24.0432 11.9618C26.0791 11.971 28.13 12.2418 30.0444 12.7816C34.6167 9.62928 36.6256 10.2841 36.6256 10.2841C37.9295 13.6402 37.1091 16.1179 36.8604 16.732C38.3964 18.4383 39.3259 20.6118 39.3259 23.2719C39.3259 32.6301 33.7218 34.6906 28.3874 35.2938C29.2467 36.0499 30.0123 37.5327 30.0123 39.8059C30.0123 43.0655 29.9845 45.6893 29.9845 46.4922C29.9845 47.1406 30.4157 47.9003 31.63 47.6611C41.1431 44.4357 47.9984 35.3059 47.9984 24.5445C47.9984 11.0878 37.273 0.179932 24.0432 0.179932Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16084 35.1623C9.10808 35.2837 8.92084 35.3196 8.75026 35.2365C8.57651 35.157 8.47892 34.992 8.53525 34.8706C8.58682 34.7459 8.77446 34.7116 8.94781 34.7943C9.12196 34.8742 9.22113 35.0408 9.16084 35.1623Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.1312 36.263C10.0169 36.3707 9.79356 36.3207 9.64203 36.1504C9.48533 35.9805 9.45598 35.7534 9.57181 35.644C9.68963 35.5363 9.90622 35.5867 10.0633 35.7566C10.22 35.9285 10.2506 36.154 10.1312 36.263Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0757 37.6662C10.9289 37.7699 10.6889 37.6727 10.5405 37.456C10.3938 37.2394 10.3938 36.9795 10.5437 36.8754C10.6925 36.7713 10.9289 36.8649 11.0793 37.08C11.2256 37.2999 11.2256 37.5601 11.0757 37.6662Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.3697 39.0219C12.2384 39.1692 11.9587 39.1296 11.754 38.9287C11.5446 38.7322 11.4863 38.4534 11.618 38.3062C11.7509 38.1585 12.0321 38.2 12.2384 38.3994C12.4463 38.5954 12.5097 38.8763 12.3697 39.0219Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.1548 39.8091C14.0969 39.9999 13.8275 40.0867 13.5562 40.0056C13.2853 39.9221 13.1079 39.6985 13.1627 39.5057C13.219 39.3136 13.4896 39.2232 13.7629 39.31C14.0334 39.3931 14.2112 39.615 14.1548 39.8091Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.1153 39.9552C16.122 40.1561 15.8919 40.3227 15.6071 40.3259C15.3207 40.3328 15.089 40.1702 15.0859 39.9725C15.0859 39.7696 15.3108 39.6045 15.5972 39.5997C15.882 39.594 16.1153 39.7554 16.1153 39.9552Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.9397 39.6392C17.9738 39.8353 17.7758 40.0367 17.493 40.0899C17.2149 40.142 16.9575 40.0209 16.9222 39.8264C16.8876 39.6255 17.0892 39.4242 17.3669 39.3721C17.6501 39.3221 17.9036 39.4399 17.9397 39.6392Z"
              />
            </svg>
          </a>
          <a href="https://t.me/yieldyak" className="hover:text-primary" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="fill-current">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM16.0715 21.8015C13.6673 22.8512 11.1971 23.9298 8.93825 25.174C7.75877 26.0376 9.32638 26.6485 10.7971 27.2215C11.0309 27.3126 11.2622 27.4027 11.4797 27.4927C11.6607 27.5484 11.8447 27.607 12.0312 27.6664C13.6669 28.1875 15.4907 28.7686 17.0787 27.8945C19.6873 26.396 22.149 24.6636 24.6089 22.9325C25.4148 22.3653 26.2205 21.7983 27.0311 21.2397C27.0691 21.2154 27.1119 21.1876 27.1588 21.1573C27.8493 20.7096 29.4024 19.7029 28.8279 21.0901C27.4695 22.5757 26.0144 23.8907 24.5515 25.213C23.5655 26.1041 22.5759 26.9985 21.6099 27.9505C20.7686 28.6341 19.8949 30.0088 20.837 30.9661C23.0069 32.4851 25.2107 33.9673 27.4132 35.4487C28.1299 35.9307 28.8466 36.4127 29.5618 36.8959C30.774 37.8637 32.6685 37.0808 32.935 35.5685C33.0535 34.8728 33.1725 34.1772 33.2915 33.4815C33.9491 29.6368 34.6069 25.7907 35.188 21.9335C35.267 21.3284 35.3565 20.7234 35.4461 20.1181C35.6632 18.651 35.8806 17.1821 35.9485 15.7071C35.7735 14.2351 33.9887 14.5588 32.9955 14.8898C27.8903 16.8324 22.8361 18.919 17.8019 21.0424C17.2316 21.295 16.6535 21.5474 16.0715 21.8015Z"
              />
            </svg>
          </a>
        </div>
        <p className="footer-title mt-4">{t('infoForBegginers')}</p>
        <ul className="text-xs">
          {BEGINNERS_LINKS.map((v) => (
            <li key={v.title} className="mb-1">
              <a href={v.link} className="link" target="_blank" rel="noreferrer">
                {v.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div>
          <p className="footer-title">{t('infoDevelopers')}</p>
          <ul className="text-xs">
            {DEVELOPER_LINKS.map((v) => (
              <li key={v.title} className="mb-1">
                <a href={v.link} className="link" target="_blank" rel="noreferrer">
                  {v.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center mt-4">
          <img src={spiritLogo} className="mr-2" width="36" height="36" />
          <div className="text-xs">
            <p>
              BUIDL{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://moralis.io/avalanche-hackathon"
                className="link uppercase"
              >
                Avalanche Hackathon
              </a>{' '}
              2021
            </p>
            <span className="flex text-[10px] items-center opacity-40 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              Best Yield Yak Front-End Integration
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
