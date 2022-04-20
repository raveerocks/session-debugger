import { MdOutlineQueryStats } from 'react-icons/md';

const NavBar = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-lg primary-dark-colored'>
        <span className='navbar-brand primary-dark-colored-highlight' href='#'>
          BrowserStack
        </span>
        <div className='collapse navbar-collapse' id='navbarText'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <span className='nav-link'>
                Session <span className='sr-only'>(current)</span>
              </span>
            </li>
            <li className='nav-item'>
              <span className='nav-link' href='#'>
                Compare
              </span>
            </li>
            <li className='nav-item'>
              <span className='nav-link' href='#'>
                Build
              </span>
            </li>
          </ul>
          <span className='navbar-text'>About</span>
        </div>
      </nav>
      <div className='jumbotron jumbotron-fluid primary-colored'>
        <div className='container'>
          <h1 className='display-4 primary-colored-highlight'>
            <MdOutlineQueryStats /> Session Statistics
          </h1>
          <p>Trying to fetch some important stuff from the logs!</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
