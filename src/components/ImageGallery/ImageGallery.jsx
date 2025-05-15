import css from './imageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
export default function ImageGallery({ imageData }) {
    return (
      <>
        <ul className={css.container}>
          {
            imageData.map(imgItem => {
              return (
                <li key={imgItem.id}>
                  <ImageCard imgData={imgItem} />
                </li>
              )
            })
          }
        </ul>
      </>
    );
  }