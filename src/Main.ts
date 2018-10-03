import fetch from "node-fetch"
import { parseString } from "xml2js"

import { Entry } from "./Reviews"
import { EntryWrapper } from "./EntryWrapper"
import { Reviews } from "./Reviews"

type Page = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

type SortBy = "mostHelpful" | "mostRecent"

class Main {
  public async start() {
    const nordeaMobileBankAppId = 571242024
    const xmlReviews = await this.fetchReviews(nordeaMobileBankAppId, "mostRecent", 1)
    const parsedReviews = this.flattern(xmlReviews.feed.entry)
    console.log(`Reviews: ${xmlReviews.feed.entry.length}, ${parsedReviews.length}`)
    const csv = parsedReviews.map(review => review.csvLine).join("\n")
    console.info(`\n${csv}`)
  }

  private async fetchReviews(
    appId: number,
    sortBy: SortBy,
    pageNumber: Page
  ): Promise<Reviews> {
    const reviewsUrl = `https://itunes.apple.com/dk/rss/customerreviews/id=${appId}/sortBy=${sortBy}/page=${pageNumber}/xml`
    const reviewsResponse = await fetch(reviewsUrl)

    if (reviewsResponse.status !== 200) {
      throw new Error(`Error, exiting. Returned code: ${reviewsResponse.status}.`)
    }

    const xmlReviews = await reviewsResponse.text()

    const promise = new Promise<Reviews>((resolve, reject) => {
      const parsedReviews = parseString(xmlReviews, (error, result) => {
        if (error) {
          reject(error)
        }

        resolve(result as Reviews)
      })
    })

    return promise
  }

  private flattern(entries: Array<Entry>): ReadonlyArray<EntryWrapper> {
    return entries.map(entry => new EntryWrapper(entry))
  }
}

const main = new Main()
main.start()