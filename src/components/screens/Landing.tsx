import { Head } from '~/components/shared/Head';
import landingVideo from '~/assets/gif/animlogo.mp4';
import './land.css';

import staticImg from '~/assets/images/yak-spirit/spirit-bg.png';
import moralisImg from '~/assets/images/yak-spirit/land-moralis.png';
import avaImg from '~/assets/images/yak-spirit/land-ava.png';
import spiritImg from '~/assets/images/yak-spirit/land-yak.png';
import { Link } from 'react-router-dom';

const imgStyle = {
  zIndex: '-1',
  top: '50%',
  right: '-2rem',
  transform: 'translateY(-50%)',
  height: '100%',
};

function Landing() {
  return (
    <>
      <Head />
      <div>
        <div className="absolute top-1/2 -translate-y-1/2 max-w-200 ml-4">
          <h1 className="text-7xl mb-8 max-w-140">
            DEX Aggregator for <span className="text-primary">community</span>
          </h1>
          <p className="text-lg mb-8 max-w-140">
            Yak Spirit is built to give users <span className="font-bold text-primary">a better UX</span> of token swap
            on the avalanche network. We rest on the shoulders of Yield Yak Swap, which finds{' '}
            <span className="text-primary font-bold">the best offer among all DEX`es</span>, and Yak Spirit enhance it
            with price chart and multi-path. Search the best price, lower price slippage, execute with one click!
          </p>
          <Link to="/app">
            <button className="btn btn-primary">Lets swap</button>
          </Link>
        </div>
        <div style={imgStyle} className="absolute">
          <img src={staticImg} className="relative" alt="" style={{ maxHeight: '100%' }} />
          <img
            src={moralisImg}
            className="absolute top-0 kek"
            style={{
              maxHeight: '100%',
            }}
            alt=""
          />
          <img src={avaImg} className="absolute top-0 kek" alt="" style={{ maxHeight: '100%' }} />
          <img src={spiritImg} className="absolute top-0 kek" alt="" style={{ maxHeight: '100%' }} />
        </div>
        {/* <video src={landingVideo} muted loop autoPlay /> */}
      </div>
    </>
  );
}

export default Landing;
