import { createList } from "./createList"
import { List } from "./List"

describe("createList", () => {
  it("creates a list with initial value", () => {
    const list = createList(["foo", "bar"])

    expect(list instanceof List).toBe(true)
    expect(list.get()).toEqual(["foo", "bar"])
  })
})
