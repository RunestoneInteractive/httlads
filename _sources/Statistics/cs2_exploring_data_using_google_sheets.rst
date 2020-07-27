.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Case Study 2: Exploring Data Using Google Sheets
================================================

Data science and data analytics can be used to analyze and understand data related to different fields, 
such as business, healthcare, targeted advertising, etc. In this case study, we will explore a data set 
related to business.


Thinking About Starting Your Business
---------------------------------------

This case study utilizes the `Starting a Business <../_static/starting_a_business.csv>`_ data set obtained from the Doing Business-World Bank website. The dataset contains indicators from over 190 countries that measure the relative ease of starting a business in those countries. The data set looks at two limited liability companies in various regions and countries around the world.

Each country in the dataset measures things such as the minimum amount of capital investment an entrepreneur must have to start a business, and the number of procedures that must be completed to register the business, etc. 

The ease of starting a business for each country is measured on a scale of 0-100. A score of zero represents the country with the lowest performance, and 100 represents the country with the highest performance.

Below are definitions of the indicators found in the data set.

-  **Starting a Business Rank:** Countries are ranked on a score representing the relative ease of starting a business.
-  **Starting a Business Score:** These scores are calculated using the simple average of all the indicators' scores.
-  **Procedures:** The activities must be accomplished to get the business registered with its associated governmental entity.
-  **Time (days):** The median number of days needed to get the business up and running for each country/region.
-  **Cost:** The amount of money that must be expended to get the business started (such as official, legal and professional services fees, etc.).
-  **Paid-In Minimum Capital:** The minimum amount of money the entrepreneur must have is deposits in the bank for the business registration process to be completed.
-  **Income Level:** This represents the income levels of each country's economy. This indicator is divided into low, lower-middle, upper-middle, and high, based on a country's gross national income (GNI) per person.

We will use Google Sheets to explore which of these indicators are most important to start a new business in each economy's largest business city. `Click here <../_static/Starting_a_Business_2019.csv>`_ to download the data. Then, import the dataset into Google Sheets.

.. mchoice:: dat_sab1

   Identify and select the columns in the starting a business that represent categorical (nominal) data?

   - Starting a Business rank

     - Incorrect

   - Income Level

     + Correct

   - Starting a Business score

     - Incorrect

   - Procedure – Men (number)

     - Incorrect


Starting a Business Research Questions
--------------------------------------

1. What are the different factors that lead to a high ranking in the “Starting a Business Rank”?
2. What role does “income level” play in determining the rank of a country?
3. What factor, on average, contributes most/least to the Starting a Business Rank?
4. What similarities and differences do the countries experiencing the highest/lowest Starting a Business rank have? Are there any discrepancies between different score factors of countries with similar rankings?
5. Does being in a certain region/continent have any correlation to the average rank of countries?
6. Have the Starting a Business Ranks changed over time? Which countries have the most improvement in their rank? Which countries have most declined in their rank?
7. For the countries with the largest change, which factors changed the most? Are these factors the same as you identified in the first 3 questions?



The data set lists countries based on their starting a business score. While it is easy to 
see the best countries for starting a business using the starting a business rank, it is not 
easy to grasp the relative simplicity of each country. We can use the functions that we 
have learned to create a common baseline: average, standard deviation, and median. Therefore, let's average
the "starting a business score" of all countries together. 

a. Use the ``AVERAGE`` function of sheets to calculate the mean in column E. Scroll down and click on a cell in column 194. 
   That should be an empty cell below the column of numbers for the Starting a Business score. Now type ``=AVERAGE(E2:E192)``. 
   You can also type ``=AVERAGE(`` and then click and drag the numbers you want. ``E2:E192`` specifies a range, from Column E Row 2 
   down to Column E Row 192.

b. Many formulas in Google Sheets use ranges. They can span cells in a single column, single row, and they can span 
   rows and columns, which form a rectangular shape. Try it yourself, calculate the range of:

   - E2:O2
   - E2:E192
   - E2:L192

c. Standard deviation is the average distance from the mean. It shows how spread out the data is more 
   than other types of variabilities. The median is also as important because it provides another kind of 
   baseline besides mean and mode. Calculate the ``STDEV`` and ``MEDIAN`` for the starting a business score column. 

d. Calculate the standard deviation and median by copying and pasting the formula to other columns.

e. Copy the formula for ``=AVERAGE(E2:E141)`` from a, and the formula for standard deviation from c then calculate:

.. fillintheblank:: fb_sab8 

   What is the mean value for the GNI? |blank|

   - :14173.141: Is the correct answer
     :14173.1413: Remember to round up and include three digits to the right of the decimal point
     :14173.14136: Remember to round up and include three digits to the right of the decimal point
     :14173: Remember to include three digits to the right of the decimal point
     :x: USE the ``MEDIAN`` function and the range from N2 to N192

.. fillintheblank:: fb_sab8_1

   What is the standard deviation for the GNI? |blank|

   - :20720.786: Is the correct answer
     :20720.78597: Remember to round up and include three digits to the right of the decimal point
     :20721: Remember to include three digits to the right of the decimal point
     :x: USE the ``STDEV`` function and the range from N2 to N192


f. Remember, use a ``$`` so Google Sheets will not change the cell references when copy/pasting. 


Visualization
-------------


1. Visualizing the data is a great way to interpret the data. It allows the viewer to easily see trends or find outliers. 
A histogram is one way to visualize the Standard Deviation of a particular data set. To create a histogram in Google Sheets:

a. Click on Insert then select Chart

b. On the new Chart editor section, click on Chart Type and select Histogram

c. Edit the histogram columns to see the distribution of different columns by changing the Series dropdown menu.


2. When you have a data set covering the entire world, it can be interesting to extrapolate certain knowledge. For instance, 
you can calculate which countries have the largest or smallest GNI, the income per capita of women and men, and so on. 

a. Now, you can use ``MATCH`` and ``INDEX`` functions. The ``MATCH`` function allows us to search for a value 
   in a range of cells and return the position of that value. In cell N194 type ``=MATCH(N193, N2:N192, 0)``. 
   Notice that the match function searches for the value in cell N193 in the range ``N2:N192``, and the 0 tells Google Sheets 
   that the data is not sorted. The 0 is important because, without it, sheets will assume the data is sorted and will stop when it finds a value greater than the value in N194.

b. Type ``=INDEX(A2:A192, N194)`` in cell N195. The ``A2:A192`` parameters is the range from which ``INDEX`` will return a corresponding value; in this 
   case, it is the Location. N194 from the previous question is ``=MATCH(N193, N2:N192, 0)``. So the ``INDEX`` is practically telling sheets to find the 
   Location (from column A) that is found in the same row as the maximum value.

c. All three steps shown above can be performed in a single cell. Let’s look at the country that has the lowest Procedure Men number . 
   In cell E193 type ``=INDEX($A2:$A141, MATCH(MIN(E2:E141), E2:E141, 0))``. The ``MATCH`` and ``MIN`` functions both return one value. 
   So, sheets will first find the minimum value in cells ``J2:J141``. Then it will use the ``MATCH`` function to find the cell location (column and row) 
   of where that minimum value is. Finally, it will use the ``INDEX`` function to find what value from ``A2:A141`` matches up with the given parameters. Try
   this and see what it returns. It should return New Zealand, its region, starting a business rank, and starting a business score.

d. Practice using the functions you have learned by finding the names of locations for other columns.

e. If you want to copy/paste, check the ranges carefully and add the ``$`` sign to avoid running into errors.


3. Another great way of visualizing data is to use a choropleth. A choropleth takes in a set of geographic data and uses a map 
to show another set of data, such as starting a business score.

a. Click on Insert then select Chart

b. On the new Chart editor section, click on Chart Type and select Geo Chart

c. Select location column (``A2:A192``) as the region and any column that you wish to see as the Color.

d. You may hover around each country to see its respective statistic.


4. You may be wondering if there is a correlation between a country’s starting a business score and GNI or Procedure. 
One way to check this is to use the ``CORREL`` function to see how the score is affected by each factor i.e., starting a business score to GNI, 
starting a business score to the procedure, starting a business score to time.

a. We can use the ``CORREL`` function to calculate the Pearson correlation between two ranges of data. Use a ``$`` sign to anchor the 
   column and the values of starting a business ``$D$2:$D192``, so it doesn’t change when it is copy-pasted to use for other columns.

b. Repeat the above exercise by changing or copy-pasting it to different columns to see the correlation with other factors listed.

5. To better understand what leads a country to have a high score in creating a business, calculate the top 
and bottom 20 countries' correlation scores. Are there any interesting results?

a. Calculate the mean of each factor for the top 20 countries, then do so for the bottom 20 countries. Calculate the difference 
   in those averages for each of the factors for the top and bottom 20 countries. Which factors have the most impact on 
   the starting a business score?

6. While using the choropleth, you might have noticed some outliers in the data, for example, South Africa has one of the lowest cost 
of starting a business but is ranked 139. The countries above and below South Africa have a cost of 5 and 5.7 while South Africa has a 
cost of 0.2.

a. For all countries, compute the countries' average cost immediately above and below it and subtract that from the chosen 
   country’s average cost. Store your findings in a new separate column.

b. Use conditional formatting to help visually pick out the outliers.

c. Sort the data by selecting the column containing one of the Costs, clicking on the Data Tab and select the Sort sheet by Cost-Average



**Lesson Feedback**

.. poll:: LearningZone_2_1_sab
   :option_1: Comfort Zone
   :option_2: Learning Zone
   :option_3: Panic Zone

   During this lesson I was primarily in my...

.. poll:: Time_2_1_sab
   :option_1: Very little time
   :option_2: A reasonable amount of time
   :option_3: More time than is reasonable

   Completing this lesson took...

.. poll:: TaskValue_2_1_sab
   :option_1: Don't seem worth learning
   :option_2: May be worth learning
   :option_3: Are definitely worth learning

   Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_2_1_sab
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
