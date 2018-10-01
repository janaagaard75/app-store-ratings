import fetch from 'node-fetch'

class Main {
  public async start() {
    const reviewsResponse = await fetch('https://itunes.apple.com/dk/rss/customerreviews/id=571242024/sortBy=mostRecent/page=10/limit=200/json')

    if (reviewsResponse.status !== 200) {
      console.error(`Error. Returned code: ${reviewsResponse.status}.`)
      return
    }

    const content = await reviewsResponse.text()
    console.log(content)
  }
}

const main = new Main()
main.start()