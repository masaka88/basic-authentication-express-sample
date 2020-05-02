const express = require("express");
const path = require("path");
const basicAuth = require("express-basic-auth");

const user = process.env.AUTH_USER;
const pass = process.env.AUTH_PASS;
const port = process.env.PORT || 3000;

const app = express();

if (user && pass) {
  app.use(
    basicAuth({
      unauthorizedResponse: () => {
        return "Unauthorized";
      },
      challenge: true,
      authorizer: (inputUser, inputPass) => {
        return (
          basicAuth.safeCompare(inputUser, user) &
          basicAuth.safeCompare(inputPass, pass)
        );
      },
    })
  );
}

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
