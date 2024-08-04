const req = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { sequelize, User } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const queryInterface = sequelize.queryInterface;
require("dotenv").config();

let token = "";

const userTestAdmin = {
  email: "revi@gmail.com",
  username: "Revi Admin",
  password: "Admin",
  role: "Admin",
};

token = signToken({
  id: User.id,
});

describe("User", () => {
  describe("Berhasil login dan mengirimkan access_token", () => {
    describe("Success", () => {
      test("should success login user", async () => {
        let { status, body } = await req(app)
          .post("/login")
          .send(userTestAdmin)
          .set("Authorization", "Bearer " + token);

        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
      });
    });

    describe("Failed", () => {
      test("Email tidak diberikan / tidak diinput", async () => {
        const { status, body } = await req(app).post("/login").send({
          password: userTestAdmin.password,
        });

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email is required");
      });

      test("Password tidak diberikan / tidak diinput", async () => {
        const { status, body } = await req(app)
          .post("/login")
          .send({ email: userTestAdmin.email });

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Password is required");
      });

      test("Email diberikan invalid / tidak terdaftar", async () => {
        const { status, body } = await req(app).post("/login").send({
          email: "kagaada@gmail.com",
          password: userTestAdmin.password,
        });

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid email/password");
      });

      test("Password diberikan salah / tidak match", async () => {
        const { status, body } = await req(app)
          .post("/login")
          .send({ email: userTestAdmin.email, password: "salah" });

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid user token");
      });
    });
  });
});

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        email: userTestAdmin.email,
        username: userTestAdmin.username,
        password: hashPassword(userTestAdmin.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
});
afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});
