import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Backend Task API",
        version: "1.0.0",
        description: "API documentation for the Backend Task",
      },
    },
    apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // <-- yahan se comments read honge
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
