import { pgEnum, pgTable, uuid, integer, timestamp, text } from "drizzle-orm/pg-core";
import { userDetails } from "./userDetails"; 


export const tokenTypeEnum = pgEnum("token_type", [
  "purchase",  
  "usage",     
  "free",      
  "refund",    
]);

export const userTokens = pgTable("user_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => userDetails.userId, { onDelete: "cascade" }), 

  tokens: integer("tokens").notNull(), 

  type: tokenTypeEnum("type").notNull(),  

  context: text("context"), 

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
