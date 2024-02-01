/**
 * @description 反转单向链表的单元测试
 * @author Colbyzn
 */

import { reverseLinkedList, ListNode } from "./reverse-linked-list"

describe('反转单向链表', () => {
  it('单个元素', () => {
    const node: ListNode = { value: 100, next: null }
    const node1 = reverseLinkedList(node)
    expect(node1).toEqual({ value: 100, next: null })
  })
  it('多个元素', () => {
    const node = {
      value: 100,
      next: {
        value: 200,
        next: {
          value: 300,
          next: null
        }
      }
    }
    const node1 = reverseLinkedList(node)
    expect(node1).toEqual({
      value: 300,
      next: {
        value: 200,
        next: {
          value: 100,
          next: null
        }
      }
    })
  })

})
