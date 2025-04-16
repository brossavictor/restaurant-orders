import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";

class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { product_id, quantity, table_session_id } = bodySchema.parse(
        request.body
      );

      const session = await knex<TablesSessionsRepository>("tables_sessions")
        .where({ id: table_session_id })
        .first();

      const product = await knex<ProductRepository>("products")
        .where({ id: product_id })
        .first();

      if (!session) {
        throw new AppError("Session not found.");
      }

      if (session.closed_at) {
        throw new AppError("This session is closed.");
      }

      if (!product) {
        throw new AppError("Product not found.");
      }

      await knex<OrderRepository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      });

      return response.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
