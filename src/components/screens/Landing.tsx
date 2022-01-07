import { Head } from '~/components/shared/Head';

function Landing() {
  return (
    <>
      <Head />
      <div className="absolute top-1/2 -translate-y-1/2 max-w-200 ml-4">
        <h1 className="text-7xl mb-8 max-w-140">
          DEX Aggregator for <span className="text-primary">community</span>
        </h1>
        <p className="text-lg mb-8">
          Yak Spirit is built to give users <span className="font-bold text-primary">a better UX</span> of token swap on
          the avalanche network. We rest on the shoulders of Yield Yak Swap, which finds{' '}
          <span className="text-primary font-bold">the best offer among all DEX`es</span>, and enhance it with **
          feature 1 ** and ** feature 2 **. Search the best price, lower price slippage, execute with one click!
        </p>
        <button className="btn btn-primary">Lets swap</button>
      </div>
    </>
  );
}

export default Landing;
