import { defaultDiffer } from "./defaultDiffer"

describe("defaultDiffer", () => {
  it("diffs value", () => {
    const values = ["foo", "bar"]

    expect(defaultDiffer(values, values)).toBe(false)
    expect(defaultDiffer(values, [...values])).toBe(false)
    expect(defaultDiffer(values, ["foo"])).toBe(true)
    expect(defaultDiffer(values, [])).toBe(true)
    expect(defaultDiffer(values, ["foo", "bar", "baz"])).toBe(true)
  })
})
