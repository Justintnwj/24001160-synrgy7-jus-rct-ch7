const express = require("express");
import controllers from "../app/controllers";
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const apiRouter = express.Router();
import cors from "cors";
const swaggerDocuments = YAML.load("./openapi.yaml");
apiRouter.use(cors());
//routes for openapi
apiRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocuments));
// route for users
apiRouter.get("/coba", (req, res) => {
  res.json({ message: "halo" });
});
apiRouter.get(
  "/api/v1/whoami",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.whoami
);
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.get(
  "/api/v1/users",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.list
);
apiRouter.delete(
  "/api/v1/users/:id",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.destroy
);
apiRouter.put(
  "/api/v1/users/:id",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.update
);

// route for cars
apiRouter.get(
  "/api/v1/cars",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.carsController.listTrue
);
apiRouter.get(
  "/api/v1/all-cars",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.carsController.list
);
apiRouter.post(
  "/api/v1/cars",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.carsController.create
);
apiRouter.put(
  "/api/v1/cars/updateim/:name",
  controllers.api.v1.carsController.updateImage
);
apiRouter.put(
  "/api/v1/cars/:name",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.carsController.update
);
apiRouter.get("/api/v1/cars/:name", controllers.api.v1.carsController.show);
apiRouter.delete(
  "/api/v1/cars/:name",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.carsController.destroy
);

//route for listorder
apiRouter.get(
  "/api/v1/listorder",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.listorderController.list
);
/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
