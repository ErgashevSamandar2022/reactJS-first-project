import MovieListItem from '../movie-list-item/movie-list-item';
import './movie-list.scss';

const MovieList = ({ data, onDelete, onToggleProp }) => {
    return (
        <ul className='movie-list list-group'>
            {data.map((item) => (
                <MovieListItem
                    key={item.id}
                    name={item.name}
                    viewers={item.viewers}
                    favourite={item.favourite}
                    like={item.like}
                    onDelete={() => {
                        onDelete(item.id);
                    }}
                    onToggleProp={(e) => {
                        onToggleProp(
                            item.id,
                            e.currentTarget.getAttribute('data-toggle')
                        );
                    }}
                />
                // <MovieListItem {...item} />
            ))}
        </ul>
    );
};

export default MovieList;
