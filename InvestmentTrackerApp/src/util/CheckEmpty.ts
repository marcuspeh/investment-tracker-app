const CheckEmptyString = (value: string | undefined): boolean => {
  if (value === undefined || value === null) {
    return true
  }
  return value.length === 0;
}

export {
  CheckEmptyString
}