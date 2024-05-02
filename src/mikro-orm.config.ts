import { defineConfig, type Options } from "@mikro-orm/postgresql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

const options: Options = defineConfig({
    dbName: 'db',
    user: 'root',
    password: 'password',
    port: 8432,

    entities: ['./build/entities/*'],
    entitiesTs: ['./src/entities/*'],

    debug: true,
    highlighter: new SqlHighlighter(),

    allowGlobalContext: true,
});

export default options;
