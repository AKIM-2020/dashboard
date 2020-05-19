--liquibase formatted sql
--changeset k.a.lebedev:add-test-owner

insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'test', 'test@email.ru', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 1);
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('users_seq'), currval('auth_users_seq'), 1000000000, 'Owner', 'Owner', 'LONDON', 1, 'OWNER');
--changeset k.a.lebedev:add-test-superAdmin

insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testSuperAdmin', 'testSuperAdmin@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 2);
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('users_seq'), currval('auth_users_seq'), 0, 'SuperAdmin', 'SuperAdminov', 'TOMSK', 1, 'SUPER_ADMIN');

insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testSuperAdmin_1', 'testSuperAdmin_1@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 2);
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('users_seq'), currval('auth_users_seq'), 0, 'SuperAdmin-1', 'SuperAdminov-1', 'TOMSK', 1, 'SUPER_ADMIN');

insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testSuperAdmin_2', 'testSuperAdmin_2@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 2);
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('users_seq'), currval('auth_users_seq'), 0, 'SuperAdmin-2', 'SuperAdminov-2', 'TOMSK', 1, 'SUPER_ADMIN');

UPDATE users SET parent_id = (SELECT id FROM users WHERE first_name = 'Owner')
  WHERE role = 'SUPER_ADMIN';

--changeset k.a.lebedev:add-test-Admin
insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testAdmin', 'testAdmin@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 3);
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('users_seq'), currval('auth_users_seq'), 0, 'Admin', 'Adminov', 'TOMSK', 1, 'ADMIN');

insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testAdmin_1', 'testAdmin_1@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 3);
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('users_seq'), currval('auth_users_seq'), 0, 'Admin-1', 'Adminov-1', 'TOMSK', 1, 'ADMIN');

insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testAdmin_2', 'testAdmin_2@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 3);
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('users_seq'), currval('auth_users_seq'), 0, 'Admin-2', 'Adminov-2', 'TOMSK', 1, 'ADMIN');

UPDATE users SET parent_id = (SELECT id FROM users WHERE first_name = 'SuperAdmin')
  WHERE role = 'ADMIN';

--changeset k.a.lebedev:add-test-cashier
insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testCashier', 'testCashier@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 4);
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('users_seq'), currval('auth_users_seq'), 0, 'Cashier', 'Cashierov', 'TOMSK', 1, 'CASHIER');

insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testCashier_1', 'testCashier_1@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 4);
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('users_seq'), currval('auth_users_seq'), 0, 'Cashier-1', 'Cashierov-1', 'TOMSK', 1, 'CASHIER');

insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testCashier_2', 'testCashier_2@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 4);
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('users_seq'), currval('auth_users_seq'), 0, 'Cashier-2', 'Cashier-2', 'TOMSK', 1, 'CASHIER');

UPDATE users SET parent_id = (SELECT id FROM users WHERE first_name = 'Admin')
  WHERE role = 'CASHIER';

--changeset k.a.lebedev:add-test-user
insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testUser', 'testUser@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 5);
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('users_seq'), currval('auth_users_seq'), 0, 'User', 'Userov', 'TOMSK', 1, 'USER');

insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testUser_1', 'testUser_1@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 5);
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('users_seq'), currval('auth_users_seq'), 0, 'User-1', 'Userov-1', 'TOMSK', 1, 'USER');

insert into auth_users (id, login, email, password) values (nextval('auth_users_seq'), 'testUser_2', 'testUser_2@email.com', '$2a$10$jBQeZgN8uEByZ4XHwnV82eRnTbnmm2VvzyXy7zoGgYQhyUmZhsAoe');
insert into users_roles (user_id, role_id) values (currval('auth_users_seq'), 5);
insert into users (id, auth_user_id, balance, first_name, last_name, city, version, role) values (nextval('users_seq'), currval('auth_users_seq'), 0, 'User-2', 'Userov-2', 'TOMSK', 1, 'USER');

UPDATE users SET parent_id = (SELECT id FROM users WHERE first_name = 'Cashier')
  WHERE role = 'USER';

