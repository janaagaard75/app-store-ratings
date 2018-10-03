import fetch from "node-fetch"

import { Entry } from "./Reviews"
import { EntryWrapper } from "./EntryWrapper"
import { Reviews } from "./Reviews"

type Page = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

type SortBy = "mostHelpful" | "mostRecent"

class Main {
  public async start() {
    const reviews = await this.fetchReviews(571242024, "mostRecent", 1)
    const flatReviews = this.flattern(reviews.feed.entry.splice(1))
    const csv = flatReviews.map(review => review.csvLine).join("\n")
    console.info(`\n${csv}`)
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

  private flattern(entries: Array<Entry>): ReadonlyArray<EntryWrapper> {
    return entries.map(entry => new EntryWrapper(entry))
  }
}

const main = new Main()
main.start()