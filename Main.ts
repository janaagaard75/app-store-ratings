import fetch from "node-fetch"

import { Entry, Label } from "./Reviews"
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
  voteCount: number | undefined
  voteSum: number | undefined
}

type Page = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

type SortBy = "mostHelpful" | "mostRecent"

class Main {
  public async start() {
    const reviews = await this.fetchReviews(571242024, "mostRecent", 1)
    console.info(`Number of reviews: ${reviews.feed.entry.length}.`)
    const flatReviews = this.flattern(reviews)
    console.info(`Number of flat reviews: ${flatReviews.length}.`)
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
    return reviews.feed.entry
      .map(entry => new EntryWrapper(entry))
  }
}

// tslint:disable-next-line:max-classes-per-file
class EntryWrapper implements FlatReview {
  constructor(
    private entry: Entry
  ) { }

  public get author(): string {
    if (this.entry.author === undefined) {
      return ""
    }

    return this.entry.author.name.label
  }

  public get content(): string {
    if (this.entry.content === undefined) {
      return ""
    }

    return this.entry.content.label
  }

  public get date(): Date | undefined {
    if (this.entry["im:releaseDate"] === undefined) {
      return undefined
    }

    return new Date((this.entry["im:releaseDate"] as ReleaseDate).label)
  }

  public get title(): string {
    return this.entry.title.label
  }

  public get rating(): number | undefined {
    return EntryWrapper.parseLabelAsInteger(this.entry["im:rating"])
  }

  public get version(): string | undefined {
    if (this.entry["im:version"] === undefined) {
      return undefined
    }

    return (this.entry["im:version"] as Labeled).label
  }

  public get voteCount(): number | undefined {
    return EntryWrapper.parseLabelAsInteger(this.entry["im:voteCount"])
  }

  public get voteSum(): number | undefined {
    return EntryWrapper.parseLabelAsInteger(this.entry["im:voteSum"])
  }

  private static parseLabelAsInteger(labeled: Labeled | undefined): number | undefined {
    if (labeled === undefined) {
      return undefined
    }

    const parsed = Number.parseInt(labeled.label, 10)
    if (Number.isNaN(parsed)) {
      return undefined
    }

    return parsed
  }
}

const main = new Main()
main.start()