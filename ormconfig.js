"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  type: 'postgres',
  host: process.env.DATABASE_URL ||  process.env.DB_HOST_NAME,
  port: process.env.DBPORT || Number(process.env.DB_PORT),
  username:  process.env.USER_DB || process.env.DB_USERNAME,
  password: process.env.PASSWORD || process.env.DB_PASSWORD,
  database: process.env.DB_NAME ||  process.env.DATABASE,
  entities: ['./dist/modules/users/models/*.js', './dist/modules/materias/models/*.js', './dist/modules/vendas/models/*.js', './dist/modules/pecas/models/*.js', './dist/modules/Stock_User/models/*.js', './dist/database/model/*.js'],
  migrations: ['./dist/database/migrations/*.js'],
  cli: {
    migrationsDir: './dist/database/migrations'
  }
};
exports.default = _default;
