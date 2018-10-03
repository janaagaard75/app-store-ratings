import fetch from "node-fetch"
import { parseString } from "xml2js"

import { Entry } from "./Reviews"
import { EntryWrapper } from "./EntryWrapper"
import { Reviews } from "./Reviews"

type SortBy = "mostHelpful" | "mostRecent"

class Main {
  public async start() {
    const nordeaMobileBankAppId = 571242024

    const allReviews: Array<EntryWrapper> = []
    for (let page = 1; page <= 10; page++) {
      // Skip page number 6 because the XML parser complains about an unsupported character (&) on that page.
      if (page === 6) {
        continue
      }

      const xmlReviews = await this.fetchReviews(nordeaMobileBankAppId, "mostRecent", page)
      const parsedReviews = this.flattern(xmlReviews.feed.entry)
      allReviews.push(...parsedReviews)
    }
    console.log(`Number of reviews: ${allReviews.length}.`)
    const csv = allReviews.map(review => review.csvLine).join("\n")
    console.info(`\n${csv}`)
  }

  private async fetchReviews(
    appId: number,
    sortBy: SortBy,
    /** Integer from 1 to 10. */
    pageNumber: number
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