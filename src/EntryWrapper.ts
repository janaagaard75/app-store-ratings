import { Entry } from "./Reviews"

export class EntryWrapper {
  constructor(
    private entry: Entry
  ) { }

  public get author(): string {
    return this.entry.author[0].name[0]
  }

  public get content(): string {
    return this.entry.content[0]._
  }

  public get id(): string {
    return this.entry.id[0]
  }

  public get rating(): number | undefined {
    return Number.parseInt(this.entry["im:rating"][0], 10)
  }

  public get title(): string {
    return this.entry.title[0]
  }

  public get updated(): Date {
    return new Date(this.entry.updated[0])
  }

  public get version(): string | undefined {
    return this.entry["im:version"][0]
  }

  public get voteCount(): number | undefined {
    return Number.parseInt(this.entry["im:voteCount"][0], 10)
  }

  public get voteSum(): number | undefined {
    return Number.parseInt(this.entry["im:voteSum"][0], 10)
  }

  public get csvLine(): string {
    const values = [
      this.id,
      this.updated.toISOString(),
      this.rating,
      this.voteCount,
      this.voteSum,
      this.version,
      EntryWrapper.encodeString(this.title),
      EntryWrapper.encodeString(this.content),
      EntryWrapper.encodeString(this.author)
    ]

    const line = values.join(", ")
    return line
  }

  private static encodeString(value: string): string {
    return value
      .replace(/(\r\n|\r|\n)/g, " ")
      .replace(/[",]/g, "")
  }
}