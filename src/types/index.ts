export interface ReadModelCharaters {
  characters: Character[];
  lastPage: number;
}

export interface ReadModelHouses {
  houses: House[];
  lastPage: number;
}

export interface ReadModelBooks {
  books: Book[];
  lastPage: number;
}

export interface ReadModelItem {
  item: any;
}

export interface ReadModelNameAndID {
  id: string;
  name: string;
}

export interface House {
  url: string;
  name: string;
  region: string;
  coatOfArms: string;
  words: string;
  titles: string[];
  seats: string[];
  currentLord: string;
  heir: string;
  overlord: string;
  founded: string;
  founder: string;
  diedOut: string;
  ancestralWeapons: string[];
  cadetBranches: string[];
  swornMembers: string[];
}

export interface Character {
  url: string;
  name: string;
  gender: string;
  culture: string;
  born: string;
  died: string;
  titles: string[];
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: string[];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
  playedBy: string[];
}

export interface Book {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: string;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
  characters: string[];
  povCharacters: string[];
}
