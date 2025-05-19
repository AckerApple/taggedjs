import { NoDisplayValue } from'./render/attributes/processAttribute.function.js'
import { empty } from './tag/ValueTypes.enum.js'

type TextableValue = string | boolean | number | NoDisplayValue
export function castTextValue(value: TextableValue) {
  switch (value) {
    case undefined:
    case false:
    case null:
      return empty
  }

  return value as string;
}
