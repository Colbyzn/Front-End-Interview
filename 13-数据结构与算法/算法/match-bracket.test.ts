/**
 * @description 括号匹配的单元测试
 * @author Colbyzn
 */

import { matchBracket } from "./match-bracket"

describe('括号匹配', () => {
  it('正常情况', () => {
    const str = '{a(b[c]d)e}f'
    const res = matchBracket(str)
    expect(res).toBe(true)
  })

  it('左括号多于右括号', () => {
    const str = '{a(b[(c]d)e}f'
    const res = matchBracket(str)
    expect(res).toBe(false)
  })

  it('右括号多于左括号', () => {
    const str = '{a(b[c)]d)e}f'
    const res = matchBracket(str)
    expect(res).toBe(false)
  })

  it('数量相等，但顺序不一致', () => {
    const str = '{a(b[c]d}e)f'
    const res = matchBracket(str)
    expect(res).toBe(false)
  })

  it('空字符串', () => {
    const res = matchBracket('')
    expect(res).toBe(true)
  })
})