import { pgTable, uuid, integer, timestamp } from "drizzle-orm/pg-core";
import { userDetails } from "./userDetails"; 

export const userBalance = pgTable("user_balance", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => userDetails.userId, { onDelete: "cascade" }), 

  balance: integer("balance").notNull().default(0), 

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
