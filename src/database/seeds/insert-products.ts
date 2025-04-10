import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("products").del();

  // Inserts seed entries
  await knex("products").insert([
    { name: "soft drink", price: 1.9 },
    { name: "ice cream", price: 2 },
    { name: "chicken wings", price: 12.9 },
    { name: "sundae", price: 3.9 },
    { name: "beer pint", price: 4 },
    { name: "beer pitcher", price: 11.9 },
    { name: "long neck", price: 2.8 },
    { name: "ribs", price: 14 },
    { name: "fish fingers", price: 9.9 },
    { name: "poutine", price: 5.9 },
  ]);
}
