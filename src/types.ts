export interface ObservableList<TState = any> {
  state: TState[]
  initialState: TState[]

  get(): TState[]
  getAt(index: number): TState | undefined
  set(newState: TState[]): void
  reset(initialState?: TState[]): void
  add(...values: TState[]): void
  addAt(index: number, value: TState): void
  has(value: TState): boolean
  hasAt(index: number): boolean
  remove(...values: TState[]): void
  removeAt(index: number): void
  indexOf(value: TState): number

  filter(callback: ListFilterCallback<TState>): TState[]
  map<TResult = TState>(
    callback: ListMapperCallback<TState, TResult>
  ): TResult[]
  forEach(callback: ListForEachCallback<TState>): void

  listen(
    callback: ListCallback<TState>,
    notifyImmediately?: boolean
  ): ListCallbackUnsubscribe
}

export type ListCallback<TState> = (newState: TState[]) => void
export type ListDiffer<TState> = (
  oldState: TState[],
  newState: TState[]
) => boolean
export type ListMerger<TState> = (
  oldState: TState[],
  newState: TState[]
) => TState[]
export type ListRemover<TState> = (
  oldState: TState[],
  valuesToRemove: TState[]
) => TState[]
export type ListCallbackUnsubscribe = () => void
export type ListFilterCallback<TState> = (
  value: TState,
  index: number
) => boolean
export type ListMapperCallback<TState, TResult> = (
  value: TState,
  index: number
) => TResult
export type ListForEachCallback<TState> = (value: TState, index: number) => void
export type CreateList = <TState>(
  initialState: TState[]
) => ObservableList<TState>
