const express = require("express");
const STATIC_CHANNELS = require("../staticChannels");
const router = express.Router();

router.get('/',(req, res) => {
  res.json({
    channels: STATIC_CHANNELS
  })
});

module.exports = router;