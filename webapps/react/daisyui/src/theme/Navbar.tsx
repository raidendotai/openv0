const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h7"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const NotificationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const navLinks: Array<{
  title: string;
  path: string;
}> = [
  {
    title: 'Homepage',
    path: './'
  },
  {
    title: 'Portfolio',
    path: './'
  },
  {
    title: 'About',
    path: './'
  }
];

export const Navbar = (
  <div className="navbar bg-base-100">
    <div className="navbar-start">
      <div className="dropdown">
        <button tabIndex={0} className="btn btn-ghost btn-circle">
          <MenuIcon />
        </button>
        <ul className="menu menu-compact dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
          {navLinks.map((link) => (
            <li key={link.title}>
              <a tabIndex={0} href={link.path}>
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="navbar-center">
      <a href="./" className="btn btn-ghost text-xl normal-case">
        daisyUI react
      </a>
    </div>
    <div className="navbar-end">
      <button className="btn btn-ghost btn-circle">
        <SearchIcon />
      </button>
      <button className="btn btn-ghost btn-circle">
        <div className="indicator">
          <NotificationIcon />
          <span className="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
    </div>
  </div>
);
