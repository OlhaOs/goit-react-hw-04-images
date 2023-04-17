import { Bars } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import css from './ImageGallery.module.css';

const KEY_API = '34373516-b73f95caf1f569d1c97db55cd';

export default function ImageGallery({ onLoadMoreClick, searchQuery, page }) {
  const [pictures, setPictures] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(resp => resp.json())
      .then(data => {
        if (data.hits.length !== 0) {
          if (page === 1) {
            setPictures(null);
          }
          setPictures(prevState =>
            prevState ? [...prevState, ...data.hits] : data.hits
          );
        } else {
          setPictures(null);
          alert('We have nothing for this query');
        }
      })
      .finally(() => setLoading(false));
  }, [page, searchQuery]);

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
        pictures && <Button onLoadMoreClick={onLoadMoreClick} />
      )}
    </div>
  );
}

