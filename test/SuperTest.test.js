import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Test avanzado", () => {
  let cookie;

  it("Most create a new User", async () => {
    const mockUser = {
      first_name: "Maximiliano",
      last_name: "Perez",
      email: "maxi@gmail.com",
      password: "123456",
    };

    const { body } = await request
      .post("/api/sessions/register")
      .send(mockUser);

    expect(body).to.be.ok;
  });

  it("Most login a user", async () => {
    const mockUser = {
      email: "maxi@gmail.com",
      password: "1234",
    };

    const result = await request
      .post("/api/sessions/unprotectedLogin")
      .send(mockUser);

    console.log(result.headers);
    console.log(result.header);
    const cookieResult = result.headers["set-cookie"][0];
    expect(cookieResult).to.be.ok;

    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1],
    };

    expect(cookie.name).to.be.eql("unprotectedCookie");
  });

  it("Most return the current user", async () => {
    const result = await request
      .get("/api/sessions/unprotectedCurrent")
      .set("Cookie", [`${cookie.name}=${cookie.value}`]);

    expect(result.body.payload.email).to.be.equal("agus@gmail.com");
  });
});