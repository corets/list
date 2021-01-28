import { CreateList } from "./types"
import { List } from "./List"

export const createList: CreateList = (initialValue, options?) =>
  new List(initialValue, options)
