const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload") // File system upload middleware, not database upload


// Express Module
const app = express();


// Cross Platform Resource Sharing
app.use(cors({origin: "http://localhost:3000", credentials: true}));

// Using File Upload Middleware so that it can be accessible from any directory/subdirectory
app.use(fileUpload());

// Public Folder
app.use(express.static(__dirname + "/public"));

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Routes
app.use("/api", require("./routes/api"));



// Server & PORT
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));