import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneCard({ name, thumbnail, index, category,
  doneDate, tags, nationality, id, type, alcoholicOrNot }) {
  const history = useHistory();
  const [shared, setShared] = useState(false);

  const redirect = () => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div data-testid={ `${index}-recipe-card` } className="card flex-row g-0 text-center">
      <div onClick={ redirect } role="button" onKeyPress={ redirect } tabIndex={ 0 }>
        <img
          src={ thumbnail }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          width="50"
          className="card-img-top"
        />
        <p data-testid={ `${index}-horizontal-name` } className="card-title">{name}</p>
      </div>
      <div className="card-body">
        <p data-testid={ `${index}-horizontal-top-text` }>
          {type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot}
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

        <button
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          onClick={ () => {
            copy(`http://localhost:3000/${type}s/${id}`);
            setShared(true);
          } }
          className="btn btn-primary"
        >
          Share
        </button>
        { shared && <p>Link copied!</p>}

        {tags[0]
        && (
          <div className="text-muted">
            <span data-testid={ `${index}-${tags[0]}-horizontal-tag` }>
              {tags[0]}
            </span>
            {tags[1]
              ? <span>, </span>
              : ''}
            <span data-testid={ `${index}-${tags[1]}-horizontal-tag` }>
              {tags[1]}
            </span>
          </div>
        )}

      </div>
    </div>
  );
}

DoneCard.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  thumbnail: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
};

export default DoneCard;
