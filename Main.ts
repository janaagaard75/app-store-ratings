import fetch from "node-fetch"

import { Entry } from "./Reviews"
import { Labeled } from "./Reviews"
import { ReleaseDate } from "./Reviews"
import { Reviews } from "./Reviews"

interface FlatReview {
  author: string
  content: string
  date: Date | undefined
  rating: number | undefined
  title: string
  version: string | undefined
  voteCount: number
  voteSum: number
}

type Page = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

type SortBy = "mostHelpful" | "mostRecent"

class Main {
  public async start() {
    const reviews = await this.fetchReviews(571242024, "mostRecent", 1)
    console.log(`Number of reviews: ${reviews.feed.entry.length}.`)
  }

  private async fetchReviews(
    appId: number,
    sortBy: SortBy,
    pageNumber: Page
  ): Promise<Reviews> {
    const reviewsUrl = `https://itunes.apple.com/dk/rss/customerreviews/id=${appId}/sortBy=${sortBy}/page=${pageNumber}/json`
    const reviewsResponse = await fetch(reviewsUrl)

    if (reviewsResponse.status !== 200) {
      throw new Error(`Error, exiting. Returned code: ${reviewsResponse.status}.`)
    }

    const reviews = await reviewsResponse.json() as Reviews
    return reviews
  }

  private flattern(reviews: Reviews): ReadonlyArray<FlatReview> {
    const mapped = reviews.feed.entry
      .map(entry => {
        const wrapper = new EntryWrapper(entry)
        return {
          author: entry.author ? entry.author.name.label : "",
          content: entry.content ? entry.content.label : "",
          date: wrapper.date,
          rating: wrapper.rating,
          title: entry.title.label,
          version: wrapper.version,
          voteCount: 0,
          voteSum: 0
        }
      })

    return mapped
  }
}

// tslint:disable-next-line:max-classes-per-file
class EntryWrapper {
  constructor(
    private entry: Entry
  ) { }

  public get date(): Date | undefined {
    if (this.entry["im:releaseDate"] === undefined) {
      return undefined
    }

    return new Date((this.entry["im:releaseDate"] as ReleaseDate).label)
  }

  public get rating(): number | undefined {
    if (this.entry["im:rating"] === undefined) {
      return undefined
    }

    const rating = parseInt((this.entry["im:rating"] as Labeled).label, 10)
    if (Number.isNaN(rating)) {
      return undefined
    }

    return rating
  }

  public get version(): string | undefined {
    if (this.entry["im:version"] === undefined) {
      return undefined
    }

    return (this.entry["im:version"] as Labeled).label
  }
}

const main = new Main()
main.start()