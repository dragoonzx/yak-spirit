const SpiritSuccessTx = ({ closeToast, txHash }: { closeToast: (() => void) | undefined; txHash: string }) => (
  <div className="flex flex-col font-bold text-primary">
    Swap success
    <a
      href={`https://snowtrace.io/tx/${txHash}`}
      className="font-normal text-sm flex items-center link"
      target="_blank"
      rel="noreferrer"
    >
      Check tx on snowtrace
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 ml-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  </div>
);

export default SpiritSuccessTx;
