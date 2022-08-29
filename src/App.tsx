import axios from "axios";
import { useState } from "react";
import CharacterCard from "./CharacterCard";
import {
  ICharacter,
  IFinalCharacter,
  IFinalMovie,
  IHomeWorld,
  IServerResponse,
} from "./types/interfaces";

//API URL
const API_URL = "https://swapi.dev/api";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<IFinalCharacter[] | undefined>(undefined);

  const getPlanetData = async (url: string) => {
    try {
      const response = await axios.get<IHomeWorld>(url);
      const planetName = response.data.name;
      const planetPopulation = response.data.population;
      return { planetName, planetPopulation };
    } catch (error) {
      throw new Error();
    }
  };

  const getMoviesData = async (urls: string[]) => {
    const moviesData: IFinalMovie[] = await Promise.all(
      urls.map(async (url) => {
        try {
          const response = await axios.get<IFinalMovie>(url);
          const data = response.data;
          return {
            title: data.title,
            release_date: data.release_date,
            opening_crawl: data.opening_crawl,
          };
        } catch (error) {
          throw new Error();
        }
      })
    );
    return moviesData;
  };

  const onClick = async () => {
    //check if value is empty
    if (searchTerm === "") {
      setError("Please enter the name");
      return;
    }

    //delete previous data
    setData(undefined);

    //start loading
    setIsLoading(true);

    //get data from character endpoint
    try {
      //axios call to get characters info
      const response = await axios.get<IServerResponse<ICharacter>>(
        `${API_URL}/people?search=${searchTerm}`
      );
      const data = response.data;

      //map over result and get additional data
      const characters = await Promise.all(
        data.results.map(async (character) => {
          //get planet name and population
          const { planetName, planetPopulation } = await getPlanetData(
            character.homeworld
          );
          const moviesData = await getMoviesData(character.films);
          return {
            name: character.name,
            planetName,
            planetPopulation,
            moviesData,
          };
        })
      );
      //set data
      setData(characters);
    } catch (error) {
      throw new Error();
    }
    //stop loading
    setIsLoading(false);
  };

  return (
    <div className='bg-zinc-200 min-h-screen w-screen flex flex-col items-center space-y-12 pb-10 overflow-x-hidden'>
      <h1 className='text-violet-600 text-4xl md:text-6xl pt-20'>
        Star Wars Search
      </h1>
      <div>
        <div className='flex flex-col md:flex-row md:space-x-1'>
          <input
            type='text'
            className={`shadow appearance-none border-2 border-white ${
              //change border color when error
              error && "!border-red-500"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-violet-600 min-w-[320px] md:min-w-[400px] transition-all duration-200 ease-in-out`}
            placeholder='Enter your favorite star wars character...'
            value={searchTerm}
            onChange={(e) => {
              //change variable the moment the input change
              setSearchTerm(e.target.value);
              //reset error after every input change
              setError("");
            }}
          />
          <button
            className='bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white px-4 py-2 rounded-md transition-all duration-200 ease-in-out'
            onClick={onClick}
          >
            Search
          </button>
        </div>
        {/* show error message */}
        {error && <p className='pt-2 pl-1 text-red-500'>{error}</p>}
      </div>
      {isLoading && <p className='w-full text-center text-lg'>Loading...</p>}
      {typeof data !== "undefined" && data.length === 0 && !isLoading && (
        <div className='w-full flex flex-col justify-center items-center'>
          <p className='text-lg'>
            There is no character that matches your search term.
          </p>
          <button
            className='bg-zinc-200 text-red-500 hover:underline'
            onClick={() => {
              //clear search term
              setSearchTerm("");
              //make data undefined so this message will disappear
              setData(undefined);
            }}
          >
            Clear Search Term
          </button>
        </div>
      )}
      {typeof data !== "undefined" &&
        data.length !== 0 &&
        data.map((character, index) => {
          return <CharacterCard {...character} key={index} />;
        })}
    </div>
  );
}

export default App;
