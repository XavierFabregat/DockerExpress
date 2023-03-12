import request from "supertest";
import app from "../../app";


describe("GET /", () => {
  it("should return 200 OK", () => {
    return request(app).get("/").expect(200);
  });

  it('should return an html page', () => {
    return request(app).get('/').expect('Content-Type', /html/);
  });

  it('should return a page with the title "Server For Todo App"', () => {
    return request(app).get('/').expect(/Server For Todo App/);
  });
});