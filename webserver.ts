import { serve } from "https://deno.land/std@0.146.0/http/server.ts";
import {
  Database,
  SQLite3Connector,
  Model,
  DataTypes,
} from "https://deno.land/x/denodb/mod.ts";

const connector = new SQLite3Connector({
  filepath: "./database.sqlite",
});

const db = new Database(connector);

class Business extends Model {
  static table = "businesses";
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      length: 25,
    },
  };
}

db.link([Business]);

await db.sync({ drop: true });

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
