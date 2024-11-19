import { MigrationInterface, QueryRunner } from 'typeorm';

export class Insert1731663781810 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "users" ("id", "firstName", "lastName", "gender", "age", "problem") 
          VALUES (
            generate_series(1, 1000001), 
            ('[0:9]={"Jesse","Riley","Charlie","Frankie","Hunter","Kai","Tatum","Winter","Glenn","Drew"}'::text[])
		          [floor(random()*10)], 
            ('[0:9]={"Anderson","Keat","Leapman","Nathan","Harrison","Wayne","Ford","Simon","Owen","Dowman"}'::text[])
		          [floor(random()*10)],
            ('[0:1]={"male","female"}'::users_gender_enum[])
		          [floor(random()*2)],   
            floor(random() * 70) + 18,
            random() >= 0.5
          );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "users"`);
  }
}
