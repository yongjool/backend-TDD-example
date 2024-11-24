const express = require("express");

const app = express();


app.get("/", (req, res) => {
    console.log("GET / endpoint was hit 🎯");
    res.json("test");
   
  });


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
}).on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error("Port is already in use");
  } else {
    console.error("Server Error:", error);
  }
});