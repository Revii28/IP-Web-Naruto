const router = require("express").Router();
const {
  createCharacter,
  getCharacters,
  getCharacterById,
  updateCharacterById,
  deleteCharacterById,
} = require("../controllers/characterController");
const { authentication } = require("../middlewares/authentication");
const { checkAdmin } = require("../middlewares/authorization");

router.get("/characters", getCharacters);

router.get("/characters/:id", getCharacterById);

router.use(authentication);
router.post("/characters", createCharacter);
router.put("/characters/:id", updateCharacterById);
router.delete("/characters/:id", deleteCharacterById);

module.exports = router;
