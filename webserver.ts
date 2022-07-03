import { serve } from "https://deno.land/std@0.146.0/http/server.ts";
import {
  Database,
  PostgresConnector,
  Model,
  DataTypes,
} from "https://deno.land/x/denodb/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const connector = new PostgresConnector({
  host: Deno.env.get("DATABASE_HOST")!,
  database: Deno.env.get("DATABASE_NAME")!,
  port: +Deno.env.get("DATABASE_PORT")!,
  username: Deno.env.get("DATABASE_USERNAME")!,
  password: Deno.env.get("DATABASE_PASSWORD")!,
});

const db = new Database(connector);

class Business extends Model {
  static table = "businesses";
  static timestamps = true;

  static fields = {
    id: {
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      length: 25,
    },
  };
}

db.link([Business]);

await db.sync();

await Business.create({
  name: "FooBar",
});

const port = 8080;

const handler = async (request: Request): Promise<Response> => {
  const business = await Business.all();
  return new Response(JSON.stringify(business), { status: 200 });
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });
