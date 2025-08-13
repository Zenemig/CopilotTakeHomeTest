export interface Bird {
  id: string;
  thumb_url: string; // For grid cards
  image_url: string; // For detail page (high-res)
  latin_name: string; // Scientific name
  english_name: string; // Common name
  notes: Note[];
  // Future language support: spanish_name?, french_name?, etc.
  // Dynamic parsing will handle any field ending with '_name'
}

export interface Note {
  id: string;
  comment: string; // The actual note content
  timestamp: number; // Seconds from epoch (32-bit Int limitation)
}

export interface SearchState {
  query: string;
  filteredBirds: Bird[];
}

// GraphQL operation types
export interface GetBirdsData {
  birds: Bird[];
}

export interface GetBirdData {
  bird: Bird;
}

export interface GetBirdVariables {
  id: string;
}

export interface AddNoteVariables {
  birdId: string;
  comment: string;
  timestamp: number;
}
