type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

type KeyValue = {
  key: string
  value: string | number | symbol
}

type ValueLabel<T = ValueLabelValueType> = {
  value: T
  label: string | number | symbol | undefined
}

type ValueLabelValueType = string | number | symbol | Date | undefined
