--liquibase formatted sql
--changeset add test owner
insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'test', 'test@email.ru', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 1, );
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('auth_users'), currval('auth_users_seq'), 1000000000, 'Owner', 'Owner', 'LONDON', 1, 'OWNER');

--changeset add test superAdmin
insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testSuperAdmin', 'testSuperAdmin@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 2, );
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('auth_users'), currval('auth_users_seq'), 0, 'SuperAdmin', 'SuperAdminov', 'TOMSK', 1, 'SUPER_ADMIN');

insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testSuperAdmin_1', 'testSuperAdmin_1@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 2, );
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('auth_users'), currval('auth_users_seq'), 0, 'SuperAdmin-1', 'SuperAdminov-1', 'TOMSK', 1, 'SUPER_ADMIN');

insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testSuperAdmin_2', 'testSuperAdmin_2@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 2, );
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('auth_users'), currval('auth_users_seq'), 0, 'SuperAdmin-2', 'SuperAdminov-2', 'TOMSK', 1, 'SUPER_ADMIN');



