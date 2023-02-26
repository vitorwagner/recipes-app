import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../style/Header.css';

function Header() {
  const history = useHistory();
  const { pathname } = history.location;
  const [showSearchBar, setShowSearchBar] = React.useState(false);

  const profileButton = () => (
    <Link
      data-testid="profile-top-btn"
      src={ profileIcon }
      to="/profile"
      className="headerIcon"
    >
      <img src={ profileIcon } alt="Ícone de perfil" />
    </Link>);

  const searchButton = () => (
    <button
      src={ searchIcon }
      data-testid="search-top-btn"
      onClick={ () => setShowSearchBar(!showSearchBar) }
    >
      <img src={ searchIcon } alt="Ícone de busca" />
    </button>);

  return (
    <header className="header">
      {pathname === '/meals' && (
        <>
          <h3 data-testid="page-title">Meals</h3>
          { searchButton() }
          {
            showSearchBar && <SearchBar />
          }
          { profileButton() }
        </>)}
      {pathname === '/drinks' && (
        <>
          <h3 data-testid="page-title">Drinks</h3>
          <button
            data-testid="search-top-btn"
            src={ searchIcon }
            onClick={ () => setShowSearchBar(!showSearchBar) }
          >
            <img src={ searchIcon } alt="Ícone de busca" />
          </button>
          {
            showSearchBar && <SearchBar />
          }
          { profileButton() }
        </>)}
      {pathname === '/profile' && (
        <>
          <h3 data-testid="page-title">Profile</h3>
          { profileButton() }
        </>)}
      {pathname === '/done-recipes' && (
        <>
          <h3 data-testid="page-title">Done Recipes</h3>
          { profileButton() }
        </>)}
      {pathname === '/favorite-recipes' && (
        <>
          <h3 data-testid="page-title">Favorite Recipes</h3>
          { profileButton() }
        </>)}
    </header>
  );
}

export default Header;
