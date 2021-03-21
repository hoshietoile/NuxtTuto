module.exports = {
  DATA_TYPE: {
    0: "INT",
    1: "TINYINT",
    2: "BIGINT",
    3: "FLOAT",
    4: "DOUBLE",
    5: "DECIMAL",
    6: "NUMERIC",
    7: "DATE",
    8: "TIME",
    9: "DATETIME",
    10: "TIMESTAMP",
    11: "YEAR",
    12: "CHAR",
    13: "VARCHAR",
    14: "TEXT"
  },
  CONSTRAINT_TYPE: {
    0: "UNIQUE",
    1: "NOT NULL",
    2: "PRIMARY KEY",
    3: "DEFAULT",
    4: "AUTO_INCREMENT",
    5: "FOREIGN KEY" // 現状サポート無
  }
}