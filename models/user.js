//--- USER MODEL DEFINITION ---\\
/*

CREATE TABLE users (
  "id"              serial,
  "username"        TEXT NOT NULL,
  "password"        TEXT NOT NULL,
  "favorite_teams"  TEXT [],
  "created_at"      TIMESTAMP DEFAULT NOW(),
  "updated_at"      TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY ("id"),
);

*/
