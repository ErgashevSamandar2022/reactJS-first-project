import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import MovieList from '../movie-list/movie-list';
import MoviesAddForm from '../movies-add-form/movies-add-form';
import { v4 as uuidv4 } from 'uuid';
import './app.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Empire of osman',
                    viewers: 899,
                    favourite: false,
                    like: false,
                    id: 1,
                },
                {
                    name: 'Ertugrul',
                    viewers: 711,
                    favourite: false,
                    like: false,
                    id: 2,
                },
                {
                    name: 'Omar',
                    viewers: 1091,
                    favourite: false,
                    like: false,
                    id: 3,
                },
            ],
            term: '',
            filter: 'all',
        };
    }

    onDelete = (id) => {
        this.setState(({ data }) => ({
            data: data.filter((c) => c.id !== id),
        }));
        // const index = data.findIndex((c) => c.id === id);
        // data.splice(index, 1); // Mutable
    };

    addForm = (item) => {
        // e.preventDefault();
        const newItem = {
            name: item.name,
            viewers: item.viewers,
            id: uuidv4(),
            favourite: false,
            like: false,
        };
        this.setState(({ data }) => ({
            data: [...data, newItem],
        }));
    };

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map((item) => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] };
                }
                return item;
            }),
        }));
    };

    searchHandler = (arr, term) => {
        if (term.length === 0) {
            return arr;
        }
        return arr.filter((item) => item.name.toLowerCase().indexOf(term) > -1);
    };

    filterHandler = (arr, filter) => {
        switch (filter) {
            case 'popular':
                return arr.filter((c) => c.like);
            case 'mostViewers':
                return arr.filter((c) => c.viewers > 900);
            default:
                return arr;
        }
    };

    updateTermHandler = (term) => this.setState({ term });

    updateFilterHandler = (filter) => this.setState({ filter });

    render() {
        const { data, term, filter } = this.state;
        const allMoviesCount = data.length;
        const favouriteMoviesCount = data.filter((c) => c.favourite).length;
        const visubleData = this.filterHandler(
            this.searchHandler(data, term),
            filter
        );
        return (
            <div className='app font-monospace'>
                <div className='content'>
                    <AppInfo
                        allMoviesCount={allMoviesCount}
                        favouriteMoviesCount={favouriteMoviesCount}
                    />
                    <div className='search-panel'>
                        <SearchPanel
                            updateTermHandler={this.updateTermHandler}
                        />
                        <AppFilter
                            filter={filter}
                            updateFilterHandler={this.updateFilterHandler}
                        />
                    </div>
                    <MovieList
                        onToggleProp={this.onToggleProp}
                        data={visubleData}
                        onDelete={this.onDelete}
                    />
                    <MoviesAddForm addForm={this.addForm} />
                </div>
            </div>
        );
    }
}

export default App;
