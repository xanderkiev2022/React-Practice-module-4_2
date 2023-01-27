import React, { useState, useEffect } from 'react';
import { MoviesGallery } from './MoviesGallery/MoviesGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { fetchMovies } from 'service/movies-api';
import { InputValue } from './Form/Form';

export const App = () => {
  const [movies, setmovies] = useState([]);
  const [currentImg, setcurrentImg] = useState(null);
  const [query, setQuery] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [page, setpage] = useState(1);

  const showPoster = data => {
    setcurrentImg(data);
  };

  const loadMore = () => {
    setpage(prevState => prevState + 1);
  };

  const deleteMovie = id => {
    setmovies(prevState => prevState.filter(movie => movie.id !== id));
  };

  const closeModal = () => {
    setcurrentImg(null);
  };

  const changeSearchValue = query => {
    setQuery(query);
    setmovies([]);
    setpage(1);
  };

  useEffect(() => {
    console.log(query);
    if (query !== '') {
      setisLoading(true);
      fetchMovies(page, query)
        .then(data => {
          setmovies(prevMovies => [...prevMovies, ...data.data.results]);
        })
        .catch(error => console.log(error))
        .finally(() => setisLoading(false));
    }
  }, [page, query]);

  return (
    <>
      <InputValue changeSearch={changeSearchValue} />

      {movies.length > 0 && (
        <>
          <MoviesGallery
            movies={movies}
            deleteMovie={deleteMovie}
            showPoster={showPoster}
          />
          <Button text="Load more" clickHandler={loadMore} />
        </>
      )}

      {currentImg && <Modal currentImg={currentImg} close={closeModal} />}
      {isLoading && <p>Loading....</p>}
    </>
  );
};

// export class App extends Component {

//   state = {
//     movies: [],
//     currentImg: null,
//     isListShown: false,
//     isLoading: false,
//     page: 1,
//   };

//   componentDidUpdate(_, prevState) {
//     const { isListShown, page } = this.state;
//     if (
//       (isListShown && prevState.isListShown !== isListShown) ||
//       (isListShown && prevState.page !== page)
//     ) {
//       this.getMovie();
//     }
//     if (!isListShown && prevState.isListShown !== isListShown) {
//       this.setState({ page: 1, movies: [] });
//     }
//   }

//   getMovie = () => {
//     this.setState({ isLoading: true });
//     fetchMovies(this.state.page)
//       .then(data => {
//         this.setState(prevState => ({
//           movies: [...prevState.movies, ...data.data.results],
//         }));
//       })
//       .catch(error => console.log(error))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   deleteMovie = id => {
//     this.setState(prevState => {
//       return {
//         movies: prevState.movies.filter(movie => movie.id !== id),
//       };
//     });
//   };

//   showPoster = data => {
//     this.setState({ currentImg: data });
//   };

//   showMovies = () => {
//     console.log('should show movies here');
//     this.setState(prevState => ({ isListShown: !prevState.isListShown }));
//   };

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   closeModal=()=>{
//     this.setState({ currentImg: null });
//   }

//   render() {
//     const { currentImg, isListShown, movies } = this.state;
//     return (
//       <>
//         <Button
//           clickHandler={this.showMovies}
//           text={isListShown ? 'Hide Movies List' : 'Show Movies List'}
//         />
//         {isListShown && (
//           <>
//             <MoviesGallery
//               movies={movies}
//               deleteMovie={this.deleteMovie}
//               showPoster={this.showPoster}
//             />
//             <Button text="Load more" clickHandler={this.loadMore} />
//           </>
//         )}
//         {currentImg && (
//           <Modal currentImg={currentImg} close={this.closeModal} />
//         )}
//       </>
//     );
//   }
// }
