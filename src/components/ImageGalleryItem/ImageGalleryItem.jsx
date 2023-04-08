import css from './ImageGalleryItem.module.css';
import Modal from '../Modal';
import { Component } from 'react';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { smallUrl, alt, largeImageURL } = this.props;

    return (
      <>
        <li className={css.item}>
          <img
            src={smallUrl}
            alt={alt}
            onClick={this.toggleModal}
            className={css.galleryItem}
          />
        </li>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={alt} className={css.modalLargeImg} />
          </Modal>
        )}
      </>
    );
  }
}
