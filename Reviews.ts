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
  updated: Icon
  rights: Icon
  title: Icon
  icon: Icon
  link: Array<Link>
  id: Icon
}

export interface FeedAuthor {
  name: Icon
  uri: Icon
}

export interface Icon {
  label: string
}

export interface Entry {
  "im:name"?: Icon
  rights?: Icon
  "im:price"?: Price
  "im:image"?: Array<Image>
  "im:artist"?: Artist
  title: Icon
  link: Link
  id: Id
  "im:contentType": ContentType
  category?: Category
  "im:releaseDate"?: ReleaseDate
  author?: EntryAuthor
  "im:version"?: Icon
  "im:rating"?: Icon
  content?: Content
  "im:voteSum"?: Icon
  "im:voteCount"?: Icon
}

export interface EntryAuthor {
  uri: Icon
  name: Icon
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
  attributes: Icon
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