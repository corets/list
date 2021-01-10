import { CreateList } from "./types"
import { List } from "./List"

export const createList: CreateList = (initialState) => new List(initialState)
