import fetch from 'node-fetch'

import { Reviews } from './Reviews'

type Page = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
type SortBy = 'mostHelpful' | 'mostRecent'

class Main {
  public async start() {
    const reviews = await this.fetchReviews(571242024, 'mostRecent', 1)
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
}

const main = new Main()
main.start()