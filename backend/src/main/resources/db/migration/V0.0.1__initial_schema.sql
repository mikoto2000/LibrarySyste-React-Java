create table ndc_category (
  id bigserial primary key,
  name varchar(255) not null,
  number varchar(20) not null
);

create table customer (
  id bigserial primary key,
  name varchar(255) not null,
  email_address varchar(255) not null
);

create table book_master (
  id bigserial primary key,
  isbn varchar(20) unique not null,
  name varchar(128) not null,
  publication_date date not null,
  ndc_category_id bigint not null,
  constraint bm_nc foreign key (ndc_category_id) references ndc_category (id)
);

create table author (
  id bigserial primary key,
  name varchar(128) not null
);

create table book_master_author (
  id bigserial primary key,
  book_master_id bigint not null,
  author_id bigint not null,
  constraint bmar_bm foreign key (book_master_id) references book_master (id),
  constraint bmar_a foreign key (author_id) references author (id)
);

create table book_stock_status (
  id bigserial primary key,
  name varchar(255) not null
);

create table book_stock (
  id bigserial primary key,
  book_master_id bigint not null,
  book_stock_status_id bigint not null,
  memo text,
  constraint bs_bss foreign key (book_stock_status_id) references book_stock_status (id),
  constraint bs_bm foreign key (book_master_id) references book_master (id)
);

create table lending_status (
  id bigserial primary key,
  name varchar(255) not null
);

create table lending_set (
  id bigserial primary key,
  customer_id bigint not null,
  lending_status_id bigint not null,
  lend_start_date date not null,
  lend_deadline_date date not null,
  return_date date,
  memo text,
  constraint ls_ls foreign key (lending_status_id) references lending_status (id),
  constraint ls_cu foreign key (customer_id) references customer (id)
);

create table lending_set_book_stock (
  id bigserial primary key,
  lending_set_id bigint not null,
  book_stock_id bigint not null,
  constraint lsbs_ls foreign key (lending_set_id) references lending_set (id),
  constraint lsbs_bs foreign key (book_stock_id) references book_stock (id)
);
