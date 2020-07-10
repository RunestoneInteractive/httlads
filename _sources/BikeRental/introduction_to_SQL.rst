.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.

Exploring Bike Rental Data with SQL
===================================

.. figure:: https://imgs.xkcd.com/comics/exploits_of_a_mom.png
   :alt: xkcd comic about sanitizing data. 

   exploits_of_a_mom.png

A lot of the data that we interact with today is stored in databases.
For example:

-  Student records, including grades, at a school
-  Posts and friends in your favorite social network
-  News stories on a newspaper’s website
-  Your contacts list on your mobile phone
-  All images that make up Google Maps

All these bits of information are stored in various kinds of databases.
Some of these are stored in relational databases that are available as
open source tools like Postgresql, MySQL and SQLite, as well as
commercial databases such as `Google
BigQuery <https://cloud.google.com/bigquery/>`__,
`Oracle <https://www.oracle.com/database/technologies/>`__, `Microsoft
SQL
Server <https://azure.microsoft.com/en-us/services/virtual-machines/sql-server/>`__,
or `Amazon Aurora <https://aws.amazon.com/rds/aurora/>`__

Others are stored in proprietary systems like Google’s
`BigTable <https://en.wikipedia.org/wiki/Bigtable>`__ or Facebook’s
`Haystack Object
Store <https://code.fb.com/core-data/needle-in-a-haystack-efficient-storage-of-billions-of-photos/>`__.

Query Language
--------------

Whatever the database might be, there needs to be a way to extract data
from it and a lot of these systems have agreed on a shared language for
accessing data. For relational database, this language is called SQL
(Structured Query Language, pronounced like “sequel”).

Before you stress out about learning a new language, lets take a minute
and review the things you have already learned how to do with Pandas.

-  You can change the shape of a DataFrame by **selecting** the columns
   you want or computing new columns.
-  You can filter a DataFrame by using conditions to **select** just the
   rows you want.
-  You can reorder a DataFrame by **sorting** on one or more columns.
-  You can **group by** one or more columns and compute aggregate
   summaries of other columns in the group.
-  You can **join** two dataframes together using the merge function.

The operations just described comprise a basic set of tools that any
data manipulation language should support, and SQL supports these
operations very well, in a very natural way. You are not going to have
to learn any new concepts in this chapter you are just learning some new
query syntax that will open up whole new worlds of data access for you.
Most businesses run on a relational database of some kind, so it follows
that a lot of real world data analysis requires you to get data from
one. In this section we will teach you how to get started.
