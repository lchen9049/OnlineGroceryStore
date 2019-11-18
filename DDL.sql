create table Users
	(
		username		varchar(20),
		pword			varchar(20),
		isAdmin			boolean,
		primary key (username)
	);
	
create table Card 
 	(
 		username			varchar(20),
		billing_address		varchar(100),
 		card_number			varchar(20),
 		card_pin			varchar(3),
 		primary key (username, card_number, billing_address, card_pin),
		 foreign key (username) references Users
 	);


create table Staff
	(
		username		varchar(20), 
	 	staff_name		varchar(50), 
		s_address		varchar(100),
		salary			numeric(10, 2),
		job_title		varchar(20),
		primary key (username),
		foreign key (username) references Users (username)
	);

create table Customer
	(
		username			varchar(20), 
		customer_name		varchar(50), 
		phone_number		varchar(20),
		primary key (username)
	);

create table Address 
	(
		username varchar(20),
		address  varchar(100),
		city     varchar(50),
		zipcode  varchar(10),
		state    varchar(50),
		primary key (username, address, city, zipcode, state),
		foreign key (username) references Customer (username)
	);


create table Orders
	(
		order_id		varchar(10),	
		username		varchar(20),
		order_status	varchar(20) 
			check (order_status in ('pending', 'delivering', 'delivered')),
		primary key (order_id),
		foreign key (username) references Customer (username)
	);
	
	create table Product
	(
		product_id			serial,
		product_name		varchar(30),
		product_price		numeric(8, 2),
		category			varchar(10),
		p_weight			numeric(6,2),
		p_image				varchar(300),
		primary key (product_id)
	);

create table Contain
	(
		order_id			varchar(10),
		product_id			serial,
		price_amount		numeric(8, 2),
		product_quantity	numeric(6),
		primary key (order_id, product_id),
		foreign key (order_id) references Orders (order_id),
		foreign key (product_id) references Product (product_id)
	);
	
	create table Supplier
	(
		supplier_id		varchar(10),
		supplier_name	varchar(20),
		s_address		varchar(100),
		primary key (supplier_id)
	);
	
	create table Warehouse
	(
		warehouse_id			varchar(10), 
		supplier_id				varchar(10),
	 	w_address				varchar(100),
		storage_capacity		numeric(10,2), 
		primary key (warehouse_id),
		foreign key (supplier_id) references Supplier (supplier_id)
	);



create table Stocks
	(
		warehouse_id		varchar(10),
		product_id			serial, 
		quantity			numeric(6), 
		primary key (warehouse_id, product_id),
		foreign key (warehouse_id) references Warehouse (warehouse_id),
		foreign key (product_id) references Product (product_id)
	);


create table Supplies
	(
		supplier_id				varchar(10),
		product_id				serial,
		warehouse_id			varchar(10),
		prod_special_price		numeric(6,2) check (prod_special_price > 0),
		primary key (supplier_id, product_id, warehouse_id),
		foreign key (supplier_id) references Supplier (supplier_id),
		foreign key (product_id) references Product (product_id),
		foreign key (warehouse_id) references Warehouse (warehouse_id)
	);

