export interface OLBOOK {
  key: string;
  type: string;
  seed?: (string)[] | null;
  title: string;
  title_suggest: string;
  edition_count: number;
  edition_key?: (string)[] | null;
  publish_date?: (string)[] | null;
  publish_year?: (number)[] | null;
  first_publish_year: number;
  number_of_pages_median: number;
  lccn?: (string)[] | null;
  publish_place?: (string)[] | null;
  oclc?: (string)[] | null;
  contributor?: (string)[] | null;
  lcc?: (string)[] | null;
  ddc?: (string)[] | null;
  isbn?: (string)[] | null;
  last_modified_i: number;
  ia?: (string)[] | null;
  ebook_count_i: number;
  has_fulltext: boolean;
  public_scan_b: boolean;
  ia_collection_s: string;
  lending_edition_s: string;
  lending_identifier_s: string;
  printdisabled_s: string;
  cover_edition_key: string;
  cover_i: number;
  publisher?: (string)[] | null;
  language?: (string)[] | null;
  author_key?: (string)[] | null;
  author_name?: (string)[] | null;
  author_alternative_name?: (string)[] | null;
  person?: (string)[] | null;
  place?: (string)[] | null;
  subject?: (string)[] | null;
  id_goodreads?: (string)[] | null;
  id_librarything?: (string)[] | null;
  id_overdrive?: (string)[] | null;
  ia_loaded_id?: (string)[] | null;
  ia_box_id?: (string)[] | null;
  publisher_facet?: (string)[] | null;
  person_key?: (string)[] | null;
  place_key?: (string)[] | null;
  person_facet?: (string)[] | null;
  subject_facet?: (string)[] | null;
  _version_: number;
  place_facet?: (string)[] | null;
  lcc_sort: string;
  author_facet?: (string)[] | null;
  subject_key?: (string)[] | null;
  ddc_sort: string;
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

export interface CollectionBook {
  id: number
  ISBN: string
  OLkey: string
  status: string
  title: string
  author: string
  cover: number | null
  pages: number | null
  publishedYear: number
  owned: boolean
  want: boolean
  favourite: boolean
  createdAt: Date
  updatedAt: Date
}
