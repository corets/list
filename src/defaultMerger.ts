import { ListMerger } from "./types"

export const defaultMerger: ListMerger<any> = (oldState, newState) => {
  if (Array.isArray(oldState) && Array.isArray(newState)) {
    return [...oldState, ...newState]
  }

  return newState
}
