import mycss from './ImageCard.module.css';
export default function ImageCard({ imgData }) {
    return (
      <div className={mycss.container}>
        <img src={imgData.urls.small} alt={imgData.alt_description} />
      </div>
    );
  }