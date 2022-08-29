import { IFinalMovie } from "./types/interfaces";

const MovieCard: React.FC<IFinalMovie> = ({
  opening_crawl,
  release_date,
  title,
}) => {
  return (
    <div className='text-md bg-zinc-500 py-3 px-4 font-semibold max-w-[500px]'>
      <h3 className='text-white'>{title}</h3>
      <p>
        Release date: <span className='text-white'>{release_date}</span>
      </p>
      <p>
        Opening crawl: <span className='text-white'>{opening_crawl}</span>
      </p>
    </div>
  );
};

export default MovieCard;
