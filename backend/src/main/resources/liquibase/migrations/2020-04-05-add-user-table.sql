--liquibase formatted sql
--changeset add user table
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
