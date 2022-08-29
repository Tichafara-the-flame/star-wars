//interfaces to get types on api response

export interface ICharacter {
  films: string[];
  name: string;
  homeworld: string;
  species: string[];
}

export interface IFinalMovie {
  title: string;
  release_date: string;
  opening_crawl: string;
}

export interface IFinalCharacter {
  name: string;
  planetName: string;
  planetPopulation: string;
  moviesData: IFinalMovie[];
}

export interface IHomeWorld {
  name: string;
  population: string;
}

export interface IServerResponse<T> {
  results: T[];
}
