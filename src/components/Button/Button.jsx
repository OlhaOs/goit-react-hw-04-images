import css from './Button.module.css'
export default function Button({ onLoadMoreClick }) {
  return (
    <button type="button" onClick={onLoadMoreClick} className={css.btn}>
      Load more
    </button>
  );
}
