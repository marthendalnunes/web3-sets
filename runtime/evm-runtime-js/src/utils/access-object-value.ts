export function accessObjectValue(obj: any, str: any) {
  const path = str.split(/[.[\]]+/).filter(Boolean)
  let value = obj

  for (let i = 0; i < path.length; i++) {
    const key = path[i]

    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value) && /^\d+$/.test(key)) {
        // Access array element
        value = value[Number(key)]
      } else if (key in value) {
        // Access object property
        value = value[key]
      } else {
        value = undefined
        break
      }
    } else {
      value = undefined
      break
    }
  }

  return value
}
