import { ListRemover } from "./types"

export const defaultRemover: ListRemover<any> = (oldState, valuesToRemove) =>
  oldState.filter((value) => !valuesToRemove.includes(value))
