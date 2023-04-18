import css from './Modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    window.removeEventListener('keydown', onCloseModal);
  });

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onCloseModal = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.modalBackdrop} onClick={onCloseModal}>
      <div className={css.modalContent}>{children}</div>
    </div>,
    modalRoot
  );
}

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeydown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.onCloseModal);
//   }
//   handleKeydown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   onCloseModal = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={css.modalBackdrop} onClick={this.onCloseModal}>
//         <div className={css.modalContent}>{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }
