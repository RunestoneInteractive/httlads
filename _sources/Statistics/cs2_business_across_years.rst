.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Case Study 2: How is Business Over Time?
========================================

In this section, we will compare data across the years in order to identify
patterns and trends over time.
This will help us to analyze data better and make important connections. So far, We have
been using the business data set from 2019. In this section, we will use the same data set from
`2014 <../_static/Starting_a_Business_2014.csv>`_. We can use this file to make some comparisons of our
data across a span of 5 years.

1. First, let's start with a new workbook. We want to get each of the CSV files from the business data
   loaded into separate sheets. Therefore, you will have one sheet containing 2014 business data,
   and another sheet containing 2019  business data in the same workbook.

2. Next, we can create a table on a new sheet with the ease of starting a business rank for each country in each year.
   You will have the following three columns: country name, 2014 rank, and 2019 rank. Hint: Use ``VLOOKUP``.
   Some countries did not have their data reported for a variety of reasons. Therefore, we will have
   ``#N/A`` values like in the previous case study.

Next, create a new column, you will use this column to measure the change between starting a business rank from
2018 and 2014. Then, create a new cell for finding the maximum value of this new column.

As we saw in the previous case study, if we run a function on a column with ``#N/A`` values, the function will
return ``#N/A``. To handle this problem, we can use the ``IFERROR`` function we used before and change all the ``#N/A``
values to 0. We can do this by adjusting our subtraction so that our difference gives us 0 when there is an error.
We change the calculation to look something like ``=IFERROR(C2-B2)``.

.. fillintheblank:: q1_p3_sab

      What is the name of the country with the largest positive change in their ease of starting a business rank?
      |blank| What about the largest negative change? |blank|

      - :Myanmar: Is the correct answer!
        :x: Check and make sure that the countries with no values for 2014 are not skewing the data.

      - :Venezuela: Is the correct answer!
        :x: Check and make sure that the countries with no values for 2014 are not skewing the data.

**Challenge**

Let's use the data we have to learn something new about starting a business in different countries.
You can find the annual populations of the countries in the `world_countries <../_static/world_countries_2019.csv>`_ data
we used in the previous section. Import the dataset into a new tab in your sheet. Create two new columns for each year and
use appropriate functions (hint: ``VLOOKUP``) to input the population data for both years. Use the population data from 2014
and the one from 2019 to determine which countries (at least 10) had the most significant increase in population over those five years.
Is there a correlation between the change in a country's population and its "Starting a Business" ranking?


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
