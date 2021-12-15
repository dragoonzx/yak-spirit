import { Head } from '~/components/shared/Head';
import { SwapCard } from '../domain/swap/SwapCard';
import { SwapTitle } from '../domain/swap/SwapTitle';

function Index() {
  return (
    <>
      <Head />
      <SwapTitle />
      <div className="mt-4 grid grid-cols-12 gap-6 p-4 rounded-box">
        <SwapCard />
      </div>
    </>
  );
}

export default Index;
