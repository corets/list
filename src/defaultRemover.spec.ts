import { defaultRemover } from "./defaultRemover"

describe("defaultRemover", () => {
  it("removes value", () => {
    const values = ["foo", "bar"]

    expect(defaultRemover(values, ["bar"])).toEqual(["foo"])
    expect(values).toEqual(["foo", "bar"])
    expect(defaultRemover(values, ["bar", "baz"])).toEqual(["foo"])
  })
})
