--employee table
CREATE TABLE employee(
	id integer PRIMARY KEY AUTO_INCREMENT,
	Name VARCHAR(250 NOT NULL)
);

--book table
CREATE TABLE book(
	id integer PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255) UNIQUE NOT NULL,
	author VARCHAR(250) NOT NULL,
	publish_year YEAR,
	genre_of_books VARCHAR(250)NOT NULL,
	price integer,
	added_date TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE book(
	id integer PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255) UNIQUE NOT NULL,
	author VARCHAR(250) NOT NULL,
	publish_year YEAR,
	genre_of_books VARCHAR(250)NOT NULL,
	price integer,
	quantity integer,
	added_date TIMESTAMP NOT NULL DEFAULT NOW(),
	available_quantity integer
);

--member table
CREATE TABLE member(
	id integer PRIMARY KEY AUTO_INCREMENT,
	Name VARCHAR(255) UNIQUE NOT NULL,
	City VARCHAR(250) NOT NULL,
	Registered_date TIMESTAMP NOT NULL DEFAULT NOW()
);

--lended_book table
-- CREATE TABLE lended_book(
-- 	id integer PRIMARY KEY AUTO_INCREMENT,
-- 	member VARCHAR(255) NOT NULL,
-- 	book VARCHAR(255) NOT NULL,
-- 	return_date DATE DEFAULT NULL,
-- 	FOREIGN KEY (member) REFERENCES member(Name),
--   	FOREIGN KEY (book) REFERENCES book(title)
-- );

CREATE TABLE lended_book(
	id integer PRIMARY KEY AUTO_INCREMENT,
	memberId integer,
	bookId integer,
	return_date DATE DEFAULT NULL,
	FOREIGN KEY (memberId) REFERENCES member(id),
  	FOREIGN KEY (bookId) REFERENCES book(id)
);

