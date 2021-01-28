import { ListMerger } from "./types"

export const defaultMerger: ListMerger<any> = (oldValue, newValue) => {
  if (Array.isArray(oldValue) && Array.isArray(newValue)) {
    return [...oldValue, ...newValue]
  }

  return newValue
}
