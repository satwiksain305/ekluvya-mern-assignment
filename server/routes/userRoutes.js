
const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/User");

const router = express.Router();

router.post("/import", async (req, res) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch external users");
    }

    const apiUsers = await response.json();

    const existingUsers = await User.find(
      { sourceId: { $in: apiUsers.map(u => u.id) } },
      { sourceId: 1 }
    ).lean();

    const existingIds = new Set(
      existingUsers.map(u => u.sourceId)
    );

    const newUsers = apiUsers.filter(
      user => !existingIds.has(user.id)
    );

    const credentials = [];

    const records = await Promise.all(
      newUsers.map(async user => {
        const password = crypto.randomBytes(9).toString("base64url");
        const passwordHash = await bcrypt.hash(password, 10);

        credentials.push({
          name: user.name,
          password
        });

        return {
          sourceId: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          address: user.address,
          phone: user.phone,
          website: user.website,
          company: user.company,
          passwordHash
        };
      })
    );

    if (records.length > 0) {
      await User.insertMany(records);
    }

    res.status(200).json({
      success: true,
      message: "User import completed",
      totalFetched: apiUsers.length,
      imported: records.length,
      skipped: existingUsers.length,
      credentials
    });

  } catch (error) {
    console.error("Import error:", error);
    res.status(500).json({
      success: false,
      message: "User import failed",
      error: error.message
    });
  }
});

module.exports = router;
