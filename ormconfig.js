"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  type: 'postgres',
  host: process.env.DB_HOST_NAME,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: ['./dist/modules/users/models/*.js', './dist/modules/materias/models/*.js', './dist/modules/vendas/models/*.js', './dist/modules/pecas/models/*.js', './dist/modules/Stock_User/models/*.js', './dist/database/model/*.js'],
  migrations: ['./dist/database/migrations/*.js'],
  cli: {
    migrationsDir: './dist/database/migrations'
  }
};
exports.default = _default;
