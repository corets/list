export interface ObservableList<TValue = any> {
  get(): TValue[]
  getAt(index: number): TValue | undefined
  set(newValue: TValue[]): void
  add(...values: TValue[]): void
  addAt(index: number, value: TValue): void
  has(value: TValue): boolean
  hasAt(index: number): boolean
  remove(...values: TValue[]): void
  removeAt(index: number): void
  indexOf(value: TValue): number
  use(): [TValue[], ListSetter<TValue>]

  filter(callback: ListFilter<TValue>): TValue[]
  map<TResult = TValue>(callback: ListMapper<TValue, TResult>): TResult[]
  forEach(callback: ListForEach<TValue>): void

  listen(
    callback: ListListener<TValue>,
    options?: ListListenOptions<TValue>
  ): ListListenerUnsubscribe
}

export type ListConfig<TValue> = {
  differ: ListDiffer<TValue>
  remover: ListRemover<TValue>
  merger: ListMerger<TValue>
}
export type ListListenOptions<TValue> = {
  immediate?: boolean
  differ?: ListDiffer<TValue>
}
export type ListListener<TValue> = (newValue: TValue[]) => void
export type ListListenerUnsubscribe = () => void
export type ListDiffer<TValue> = (
  oldValue: TValue[],
  newValue: TValue[]
) => boolean
export type ListMerger<TValue> = (
  oldValue: TValue[],
  newValue: TValue[]
) => TValue[]
export type ListRemover<TValue> = (
  oldValue: TValue[],
  valuesToRemove: TValue[]
) => TValue[]
export type ListFilter<TValue> = (value: TValue, index: number) => boolean
export type ListMapper<TValue, TResult> = (
  value: TValue,
  index: number
) => TResult
export type ListForEach<TValue> = (value: TValue, index: number) => void
export type CreateList = <TValue>(
  initialValue: TValue[]
) => ObservableList<TValue>
export type CreateListSetter = <TValue = any>(value: ObservableList<TValue>) => ListSetter<TValue>
export type ListSetter<TValue = any> = (newValue: TValue[] | ((oldValue: TValue[]) => TValue[])) => void
