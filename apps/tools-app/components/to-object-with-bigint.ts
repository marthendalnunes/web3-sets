export function toObjectWithBigInt(data: any): any {
  return JSON.parse(
    JSON.stringify(
      data,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
    )
  )
}
