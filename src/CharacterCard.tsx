import { useState } from "react";
import MovieCard from "./MovieCard";
import { IFinalCharacter } from "./types/interfaces";

const CharacterCard: React.FC<IFinalCharacter> = ({
  moviesData,
  name,
  planetName,
  planetPopulation,
}) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  return (
    //toggle between show and hide state
    <button
      onClick={() => setIsShown((prev) => !prev)}
      className='bg-white hover:bg-zinc-50 active:bg-zinc-100 transition-all duration-200 ease-in-out rounded-lg '
    >
      <div className='min-w-[300px] md:min-w-[500px]  px-5 py-2 '>
        <h3 className='text-2xl font-semibold text-violet-600'>{name}</h3>
        <p>
          Planet:{" "}
          <span className='text-lg font-semibold text-violet-600'>
            {planetName}
          </span>
        </p>
        <p>
          Planet population:{" "}
          <span className='text-lg font-semibold text-violet-600'>
            {planetPopulation}
          </span>
        </p>
        <p className='text-xl pt-4 text-center w-full'>
          Click on me to see movies I am in!
        </p>
      </div>
      <div className='space-y-2 w-full'>
        {isShown &&
          moviesData.map((data, index) => {
            return <MovieCard {...data} key={index} />;
          })}
      </div>
    </button>
  );
};

export default CharacterCard;
