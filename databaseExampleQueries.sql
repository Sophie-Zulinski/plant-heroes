-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create animals table
CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL,

  price int(5),
  experience int(2),
  description varchar(100),
);

-- Insert some animals (C in CRUD - Create)
INSERT INTO users
  (name,  price, experience, description)
VALUES


   ('Sophie',  27, 10,'Hi I am Sophie and I love plants'),
   ('Elisabeth',  20, 7,'Hi I am Elisabeth and I love plants'),
   ('Susanne',  30, 5,'Hi I am Susanne and I love plants'),
   ('Julia',  0, 10,'Hi I am Julia and I love plants');



-- Read some animals (R in CRUD - Read)
SELECT * FROM users;
