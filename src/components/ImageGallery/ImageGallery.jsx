import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ imagesData, showModal }) {
  // Перевірка, чи imagesData дійсно масив
  if (!Array.isArray(imagesData)) {
    console.error("❌ Помилка: imagesData не є масивом", imagesData);
    return null;
  }

  return (
    <ul className={css.container}>
      {imagesData.map(imgItem => (
        <li key={imgItem.id}>
          <ImageCard imgData={imgItem} showModal={showModal} />
        </li>
      ))}
    </ul>
  );
}
