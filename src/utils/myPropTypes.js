export function isIntegerInRange(props, propName, componentName, min, max) {
  if (!props.hasOwnProperty(propName)) return null

  const propValue = props[propName]

  if (typeof propValue !== "number") {
    return new Error(
      `Failed prop type: Invalid prop "${propName}" of type "${typeof props[
        propName
      ]}" supplied to "${componentName}", expected "number".`
    )
  } else if (propValue % 1 !== 0) {
    return new Error(
      `Failed prop value: Expected an integer but got a "${propValue}".`
    )
  } else if (min !== null && propValue < min) {
    return new Error(
      `Failed prop value: Expected an integer greater than or equal to ${min}, but got "${propValue}"`
    )
  } else if (max !== null && propValue > max) {
    return new Error(
      `Failed prop value: Expected an integer less than or equal to ${max}, but got "${propValue}"`
    )
  }
  return null
}
