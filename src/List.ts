import {
  ListListener,
  ListListenerUnsubscribe,
  ObservableList,
  ListFilter,
  ListMapper,
  ListForEach,
  ListConfig,
  ListListenOptions, ListSetter,
} from "./types"
import { defaultDiffer } from "./defaultDiffer"
import { defaultMerger } from "./defaultMerger"
import { defaultRemover } from "./defaultRemover"
import { ListListenerWithDiffer } from "./ListListenerWithDiffer"
import cloneDeep from "lodash/cloneDeep"
import { createListSetter } from "./createListSetter"

export class List<TValue = any> implements ObservableList<TValue> {
  value: TValue[]
  config: ListConfig<TValue>
  listeners: ListListenerWithDiffer<TValue>[]

  constructor(value: TValue[] = [], config?: Partial<ListConfig<TValue>>) {
    this.value = cloneDeep(value)
    this.config = {
      differ: config?.differ ?? defaultDiffer,
      remover: config?.remover ?? defaultRemover,
      merger: config?.merger ?? defaultMerger,
    }
    this.listeners = []
  }

  get(): TValue[] {
    return cloneDeep(this.value)
  }

  getAt(index: number): TValue | undefined {
    return this.value[index]
  }

  set(newValue: TValue[]): void {
    this.value = cloneDeep(newValue)
    this.notify()
  }

  add(...values: TValue[]): void {
    const mergedNewValue = this.config.merger(this.value, cloneDeep(values))

    this.set(mergedNewValue)
  }

  addAt(index: number, value: TValue): void {
    const newValue = cloneDeep(this.value)
    newValue[index] = value

    this.set(newValue)
  }

  has(value: TValue): boolean {
    return this.value.includes(value)
  }

  hasAt(index: number): boolean {
    return this.value[index] !== undefined
  }

  remove(...values: TValue[]): void {
    this.set(this.config.remover(this.value, values))
  }

  removeAt(index: number): void {
    const newValue = cloneDeep(this.value)
    newValue.splice(index, 1)

    this.set(newValue)
  }

  indexOf(value: TValue): number {
    return this.value.indexOf(value)
  }

  use(): [TValue[], ListSetter<TValue>] {
    return [this.get(), createListSetter(this)]
  }

  filter(callback: ListFilter<TValue>): TValue[] {
    return this.value.filter(callback)
  }

  map<TResult = TValue>(callback: ListMapper<TValue, TResult>): TResult[] {
    return this.value.map(callback)
  }

  forEach(callback: ListForEach<TValue>) {
    this.value.forEach(callback)
  }

  listen(
    callback: ListListener<TValue>,
    options?: ListListenOptions<TValue>
  ): ListListenerUnsubscribe {
    const differ = options?.differ ?? this.config.differ
    const notifyImmediately = options?.immediate
    const listener = new ListListenerWithDiffer<TValue>(callback, differ)

    this.listeners.push(listener)

    if (notifyImmediately) {
      listener.notify(this.value)
    }

    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener)
    }
  }

  protected notify() {
    this.listeners.forEach((listener) => listener.notify(this.value as any))
  }
}
