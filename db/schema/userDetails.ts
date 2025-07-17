import { pgTable, uuid, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const userDetails = pgTable(
  "user_details",
  {
    userId: uuid("user_id")
      .primaryKey()
      .notNull(), 

    email: text("email").notNull(),

    fullName: text("full_name"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    emailIndex: uniqueIndex("user_email_idx").on(table.email), 
  })
);
