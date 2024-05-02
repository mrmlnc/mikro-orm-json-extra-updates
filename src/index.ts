import { MikroORM } from "@mikro-orm/core";
import db from './mikro-orm.config';
import { TestCaseEntity } from "./entities/test-case.entity";

(async () => {
    const orm = await MikroORM.init({ ...db });

    await orm.getSchemaGenerator().refreshDatabase();

    const testCase = orm.em.getRepository(TestCaseEntity).create({
        steps: [{ camelCasePropertyName: 1 }],
    });

    await orm.em.persistAndFlush(testCase);

    console.dir({ ...testCase }, { colors: true, compact: false, depth: 2 });

    // Extra update after flush.

    orm.em.getUnitOfWork().computeChangeSets();
    if (orm.em.getUnitOfWork().getChangeSets().length !== 0) {
        console.dir({
            type: orm.em.getUnitOfWork().getChangeSets()[0].type,
            payload: orm.em.getUnitOfWork().getChangeSets()[0].payload,
        }, { colors: true, compact: false, depth: 5 });
    }

    await orm.close();
})();
