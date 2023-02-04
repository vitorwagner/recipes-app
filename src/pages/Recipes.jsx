import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinks, fetchMeals, fetchMealCategories,
  fetchDrinkCategories, fetchDrinkByCategory,
  fetchMealByCategory } from '../services/fetch';
import context from '../context/context';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import Card from '../components/Card';

function Recipes() {
  const { recipes, setRecipes } = useContext(context);
  const [categories, setCategories] = useState({
    meals: [],
    drinks: [],
  });
  const [filter, setFilter] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  const meals = async () => {
    const mealList = await fetchMeals();
    setRecipes((prevRecipes) => ({ ...prevRecipes, meals: mealList.meals }));
    const catList = await fetchMealCategories();
    setCategories((prevCategories) => ({ ...prevCategories, meals: catList.meals }));
  };

  const drinks = async () => {
    const list = await fetchDrinks();
    setRecipes((prevRecipes) => ({ ...prevRecipes, drinks: list.drinks }));
    const catList = await fetchDrinkCategories();
    setCategories((prevCategories) => ({ ...prevCategories, drinks: catList.drinks }));
  };

  const toggleDrinkFilter = async (name) => {
    if (!filter) {
      const list = await fetchDrinkByCategory(name);
      setRecipes((prevRecipes) => ({ ...prevRecipes, drinks: list.drinks }));
      setFilter(true);
    } else {
      drinks();
      setFilter(false);
    }
  };

  const toggleMealFilter = async (name) => {
    if (!filter) {
      const list = await fetchMealByCategory(name);
      setRecipes((prevRecipes) => ({ ...prevRecipes, meals: list.meals }));
      setFilter(true);
    } else {
      meals();
      setFilter(false);
    }
  };

  const resetFilter = async () => {
    setFilter(false);
    meals();
    drinks();
  };

  useEffect(() => {
    meals();
    drinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CARD_LENGTH = 12;
  const CAT_LENGTH = 5;

  return (
    <div>
      <Header />
      <div className="container">

        <div className="row">
          <button
            data-testid="All-category-filter"
            onClick={ resetFilter }
            className="btn col-2 d-flex flex-column align-items-center"
          >
            <img
              src={ pathname === '/drinks' ? drinkIcon : mealIcon }
              alt="Filter icon"
              style={ { width: '2rem' } }
            />
            <p style={ { fontSize: '0.75rem' } }>All</p>
          </button>

          {pathname === '/drinks'
      && categories.drinks.slice(0, CAT_LENGTH).map((cat) => (
        <button
          key={ cat.strCategory }
          data-testid={ `${cat.strCategory}-category-filter` }
          name={ cat.strCategory }
          onClick={ () => toggleDrinkFilter(cat.strCategory) }
          className="btn col-2 d-flex flex-column align-items-center"
        >
          <img src={ drinkIcon } alt="Filter icon" style={ { width: '2rem' } } />
          <p style={ { fontSize: '0.75rem' } }>{cat.strCategory}</p>
        </button>))}

          {pathname === '/meals'
          && categories.meals.slice(0, CAT_LENGTH).map((cat) => (
            <button
              key={ cat.strCategory }
              data-testid={ `${cat.strCategory}-category-filter` }
              name={ cat.strCategory }
              onClick={ () => toggleMealFilter(cat.strCategory) }
              className="btn col-2 d-flex flex-column align-items-center"
            >
              <img src={ mealIcon } alt="Filter icon" style={ { width: '2rem' } } />
              <p style={ { fontSize: '0.75rem' } }>{cat.strCategory}</p>
            </button>))}
        </div>
      </div>

      <div className="container">
        <div className="card-group row mx-auto">
          {pathname === '/drinks'
      && recipes.drinks.slice(0, CARD_LENGTH).map((drink, index) => (<Card
        key={ drink.idDrink }
        index={ index }
        name={ drink.strDrink }
        id={ drink.idDrink }
        meal={ false }
        thumbnail={ drink.strDrinkThumb }
      />))}
        </div>
      </div>

      <div className="container">
        <div className="row card-group">
          {pathname === '/meals'
      && recipes.meals.slice(0, CARD_LENGTH).map((meal, index) => (<Card
        key={ meal.idMeal }
        index={ index }
        name={ meal.strMeal }
        id={ meal.idMeal }
        meal
        thumbnail={ meal.strMealThumb }
      />))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Recipes;
