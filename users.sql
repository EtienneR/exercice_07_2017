DROP DATABASE IF EXISTS test;
CREATE DATABASE test;

\c test;

CREATE TABLE public.users
(
  id SERIAL PRIMARY KEY,
  name character varying(50),
  pv_max smallint, -- Point de vies
  force smallint,
  defense smallint,
  chance smallint
)

