"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  type: 'postgres',
  host: "postgresql-38067-0.cloudclusters.net" ,
  port:38067,
  username:"spa" ,
  password: 51053455,
  database: "jewely",
  entities: ['./dist/modules/users/models/*.js', './dist/modules/materias/models/*.js', './dist/modules/vendas/models/*.js', './dist/modules/pecas/models/*.js', './dist/modules/Stock_User/models/*.js', './dist/database/model/*.js'],
  migrations: ['./dist/database/migrations/*.js'],
  cli: {
    migrationsDir: './dist/database/migrations'
  }
};
exports.default = _default;
