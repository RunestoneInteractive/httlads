.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Case Study 2: Exploring Data Using Google Sheets
================================================

One of the key features of this textbook is to highlight how data science and data 
analytics can be used to understand a variety of data types. In this chapter, we explore 
two data sets, one related to starting a business, and the other related to the happiness 
index of countries.


Before beginning this section, you should have watched or read all of the items on the
reading list (section 2.1).

Thinking About Starting Your Business
-------------------------------------

This case study utilizes the `"Starting a Business" <../_static/Starting_a_Business_2019.csv>`_ dataset obtained from the Doing Business-World Bank website. The dataset contains indicators from over 190 countries that measure the relative ease of starting a business in those countries.  The dataset looks at two limited liability companies in various regions and countries around the world.  Both companies are identical in every way, except one company is owned by five married women, and the other is owned by five married men.

Each country in the dataset has an ease-of-doing-business ranking score which ranks the amount of days it takes the business to set up everything needed to open the business, the minimum amount of monetary capital investment an entrepreneur must have available to start the business and the number of procedures or activities in the registration process that must be completed before, during and after registering the business with its associated governmental entity. The dataset identifies these as important indicators a limited liability company or non-profit company must consider to successfully start a business.

The ease-of-doing-business ranking score for each country is reflected on a scale from 0-100. A score of zero represents the country with the lowest performance of these indicators and 100 represents the country with the highest performance of these indicators.

Below are definitions of the indicators found in the dataset.
   - •	**Starting a Business Rank:** Countries are ranked on a score that represents the relative ease of starting a business.
   - •	**Starting a Business Score:** These scores are calculated by taking the simple average of all the indicators’ scores.
   - •	**Procedures:** The activities that must be accomplished to get the business registered with its associated governmental entity.
   - •	**Time (days):** The median number of days needed to get the business up and running for each country/region.
   - •	**Cost:** The amount of money that must be expended to get the business started (such as official, legal and professional services fees, etc.).
   - •	**Paid-In Minimum Capital:** The minimum amount of money the entrepreneur must have available (as deposits in the bank) for the business registration process to be completed.
   - •	**Income Level:** This represents the income levels of each country's economy. This indicator is divided into four categories: low, lower-middle, upper-middle and high, based on a country’s gross national income (GNI) per person.

We will use Google Sheets to help us explore which of these indicators are most important to starting and formally operating a new business in each economy’s largest business city. `Click here <../_static/Starting_a_Business_2019.csv>`_ to download the data. Then, import the dataset into your Google Spreadsheets.

.. mchoice:: dat_sab1


    Which of the columns in the Starting a Business spreadsheet represent categorical (nominal) data?

   - Starting a Business rank

     - Incorrect

   - Income Level

     + Correct

   - Starting a Business score

     - Incorrect

   - Procedure – Men (number)

     - Incorrect

.. mchoice:: dat_sab2


    Which of the columns in the Starting a Business spreadsheet represent ordinal data?

   - Location

     - Incorrect

   - Region

     - Incorrect

   - Income Level

     - Incorrect

   - Starting a Business rank

     + Correct

.. mchoice:: dat_sab3

    Which of the columns in the Starting a Business spreadsheet represent ratio data?

   - Location

     - Incorrect

   - Region

     - Incorrect

   - Starting a Business rank

     - Incorrect

   - Time – Men (days)

     + Correct


Starting a Business Research Questions
--------------------------------------

1. What are the different factors that lead to a high ranking in the “Starting a Business Rank”?
2. What role does “income level” play in determining the rank of a country?
3. What factor, on average, contributes most/least to the Starting a Business Rank?
4. What similarities and differences do the countries experiencing the highest/lowest Starting a Business rank have? Are there any discrepancies between different score factors of countries with similar rankings?
5. Does being in a certain region/continent have any correlation to the average rank of countries?
6. Have the Starting a Business Ranks changed over time? Which countries have the most improvement in their rank? Which countries have most declined in their rank?
7. For the countries with the largest change, which factors changed the most? Are these factors the same as you identified in the first 3 questions?


1. The data set lists countries based on their “Starting a Business” score. While it is easy to see the best countries for starting a business using the “Starting a Business rank”, it is not as easy to grasp the relative simplicity of each country. For this, one common baseline is needed to measure all of the countries against. Average, Standard Deviation and Median are all ways of creating such a baseline. One way of creating such a baseline is by averaging the “starting a business” score of all of the countries together.

   a. Use the ``AVERAGE`` function of sheets to calculate the mean in column E. Scroll down and click on a cell in column 194. That should be an empty cell below the column of numbers for the Starting a Business score. Now type ``=AVERAGE(E2:E192)``. You can also type ``=AVERAGE(`` and then click and drag the numbers you want. E2:E192 specifies a range, from Column E Row 2 down to Column E Row 192.

      .. fillintheblank:: fb_sab5

        Calculating the average Starting a Business score. You should include three digits to the right of the decimal point. Use the custom number format under the Format menu, to have Sheets automatically display your values correctly rounded to just three digits after the decimal point. |blank|

        - :84.366: Is the correct answer
          :84.3664: 84.3664 should be rounded down to 84.366
          :x: USE the AVERAGE function and the range from E2 to E192

   b. Many formulas in Sheets use ranges. Ranges can span cells in a single column like we did in 1a. Or, they can span cells in a single row such as A1: L1. They can even span rows and columns to form a rectangle such as A1:L141. Ranges can be calculated for a single column, a single row, or a rectangle. Calculate the range of:

      - E2:O2
      - E2:E192
      - E2:L192

   c. Standard Deviation is the average distance from the mean. It shows how spread out the data is more than other types of variabilities. The median is also as important because it provides another kind of baseline besides mean and mode. Calculate the ``STDEV`` and ``MEDIAN`` for the Starting a Business score column. If you are fuzzy about standard deviation, this article has a nice intuitive explanation.

      .. fillintheblank:: fb_sab6

         What is the ``STDEV`` of the Starting a Business score? As stated in question 5, you only need to include three digits to the right of the decimal point. |blank|

         - :11.251: Is the correct answer
           :11.2507: 11.2507 should be rounded up to 11.251
           :11.25: Remember to round up and include three digits to the right of the decimal point
           :x: USE the STDEV function and the range from E2 to E192


      .. fillintheblank:: fb_sab7

         What is the ``MEDIAN`` of the Starting a Business score? |blank|

         - :87: Is the correct answer
           :x: USE the Median function and the range from E2 to E192

   d. Practice calculating the Standard Deviation and Median by copying the formula to other columns. Sheets is smart enough to change the formula parameters if you copy a cell that already has a formula and paste it to a new one.

   e. Copy the formula for ``=AVERAGE(E2:E141)`` from a and the formula for standard deviation from c then calculate:

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

   f. If you do NOT want Sheets to change the cell references when you are copy/pasting you can use a $ in front of the row or the column and that tells sheets to “leave this reference alone”. This same idea also applies to cell numbers. We see some examples of this later.

Visualization
-------------

1. Visualizing the data is a great way to interpret the data. It allows the viewer to easily see trends, or find outliers. A histogram is one way to visualize the Standard Deviation of a particular data set. To create a histogram in Google Sheets:

   a. Click on Insert then select Chart

   b. On the new Chart editor section, click on Chart Type and select Histogram

   c. Edit the columns of the histogram to see the distribution of different columns by changing the Series dropdown menu.

2. When you have a data set covering the entire world it can be interesting to extrapolate certain knowledge from it. Calculating the maximum and minimum values can be one way to gain knowledge from the data. For instance, you can calculate which countries have the largest or smallest GNI, the income per capita of women and men and so on. Learning how to assess the  minimum and maximum values can also allow for the use of other functions

   a. Find the maximum value of the GNI column and put the results in cell N193.

      .. fillintheblank:: fb_sab9

         What is the maximum value of the GNI? |blank|

         - :156283: Is the correct answer
           :x: Use the ``MAX`` function from N2:N192

   b. Now let’s try using the ``MATCH`` and ``INDEX`` functions. The MATCH function allows us to search for a value in a range of cells and return the position of that value. In cell N194 type ``=MATCH(N193, N2:N192, 0)``. Notice that the match function searches for the value in cell N193 in the range N2:N192 and the 0 tells sheets that the data is not sorted. The 0 is really important because without it sheets will assume the data is sorted and will stop when it finds a value greater than the value in N194.

      ..  fillintheblank:: fb_sab10

          The index of the row containing the maximum value is |blank|

          - :165: Is the correct answer
            :x: Use the ``INDEX`` and  ``MATCH`` functions. Make sure the data is sorted by countries with the highest starting a business score

   c. Type ``=INDEX(B2:B192, N194)`` in cell N195. The B2:B192 parameters is the range from which ``INDEX`` will return a corresponding value, in this case it is the Location. N194 from the previous question is ``=MATCH(N193, N2:N192, 0)``. So the ``INDEX`` is practically telling sheets to find the Location (from column B) that is found in the same row as the maximum value.

      .. fillintheblank:: fb_sab11

         The name of the country with the highest GNI is? |blank|

         - :Liechtenstein: Is the correct answer
           :Liechtenstein*: Is the correct answer
           :x: Use the ``INDEX`` and ``MATCH`` functions.

   d. All three steps shown above can be performed in a single cell. Let’s look at the country that has the lowest Procedure Men number . In cell F193 type =INDEX($B2:$B141, MATCH(MIN(F2:F141), F2:F141, 0)). The MATCH and MIN functions both return one value. So, sheets will first find the minimum value in cells J2:J141. Then it will use the MATCH function to find the cell location (column and row) of where that minimum value is. Finally it will use the INDEX function to find what value (name of the country) from B2:B141 matches up with the given parameters.

      .. fillintheblank:: fb_sab12

         The country with the lowest Procedure Men number is? |blank|

         - :New Zealand: Is the correct answer
           :x: Use the ``INDEX`` and ``MATCH`` functions.

   e. Practice using the functions you have learned by finding the names of Locations for other columns.

      .. fillintheblank:: fb_sab13

         What is the location that has the highest number of procedures for women?

         - :Venezuela, RB: Is the correct answer.
           :Venezuela:  Is the correct answer.
           :x: Use the ``INDEX`` and ``MATCH`` functions.

      .. fillintheblank:: fb_sab14

         What is the name |blank| and the Creating a Business Score |blank| of the country with the highest number of procedures for women?

         - :Venezuela, RB: Is the correct answer.
           :Venezuela:  Is the correct answer.
           :x: Use the ``INDEX`` and ``MATCH`` functions.

         - :20: Is the correct answer.
           :x: Use the ``INDEX`` and ``MATCH`` functions.


   f. If you tried to copy/paste the functions from above you likely ran into some errors. Check the ranges carefully and remember what Sheets does when you copy and paste. If you insist on copy/pasting, then you are going to have to use $ to get it right. We’ll leave it to you to figure that out.

3. Another great way of visualizing data is to use a choropleth. A choropleth takes in a set of geographic data (countries) and uses a map to show another set of data (Starting a Business Score). A fun way to visualize data on an international scale is to see which countries have the maximum and minimum Gross National Income (GNI) on a map.

   a. Click on Insert then select Chart

   b. On the new Chart editor section, click on Chart Type and select Geo Chart

   c. Select column B as the Region and column O as the Color.

   d. You may hover around each country to see each country’s GNI.

   e. Change the color to other columns and see the visualization.

4. You may be wondering if there is a correlation between a country’s Starting a Business score and GNI or Procedure. One way to check this is to use the CORREL to see how the score is affected by each factor (Starting a Business score to GNI,  Starting a Business score to Procedure,  Starting a Business score to Time …).

   a. We can use the CORREL function to calculate the Pearson correlation between two ranges of data. Use a $ sign to anchor the column and the values of Starting a Business ($E$2:$E192) so it doesn’t change when it is copy-pasted to use for other columns.

   b. Repeat the above exercise by changing or copy-pasting it to different columns to see the correlation with other factors listed.

5. To better understand what leads a country to have a high score in creating a business, calculate the correlation score of the top and bottom 25 countries. Are there any interesting results?

   a. Calculate the mean of each factor for the top 25 countries, then do so for the bottom 25 countries. Calculate the difference in those averages for each of the factors for the top and bottom 25 countries. Which factors have the most impact on the “starting a business” score?

6. While using the choropleth, you might have noticed some outliers in the data, for example, South Africa has one of the lowest cost of starting a business but is ranked 139. The countries above and below South Africa have a cost of 5 and 5.7 while South Africa has a cost of 0.2.

   a. For all countries, compute the average cost of the countries immediately above and below it and subtract that from the chosen country’s average cost. Store your findings in a new separate column.

   b. Use conditional formatting (found here) to help visually pick out the outliers.

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
