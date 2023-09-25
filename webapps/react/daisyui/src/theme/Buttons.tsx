const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

export const Buttons = (
  <div className="grid grid-cols-2 gap-x-1 gap-y-1">
    <button className="btn">Neutral</button>
    <button className="btn-primary btn">Primary</button>
    <button className="btn-secondary btn">Secondary</button>
    <button className="btn-accent btn">Accent</button>
    <button className="btn-base-100 btn">Base-100</button>
    <button className="btn-info btn">Info</button>
    <button className="btn-success btn">Success</button>
    <button className="btn-warning btn">Warning</button>
    <button className="btn-error btn">Error</button>
    <button className="btn-disabled btn">Disabled</button>
    <button className="loading btn flex flex-nowrap">Loading</button>
    <button className="btn-outline btn">Outline</button>
  </div>
);

export const ButtonTypes = (
  <div className="grid grid-cols-[auto,1fr] gap-2">
    <div className="btn-group btn-group-vertical flex flex-col justify-center gap-1">
      <button className="btn btn-lg">Large</button>
      <button className="btn">Normal</button>
      <button className="btn btn-sm">Small</button>
      <button className="btn btn-xs">Tiny</button>
    </div>
    <div className="flex flex-row flex-wrap justify-evenly gap-2">
      <div>
        <div className="btn-group flex items-center justify-center">
          <input type="radio" name="options" data-title="1" className="btn" />
          <input type="radio" name="options" data-title="2" className="btn" />
          <input type="radio" name="options" data-title="3" className="btn" />
          <input type="radio" name="options" data-title="4" className="btn" />
        </div>
      </div>
      <div>
        <div className="btn-group flex items-center justify-center">
          <input type="radio" name="x" data-title="Dark" className="btn" />
          <input type="radio" name="x" data-title="Light" className="btn" />
        </div>
      </div>
      <button className="btn btn-square">
        <CrossIcon />
      </button>
      <button className="btn btn-outline btn-square">
        <CrossIcon />
      </button>
      <button className="btn btn-circle">
        <CrossIcon />
      </button>
      <button className="btn btn-outline btn-circle">
        <CrossIcon />
      </button>
      <button className="btn gap-2">
        <HeartIcon />
        Icon
      </button>
      <button className="btn gap-2">
        Inbox
        <div className="badge badge-info">+99</div>
      </button>
      <button className="loading btn btn-square"></button>
      <div className="tooltip" data-tip="Tool tip">
        <button className="btn">Hover Me</button>
      </div>
    </div>
  </div>
);
