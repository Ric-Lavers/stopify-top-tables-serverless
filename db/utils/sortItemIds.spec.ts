import { sortItemIds } from "./sortItemIds"
import ids from "./sortItemIds.mock"

describe("sortItemIds", () => {
  it("should work", () => {
    sortItemIds(ids)
  })
})
