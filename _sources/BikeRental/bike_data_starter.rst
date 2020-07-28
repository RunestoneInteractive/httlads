Getting Started with the Bike Data
==================================

In this Lesson, we will be hands on and try out SQL with the Capital
bike sharing dataset, hosted on a SQLLite database. You don't have to do anything as we have a full version of the SQLLite database management system running the browser.




Verify access to the dataset
----------------------------

Let’s verify that you have access to the dataset by running a simple SQL
query.

The code snippet contains a few lines: \* The first line of that code
block is just a magic invocation that lets Jupyter know that this cell
contains SQL and not Python. \* The second line introduces SQL syntax
for the first time. To help you understand the SQL commands we are
using, the SQL syntax words are listed in CAPITAL letters, the lowercase
words are the names of tables or columns. The SQL statement translates
to: grab (SELECT) all the values (*) in the table called trip_data but
only show me the first ten (LIMIT 10).

.. activecode:: sql_bikeshare_intro_1
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare_11_12.db

    SELECT
      *
    FROM
      trip_data
    LIMIT
      10





The trip_data table is composed of several columns:

::

   index BIGINT,
   duration BIGINT,
   start_date DATETIME,
   end_date DATETIME,
   start_station BIGINT,
   end_station BIGINT,
   bike_number TEXT,
   member_type TEXT

We don’t always want to read all the columns in a table. For example, if
we just want the subscriber type, start time, and duration in minutes
columns we could select:

.. activecode:: sql_bikeshare_intro_2
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    SELECT
      member_type, start_date, duration
    FROM
      trip_data
    LIMIT
      10


**Tips:** SQL doesn’t care about line breaks so we can spread a SQL
query over multiple lines just to make it easier to read.


Its also really easy to forget the exact names of all of the columns in a table, especially when you are just getting started with a new database.  Here's a handy one-liner that will remind you of the names of your tables and all of their columns and types:

.. activecode:: sql_bikeshare_intro_3
    :language: sql
    :dburl: /runestone/books/published/httlads/_static/bikeshare.db

    select name, sql from sqlite_master


Note, this works fine for SQLITE but will not work for Postgresql or MySQL or other databases, each database has their own query for things like this, and once you get more experience you'll be able to easily find them on the internet.

