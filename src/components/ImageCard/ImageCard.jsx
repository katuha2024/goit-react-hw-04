import mycss from './ImageCard.module.css';

export default function ImageCard({ imgData, showModal }) {
  const handleOpenModal = () => {
    showModal(imgData); 
  };

  return (
    <div className={mycss.container}>
      <img
        onClick={handleOpenModal}
        src={imgData.urls.small}
        alt={imgData.alt_description}
      />
    </div>
  );
}
