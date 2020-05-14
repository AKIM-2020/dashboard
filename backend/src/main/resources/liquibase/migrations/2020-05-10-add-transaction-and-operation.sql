--liquibase formatted sql
--changeset add transactions and operations tables

CREATE SEQUENCE transaction_seq
       INCREMENT BY 1
       MINVALUE 1
       CACHE 1
       NO CYCLE;
CREATE SEQUENCE operation_seq
       INCREMENT BY 1
       MINVALUE 1
       CACHE 1
       NO CYCLE;

CREATE TABLE transactions
(
   id                   bigint      NOT NULL,
   source_user_id       bigint,
   destination_user_id  bigint,
   note                 text,
   amount               numeric,
   created              timestamp
);

ALTER TABLE transactions
   ADD CONSTRAINT transactions_pkey
   PRIMARY KEY (id);

CREATE TABLE operations
(
   id              bigint         NOT NULL,
   operation_type  varchar(100),
   old_balance     numeric,
   user_id         bigint,
   transaction_id  bigint
);

ALTER TABLE operations
   ADD CONSTRAINT operations_pkey
   PRIMARY KEY (id);
