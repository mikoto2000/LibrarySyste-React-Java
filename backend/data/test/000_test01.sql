insert into ndc_category (id, name)
values
  (1, 'category1'),
  (2, 'category2'),
  (3, 'category3')
;

insert into customer (id, name, email_address)
values
  (1, 'customer1', 'customer1@example.com'),
  (2, 'customer2', 'customer2@example.com'),
  (3, 'customer3', 'customer3@example.com')
;

insert into author (id, name)
values
  (1, 'author1'),
  (2, 'author2'),
  (3, 'author3'),
  (4, 'author4'),
  (5, 'author5')
;

insert into book_master (id, name, publication_date, ndc_category_id)
values
  (1, 'book1', '2024-12-19', 1),
  (2, 'book2', '2024-12-20', 2),
  (3, 'book3', '2024-12-21', 2),
  (4, 'book4', '2024-12-22', 2),
  (5, 'book5', '2024-12-23', 1)
;

insert into book_master_author (id, book_master_id, author_id)
values
  (1, 1, 1),
  (2, 1, 2),
  (3, 1, 3),
  (4, 1, 4),
  (5, 1, 5),
  (6, 2, 2),
  (7, 3, 3),
  (8, 4, 4),
  (9, 5, 1),
  (10, 5, 5)
;

insert into book_stock_status (id, name)
values
  (1, 'book_stock_status1'),
  (2, 'book_stock_status2'),
  (3, 'book_stock_status3'),
  (4, 'book_stock_status4'),
  (5, 'book_stock_status5')
;

insert into book_stock (id, book_master_id, book_stock_status_id, memo)
values
  (1, 1, 1, 'memo1'),
  (2, 2, 2, 'memo2'),
  (3, 3, 3, 'memo3'),
  (4, 4, 4, 'memo4'),
  (5, 5, 5, 'memo5')
;
