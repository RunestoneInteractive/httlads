.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.

Case Study 2: Adding Data Using Google Sheets
=============================================

Before we begin, make sure that the Google Sheets file you are working on is exactly like the one given at 
the beginning of this case study. Any changes you made to the Google Sheets while following along in the 
previous section should be deleted.

Business Score by Region
------------------------

Let's show the average business score in all countries. We will create a table for all countries in the region. 
Before we get started, consider the following questions.

- What are the unique region names?
- How can we compute an average for the countries that are in the same region?

1. Let's start by first sorting the data by region. Select Column A and then from the menu select Data -> Sort sheet
by column B, A -> Z.

2. Use the ``UNIQUE`` function to create a table of the unique region names. In Cell ``B193`` use the ``UNIQUE`` function 
and find the different names for the regions. The ``UNIQUE`` function returns a list of unique values in a range. 
In this case, the values are unique region names.

3. Now that we have the table of regions, use ``SUMIF`` and ``COUNTIF`` to compute the average business score. The
``COUNTIF`` function counts the number of cells in a range that meets a specific condition. In our case, the range for all 
regions is ``B2:B192``. The condition is the name of the regions in the newly created table of region names.
To get started, create a column next to the region names that contains the number of countries in the region. 

4. Now, let’s use the ``SUMIF`` function to create a column that sums the business score for each region. 
``SUMIF`` function sums up values in a range that meet specific criteria. The first parameter will be 
the range containing the regions; the second parameter will be the name of a region to match. In this case, 
a third parameter is the range of cells containing the business scores. When a row in the region 
column matches the given region, the function includes the value from the business score column in the sum.


.. fillintheblank:: q3_cs1_sbd

   The sum of all business scores in Asia is |blank| and the sum of all business scores in Europe is |blank|.

   - :4167.9: Is the correct answer!
     :x: Incorrect.

   - :3744: Is the correct answer!
     :x: Incorrect.



Lastly, we can sort the business scores to see the regions from the highest score to the lowest. First, 
select Column A, and then from the menu select Data -> Sort sheet by column A, A -> Z. Then, add another column to 
our table that tells us how many countries are in each region (COUNTIF). Finally, using ``MAXIFS``, ``MINIFS``, ``MATCH`` 
and ``INDEX``, find the easiest and hardest country to start a business for each region. ``MAXIFS`` and ``MINIFS`` work 
like ``AVERAGEIF`` and ``COUNTIF``, but they allow for more conditions. In our case, we still need only one condition.



.. fillintheblank:: q5_cs1_sbd

   What is the easiest country to start a business in the Americas?

   - :Canada: Is the correct answer!
      :x: Incorrect. Try using the functions one at a time in different cells before combining them.


Joining Data from Other Sources
-------------------------------

So far, we have only used the original starting a business score spreadsheet for our analysis. Often, 
one file does not contain all the data we need. So, if we need to look at other factors that affect 
starting a business in different countries, we can import another spreadsheet that has a lot more data. In this lesson,
we will learn how to join data from various sources.

In our starting a business spreadsheet, we have a column that
contains the name of each country. It has a bunch of business-related data
about each country in other columns. On our countries of the world sheet, we
have a column of country names and other information about countries
in other columns. The two sheets do not have the countries in the same order. Also, 
they have most of the same countries, but not all.

The first thing we need to do is import the `countries of the world <../_static/world_countries_2019.csv>`_ spreadsheet.
This has a huge amount of data about each country. For now, we will use the information on this new spreadsheet to give us 
the country code of each country

When we use ``VLOOKUP``, our goal is to join these two sheets together, adding
columns to the starting a business spreadsheet using values from the population row in the countries of the
world sheet in the rows where the country names match. For example, in our
starting a business spreadsheet, Ethiopia is on row 170, but in the countries of the world spreadsheet,
it is on row 67. We want to take column A row 67 from
the countries' spreadsheet and add it to the starting a business spreadsheet on row 170 column Q.
We do this with ``VLOOKUP`` by allowing the function to search for the value in
one cell in another column, and then return the value from a different cell in
the same row but in some other column.

To find the country code of Ethiopia, we would use ``=VLOOKUP(A170, countries_of_the_world!$A$2:$BK$265, 2, FALSE)``.

* B170 is the cell containing Ethiopia
* ``countries_of_the_world!$A$2:$BK$265`` is the range of cells we can search in as well as get
  values from
* 2 tells Sheets that when we find a match for Ethiopia, we want the value from
  the same row but in column 2 of our range

To fill in a new column with the country codes, paste the following into N2:
``=VLOOKUP(A2, countries_of_the_world!$A$2:$BK$265, 2, FALSE)``. Have N2 selected
then double click blue square in the lower right corner of the cell. Google Sheets will automatically
paste the values into the remaining cells until it reaches a black cell in the left column.
Double-check the entire column to make sure that all the data is filled.

As in our previous study case, we will have some rows taht have a value of #N/A. In this case,
it is because in one spreadsheet there is a name "Venezuela, RB" and in the other spreadsheet it has 
"Venezuela, the Bolivarian Republic of." You will have to manually clean up this data, and make the names 
match where they don't already.

(OLD) As you found out, some rows have a value of #N/A in them. This is
because one spreadsheet has the name "Venezuela, RB" and the other spreadsheet
has "Venezuela, the Bolivarian Republic of." We know these are the same, but the computer does
not make the match. You will need to manually clean up this data by making the
names match where they don't already. This is also why the countries of the
world spreadsheet contain the column that has a three-letter code for each
country. These codes are internationally agreed upon and are always the same for
each country. This avoids the kind of problems we have where there is more than
one common spelling.

Any time you are introducing data from another source, you are likely to run
into inconsistencies and missing data.

Now that you have learned how to use ``VLOOKUP``. Add another column to starting a business spreadsheet.

1. You can start by either copy/pasting the whole spreadsheet into a new tab in the same spreadsheet or 
   importing the CSV file into a new tab in the same spreadsheet.

2. Next, we will want to add a column to the starting a business spreadsheet that contains
   the population for each country. 



Summarizing Data Using Pivot Table
-----------------------------------

A pivot table takes the unique values from some column and make them the titles of a bunch of columns, while 
summarizing the data for those columns from a number of rows. 

For practice, you should redo the exercise of finding the average population for each region that you did above.
You should create a pivot table that uses the unique values for each country code as the row and calculates a number
of summary statistics for each. 


.. fillintheblank:: q13_cs1_sbd

   Using a pivot table, find the median value of the starting a business score column for each
   region. The median value for Africa is |blank|.

   - :4353.4: Is the correct answer
     :x: Incorrect. You should have Starting a Business Score column summarized by Median


Pivot tables can be treated like any other part of your spreadsheet. You can use a pivot table to find the country with 
the lowest starting a business score. Then using ``MATCH`` and ``INDEX``, add an additional column 
that contains the name of that country.






**Lesson Feedback**

.. poll:: LearningZone_2_2_sab
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_2_2_sab
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_2_2_sab
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_2_2_sab
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
