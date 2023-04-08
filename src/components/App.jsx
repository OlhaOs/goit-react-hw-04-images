import React from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

export default class App extends React.Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  handleSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };
  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          searchQuery={this.state.searchQuery}
          page={this.state.page}
          onLoadMoreClick={this.handleLoadMore}
        />
      </>
    );
  }
}
