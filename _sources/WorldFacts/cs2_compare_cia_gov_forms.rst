.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Case Study 2: Comparing CIA Government Forms
============================================

The goal of this section is to be able to summarize, sort, and organize
data using pivot tables. In the previous case study project, you retrieved the government 
types from the "list of countries by system of government" website.
However, in this case study, you will work with the data that you scraped from the CIA World 
Factbook website. You will compare different forms of government and how the form of government 
might impact the countries' economic success. For this example, measure financial stability 
based on GDP. You can do this by building a pivot table in Pandas. 

If you haven't already, you should review the example of ref:`screenscrape_Bus`.
This will show you the basics of reading and grabbing information out of a page.

1. If you scraped the whole data from CIA World Factbook 2017 in the previous exercise, you should be able to use the government type field 
from the CSV file you saved. If not, try and scrape the government type fields. 

2. For this exercise, you should have a row for every region, a column for government forms; then, in each cell, 
we would like to summarize the fraction of the economy that comes from GDP.

3. Remember, if the information you choose is numeric, you can change it to nominal using the ``map`` method, 
a lambda function, and a dictionary that maps from that specific column number to a label.

4. Now, let's pivot the table. Remember, the pivot table method takes three parameters:
``index``, ``columns``, and ``values``. 

If you recall from the previous case study, the ``pivot`` function works like the ``pivot_table`` function but does not do
any aggregation. Therefore, it will throw an error if you have duplicate index
rows.

Project
-------

Try changing the values parameter to be a list of columns may be agriculture,
inflation rate and, industry. How does that change your table?

**Lesson Feedback**

.. poll:: LearningZone_measure_6_4_cs2
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_measure_6_4_cs2
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_measure_6_4_cs2
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_measure_6_4_cs2
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...