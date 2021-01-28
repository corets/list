import { defaultMerger } from "./defaultMerger"

describe("defaultMerger", () => {
  it("merges value", () => {
    const values = ["foo", "bar"]

    expect(defaultMerger(values, ["baz"])).toEqual(["foo", "bar", "baz"])
    expect(values).toEqual(["foo", "bar"])
    expect(defaultMerger(values, null as any)).toEqual(null)
  })
})
