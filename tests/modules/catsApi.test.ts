import request from "supertest";
import { Express } from "express";
import { db } from "../../src/db/client";
import { pg } from "../../src/db/pgClient";
import sinon from "sinon";
import { expect } from "chai";

describe("Cats API", () => {
  let app: Express;
  const multipleResourcesMock = "multiple" as any;
  const singleResourceMock = "single" as any;
  const createPoolStub = sinon.stub(pg, "createPool").returns({} as any);
  const queryStub = sinon.stub(db, "query").returns(multipleResourcesMock);
  const querySingleStub = sinon
    .stub(db, "querySingle")
    .returns(singleResourceMock);

  after(() => {
    createPoolStub.restore();
    queryStub.restore();
    querySingleStub.restore();
  });

  beforeEach("Mock db connection and load app", async () => {
    app = require("../../src/index").app;
  });

  it("GET /api/cats/", async () => {
    const response: any = await request(app)
      .get("/api/cats/?limit=2&offset=2&order=ASC")
      .expect(200);

    expect(response._body.data).to.equal(multipleResourcesMock);
  });

  it("GET /api/cats/:id", async () => {
    const response: any = await request(app).get("/api/cats/2").expect(200);

    expect(response._body.data).to.equal(singleResourceMock);
  });

  it("GET /api/cats/search/:name", async () => {
    const response: any = await request(app)
      .get("/api/cats/search/Jasper?limit=2&offset=2&order=ASC")
      .expect(200);

    expect(response._body.data).to.equal(multipleResourcesMock);
  });

  it("DELETE /api/cats/:id", async () => {
    const response: any = await request(app)
      .delete("/api/cats/:id")
      .expect(204);

    expect(response._body).to.equal(undefined);
  });
});
