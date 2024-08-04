const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");

let token = "";

const updateUserData = {
  username: "patekao",
  email: "patekoa@mail.com",
  password: hashPassword("123456"),
  phoneNumber: "081234567890",
  address: "123 Updated St, Anytown",
  image: "updated",
};

beforeAll(async () => {
  try {

    const userData = [
      {
        username: "pateko",
        email: "pateko@mail.com",
        password: hashPassword("123456"),
        role: "Admin",
        phoneNumber: "08123456789",
        address: "123 Main St, Anytown",
        image: "profile_image_url_here",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Users", userData, {});


    const user = await User.findOne({ where: { username: "pateko" } });
    token = signToken({ id: user.id });

  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

afterAll(async () => {
  try {

    await queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

describe("PUT /users/:id", () => {
  test("successfully update user based on provided id", async () => {
    const userToUpdate = await User.findOne({ where: { username: "pateko" } });

    const { body, status } = await request(app)
      .put(`/users/${userToUpdate.id}`)
      .send(updateUserData)
      .set("Authorization", `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty("message", `User id ${userToUpdate.id} updated.`);
  });

  test("fail to execute feature due to not being logged in", async () => {
    const userToUpdate = await User.findOne({ where: { username: "pateko" } });

    const { body, status } = await request(app)
      .put(`/users/1`)
      .send(updateUserData)
      .set("Authorization", `Bearer `);

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });

  test("fail to execute feature due to invalid token provided", async () => {
    const userToUpdate = await User.findOne({ where: { username: "pateko" } });

    const { body, status } = await request(app)
      .put(`/users/1`)
      .send(updateUserData)
      .set("Authorization", "Bearer invalid_token");

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });

  test("fail because the user id provided is not found in the database", async () => {
    const { body, status } = await request(app)
      .put(`/users/999`)
      .send(updateUserData)
      .set("Authorization", `Bearer ${token}`);

    expect(status).toBe(404);
    expect(body).toHaveProperty("message", "User id 999 not found.");
  });

});
