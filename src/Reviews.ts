export interface Reviews {
  feed: Feed
}

interface Feed {
  entry: Array<Entry>
}

export interface Entry {
  /** Array with a length of 1 containing a date string. */
  updated: Array<string>

  /** Array with a length of 1 containing a number string. */
  id: Array<string>

  /** Array with a length of 1 containing a string. */
  title: Array<string>

  /** The first element is the text-version of the review. */
  content: Array<UnderscoreDollar>

  /** Array with a length of 1 containing a number string. */
  "im:voteSum": Array<string>

  /** Array with a length of 1 containing a number string. */
  "im:voteCount": Array<string>

  /** Array with a length of 1 containing a number string. */
  "im:rating": Array<string>

  /** Array with a length of 1 containing a number string. */
  "im:version": Array<string>

  author: Array<Author>
}

interface UnderscoreDollar {
  /** The content. */
  _: string

  /** The type of the content. */
  $: Type
}

interface Type {
  type: string
}

interface Author {
  /** Array with a length of 1 containing a string. */
  name: Array<string>

  /** Array with a length of 1 containing a URL. */
  uri: Array<string>
}