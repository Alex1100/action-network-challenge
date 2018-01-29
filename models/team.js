//--- TEAM MODEL DEFINITION ---\\
/*

CREATE TABLE teams (
  "id"              serial,
  "full_name"       TEXT NOT NULL,
  "display_name"    TEXT NOT NULL,
  "abbr"            TEXT NOT NULL,
  "logo"            TEXT NULL,
  "primary_color"   TEXT NOT NULL,
  "secondary_color" TEXT NOT NULL,
  "sports_id"       bigint DEFAULT NULL REFERENCES sports ON DELETE CASCADE,
  "created_at"      TIMESTAMP DEFAULT NOW(),
  "updated_at"      TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("sports_id") REFERENCES sports("id") on delete cascade on update cascade
);

*/
