const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="inline-block h-3 w-3 stroke-current"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
);

export const Badges = (
  <div className="min-[416px]:flex min-[416px]:flex-col min-[416px]:items-center [&>*>*]:mb-2 [&>*>*]:mr-1">
    <div>
      <div className="badge">badge</div>
      <div className="badge-primary badge">primary</div>
      <div className="badge-secondary badge">secondary</div>
      <div className="badge-accent badge">accent</div>
    </div>
    <div>
      <div className="badge-outline badge">outline</div>
      <div className="badge-primary badge-outline badge">primary</div>
      <div className="badge-secondary badge-outline badge">secondary</div>
      <div className="badge-accent badge-outline badge">accent</div>
    </div>
    <div>
      <div className="badge-info badge gap-2">
        <CrossIcon />
        info
      </div>
      <div className="badge-success badge items-center gap-2">
        <CrossIcon />
        success
      </div>
      <div className="badge-warning badge gap-2">
        <CrossIcon />
        warning
      </div>
      <div className="badge-error badge gap-2">
        <CrossIcon />
        error
      </div>
    </div>
  </div>
);

export const BadgeSizes = (
  <div className="flex flex-row items-center justify-center gap-1">
    <span className="badge badge-lg">Large</span>
    <span className="badge badge-md">Medium</span>
    <span className="badge badge-sm">Small</span>
    <span className="badge badge-xs">X-Small</span>
  </div>
);
