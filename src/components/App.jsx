import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import LoadMore from '../components/LoadMore/LoadMore';
import SearchBar from '../components/SearchBar/SearchBar';
import { PuffLoader } from 'react-spinners';
import { fetchImages } from '../galleri.js';
import { useState, useEffect } from 'react';

function App() {
  const [requestPhrase, setRequestPhrase] = useState('');
  const [galleryItem, setGalleryItem] = useState([]);
  const [loaderIsVisible, setLoaderIsVisible] = useState(false);
  const [loadMoreIsVisible, setLoadMoreIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (requestPhrase !== '') {
      setGalleryItem([]);
      setPageNumber(1);
    }
  }, [requestPhrase]);

  useEffect(() => {
    async function getData() {
      if (requestPhrase === '') return;

      try {
        setLoaderIsVisible(true);
        setLoadMoreIsVisible(false);

        const data = await fetchImages(requestPhrase, pageNumber);
        console.log('API response:', data);

        if (data.total_pages > pageNumber) {
          setLoadMoreIsVisible(true);
        }

        if (Array.isArray(data.results)) {
          setGalleryItem((prevImages) => [...prevImages, ...data.results]);
        } else {
          console.error('❌ Помилка: data.results не масив', data);
          setError(true);
        }
      } catch (e) {
        console.error('❌ Помилка при fetch:', e);
        setError(true);
      } finally {
        setLoaderIsVisible(false);
      }
    }

    getData();
  }, [requestPhrase, pageNumber]);

  const onSubmit = (inputPhrase) => {
    setPageNumber(1);
    setRequestPhrase(inputPhrase);
  };

  const loadMore = () => {
    setPageNumber((prevPageNum) => prevPageNum + 1);
  };

  return (
    <>
      <SearchBar getRequestPhrase={onSubmit} />
      {galleryItem.length > 0 && <ImageGallery imagesData={galleryItem} />}
      {loaderIsVisible && (
        <PuffLoader color="#1561f4" cssOverride={{}} className="loader" />
      )}
      {error && <ErrorMessage />}
      {loadMoreIsVisible && <LoadMore onLoadMore={loadMore} />}
    </>
  );
}

export default App;
