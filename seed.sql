/* INSERT INTO PRODUCT SAMPLE DATA */
insert into product (product_name, product_price, category, p_weight, p_image) values ('banana', 3, 'fruit', 5, 'https://images.unsplash.com/photo-1566393028639-d108a42c46a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1627&q=80');
insert into product (product_name, product_price, category, p_weight, p_image) values ('apple', 4, 'fruit', 8, 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'); 
insert into product (product_name, product_price, category, p_weight, p_image) values ('orange', 2, 'fruit', 6, 'https://images.unsplash.com/photo-1560749605-cebc04c2697c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'); 
insert into product (product_name, product_price, category, p_weight, p_image) values ('grape', 4, 'fruit', 7, 'https://images.unsplash.com/photo-1515778767554-42d4b373f2b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'); 
insert into product (product_name, product_price, category, p_weight, p_image) values ('blueberry', 6, 'fruit', 5, 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80');

insert into product (product_name, product_price, category, p_weight, p_image) values ('steak', 20, 'meat', 4, 'https://images.unsplash.com/photo-1565299715199-866c917206bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1314&q=80');
insert into product (product_name, product_price, category, p_weight, p_image) values ('chicken', 5, 'meat', 1, 'https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80');
insert into product (product_name, product_price, category, p_weight, p_image) values ('pork', 30, 'meat', 6, 'https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80');


insert into product (product_name, product_price, category, p_weight, p_image) values ('coke', 2, 'drink', 1, 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80');
insert into product (product_name, product_price, category, p_weight, p_image) values ('sprite', 2, 'drink', 1, 'https://cdn.influenster.com/media/product/image/Sprite_Lemon-lime_soda_100_Natural_Flavors_7-5_oz.png.355x355_q85ss0_progressive.png');
insert into product (product_name, product_price, category, p_weight, p_image) values ('starbuck coffee', 4, 'drink', 1, 'https://pics.drugstore.com/prodimg/416829/900.jpg');

/* INSERT INTO SUPPLIER SAMPLE DATA */
insert into supplier (supplier_id, supplier_name, s_address) values ('1', 'Jay', '1430 S Hello AVE CHICAGO, IL 60608-2040');
insert into supplier (supplier_id, supplier_name, s_address) values ('2', 'Linda', '1281 S Great AVE CHICAGO, IL 60608-2040');
insert into supplier (supplier_id, supplier_name, s_address) values ('3', 'JinJin', '1232 S Sample AVE CHICAGO, IL 60608-2040');
insert into supplier (supplier_id, supplier_name, s_address) values ('4', 'Jacky', '282 S Wall AVE CHICAGO, IL 60608-2040');



/* INSERT INTO WAREHOUSE SAMPLE DATA */
insert into warehouse (warehouse_id, supplier_id, w_address, storage_capacity) values ('Costco', '1', '1430 S ASHLAND AVE CHICAGO, IL 60608-2040', 800000);
insert into warehouse (warehouse_id, supplier_id, w_address, storage_capacity) values ('Target', '2', '1850 S Archer AVE CHICAGO, IL 60608-2040', 900000);
insert into warehouse (warehouse_id, supplier_id, w_address, storage_capacity) values ('MeatFarm', '3', '823 S California AVE CHICAGO, IL 60632-2123', 600000);
insert into warehouse (warehouse_id, supplier_id, w_address, storage_capacity) values ('SodaInc', '4', '2312 S State AVE CHICAGO, IL 60231-2131', 700000);


/* INSERT INTO STOCK SAMPLE DATA */
insert into stocks (warehouse_id, product_id, quantity) values ('Costco', 1, 250);
insert into stocks (warehouse_id, product_id, quantity) values ('Costco', 2, 220);
insert into stocks (warehouse_id, product_id, quantity) values ('Target', 3, 315);
insert into stocks (warehouse_id, product_id, quantity) values ('Costco', 4, 87);
insert into stocks (warehouse_id, product_id, quantity) values ('Target', 5, 98);
insert into stocks (warehouse_id, product_id, quantity) values ('MeatFarm', 6, 189);
insert into stocks (warehouse_id, product_id, quantity) values ('MeatFarm', 7, 281);
insert into stocks (warehouse_id, product_id, quantity) values ('MeatFarm', 8, 124);
insert into stocks (warehouse_id, product_id, quantity) values ('SodaInc', 9, 927);
insert into stocks (warehouse_id, product_id, quantity) values ('SodaInc', 10, 621);
insert into stocks (warehouse_id, product_id, quantity) values ('SodaInc', 11, 800);

