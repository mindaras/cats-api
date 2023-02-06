import { expect } from "chai";
import { toErrorResponse, toOrderClause } from "../../src/common/mappers";
import { Order } from "../../src/common/models";

describe("common mappers", () => {
  describe("toErrorResponse", () => {
    it("returns error message", () => {
      const error = new Error("Operation failed");
      const response = toErrorResponse(error);
      expect(response.message).to.equal("Operation failed");
    });
  });

  describe("toOrderClause", () => {
    it("returns ASC order clause", () => {
      const clause = toOrderClause({ orderBy: "name", order: "asc" as Order });
      expect(clause).to.equal("ORDER BY name ASC");
    });

    it("returns DESC order clause", () => {
      const clause = toOrderClause({ orderBy: "name", order: Order.DESC });
      expect(clause).to.equal("ORDER BY name DESC");
    });
  });
});
