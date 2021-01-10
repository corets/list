import { List } from "./index"

describe("List", () => {
  it("creates list with initial state", () => {
    const list = new List(["foo", "bar"])

    expect(list.get()).toEqual(["foo", "bar"])
  })

  it("returns a copy of state", () => {
    const state = ["foo", "bar", ["yolo"]]
    const list = new List(state)

    expect(list.get()).toEqual(state)
    expect(list.get() === state).toBe(false)
    expect(list.get()[2] === state[2]).toBe(false)
  })

  it("sets state", () => {
    const state = ["foo"]
    const list = new List(state)

    list.set(["bar", "baz"])

    expect(list.get()).toEqual(["bar", "baz"])
    expect(state).toEqual(["foo"])
  })

  it("adds state", () => {
    const state = ["foo", "bar"]
    const list = new List(state)

    list.add("baz")

    expect(list.get()).toEqual(["foo", "bar", "baz"])
    expect(state).toEqual(["foo", "bar"])
  })

  it("removes state", () => {
    const state = ["foo", "bar", "baz"]
    const list = new List(state)

    list.remove("foo", "bar")

    expect(list.get()).toEqual(["baz"])
    expect(state).toEqual(["foo", "bar", "baz"])
  })

  it("tells if value is in the state", () => {
    const list = new List(["foo", "bar"])

    expect(list.has("foo")).toBe(true)
    expect(list.has("baz")).toBe(false)
  })

  it("returns state at specific index", () => {
    const state = ["foo", "bar", "baz"]
    const list = new List(state)

    expect(list.getAt(1)).toEqual("bar")
  })

  it("sets state at specific index", () => {
    const state = ["foo", "bar", "baz"]
    const list = new List(state)

    list.setAt(1, "yolo")

    expect(list.getAt(1)).toEqual("yolo")
    expect(list.get()).toEqual(["foo", "yolo", "baz"])
    expect(state).toEqual(["foo", "bar", "baz"])

    list.setAt(3, "boom")
    expect(list.getAt(3)).toEqual("boom")
    expect(list.get()).toEqual(["foo", "yolo", "baz", "boom"])
    expect(state).toEqual(["foo", "bar", "baz"])
  })

  it("removes state at specific index", () => {
    const state = ["foo", "bar", "baz"]
    const list = new List(state)

    list.removeAt(1)

    expect(list.get()).toEqual(["foo", "baz"])
    expect(state).toEqual(["foo", "bar", "baz"])
  })

  it("tells if there is a at a specific index", () => {
    const list = new List(["foo", "bar"])

    expect(list.hasAt(0)).toBe(true)
    expect(list.hasAt(2)).toBe(false)
  })

  it("returns index of a value in the state", () => {
    const list = new List(["foo", "bar"])

    expect(list.indexOf("bar")).toBe(1)
    expect(list.indexOf("baz")).toBe(-1)
  })

  it("resets state to initial state", () => {
    const list = new List(["foo"])
    list.add("bar")

    expect(list.get()).toEqual(["foo", "bar"])

    list.reset()
    expect(list.get()).toEqual(["foo"])
  })

  it("resets state to new initial state", () => {
    const list = new List(["foo"])

    list.reset()

    expect(list.get()).toEqual(["foo"])

    list.add("bar")
    list.reset(["bar", "baz"])

    expect(list.get()).toEqual(["bar", "baz"])

    list.add("foo")
    list.reset()

    expect(list.get()).toEqual(["bar", "baz"])
  })

  it("does not mutate previous state", () => {
    const list = new List(["foo", "bar"])
    const state1 = list.get()
    const state2 = list.get()

    list.add("baz")
    expect(state1).toEqual(["foo", "bar"])
    expect(state2).toEqual(["foo", "bar"])

    list.set(["yolo", "swag"])
    expect(list.get()).toEqual(["yolo", "swag"])
    expect(state1).toEqual(["foo", "bar"])
    expect(state2).toEqual(["foo", "bar"])
  })

  it("filters state and returns a new list", () => {
    const list = new List(["foo", "bar", "baz"])

    const receivedValues: string[] = []
    const receivedIndexes: number[] = []

    const filteredList = list.filter((value, index) => {
      receivedValues.push(value)
      receivedIndexes.push(index)

      return value[0] === "b"
    })

    expect(filteredList).toEqual(["bar", "baz"])
    expect(receivedValues).toEqual(["foo", "bar", "baz"])
    expect(receivedIndexes).toEqual([0, 1, 2])
  })

  it("maps state and returns a new list", () => {
    const list = new List(["foo", "bar", "baz"])

    const receivedValues: string[] = []
    const receivedIndexes: number[] = []

    const filteredList = list.map((value, index) => {
      receivedValues.push(value)
      receivedIndexes.push(index)

      return value[0]
    })

    expect(filteredList).toEqual(["f", "b", "b"])
    expect(receivedValues).toEqual(["foo", "bar", "baz"])
    expect(receivedIndexes).toEqual([0, 1, 2])
  })

  it("iterates state", () => {
    const list = new List(["foo", "bar", "baz"])

    const receivedValues: string[] = []
    const receivedIndexes: number[] = []

    list.forEach((value, index) => {
      receivedValues.push(value)
      receivedIndexes.push(index)
    })

    expect(receivedValues).toEqual(["foo", "bar", "baz"])
    expect(receivedIndexes).toEqual([0, 1, 2])
  })

  it("listens", () => {
    const list = new List(["foo"])
    const callback = jest.fn()

    const removeListener = list.listen(callback)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(["foo"])

    list.set(["bar"])

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(["bar"])

    list.reset()

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith(["foo"])

    list.add("bar")

    expect(callback).toHaveBeenCalledTimes(4)
    expect(callback).toHaveBeenCalledWith(["foo", "bar"])

    list.remove("bar")

    expect(callback).toHaveBeenCalledTimes(5)
    expect(callback).toHaveBeenCalledWith(["foo"])

    list.setAt(1, "yolo")

    expect(callback).toHaveBeenCalledTimes(6)
    expect(callback).toHaveBeenCalledWith(["foo", "yolo"])

    list.removeAt(0)

    expect(callback).toHaveBeenCalledTimes(7)
    expect(callback).toHaveBeenCalledWith(["yolo"])

    removeListener()

    list.set(["foo"])

    expect(callback).toHaveBeenCalledTimes(7)
  })
})
