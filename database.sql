CREATE TABLE artists (
    "id" serial PRIMARY KEY,
    "name" varchar(80) NOT NULL,
    "birthday" DATE
);

CREATE TABLE songs (
    "id" serial PRIMARY KEY,
    "title" varchar(255) NOT NULL,
    "length" varchar(10),
    "release" DATE
);

INSERT INTO "artists" ("name", "birthday")
VALUES ('Ella Fitzgerald', '04-25-1917'), 
('Dave Brubeck', '12-06-1920'),
('Miles Davis', '05-26-1926'),
('Esperanza Spalding', '10-18-1984');

INSERT INTO "songs" ("title", "length", "release")
VALUES ('Take Five', '5:24', '1959-09-29'),
('So What', '9:22', '1959-08-17'),
('Black Gold', '5:17', '2012-02-01');