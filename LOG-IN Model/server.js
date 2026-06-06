const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Login Route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password are required." });
  }

  if (username === "admin" && password === "password123") {
    return res
      .status(200)
      .json({ success: true, message: "Login successful! Welcome back." });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password." });
  }
});

// Serve the static files from the built Vue app
const distPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(distPath));

// Catch-all route: Send any other requests to the Vue app
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
