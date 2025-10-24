const express = require("express");
const cookieParser = require("cookie-parser");

const api = require("../api/routes");
const { genericErrorHandler, trackingId, responseHandler } = require("../api/middlewares");
const { HttpStatusCode } = require("axios");

module.exports = app => {
  // define any middlewares that need to run before our routes

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(trackingId);

  // define ALL routes here
  app.use("/", api);
  
  app.use((req, res) => res.status(HttpStatusCode.NotFound).json({ error: "Not Found" }));
  app.use(responseHandler);
  app.use((req, res, next) => {
      res.setHeader("X-Frame-Options", "DENY"); // Prevent clickjacking
      res.setHeader("X-Content-Type-Options", "nosniff"); // Prevent MIME type sniffing
      res.setHeader("Content-Security-Policy", "default-src 'self'; frame-ancestors 'none';"); // Prevent external content from loading
      res.setHeader("Referrer-Policy", "no-referrer"); // Limit what referrer info is shared during redirection
      return next();
  });

  // for any other middlewares that need to run after our routes
  app.use(genericErrorHandler);

};
