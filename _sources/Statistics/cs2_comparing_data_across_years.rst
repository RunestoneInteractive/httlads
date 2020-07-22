.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Case Study 2: Comparing Data Across The Years
=============================================

We have two files of Starting a Business data, one for 2019 that you have been using, and
another for `2014 <../_static/Starting_a_Business_2014.csv>`_, so you can do some
comparisons across a span of 5 years.

1. Start a new workbook, and get each of the csv files for the Starting a Business data
   loaded into separate sheets.

2. Now, let's create a table on a new sheet that shows the Starting a Business Rank for
   each country for each year. You'll have 3 columns: country name, 2014 rank,
   and 2019 rank. (Hint: Use ``VLOOKUP``.) But wait! What is the deal with these
   ``#N/A`` values? Shouldn't the Starting a Business report have the same countries for
   every year? There are some countries that did not have their data reported for a variety of
   reasons.

Now, create a column where you calculate the change between the 2019 rank and
the 2014 rank. Then create a new cell where you find the maximum value of this
new column.

You will notice that the result of looking for the maximum value in a column that
contains one of these ``#N/A`` values results in the function returning ``#N/A`` as well.
It appears we will have to find a better strategy.

The right way to handle this problem is to use the ``IFERROR`` function. This is
one area where Google Sheets and Excel are slightly different. The ``IFERROR``
function takes two parameters: a function or calculation, and a value to insert
in the case of an error. In our case, we want to adjust our subtraction so that
if there is an error, we will set the difference to be 0. We'll change the
calculation to look something like ``=IFERROR(C2-B2, 0)``. Now, you will see
that wherever we had an ``#N/A`` value before, we now have a 0. You will also
see that we get interesting values for maximum and minimum.


.. fillintheblank:: q1_p3_sab

      What is the name of the country with the largest positive change in their starting a business score?
      |blank| What about the largest negative change? |blank|

      - :Myanmar: Is the correct answer!
        :x: Check and make sure that the countries with no values for 2014 are not skewing the data.

      - :Venezuela: Is the correct answer!
        :x: Check and make sure that the countries with no values for 2014 are not skewing the data.


3. Next, let’s find the biggest changes in the starting a business scores from 2014 to 2019.

   .. mchoice:: q2_p3_sab

      Is the country  with the largest change in rank the same as the country with the largest change in score?

      - False

        + Correct!

      - True

        + Incorrect.

   .. fillintheblank:: q3_p3_sab

      What is the name of the country with the largest positive change in their starting a business rank?
      |blank| What about the largest negative change? |blank|

      - :Mozambique: Is the correct answer!
        :x: Check and make sure that the countries with no values for 2014 are not skewing the data.

      - :Togo: Is the correct answer!
        :x: Check and make sure that the countries with no values for 2014 are not skewing the data.

   .. shortanswer:: q4_p3_sab

      Give an explanation for why you think the two are different. Outline an experiment or calculation
      that you can do with a spreadsheet to back up your answer.


4. For the five countries with the largest changes in ranking between 2014 and 2019, what are
   the factors that changed the most? For this part, you can do this by making comparisons between
   sheets rather than creating a huge number of new columns on this summary sheet.

   .. shortanswer:: q5_p3_sab

      What did you learn in the previous investigation? What were the factors that changed the most?


**Challenge**


5. Lets use the data we have to learn something new about starting a business in different countries. You can find the population over time of the countries in the `world_countries <../_static/world_countries_2019.csv>`_ data we used in the previous section. Import the dataset into a new tab in your sheet. Create two new columns for each year and use appropriate functions (hint: ``VLOOKUP``) to input the population data for both years. Use the population data from 2014 and the one from 2019 to find out which countries (at least 10) had the largest increase in population over that 5 year period. Is there a correlation between change in a country's population and its change in Starting a Business rank?

**Lesson Feedback**

.. poll:: LearningZone_2_3_sab
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_2_3_sab
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_2_3_sab
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_2_3_sab
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
