import css from './LoadMore.module.css';

export default function LoadMoreBtn({ onLoadMore }) {
  return (
    <div className={css.container}>
      <button type="button" onClick={onLoadMore} className={css.LoadMoreButton}>Load more</button>
    </div>
  );
}