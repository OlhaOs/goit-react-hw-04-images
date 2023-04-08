import css from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';
import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className={css.btn}>
            <span className={css.btnLabel}>
              <FiSearch />
            </span>
          </button>
          <input
            type="text"
            className={css.searchField}
            placeholder="Search images and photos"
            autoComplete="off"
            autoFocus
            onChange={this.handleChange}
            value={this.state.searchQuery}
          />
        </form>
      </header>
    );
  }
}
