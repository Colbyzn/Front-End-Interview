function binarySearch(arr, target, start, end) {
  const length = arr.length;

  // 数组为空，直接返回 -1
  if (length === 0) return -1;

  // 初始化搜索范围
  if (start == null) start = 0;
  if (end == null) end = length - 1;

  // 递归结束条件
  if (start > end) return -1;

  // 不断缩小搜索范围
  const mid = Math.floor((start + end) / 2);
  const midValue = arr[mid];
  if (target > midValue) {
    start = mid + 1;
    return binarySearch(arr, target, start, end);
  } else if (target < midValue) {
    end = mid - 1;
    binarySearch(arr, target, start, end);
  } else {
    return mid;
  }
}

console.log(binarySearch([1, 3, 5, 7, 9], 9))