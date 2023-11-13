import { expect, test } from "vitest"
import { getDayResolution } from "./testUtils"

test("resolution for day 1 should return 197291", async () => {
  const result = await getDayResolution(1)
  expect(result[2]).toEqual(197291)
})

test("resolution for day 2 should return 13221 and 13131", async () => {
  const result = await getDayResolution(2)
  expect(result[0]).toEqual(13221)
  expect(result[1]).toEqual(13131)
})

test("resolution for day 3 should return 7863 and 2488", async () => {
  const result = await getDayResolution(3)
  expect(result[0]).toEqual(7863)
  expect(result[1]).toEqual(2488)
})

test("resolution for day 4 should return 536 and 845", async () => {
  const result = await getDayResolution(4)
  expect(result[0]).toEqual(536)
  expect(result[1]).toEqual(845)
})

test("resolution for day 5 should return 'MQTPGLLDN' and 'LVZPSTTCZ'", async () => {
  const result = await getDayResolution(5)
  expect(result[0]).toEqual("MQTPGLLDN")
  expect(result[1]).toEqual("LVZPSTTCZ")
})
