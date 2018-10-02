import fetch from 'node-fetch'

import { Reviews } from './Reviews'

class Main {
  public async start() {
    const reviewsResponse = await fetch('https://itunes.apple.com/dk/rss/customerreviews/id=571242024/sortBy=mostRecent/page=10/limit=200/json')

    if (reviewsResponse.status !== 200) {
      console.error(`Error. Returned code: ${reviewsResponse.status}.`)
      return
    }

    const reviews = await reviewsResponse.json() as Reviews
    console.log(reviews)
  }
}

const main = new Main()
main.start()