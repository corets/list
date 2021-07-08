import { ListDiffer } from "./types"
import isEqual from "fast-deep-equal"

export const defaultDiffer: ListDiffer<any> = (oldValue, newValue) =>
  !isEqual(oldValue, newValue)
