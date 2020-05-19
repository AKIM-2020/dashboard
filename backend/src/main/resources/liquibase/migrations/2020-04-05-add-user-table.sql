--liquibase formatted sql
--changeset k.a.lebedev:add-user-table
CREATE SEQUENCE users_seq
       INCREMENT BY 1
       MINVALUE 1
       CACHE 1
       NO CYCLE;

CREATE TABLE users
(
   id            bigint         NOT NULL,
   first_name    varchar(100),
   last_name     varchar(100),
   city          varchar(100),
   role          varchar(30),
   balance       numeric,
   auth_user_id  bigint,
   parent_id     bigint,
   version       bigint
);

ALTER TABLE users
   ADD CONSTRAINT users_pkey
   PRIMARY KEY (id);
