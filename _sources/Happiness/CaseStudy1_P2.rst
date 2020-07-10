.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.

Cases Study 1 Part II: Adding more data
=======================================

Before we begin, make sure that the google sheets file you are working on is exactly like the one given at the bigining of this case study. Any changes you made to the google sheets while following along in the previous section should be deleted.

Business Score by Region
------------------------

Let’s create a table displaying the average business score for all of the countries in the region. To get started, we need to answer a couple of questions.

- What are the unique region names?
- How can we compute an average for the countries that are in the same region?

1. Lets start by first sorting the data by regions. Select Column C and then from the menu select Data -> Sort sheet by column C, A -> Z. 

2. We can get a table of the unique region names by using the ``UNIQUE`` function. The ``UNIQUE`` function takes the range that contains all of the region names and will populate a few rows with just the unique names. In Cell C193 use the ``UNIQUE`` function and find the different names for the regions.

   .. fillintheblank:: q1_cs1_sbd

      How many unique regions are there? |blank|

      - :5: Is the correct answer!
        :x: Incorrect. Try the following command ``=UNIQUE(C2:C192)``
      
3. With the table of Regions, we can use a combination of ``SUMIF`` and ``COUNTIF`` to compute the average business score. Let’s do this incrementally to start. Let’s create a column right next to the region names that contains the number of countries in the region. The ``COUNTIF`` function takes a range of cells and a condition for those cells to match. In our case, the range is C2:C141, that is, all of the regions. The condition is the name of the region which we can get from a cell in our newly created table of region names.

   .. fillintheblank:: q2_cs1_sbd
   
      There are |blank| countries in Europe and |blank| countries in Africa.

      - :42: Is the correct answer!
        :x: Incorrect. Check to make sure than when you copy pasted the formual the cell ranges did not get changed.
        
      - :54: Is the correct answer!
        :x: Incorrect. Check to make sure than when you copy pasted the formual the cell ranges did not get changed.

Now, let’s create a column that sums the business score for each region using the ``SUMIF`` function. The ``SUMIF`` function is a bit more complicated than ``COUNTIF`` in that it takes a separate (parallel) range for us to sum. Once again, the first parameter will be the range containing the regions, the second parameter will be the name of a region to match. In this case, there is a third parameter that is the range of cells containing the business scores. When a row in the Region column matches the given Region, the function includes the value from the business score column in the sum.


.. fillintheblank:: q3_cs1_sbd
   
   The sum of all business scores in Asia is |blank| and the sum of all business scores in Europe is |blank|.

   - :4167.9: Is the correct answer!
     :x: Incorrect.
      
   - :3744: Is the correct answer!
     :x: Incorrect.

With a column for the count and a column for the sum, you can now calculate the mean by dividing our two columns.
 
.. fillintheblank:: q4_cs1_sbd
    
   The average business score for Oceania is |blank|.

   - :84.95: Is the correct answer!
     :x: Incorrect.

1. We can combine the work we did above using a single function called AVERAGEIF. Let’s use it and compare our answers. (They should be identical.) By now, you should be feeling some respect for the spreadsheet jockeys of the world. This is definitely not a toy!

2. Last but not least, let’s sort the business scores so we can see the regions from the highest score to the lowest.

3. Select Column H and then from the menu select Data -> Sort sheet by column H, A -> Z.

4. Add another column to our table that tells us how many countries are in each region (COUNTIF).

5. Using ``MAXIFS``, ``MINIFS``, ``MATCH`` and ``INDEX``, let’s find the easiest and hardest country to start a business in for each region. ``MAXIFS`` and ``MINIFS`` work like ``AVERAGEIF`` and ``COUNTIF``, but allow for more conditions. In our case, we still need only one. (If you read the popup you will know what to do.)

   .. fillintheblank:: q5_cs1_sbd
      
      What is the easiest country to start a business in in the Americas?
      
      - :Canada: Is the correct answer!
        :x: Incorrect. Try using the functions one at a time in different cells before combining them.

Joining Data from Other Sources
-------------------------------

So far, we have limited our analysis to the data provided for us in the original
happiness spreadsheet. But what if we wanted to look at other factors for
happiness, such as cell phone ownership, internet access, birth rates, or
anything else we can think of? Seldom does one file contain all the data you
need to answer the questions you may have. In this part of the project, we will
import a spreadsheet that has a lot more data about each country, including its
continent (see question 5). This is an important lesson as it sets the stage
nicely for what we will learn about later when using SQL to "join" two tables of
data.

1. The first thing we need to do is to import the
   `countries of the world <../_static/world_countries_2019.csv>`_ spreadsheet. This
   has a huge amount of data about each country and you may wish to explore some
   of the other data provided later. For now, we are interested in how we can
   use the information on this new spreadsheet to give us the continent of each
   country.
   

2. You can start by either copy/pasting the whole sheet into a new tab in the same spreadsheet or importing the csv file into a new tab in the same spreadsheet.


3. Next, we will want to add a column to the Starting a Business spreadsheet that contains
   the population for each country. The way we do this is to use the ``VLOOKUP``
   function. Pay attention to this as it is one of the most powerful functions
   you will learn about. The main idea behind this is also widely used in the
   database world, so it is worth learning in detail.

The idea goes like this. On our Starting a Business spreadsheet, we have a column that
contains the name of each country. It has a bunch of business related data
about each country in other columns. On our countries of the world sheet, we
have a column of country names and a bunch of other information about countries
(including their population) in other columns. The two sheets do not have the
countries in the same order, nor do they necessarily have the same list of
countries. (They do have most of the same but not all.)

When we use ``VLOOKUP``, our goal is to join together these two sheets, adding
columns to the Starting a Business sheet using values from the population row in the countries of the
world sheet in the rows where the country names match. For example, in our
Starting a Business sheet, Ethiopia is on row 170, but in the countries of the world sheet,
it is on row 72. What we want to do is take (at least) column A row 72 from
the countries sheet, and add it to the Starting a Business sheet on row 170 column Q.

With ``VLOOKUP``, we do this by allowing the function to search for the value in
one cell in another column, and then return the value from a different cell in
the same row but in some other column. For instance, to find the Country Code of Ethiopia, we would
use ``=VLOOKUP(B170, countries_of_the_world!$A$2:$BK$265, 2, FALSE)``.

* B170 is the cell containing Ethiopia
* ``countries_of_the_world!$A$2:$BK$265`` is the range of cells we can search in as well as get
  values from
* 2 tells Sheets that when we find a match for Ethiopia, we want the value from
  the same row but in column 2 of our range

Notice that column 2 of our range is the Country Code column. You may have
noticed that ``VLOOKUP`` is a bit like using ``MATCH`` and ``INDEX`` together,
but it is a little less flexible, as the column you search in must always be on
the far left side of the range.


To fill in a new column with the country codes, paste the following into Q2: 
``=VLOOKUP(B2, countries_of_the_world!$A$2:$BK$265, 2, FALSE)``. Have Q2 selected 
then double click blue square in the lower right corner of the cell. Sheets will automatically 
paste the values into the remaining cells until it reaches a black cell in the left column. 
Double check the entire column to make sure that all the data is filled. 

Replicate the same procedure to import the population of each country into the Starting a Business sheet. 


.. fillintheblank:: q6_cs1_sbd

   What does your Starting a Business spreadsheet show for the population of the Côte d'Ivoire?
   |blank| What does the countries of the world sheet show for the Cote d'Ivoire? |blank|

   - :#N/A: Is the correct answer
     :25069229: Check again on the happiness_2017 spreadsheet
     :x: The Starting a Business spreadsheet will not have a value for the Côte d'Ivoire

   - :25069229: Is the correct answer
     :#N/A: Make sure you are looking at the right spreadsheet
     :x: Check a little more carefully


As you found out, there are some rows that have a value of #N/A in them. This is
because one spreadsheet has the name "Venezuela, RB" and the other spreadsheet
has "Venezuela (Bolivarian Republic of)". We know these are the same but the computer does
not make the match. You will need to clean up this data manually by making the
names match where they don't already. This is also why the countries of the
world spreadsheet contains the column that has a three letter code for each
country. These codes are internationally agreed upon and are always the same for
each country. This avoids the kind of problems we have where there is more than
one common spelling.

Any time you are introducing data from another source, you are likely to run
into inconsistencies and missing data. That is just a simple fact of life for a
data scientist. You will need to either search further to fill in the missing
pieces, or learn to live without some pieces of data.


.. mchoice:: q7_cs1_sbd

   Which of the following countries are NOT in the world countries spreadsheet?

   - Taiwan, China

     + Correct

   - São Tomé and Príncipe

     + Incorrect, it should be there after data cleaning.

   - Palau

     - No, Palau is there

   - Eritrea

     - Incorrect, it is there. It just doesn't have population data. 
     

Now that you have country names unified and the population data in place, you
can practice some calculations on this new piece of data.

1. Calculate the average population for each region?

   .. fillintheblank:: q8_cs1_sbd

      The average population is |blank| for Europe.

      - :23647200.31: Is the correct answer
        :993182413: You must devide it by the number of countries in Europe. 
        :x: Please check your formula


2. Find the name of the country in each region with the largest population.

   .. fillintheblank:: q9_cs1_sbd

      |blank| has the largest population in Americas.
      
      - :Venezuela: Is the correct answer!
        :x: Incorrect.

3. What is the country in each region with the smallest population?

   .. fillintheblank:: q10_cs1_sbd
   
      |blank| has the smallest population in Africa.

      - :Seychelles: Is the correct answer!
        :x: Incorrect.

.. shortanswer:: q11_cs1_sbd
   
   Write down two questions of your own, that you can explore with the combined data set.

Now, using your new spreadsheet skills answer your own questions.

.. shortanswer:: q12_cs1_sbd
   
   Use this space to provide answers to the questions above, explaining briefly how you arrived at the answers.


Introducing Pivot Tables
------------------------

We can make all of this a bit easier using pivot table! This is a really useful
tool to have in your toolbox, and many other tools you use will support the
creation of pivot tables as well.

1. The idea behind a pivot table is to take the unique values from some column
   and make them the titles of a bunch of columns, while summarizing the data
   for those columns from a number of rows. For example, suppose you had a table
   with three columns: user, movie, rating. What would be more easy to look at
   would be to have a column for each movie and a row for each user with the
   rating in the cell corresponding to a user and a movie. This is exactly the
   use case for pivot tables. You can see an example of transforming the orginal
   data to the pivot table view below.

   
.. image:: Figures/pivot_example.png


Start a new worksheet, and recreate the data and pivot table you see in the
example above.


2. Another good use case is to replace what we have just done. We want to use
   the unique values for each continent as the row, and then calculate a number
   of summary statistics for each. For practice, you should redo the exercise of
   finding the average population for each region that you did above.


.. fillintheblank:: q13_cs1_sbd

   Using a pivot table, find the median value of the Starting a Business Score column for each
   region. The median value for Africa is |blank|.

   - :4353.4: Is the correct answer
     :x: Incorrect. You should have Starting a Business Score column summarized by Median

Pivot tables can be treated like any other part of your spreadsheet. Use a pivot table to find the least happy country in each region. Then using ``MATCH`` and ``INDEX``, add an additional column that contains the name of that country.

.. fillintheblank:: q14_cs1_sbd
   
   The country with the lowest starting a business score in Asia is |blank|.

   - :Cambodia: Is the correct answer
     :x: Incorrect. Try using the functions one at a time in different cells before combining them.

.. fillintheblank:: q15_cs1_sbd

   Without adding another column, change the function to summarize, to find the country with the highest starting a business score in Asia. |blank|

   - :Georiga: Is the correct answer
     :x: Incorrect. Hint: Replace the MINIFS function.

You will find that understanding Pivot tables and when to use them to be a very powerful tool to have in your toolbox. Many other systems, including Pandas and relational databases like Postgresql, also support making pivot tables. The interface in Sheets is the simplest, so it is a good one to learn on.

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
