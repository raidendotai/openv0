export const ProgressBars = (
  <div className="flex w-full flex-col gap-1">
    <progress
      className="progress progress-error"
      value="15"
      max="100"
    ></progress>
    <progress
      className="progress progress-warning"
      value="25"
      max="100"
    ></progress>
    <progress
      className="progress progress-secondary"
      value="35"
      max="100"
    ></progress>
    <progress
      className="progress progress-primary"
      value="50"
      max="100"
    ></progress>
    <progress
      className="progress progress-info"
      value="65"
      max="100"
    ></progress>
    <progress
      className="progress progress-accent"
      value="85"
      max="100"
    ></progress>
    <progress
      className="progress progress-success"
      value="100"
      max="100"
    ></progress>
    <progress className="progress"></progress>
  </div>
);

const radialProgressStyle = (value: number) => {
  return {
    ['--value' as string]: `${value}`,
    ['--thickness' as string]: '2px',
    ['--size' as string]: '4rem'
  };
};

export const RadialProgress = (
  <div className="flex flex-row justify-evenly">
    <div
      className="min-[500px]:radial-progress hidden"
      style={radialProgressStyle(0)}
    >
      0%
    </div>
    <div className="radial-progress" style={radialProgressStyle(20)}>
      20%
    </div>
    <div className="radial-progress" style={radialProgressStyle(60)}>
      60%
    </div>
    <div className="radial-progress" style={radialProgressStyle(80)}>
      80%
    </div>
    <div className="radial-progress" style={radialProgressStyle(100)}>
      100%
    </div>
  </div>
);
