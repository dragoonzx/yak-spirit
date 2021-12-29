import SpiritPopover from '~/components/shared/SpiritPopover';
import { appSettings, useSnapshot } from '~/state';

const blocks: ['routing', 'exchanges'] = ['routing', 'exchanges'];

const AppSettings = () => {
  const snap = useSnapshot(appSettings);
  const handleVisibilityChange = (block: 'routing' | 'exchanges') => {
    appSettings.visibility = {
      ...appSettings.visibility,
      [block]: !appSettings.visibility[block],
    };
  };

  const btn = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block w-6 h-6 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const content = (
    <div className="overflow-hidden rounded-lg shadow-lg ring-1 text-base-content ring-black ring-opacity-5">
      <div className="relative flex flex-col w-full p-7 ">
        <div className="collapse border rounded-box border-base-300 collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title font-medium">Blocks</div>
          <div className="collapse-content">
            <div className="flex flex-col">
              {blocks.map((v) => (
                <div className="p-1 mb-2 card bordered" key={v}>
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text capitalize">{v}</span>
                      <input
                        type="checkbox"
                        checked={snap.visibility[v]}
                        onChange={() => handleVisibilityChange(v)}
                        className="toggle"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="collapse mt-4 border rounded-box border-base-300 collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title font-medium">Info</div>
          <div className="collapse-content">
            <p>
              <span className="badge">Yak Spirit</span> offers new experience of YY Swap usage. Learn more on{' '}
              <a className="link link-primary" href="github.com/dragoonzx/yak-spirit" target="_blank">
                github
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return <SpiritPopover btn={btn} content={content} />;
};

export default AppSettings;