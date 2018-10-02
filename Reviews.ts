// Generated with https://app.quicktype.io/.
// tslint:disable:object-literal-sort-keys

// To parse this data:
//
//   import { Convert, Reviews } from './file';
//
//   const reviews = Convert.toReviews(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Reviews {
  feed: Feed
}

export interface Feed {
  author: FeedAuthor
  entry: Array<Entry>
  updated: Labeled
  rights: Labeled
  title: Labeled
  icon: Labeled
  link: Array<Link>
  id: Labeled
}

export interface FeedAuthor {
  name: Labeled
  uri: Labeled
}

export interface Labeled {
  label: string
}

export interface Entry {
  "im:name"?: Labeled
  rights?: Labeled
  "im:price"?: Price
  "im:image"?: Array<Image>
  "im:artist"?: Artist
  title: Labeled
  link: Link
  id: Id
  "im:contentType": ContentType
  category?: Category
  "im:releaseDate"?: ReleaseDate
  author?: EntryAuthor
  "im:version"?: Labeled
  "im:rating"?: Labeled
  content?: Content
  "im:voteSum"?: Labeled
  "im:voteCount"?: Labeled
}

export interface EntryAuthor {
  uri: Labeled
  name: Labeled
  label: string
}

export interface Category {
  attributes: CategoryAttributes
}

export interface CategoryAttributes {
  "im:id": string
  term: string
  scheme: string
  label: string
}

export interface Content {
  label: string
  attributes: ContentAttributes
}

export interface ContentAttributes {
  type: Type
}

export enum Type {
  Text = "text"
}

export interface Id {
  label: string
  attributes?: { [key: string]: string }
}

export interface Artist {
  label: string
  attributes: ArtistAttributes
}

export interface ArtistAttributes {
  href: string
}

export interface ContentType {
  attributes: ContentTypeAttributes
}

export interface ContentTypeAttributes {
  term: Label
  label: Label
}

export enum Label {
  Application = "Application"
}

export interface Image {
  label: string
  attributes: ImageAttributes
}

export interface ImageAttributes {
  height: string
}

export interface Price {
  label: string
  attributes: PriceAttributes
}

export interface PriceAttributes {
  amount: string
  currency: string
}

export interface ReleaseDate {
  label: string
  attributes: Labeled
}

export interface Link {
  attributes: LinkAttributes
}

export interface LinkAttributes {
  rel: Rel
  type?: string
  href: string
}

export enum Rel {
  Alternate = "alternate",
  First = "first",
  Last = "last",
  Next = "next",
  Previous = "previous",
  Related = "related",
  Self = "self"
}