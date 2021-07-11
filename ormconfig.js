"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  type: 'postgres',
  host: process.env.HOST_DB ,
  port: process.env.DBPORT ,
  username:  process.env.USER_DB ,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./dist/modules/users/models/*.js', './dist/modules/materias/models/*.js', './dist/modules/vendas/models/*.js', './dist/modules/pecas/models/*.js', './dist/modules/Stock_User/models/*.js', './dist/database/model/*.js'],
  migrations: ['./dist/database/migrations/*.js'],
  cli: {
    migrationsDir: './dist/database/migrations'
  }
};
exports.default = _default;
