import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import LoadMore from '../components/LoadMore/LoadMore';
import SearchBar from '../components/SearchBar/SearchBar';
import { PuffLoader } from 'react-spinners';
import {fetchImages} from '../galleri.js';
import { useState } from 'react';
import { useEffect } from 'react';
import '../components/App';
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
        setPageNumber(() => 1);
      }
    }, [requestPhrase]);
  
    useEffect(() => {
      async function getData() {
        if (requestPhrase === '') {
          return
        }
  
        try {
          setLoaderIsVisible(true);
          setLoadMoreIsVisible(false);
  
          const data = await getUnsplashData({ query: requestPhrase, page: pageNumber });
          if (data.total_pages > pageNumber) {
            setLoadMoreIsVisible(true);
          } else {
            setLoadMoreIsVisible(false);
          }
          setGalleryItem((prevImages) => [...prevImages, ...data.results]);
        } catch {
          setError(true);
        } finally {
          setLoaderIsVisible(false);
        }
      }
      getData();
    }, [requestPhrase, pageNumber]);
  
  
    const onSubmit = (inputPhrase) => {
      setPageNumber(() => 1);
      setRequestPhrase(inputPhrase);
    }
  
    const loadMore = () => {
      setPageNumber(prevPageNum => prevPageNum + 1)
    }
  
    return (
      <>
        <SearchBar getRequestPhrase={onSubmit} />
        {galleryItem.length > 0 && <ImageGallery imagesData={galleryItem} />}
        {loaderIsVisible && <PuffLoader
          color="#1561f4"
          cssOverride={{}}
          className='loader'
        />}
        {error && <ErrorMessage />}
        {loadMoreIsVisible && <LoadMore onLoadMore={loadMore} />}
      </>
    )
  };
  
  export default App