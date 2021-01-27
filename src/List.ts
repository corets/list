import {
  ListCallback,
  ListCallbackUnsubscribe,
  ListDiffer,
  ListRemover,
  ListMerger,
  ObservableList,
  ListFilterCallback,
  ListMapperCallback,
  ListForEachCallback,
} from "./types"
import { defaultDiffer } from "./defaultDiffer"
import { defaultMerger } from "./defaultMerger"
import { defaultRemover } from "./defaultRemover"
import { ListListener } from "./ListListener"
import { cloneDeep } from "lodash-es"

export class List<TState = any> implements ObservableList<TState> {
  initialState: TState[]
  state: TState[]
  merger: ListMerger<TState>
  remover: ListRemover<TState>
  differ: ListDiffer<TState>
  listeners: ListListener<TState>[]

  constructor(
    initialState: TState[] = [],
    merger: ListMerger<TState> = defaultMerger,
    remover: ListRemover<TState> = defaultRemover,
    differ: ListDiffer<TState> = defaultDiffer
  ) {
    this.initialState = cloneDeep(initialState)
    this.state = cloneDeep(initialState)
    this.merger = merger
    this.remover = remover
    this.differ = differ
    this.listeners = []
  }

  get(): TState[] {
    return cloneDeep(this.state)
  }

  getAt(index: number): TState | undefined {
    return this.state[index]
  }

  set(newState: TState[]): void {
    const isDifferent = this.differ(this.state, newState)

    if (isDifferent) {
      this.state = cloneDeep(newState)
      this.notify()
    }
  }

  reset(initialState?: TState[]): void {
    if (initialState) {
      this.initialState = cloneDeep(initialState)
    }

    this.set(this.initialState)
  }

  add(...values: TState[]): void {
    const mergedNewState = this.merger(this.state, cloneDeep(values))

    this.set(mergedNewState)
  }

  addAt(index: number, value: TState): void {
    const newState = cloneDeep(this.state)
    newState[index] = value

    this.set(newState)
  }

  has(value: TState): boolean {
    return this.state.includes(value)
  }

  hasAt(index: number): boolean {
    return this.state[index] !== undefined
  }

  remove(...values: TState[]): void {
    this.set(this.remover(this.state, values))
  }

  removeAt(index: number): void {
    const newState = cloneDeep(this.state)
    newState.splice(index, 1)

    this.set(newState)
  }

  indexOf(value: TState): number {
    return this.state.indexOf(value)
  }

  filter(callback: ListFilterCallback<TState>): TState[] {
    return this.state.filter(callback)
  }

  map<TResult = TState>(
    callback: ListMapperCallback<TState, TResult>
  ): TResult[] {
    return this.state.map(callback)
  }

  forEach(callback: ListForEachCallback<TState>) {
    this.state.forEach(callback)
  }

  listen(
    callback: ListCallback<TState>,
    notifyImmediately: boolean = true
  ): ListCallbackUnsubscribe {
    const listener = new ListListener<TState>(callback, this.differ)

    this.listeners.push(listener)

    if (notifyImmediately) {
      listener.notify(this.state)
    }

    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener)
    }
  }

  protected notify() {
    this.listeners.forEach((listener) => listener.notify(this.state as any))
  }
}
