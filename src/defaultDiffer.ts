import { ListDiffer } from "./types"
import { isEqual } from "lodash-es"

export const defaultDiffer: ListDiffer<any> = (oldState, newState) =>
  !isEqual(oldState, newState)
