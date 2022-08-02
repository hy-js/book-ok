export interface OLBOOK {
  publishers: string[];
  number_of_pages: number;
  isbn_10: string[];
  covers: number[];
  key: string;
  authors: Type[];
  ocaid: string;
  contributions: string[];
  languages: Type[];
  classifications: Classifications;
  source_records: string[];
  title: string;
  identifiers: Identifiers;
  isbn_13: string[];
  local_id: string[];
  publish_date: string;
  works: Type[];
  type: Type;
  first_sentence: Created;
  latest_revision: number;
  revision: number;
  created: Created;
  last_modified: Created;
}

export interface Type {
  key: string;
}

export interface Classifications {}

export interface Created {
  type: string;
  value: string;
}

export interface Identifiers {
  goodreads: string[];
  librarything: string[];
}
