export function findObjectIndex(array: Array<any>, key: string, value: any) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return i
    }
  }
  return -1 // Return -1 if the object is not found in the array
}
