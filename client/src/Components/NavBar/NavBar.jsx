import React from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../HelperFunctions/AuthHelper';

const NavBar = () => {

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="side-bar-container">
    <div className='side-bar'>
      <div className="nav-bar-logo-container">
        <img src={require('../../Assets/Logo/LogoCLASSIC.png')} className='nav-bar-logo' />
      </div>
      <nav className='nav-bar'>
        <ul>
          <li>
            <NavLink to='/home'>
              <button className='nav-button'>
                Home
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to='/notifications'>
              <button className='nav-button'>
                Notifications
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to='/messages'>
              <button className='nav-button'>
                Messages
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to='/events'>
              <button className='nav-button'>
                Events
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to='/profile'>
              <button className='nav-button'>
                Profile
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to='/preferences'>
              <button className='nav-button'>
                Preferences
              </button>
            </NavLink>
          </li>
          <li>
              <button className='nav-button' onClick={handleSignOut}>
                Sign Out
              </button>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  );
};

export default NavBar;
