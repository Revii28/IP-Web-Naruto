const router = require("express").Router();
const {
  createVillage,
  getVillages,
  getVillageById,
  updateVillageById,
  deleteVillageById,
} = require("../controllers/villageController");
const { authentication } = require("../middlewares/authentication");
const { checkAdmin } = require("../middlewares/authorization");

router.get("/villages", getVillages);

router.get("/villages/:id", getVillageById);

router.use(authentication);
router.post("/villages", checkAdmin, createVillage);
router.put("/villages/:id", checkAdmin, updateVillageById);
router.delete("/villages/:id", checkAdmin, deleteVillageById);

module.exports = router;
