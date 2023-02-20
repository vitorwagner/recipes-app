import oneMeal from './foodmocks/oneMeal';
import oneDrink from './foodmocks/oneDrink';
import drinks from './foodmocks/drinks';
import drinkCategories from './foodmocks/drinkCategories';
import cocktailDrinks from './foodmocks/cocktailDrinks';
import mealCategories from './foodmocks/mealCategories';
import meals from './foodmocks/meals';
import mealsByIngredient from './foodmocks/mealsByIngredient';
import beefMeals from './foodmocks/beefMeals';
import firstLetterN from './firstLetterN';
import emptyMock from './emptyMock';
import drinkLetterY from './drinkLetterY';

const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const mealsFunc = (url) => {
  if (url === `${MEALS_URL}search.php?s=Brown Stew Chicken`) {
    return oneMeal;
  }
  if (url === `${MEALS_URL}search.php?s=`) {
    return meals;
  }
  if (url === `${MEALS_URL}filter.php?i=chicken`) {
    return mealsByIngredient;
  }
  if (url === `${MEALS_URL}search.php?f=n`) {
    return firstLetterN;
  }
  if (url === `${MEALS_URL}list.php?c=list`) {
    return mealCategories;
  }
  if (url === `${MEALS_URL}filter.php?c=Beef`) {
    return beefMeals;
  }
  if (url === `${MEALS_URL}lookup.php?i=52771`) {
    return oneMeal;
  }
};

const drinksFunc = (url) => {
  if (url === `${DRINKS_URL}search.php?s=`) {
    return drinks;
  }
  if (url === `${DRINKS_URL}list.php?c=list`) {
    return drinkCategories;
  }
  if (url === `${DRINKS_URL}filter.php?c=Cocktail`) {
    return cocktailDrinks;
  }

  if (url === `${DRINKS_URL}lookup.php?i=178319`) {
    return oneDrink;
  }
};

const mockFetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === `${DRINKS_URL}search.php?s=barabam`
      || url === `${MEALS_URL}search.php?s=barabam`) {
      return Promise.resolve(emptyMock);
    }

    if (url === `${DRINKS_URL}search.php?f=y`
    || url === `${MEALS_URL}search.php?f=y`) {
      return Promise.resolve(drinkLetterY);
    }

    if (url.includes(MEALS_URL)) {
      return Promise.resolve(mealsFunc(url));
    }

    if (url.includes(DRINKS_URL)) {
      return Promise.resolve(drinksFunc(url));
    }
    // return Promise.resolve(mealsFunc(url) || drinksFunc(url));
  },
});

export default mockFetch;
