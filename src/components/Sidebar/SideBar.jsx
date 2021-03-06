import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './SideBar.css';
import fetchAnimeInfo from '../../app/actions/apiActions';

const propTypes = {
  onButtonPress: PropTypes.func.isRequired,
};

const cx = classNames.bind(styles);

export const ageRatingArray = ['G', 'PG', 'R', 'R18'];

class Sidebar extends React.PureComponent {
  state = {
    rating: ageRatingArray[0],
  }

  onClick = () => {
    this.props.onButtonPress(this.state.rating);
  }

  handleRatingChange = ({ target }) => {
    console.log('target')
    const { checked, name } = target;
    this.setState((state) => {
      const newRating = new Set(state.rating);
      checked ? newRating.add(name) : newRating.delete(name);
      return { rating: Array.from(newRating) };
    });
  }

  render() {
    return (
      <aside className={cx('sidebar')}>
        <button className={cx('getAnimeButton')} type="button" onClick={this.onClick}>
        find
        </button>
        <fieldset className={cx('ratingFilter')} name="ageRating">
          <legend className={cx('filterName')}>
            Age rating
          </legend>
          {ageRatingArray.map(rating => (
            <div className={cx('checkbox')} key={rating}>
              <label htmlFor={rating}>
                <input
                  id={rating}
                  name={rating}
                  type="checkbox"
                  checked={this.state.rating.indexOf(rating) > -1}
                  onChange={this.handleRatingChange}
                />
                {rating}
              </label>
            </div>
          ))}
        </fieldset>
      </aside>
    );
  }
}

Sidebar.propTypes = propTypes;

export default connect(null, { onButtonPress: fetchAnimeInfo })(Sidebar);
export { Sidebar };
