import scss from './SearchBar.module.css';
import { BsSearchHeart } from "react-icons/bs";

export default function SearchBar({ getRequestPhrase }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchphrase = event.target.elements.searchField.value;
    if (searchphrase.trim() !== "") {
      getRequestPhrase(event.target.elements.searchField.value)
    }
    event.target.reset();
  }

  return (
    <>
      <header className={scss.container}>
        <form onSubmit={handleSubmit} className={scss.searchForm}>
          <input
            className={scss.searchField}
            name='searchField'
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={scss.SearchBtn}><BsSearchHeart className={scss.findIcon}/></button>
        </form>
      </header>
    </>
  );
}