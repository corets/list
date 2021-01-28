import { ListRemover } from "./types"

export const defaultRemover: ListRemover<any> = (oldValue, valuesToRemove) =>
  oldValue.filter((value) => !valuesToRemove.includes(value))
