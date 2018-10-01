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
  'im:name'?: Icon
  rights?: Icon
  'im:price'?: Price
  'im:image'?: Array<Image>
  'im:artist'?: Artist
  title: Icon
  link: Link
  id: Id
  'im:contentType': ContentType
  category?: Category
  'im:releaseDate'?: ReleaseDate
  author?: EntryAuthor
  'im:version'?: Icon
  'im:rating'?: Icon
  content?: Content
  'im:voteSum'?: Icon
  'im:voteCount'?: Icon
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
  'im:id': string
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
  Text = 'text'
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
  Application = 'Application'
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
  Alternate = 'alternate',
  First = 'first',
  Last = 'last',
  Next = 'next',
  Previous = 'previous',
  Related = 'related',
  Self = 'self'
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
// tslint:disable-next-line:no-namespace
export namespace Convert {
  export function toReviews(json: string): Reviews {
    return cast(JSON.parse(json), r('Reviews'))
  }

  export function reviewsToJson(value: Reviews): string {
    return JSON.stringify(uncast(value, r('Reviews')), null, 2)
  }

  function invalidValue(typ: any, val: any): never {
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`)
  }

  function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
      const map: any = {}
      typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ })
      typ.jsonToJS = map
    }
    return typ.jsonToJS
  }

  function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
      const map: any = {}
      typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ })
      typ.jsToJSON = map
    }
    return typ.jsToJSON
  }

  function transform(val: any, typ: any, getProps: any): any {
    function transformPrimitive(typ: string, val: any): any {
      if (typeof typ === typeof val) { return val }
      return invalidValue(typ, val)
    }

    function transformUnion(typs: Array<any>, val: any): any {
      // val must validate against one typ in typs
      const l = typs.length
      for (let i = 0; i < l; i++) {
        const typ = typs[i]
        try {
          return transform(val, typ, getProps)
        } catch (_) { }
      }
      return invalidValue(typs, val)
    }

    function transformEnum(cases: Array<string>, val: any): any {
      if (cases.indexOf(val) !== -1) { return val }
      return invalidValue(cases, val)
    }

    function transformArray(typ: any, val: any): any {
      // val must be an array with no invalid elements
      if (!Array.isArray(val)) { return invalidValue('array', val) }
      return val.map(el => transform(el, typ, getProps))
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
      if (val === null || typeof val !== 'object' || Array.isArray(val)) {
        return invalidValue('object', val)
      }
      const result: any = {}
      Object.getOwnPropertyNames(props).forEach(key => {
        const prop = props[key]
        const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined
        result[prop.key] = transform(v, prop.typ, getProps)
      })
      Object.getOwnPropertyNames(val).forEach(key => {
        if (!Object.prototype.hasOwnProperty.call(props, key)) {
          result[key] = transform(val[key], additional, getProps)
        }
      })
      return result
    }

    if (typ === 'any') { return val }
    if (typ === null) {
      if (val === null) { return val }
      return invalidValue(typ, val)
    }
    if (typ === false) { return invalidValue(typ, val) }
    while (typeof typ === 'object' && typ.ref !== undefined) {
      typ = typeMap[typ.ref]
    }
    if (Array.isArray(typ)) { return transformEnum(typ, val) }
    if (typeof typ === 'object') {
      return typ.hasOwnProperty('unionMembers') ? transformUnion(typ.unionMembers, val)
        : typ.hasOwnProperty('arrayItems') ? transformArray(typ.arrayItems, val)
          : typ.hasOwnProperty('props') ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val)
    }
    return transformPrimitive(typ, val)
  }

  function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps)
  }

  function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps)
  }

  function a(typ: any) {
    return { arrayItems: typ }
  }

  function u(...typs: Array<any>) {
    return { unionMembers: typs }
  }

  function o(props: Array<any>, additional: any) {
    return { props, additional }
  }

  function m(additional: any) {
    return { props: [], additional }
  }

  function r(name: string) {
    return { ref: name }
  }

  const typeMap: any = {
    'Reviews': o([
      { json: 'feed', js: 'feed', typ: r('Feed') }
    ], false),
    'Feed': o([
      { json: 'author', js: 'author', typ: r('FeedAuthor') },
      { json: 'entry', js: 'entry', typ: a(r('Entry')) },
      { json: 'updated', js: 'updated', typ: r('Icon') },
      { json: 'rights', js: 'rights', typ: r('Icon') },
      { json: 'title', js: 'title', typ: r('Icon') },
      { json: 'icon', js: 'icon', typ: r('Icon') },
      { json: 'link', js: 'link', typ: a(r('Link')) },
      { json: 'id', js: 'id', typ: r('Icon') }
    ], false),
    'FeedAuthor': o([
      { json: 'name', js: 'name', typ: r('Icon') },
      { json: 'uri', js: 'uri', typ: r('Icon') }
    ], false),
    'Icon': o([
      { json: 'label', js: 'label', typ: '' }
    ], false),
    'Entry': o([
      { json: 'im:name', js: 'im:name', typ: u(undefined, r('Icon')) },
      { json: 'rights', js: 'rights', typ: u(undefined, r('Icon')) },
      { json: 'im:price', js: 'im:price', typ: u(undefined, r('IMPrice')) },
      { json: 'im:image', js: 'im:image', typ: u(undefined, a(r('IMImage'))) },
      { json: 'im:artist', js: 'im:artist', typ: u(undefined, r('IMArtist')) },
      { json: 'title', js: 'title', typ: r('Icon') },
      { json: 'link', js: 'link', typ: r('Link') },
      { json: 'id', js: 'id', typ: r('ID') },
      { json: 'im:contentType', js: 'im:contentType', typ: r('IMContentType') },
      { json: 'category', js: 'category', typ: u(undefined, r('Category')) },
      { json: 'im:releaseDate', js: 'im:releaseDate', typ: u(undefined, r('IMReleaseDate')) },
      { json: 'author', js: 'author', typ: u(undefined, r('EntryAuthor')) },
      { json: 'im:version', js: 'im:version', typ: u(undefined, r('Icon')) },
      { json: 'im:rating', js: 'im:rating', typ: u(undefined, r('Icon')) },
      { json: 'content', js: 'content', typ: u(undefined, r('Content')) },
      { json: 'im:voteSum', js: 'im:voteSum', typ: u(undefined, r('Icon')) },
      { json: 'im:voteCount', js: 'im:voteCount', typ: u(undefined, r('Icon')) }
    ], false),
    'EntryAuthor': o([
      { json: 'uri', js: 'uri', typ: r('Icon') },
      { json: 'name', js: 'name', typ: r('Icon') },
      { json: 'label', js: 'label', typ: '' }
    ], false),
    'Category': o([
      { json: 'attributes', js: 'attributes', typ: r('CategoryAttributes') }
    ], false),
    'CategoryAttributes': o([
      { json: 'im:id', js: 'im:id', typ: '' },
      { json: 'term', js: 'term', typ: '' },
      { json: 'scheme', js: 'scheme', typ: '' },
      { json: 'label', js: 'label', typ: '' }
    ], false),
    'Content': o([
      { json: 'label', js: 'label', typ: '' },
      { json: 'attributes', js: 'attributes', typ: r('ContentAttributes') }
    ], false),
    'ContentAttributes': o([
      { json: 'type', js: 'type', typ: r('Type') }
    ], false),
    'ID': o([
      { json: 'label', js: 'label', typ: '' },
      { json: 'attributes', js: 'attributes', typ: u(undefined, m('')) }
    ], false),
    'IMArtist': o([
      { json: 'label', js: 'label', typ: '' },
      { json: 'attributes', js: 'attributes', typ: r('IMArtistAttributes') }
    ], false),
    'IMArtistAttributes': o([
      { json: 'href', js: 'href', typ: '' }
    ], false),
    'IMContentType': o([
      { json: 'attributes', js: 'attributes', typ: r('IMContentTypeAttributes') }
    ], false),
    'IMContentTypeAttributes': o([
      { json: 'term', js: 'term', typ: r('Label') },
      { json: 'label', js: 'label', typ: r('Label') }
    ], false),
    'IMImage': o([
      { json: 'label', js: 'label', typ: '' },
      { json: 'attributes', js: 'attributes', typ: r('IMImageAttributes') }
    ], false),
    'IMImageAttributes': o([
      { json: 'height', js: 'height', typ: '' }
    ], false),
    'IMPrice': o([
      { json: 'label', js: 'label', typ: '' },
      { json: 'attributes', js: 'attributes', typ: r('IMPriceAttributes') }
    ], false),
    'IMPriceAttributes': o([
      { json: 'amount', js: 'amount', typ: '' },
      { json: 'currency', js: 'currency', typ: '' }
    ], false),
    'IMReleaseDate': o([
      { json: 'label', js: 'label', typ: '' },
      { json: 'attributes', js: 'attributes', typ: r('Icon') }
    ], false),
    'Link': o([
      { json: 'attributes', js: 'attributes', typ: r('LinkAttributes') }
    ], false),
    'LinkAttributes': o([
      { json: 'rel', js: 'rel', typ: r('Rel') },
      { json: 'type', js: 'type', typ: u(undefined, '') },
      { json: 'href', js: 'href', typ: '' }
    ], false),
    'Type': [
      'text'
    ],
    'Label': [
      'Application'
    ],
    'Rel': [
      'alternate',
      'first',
      'last',
      'next',
      'previous',
      'related',
      'self'
    ]
  }
}