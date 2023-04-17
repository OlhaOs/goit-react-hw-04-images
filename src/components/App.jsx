import React, { useState } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
  };
  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
    console.log(page);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery
        searchQuery={searchQuery}
        page={page}
        onLoadMoreClick={handleLoadMore}
      />
    </>
  );
}

// export default class App extends React.Component {
//   state = {
//     searchQuery: '',
//     page: 1,
//   };

//   handleSubmit = searchQuery => {
//     this.setState({ searchQuery, page: 1 });
//   };
//   handleLoadMore = () => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };
//   render() {
//     return (
//       <>
//         <Searchbar onSubmit={this.handleSubmit} />
//         <ImageGallery
//           searchQuery={this.state.searchQuery}
//           page={this.state.page}
//           onLoadMoreClick={this.handleLoadMore}
//         />
//       </>
//     );
//   }
// }
