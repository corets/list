import { List } from "./index"

describe("List", () => {
  it("creates list with initial value", () => {
    const list = new List(["foo", "bar"])

    expect(list.get()).toEqual(["foo", "bar"])
  })

  it("returns a copy of value", () => {
    const value = ["foo", "bar", ["yolo"]]
    const list = new List(value)

    expect(list.get()).toEqual(value)
    expect(list.get() === value).toBe(false)
    expect(list.get()[2] === value[2]).toBe(false)
  })

  it("sets value", () => {
    const value = ["foo"]
    const list = new List(value)

    list.set(["bar", "baz"])

    expect(list.get()).toEqual(["bar", "baz"])
    expect(value).toEqual(["foo"])
  })

  it("adds value", () => {
    const value = ["foo", "bar"]
    const list = new List(value)

    list.add("baz")

    expect(list.get()).toEqual(["foo", "bar", "baz"])
    expect(value).toEqual(["foo", "bar"])
  })

  it("removes value", () => {
    const value = ["foo", "bar", "baz"]
    const list = new List(value)

    list.remove("foo", "bar")

    expect(list.get()).toEqual(["baz"])
    expect(value).toEqual(["foo", "bar", "baz"])
  })

  it("tells if value is in the value", () => {
    const list = new List(["foo", "bar"])

    expect(list.has("foo")).toBe(true)
    expect(list.has("baz")).toBe(false)
  })

  it("returns value at specific index", () => {
    const value = ["foo", "bar", "baz"]
    const list = new List(value)

    expect(list.getAt(1)).toEqual("bar")
  })

  it("adds value at specific index", () => {
    const value = ["foo", "bar", "baz"]
    const list = new List(value)

    list.addAt(1, "yolo")

    expect(list.getAt(1)).toEqual("yolo")
    expect(list.get()).toEqual(["foo", "yolo", "baz"])
    expect(value).toEqual(["foo", "bar", "baz"])

    list.addAt(3, "boom")
    expect(list.getAt(3)).toEqual("boom")
    expect(list.get()).toEqual(["foo", "yolo", "baz", "boom"])
    expect(value).toEqual(["foo", "bar", "baz"])
  })

  it("removes value at specific index", () => {
    const value = ["foo", "bar", "baz"]
    const list = new List(value)

    list.removeAt(1)

    expect(list.get()).toEqual(["foo", "baz"])
    expect(value).toEqual(["foo", "bar", "baz"])
  })

  it("tells if there is a at a specific index", () => {
    const list = new List(["foo", "bar"])

    expect(list.hasAt(0)).toBe(true)
    expect(list.hasAt(2)).toBe(false)
  })

  it("returns index of a value in the value", () => {
    const list = new List(["foo", "bar"])

    expect(list.indexOf("bar")).toBe(1)
    expect(list.indexOf("baz")).toBe(-1)
  })

  it("resets to initial value", () => {
    const list = new List(["foo"])
    list.add("bar")

    expect(list.get()).toEqual(["foo", "bar"])

    list.reset()
    expect(list.get()).toEqual(["foo"])
  })

  it("resets to new initial value", () => {
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

  it("does not mutate previous value", () => {
    const list = new List(["foo", "bar"])
    const value1 = list.get()
    const value2 = list.get()

    list.add("baz")
    expect(value1).toEqual(["foo", "bar"])
    expect(value2).toEqual(["foo", "bar"])

    list.set(["yolo", "swag"])
    expect(list.get()).toEqual(["yolo", "swag"])
    expect(value1).toEqual(["foo", "bar"])
    expect(value2).toEqual(["foo", "bar"])
  })

  it("filters value and returns a new list", () => {
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

  it("maps value and returns a new list", () => {
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

  it("iterates value", () => {
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

    expect(callback).toHaveBeenCalledTimes(0)

    list.set(["bar"])

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(["bar"])

    list.reset()

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(["foo"])

    list.add("bar")

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith(["foo", "bar"])

    list.remove("bar")

    expect(callback).toHaveBeenCalledTimes(4)
    expect(callback).toHaveBeenCalledWith(["foo"])

    list.addAt(1, "yolo")

    expect(callback).toHaveBeenCalledTimes(5)
    expect(callback).toHaveBeenCalledWith(["foo", "yolo"])

    list.removeAt(0)

    expect(callback).toHaveBeenCalledTimes(6)
    expect(callback).toHaveBeenCalledWith(["yolo"])

    removeListener()

    list.set(["foo"])

    expect(callback).toHaveBeenCalledTimes(6)
  })

  it("listens with immediate", () => {
    const list = new List(["foo"])
    const callback = jest.fn()

    list.listen(callback, { immediate: true })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(["foo"])

    list.set(["bar"])

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(["bar"])

    list.set(["bar"])

    expect(callback).toHaveBeenCalledTimes(2)
  })

  it("listens with a custom differ", () => {
    const list = new List(["foo"])
    const callback = jest.fn()

    list.listen(callback, { immediate: true, differ: () => true })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(["foo"])

    list.set(["bar"])

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(["bar"])

    list.set(["bar"])

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith(["bar"])
  })

  it("diffs", () => {
    const list = new List(["foo"])
    const callback = jest.fn()

    list.listen(callback, { immediate: true })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(["foo"])

    list.set(["foo"])

    expect(callback).toHaveBeenCalledTimes(1)

    list.set(["bar"])

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(["bar"])
  })

  it("diffs with a custom differ", () => {
    const list = new List(["foo"], { differ: () => true })
    const callback = jest.fn()

    list.listen(callback, { immediate: true })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(["foo"])

    list.set(["foo"])

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(["foo"])

    list.set(["bar"])

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith(["bar"])
  })
})
