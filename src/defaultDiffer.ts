import { ListDiffer } from "./types"
import { isEqual } from "lodash-es"

export const defaultDiffer: ListDiffer<any> = (oldValue, newValue) =>
  !isEqual(oldValue, newValue)
