const InfoIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={`${className} h-6 w-6 flex-shrink-0`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

export const Alerts = (
  <div className="space-y-1">
    <div className="alert shadow-lg">
      <div>
        <InfoIcon className="stroke-info" />
        <span>Alert: 12 unread messages.</span>
      </div>
    </div>
    <div className="alert alert-info shadow-lg">
      <div>
        <InfoIcon className="stroke-current" />
        <span>Info: Software update available.</span>
      </div>
    </div>
    <div className="alert alert-success shadow-lg">
      <div>
        <InfoIcon className="stroke-current" />
        <span>Success: Purchase confirmed!</span>
      </div>
    </div>
    <div className="alert alert-warning shadow-lg">
      <div>
        <InfoIcon className="stroke-current" />
        <span>Warning: Invalid email address!</span>
      </div>
    </div>
    <div className="alert alert-error shadow-lg">
      <div>
        <InfoIcon className="stroke-current" />
        <span>Error: Task failed successfully.</span>
      </div>
    </div>
  </div>
);
