CREATE TABLE blogs
(
    id     SERIAL PRIMARY KEY,
    author text,
    url    text NOT NULL,
    title  text NOT NULL,
    likes  integer DEFAULT 0
);

insert into blogs (url, title)
values ('https://www.google.com/1', 'Google');

insert into blogs (author, url, title, likes)
values ('Me', 'https://www.bing.com/1', 'Bing', 15);