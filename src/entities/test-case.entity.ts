import { Embeddable, Embedded, Entity, OptionalProps, PrimaryKey, Property, types as PropertyType } from "@mikro-orm/core";

@Embeddable()
class StepEntity {
    @Property({ type: PropertyType.integer })
    camelCasePropertyName: number;
}

@Entity({ tableName: 'test_case' })
export class TestCaseEntity {
    [OptionalProps]: keyof Pick<TestCaseEntity, 'sid' | 'steps'>;

    @PrimaryKey({ autoincrement: true })
    sid: number;

    @Embedded(() => [StepEntity], { array: true })
    steps: StepEntity[] = [];
}
