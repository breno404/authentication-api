import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729713123650 implements MigrationInterface {
    name = 'Migrations1729713123650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tb_contacts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('email', 'phone') NOT NULL DEFAULT 'email', \`value\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`isAdmin\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`street\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`zip\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`canCreate\` tinyint NOT NULL DEFAULT 1, \`canRead\` tinyint NOT NULL DEFAULT 1, \`canUpdate\` tinyint NOT NULL DEFAULT 0, \`canDelete\` tinyint NOT NULL DEFAULT 0, \`canDestroy\` tinyint NOT NULL DEFAULT 0, \`userId\` int NULL, UNIQUE INDEX \`REL_2376e8811538440da21403cf3e\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isUser\` tinyint NOT NULL DEFAULT 1, \`isManager\` tinyint NOT NULL DEFAULT 0, \`isTechnical\` tinyint NOT NULL DEFAULT 0, \`userId\` int NULL, UNIQUE INDEX \`REL_a89a077c96ad40df814c843acd\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tb_contacts\` ADD CONSTRAINT \`FK_e4de67d803e27877a74da4b8f39\` FOREIGN KEY (\`userId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_addresses\` ADD CONSTRAINT \`FK_67fbe78b36badf5af87edbd6e87\` FOREIGN KEY (\`userId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_permissions\` ADD CONSTRAINT \`FK_2376e8811538440da21403cf3ec\` FOREIGN KEY (\`userId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_roles\` ADD CONSTRAINT \`FK_a89a077c96ad40df814c843acd1\` FOREIGN KEY (\`userId\`) REFERENCES \`tb_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_roles\` DROP FOREIGN KEY \`FK_a89a077c96ad40df814c843acd1\``);
        await queryRunner.query(`ALTER TABLE \`tb_permissions\` DROP FOREIGN KEY \`FK_2376e8811538440da21403cf3ec\``);
        await queryRunner.query(`ALTER TABLE \`tb_addresses\` DROP FOREIGN KEY \`FK_67fbe78b36badf5af87edbd6e87\``);
        await queryRunner.query(`ALTER TABLE \`tb_contacts\` DROP FOREIGN KEY \`FK_e4de67d803e27877a74da4b8f39\``);
        await queryRunner.query(`DROP INDEX \`REL_a89a077c96ad40df814c843acd\` ON \`tb_roles\``);
        await queryRunner.query(`DROP TABLE \`tb_roles\``);
        await queryRunner.query(`DROP INDEX \`REL_2376e8811538440da21403cf3e\` ON \`tb_permissions\``);
        await queryRunner.query(`DROP TABLE \`tb_permissions\``);
        await queryRunner.query(`DROP TABLE \`tb_addresses\``);
        await queryRunner.query(`DROP TABLE \`tb_users\``);
        await queryRunner.query(`DROP TABLE \`tb_contacts\``);
    }

}
