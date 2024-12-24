insert into ndc_category (id, name, number)
values
  (1, '漫画,挿絵,童画', '726'),
  (2, '劇場,演出,演技', '771'),
  (3, '数学', '410')
;

insert into customer (id, name, email_address)
values
  (1, 'customer1', 'customer1@example.com'),
  (2, 'customer2', 'customer2@example.com'),
  (3, 'customer3', 'customer3@example.com')
;

insert into author (id, name)
values
  (1, '荒川弘'),
  (2, '葦原大介'),
  (3, 'ONE'),
  (4, '村田雄介')
;

insert into book_master (id, isbn, name, publication_date, ndc_category_id)
values
  (1, '978-4088708096', 'ワールドトリガー1', '2013-7-4', 1),
  (2, '978-4757506206', '鋼の錬金術師1', '2002-1-22', 1),
  (3, '978-4088707013', 'ワンパンマン1', '2012-12-4', 1)
;

insert into book_master_author (id, book_master_id, author_id)
values
  (1, 1, 1),
  (2, 2, 2),
  (3, 3, 3),
  (4, 3, 4)
;

insert into book_stock_status (id, name)
values
  (1, '貸出可能'),
  (2, '貸出不可能'),
  (3, '破棄済')
;

insert into book_stock (id, book_master_id, book_stock_status_id, memo)
values
  (1, 1, 1, ''),
  (2, 1, 1, ''),
  (3, 2, 1, ''),
  (4, 3, 1, ''),
  (5, 3, 1, '傷あり、まだ貸せる')
;

insert into lending_status (id, name)
values
  (1, '貸出中'),
  (2, '返却済み')
;
