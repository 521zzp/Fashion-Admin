export const arrAddKey = (arr) => {
  if (Array.isArray(arr)) {
    return arr.map((el, index) => ({ ...el,  key: index }))
  } else{
    return arr
  }
}
