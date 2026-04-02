import { expect, test } from 'vitest'

test('Konfigurasi Testing Berhasil', () => {
  const sum = (a: number, b: number) => a + b
  expect(sum(1, 2)).toBe(3)
})