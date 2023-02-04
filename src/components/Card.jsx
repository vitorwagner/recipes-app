import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React from 'react';

function Card({ name, thumbnail, index, id, meal = true }) {
  const history = useHistory();

  const redirect = () => {
    if (meal) {
      history.push(`/meals/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  return (
    <button
      onClick={ redirect }
      data-testid={ `${index}-recipe-card` }
      className="card col-6 g-0"
    >
      <img
        src={ thumbnail }
        alt={ name }
        data-testid={ `${index}-card-img` }
        className="card-img-top"
      />
      <div className="card-body">
        <h3 data-testid={ `${index}-card-name` } className="card-title">{name}</h3>

      </div>
    </button>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  meal: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default Card;
