--liquibase formatted sql
--changeset k.a.lebedev:a
CREATE SEQUENCE auth_users_seq
       INCREMENT BY 1
       MINVALUE 1
       CACHE 1
       NO CYCLE;
CREATE SEQUENCE roles_seq
       INCREMENT BY 1
       MINVALUE 1
       CACHE 1
       NO CYCLE;
CREATE TABLE auth_users
(
   id        bigint        NOT NULL,
   login     varchar(25),
   email     varchar(50),
   password  text
);

ALTER TABLE auth_users
   ADD CONSTRAINT auth_users_pkey
   PRIMARY KEY (id);

CREATE TABLE roles
(
   id    bigint        NOT NULL,
   name  varchar(50)
);

ALTER TABLE roles
   ADD CONSTRAINT roles_pkey
   PRIMARY KEY (id);

CREATE TABLE users_roles
(
   user_id  bigint,
   role_id  bigint
);

ALTER TABLE users_roles
  ADD CONSTRAINT "FK_user_id" FOREIGN KEY (user_id)
  REFERENCES auth_users (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE;

ALTER TABLE users_roles
  ADD CONSTRAINT "FK_role_id" FOREIGN KEY (role_id)
  REFERENCES roles (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE;

--changeset add roles values
insert into roles (id, name) values (nextval('roles_seq'), 'OWNER');
insert into roles (id, name) values (nextval('roles_seq'), 'SUPER_ADMIN');
insert into roles (id, name) values (nextval('roles_seq'), 'ADMIN');
insert into roles (id, name) values (nextval('roles_seq'), 'CASHIER');
insert into roles (id, name) values (nextval('roles_seq'), 'USER');
