"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers_1 = __importDefault(require("../app/controllers"));
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const apiRouter = express.Router();
const cors_1 = __importDefault(require("cors"));
const swaggerDocuments = YAML.load("./openapi.yaml");
apiRouter.use((0, cors_1.default)());
//routes for openapi
apiRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocuments));
// route for users
apiRouter.get("/coba", (req, res) => {
    res.json({ message: "halo" });
});
apiRouter.get("/api/v1/whoami", controllers_1.default.api.v1.authController.authorize, controllers_1.default.api.v1.authController.whoami);
apiRouter.post("/api/v1/register", controllers_1.default.api.v1.authController.register);
apiRouter.post("/api/v1/login", controllers_1.default.api.v1.authController.login);
apiRouter.get("/api/v1/users", controllers_1.default.api.v1.authController.authorize, controllers_1.default.api.v1.authController.list);
apiRouter.delete("/api/v1/users/:id", controllers_1.default.api.v1.authController.authorize, controllers_1.default.api.v1.authController.destroy);
apiRouter.put("/api/v1/users/:id", controllers_1.default.api.v1.authController.authorize, controllers_1.default.api.v1.authController.update);
// route for cars
apiRouter.get("/api/v1/cars", controllers_1.default.api.v1.authController.authorize, controllers_1.default.api.v1.carsController.listTrue);
apiRouter.get("/api/v1/all-cars", controllers_1.default.api.v1.authController.authorize, controllers_1.default.api.v1.carsController.list);
apiRouter.post("/api/v1/cars", controllers_1.default.api.v1.authController.authorize, controllers_1.default.api.v1.carsController.create);
apiRouter.put("/api/v1/cars/updateim/:name", controllers_1.default.api.v1.carsController.updateImage);
apiRouter.put("/api/v1/cars/:name", controllers_1.default.api.v1.authController.authorize, controllers_1.default.api.v1.carsController.update);
apiRouter.get("/api/v1/cars/:name", controllers_1.default.api.v1.carsController.show);
apiRouter.delete("/api/v1/cars/:name", controllers_1.default.api.v1.authController.authorize, controllers_1.default.api.v1.carsController.destroy);
//route for listorder
apiRouter.get("/api/v1/listorder", controllers_1.default.api.v1.authController.authorize, controllers_1.default.api.v1.listorderController.list);
/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
    throw new Error("The Industrial Revolution and its consequences have been a disaster for the human race.");
});
apiRouter.use(controllers_1.default.api.main.onLost);
apiRouter.use(controllers_1.default.api.main.onError);
module.exports = apiRouter;
