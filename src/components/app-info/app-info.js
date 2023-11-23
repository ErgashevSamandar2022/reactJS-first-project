import './app-info.scss';

const AppInfo = ({ allMoviesCount, favouriteMoviesCount }) => {
    return (
        <div className='app-info'>
            <p className='fs-3 text-uppercase'>
                Barcha kinolar soni: {allMoviesCount}{' '}
            </p>
            <p className='fs-4 text-uppercase'>
                Sevimli film: {favouriteMoviesCount}
            </p>
        </div>
    );
};

export default AppInfo;
