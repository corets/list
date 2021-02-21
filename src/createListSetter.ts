import { CreateListSetter, ListSetter } from "./types"

export const createListSetter: CreateListSetter = (list) => {
  const setter: ListSetter = (newValue) => {
    if (newValue instanceof Function) {
      list.set(newValue(list.get()))
    } else {
      list.set(newValue)
    }
  }

  return setter
}
