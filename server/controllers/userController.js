const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const gemini = require("../helpers/geminiAI");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const midtransClient = require("midtrans-client");

module.exports = {
  async register(req, res, next) {
    try {
      const { email, username, password, phoneNumber, address, image } =
        await User.create(req.body);
      res.status(201).json({
        email: email,
        username: username,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
        image: image,
      });
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        throw { name: "Email is required" };
      }
      if (!password) {
        throw { name: "Password is required" };
      }
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "InvalidUser" };
      }

      const isValidPassword = comparePassword(password, user.password);

      if (!isValidPassword) {
        throw { name: "InvalidUserToken" };
      }

      const token = signToken({ id: user.id });

      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  },

  async getUser(req, res, next) {
    try {
      const data = await User.findAll();
      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  },
  
  async createUser(req, res, next) {
    try {
      if (req.user.role !== "Admin") {
        return res.status(403).json({ message: "Forbidden" });
      }

      const {
        email,
        username,
        role,
        villageId,
        password,
        phoneNumber,
        address,
        image,
      } = await User.create(req.body);

      res.status(201).json({
        email: email,
        username: username,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
        image: image,
        role: role,
        villageId: villageId,
      });
    } catch (err) {
      next(err);
    }
  },

  async getUserById(req, res, next) {
    const userId = req.user.id;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw { name: "UserNotFound", id: userId };
      }
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  async updateUser(req, res, next) {
    const userId = req.params.id;
    try {
      const [updated] = await User.update(req.body, {
        where: { id: userId },
        returning: true,
      });

      if (updated === 0) {
        throw { name: "UserNotFound", id: userId };
      }

      const updatedUser = await User.findByPk(userId);
      res.status(200).json({ message: `User id ${updatedUser.id} updated.` });
    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    const userId = req.params.id;
    try {
      const deleted = await User.destroy({ where: { id: userId } });

      if (deleted === 0) {
        throw { name: "UserNotFound", id: userId };
      }

      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },

  async geminiAI(req, res, next) {
    try {
      const { naruto } = req.body;
      let data = await gemini(naruto);

      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience:
          "93865105873-6qniqqnnam8gs41ksqv0tk94qsieh6ek.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        hooks: false,
        defaults: {
          username: payload.name,
          email: payload.email,
          password: Math.random().toString(),
        },
      });

      const token = signToken({ id: user.id });
      res.status(created ? 201 : 200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  },

  async isPremium(req, res, next) {
    try {
      await User.update(
        { isPremium: true },
        {
          where: { id: req.user.id },
        }
      );
      res
        .status(200)
        .json({ message: `User with id ${req.user.id} is now premium.` });
    } catch (err) {
      next(err);
    }
  },

  async midtrans(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        throw {
          name: "UserNotFound",
          message: "User not found",
          id: req.user.id,
        };
      }

      if (user.isPremium) {
        throw {
          name: "AlreadyPremium",
          message: "User is already premium",
          id: req.user.id,
        };
      }

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-oaSXclwN3hSYnsusuyLulBLJ",
      });

      let parameter = {
        transaction_details: {
          order_id: `TRANSACTION_${Math.floor(
            10000000 + Math.random() * 9999999
          )}`,
          gross_amount: 900000000,
        },
        credit_card: { secure: true },
        customer_details: {
          first_name: user.name,
          email: user.email,
          phone: user.phoneNumber,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
      // console.log(midtransToken)
    } catch (err) {
      next(err);
    }
  },
};
