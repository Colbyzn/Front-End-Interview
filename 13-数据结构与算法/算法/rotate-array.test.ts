/**
 * @description 数组旋转的单元测试
 * @author Colbyzn
 */

import { rotateArray1, rotateArray2 } from "./rotate-array";

describe('数组旋转 k 步', () => {
  it('正常情况', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = 3
    // const result = rotateArray1(arr, k)
    const result = rotateArray2(arr, k)
    expect(result).toEqual([5, 6, 7, 1, 2, 3, 4])
  })

  it('arr 为空数组', () => {
    const arr = []
    const k = 3
    // const result = rotateArray1(arr, k)
    const result = rotateArray2(arr, k)
    expect(result).toEqual(arr)
  })

  it('k 为 0', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = 0
    // const result = rotateArray1(arr, k)
    const result = rotateArray2(arr, k)
    expect(result).toEqual(arr)
  })

  it('k 为负数', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = -3
    // const result = rotateArray1(arr, k)
    const result = rotateArray2(arr, k)
    expect(result).toEqual([5, 6, 7, 1, 2, 3, 4])
  })

  it('k 大于数组长度', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = 10
    // const result = rotateArray1(arr, k)
    const result = rotateArray2(arr, k)
    expect(result).toEqual([5, 6, 7, 1, 2, 3, 4])
  })

  it('k 不是数字', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = 'abc'
    // @ts-ignore
    // const result = rotateArray1(arr, k)
    const result = rotateArray2(arr, k)
    expect(result).toEqual(arr)
  })
})