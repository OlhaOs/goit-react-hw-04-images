import { Bars } from 'react-loader-spinner';
import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import css from './ImageGallery.module.css';

const KEY_API = '34373516-b73f95caf1f569d1c97db55cd';

export default class ImageGallery extends Component {
  state = {
    pictures: null,
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchQuery !== this.props.searchQuery ||
      prevProps.page !== this.props.page
    ) {
      this.setState({ loading: true });

      fetch(
        `https://pixabay.com/api/?q=${this.props.searchQuery}&page=${this.props.page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(resp => resp.json())
        .then(data => {
          if (data.hits.length !== 0) {
            if (this.props.page === 1) {
              this.setState({ pictures: null });
            }
            this.setState(prevState => ({
              pictures: prevState.pictures
                ? [...prevState.pictures, ...data.hits]
                : data.hits,
            }));
          } else {
            this.setState({ pictures: null });
            alert('We have nothing for this query');
          }
        })
        .finally(() => this.setState({ loading: false }));
    }
  }
  onLoadMoreClick = () => {
    this.props.onLoadMoreClick();
  };

  render() {
    const { loading, pictures } = this.state;
    return (
      <div className={css.container}>
        {pictures && (
          <ul className={css.imageSet}>
            {pictures.map(picture => (
              <ImageGalleryItem
                key={picture.id}
                smallUrl={picture.webformatURL}
                largeImageURL={picture.largeImageURL}
                alt={picture.tags}
              />
            ))}
          </ul>
        )}
        {loading ? (
          <Bars
            height="40"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperClass={css.loader}
            visible={true}
          />
        ) : (
          pictures && <Button onLoadMoreClick={this.onLoadMoreClick} />
        )}
      </div>
    );
  }
}
