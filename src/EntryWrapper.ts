import { Entry } from "./Reviews"
import { FlatReview } from "./FlatReview"
import { Labeled } from "./Reviews"
import { ReleaseDate } from "./Reviews"

export class EntryWrapper implements FlatReview {
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

  public get id(): string {
    return this.entry.id.label
  }

  public get rating(): number | undefined {
    return EntryWrapper.parseLabelAsInteger(this.entry["im:rating"])
  }

  public get title(): string {
    return this.entry.title.label
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

  public get csvLine(): string {
    const values = [
      this.id,
      this.date,
      this.rating,
      `"${this.title.replace("\n", "\\n").replace("\"", "")}"`,
      `"${this.content.replace("\n", "\\n").replace("\"", "")}"`,
      `"${this.author.replace("\n", "\\n").replace("\"", "")}"`,
      this.voteCount,
      this.voteSum
    ]

    const line = values.join(", ")
    return line
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