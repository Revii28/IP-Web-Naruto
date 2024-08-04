const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { sequelize, User } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");

let token = "";
const userTestAdminUser = {
  email: "reviAdmin@mail.com",
  username: "revi",
  password: "123456",
  role: "Admin",
};

beforeAll(async () => {

  await User.create({
    email: userTestAdminUser.email,
    username: userTestAdminUser.username,
    password: hashPassword(userTestAdminUser.password),
    role: userTestAdminUser.role,
  });


  const adminUser = await User.findOne({ where: { role: "Admin" } });
  token = signToken({ id: adminUser.id });
});

afterAll(async () => {

  await User.destroy({ where: {} });
});


describe("User", () => {
    describe("/users", () => {
      describe("Success", () => {
        test("should successfully create a user", async () => {
          const { status, body } = await request(app)
            .post("/users")
            .set("Authorization", `Bearer ${token}`)
            .send({
              email: "reviiii@mail.com",
              username: "reviiii",
              password: "password123",
              role: "User",
            });
  
          expect(status).toBe(201);
          expect(body).toHaveProperty("email", "reviiii@mail.com");
          expect(body).toHaveProperty("username", "reviiii");
        });
      });

    describe("Failed", () => {
      test("should fail because user is not authenticated", async () => {
        const { status, body } = await request(app)
          .post("/users")
          .send(userTestAdminUser);

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
      });

      test("should fail because of invalid token", async () => {
        const { status, body } = await request(app)
          .post("/users")
          .set("Authorization", "Bearer gaada")
          .send(userTestAdminUser);

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
      });

      test("should fail due to missing required fields in request body", async () => {
        const { status, body } = await request(app)
          .post("/users")
          .send({
            username: "Invalid User",
          })
          .set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email is required");
      });

      test("should fail due to missing required fields in request body", async () => {
        const { status, body } = await request(app)
          .post("/users")
          .send({
            password: "Invalid Password",
          })
          .set("Authorization", `Bearer ${token}`);

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Username is required");
      });
    });
  });
});
