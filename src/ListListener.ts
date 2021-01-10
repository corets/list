import { ListCallback, ListDiffer } from "./types"

export class ListListener<TState> {
  callback: ListCallback<TState>
  state: TState[]
  differ: ListDiffer<TState>

  constructor(callback: ListCallback<TState>, differ: ListDiffer<TState>) {
    this.callback = callback
    this.state = undefined as any
    this.differ = differ
  }

  notify(newState: TState[]) {
    const isDifferent = this.differ(this.state, newState)

    if (isDifferent) {
      this.state = newState
      this.callback(newState)
    }
  }
}
