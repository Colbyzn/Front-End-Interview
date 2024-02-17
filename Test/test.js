function findLongestWord(sentence) {
  const words = sentence.match(/\b\w+\b/g)

  if (words == null) {
    return null
  }

  const res = words.reduce((acc, item) => {
    return acc.length > item.length ? acc : item
  }, '')

  return res
}

console.log(findLongestWord(''))
// console.log(findLongestWord('.'))