import { ListListener, ListDiffer } from "./types"

export class ListListenerWithDiffer<TValue> {
  callback: ListListener<TValue>
  value: TValue[]
  differ: ListDiffer<TValue>

  constructor(callback: ListListener<TValue>, differ: ListDiffer<TValue>) {
    this.callback = callback
    this.value = undefined as any
    this.differ = differ
  }

  notify(newValue: TValue[]) {
    const isDifferent = this.differ(this.value, newValue)

    if (isDifferent) {
      this.value = newValue
      this.callback(newValue)
    }
  }
}
