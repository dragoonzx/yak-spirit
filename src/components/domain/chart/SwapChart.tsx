import { state, useSnapshot } from '~/state';
import SpiritLoader from '~/components/shared/SpiritLoader';

const helperStyle = {
  height: '37px',
  display: 'flex',
  alignItems: 'center',
};

const SwapChart = () => {
  const { loadingQuotes } = useSnapshot(state);

  return (
    <div className="card shadow-lg bg-base-200/100">
      <div className="card-body">
        <h2 className="font-bold -mt-4" style={helperStyle}>
          YAK / PNG
          {loadingQuotes && <SpiritLoader size="small" className="-mt-2" />}
        </h2>
        <div className="flex items-end h-24 overflow-x-auto mt-2">Recharts</div>
      </div>
    </div>
  );
};

export default SwapChart;
