import { type ReactElement } from 'react';

const InfoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="inline-block h-8 w-8 stroke-current"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const SettingsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="inline-block h-8 w-8 stroke-current"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    ></path>
  </svg>
);

export const Stats = () => {
  const statsWithAction: Array<{
    title?: string;
    value: string;
    action?: ReactElement;
  }> = [
    {
      title: 'Balance',
      value: '$8,400',
      action: <button className="btn btn-success btn-sm">Deposit</button>
    },
    {
      title: 'Total Volume',
      value: '$72,380',
      action: <button className="btn btn-sm">View Trades</button>
    }
  ];

  const stats: Array<{
    title?: string;
    value: string;
    description?: string;
    icon?: JSX.Element;
  }> = [
    {
      title: 'Downloads',
      value: '31K',
      description: 'Jan 1st - Feb 1st',
      icon: InfoIcon
    },
    {
      title: 'New Users',
      value: '4,200',
      description: '↗︎ 400 (22%)',
      icon: SettingsIcon
    }
  ];

  return (
    <div className="@container space-y-2">
      <div className="stats stats-vertical @[393px]:stats-horizontal mx-auto w-full shadow">
        {stats.map((stat) => (
          <div className="stat" key={stat.title}>
            <div className="stat-figure text-secondary">{stat.icon}</div>
            <div className="stat-title">{stat.title}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-desc">{stat.description}</div>
          </div>
        ))}
      </div>
      <div className="text-primary-contet stats stats-vertical bg-primary @[381px]:stats-horizontal w-full">
        {statsWithAction.map((stat) => (
          <div className="stat" key={stat.title}>
            <div className="stat-title">{stat.title}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-actions">{stat.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
