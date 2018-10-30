
.. _h2c1d74277104e41780968148427e:




.. _he13691b2a623e391b6166572a445e47:

World Happiness Rankings
########################

.. _h45294365433556a7a5a2403ac5f8:

Learning Goals for this Module
==============================

* Become familiar with basic spreadsheet operations
    * Addressing cells - relative versus absolute, on the same same sheet versus across sheets

    * Working with Ranges:  SUM, AVERAGE, CORRELl

    * Tricks for Copying and pasting down and across

    * VLOOKUP (match / index)

    * Grouping

        * AVERAGEIF

        * COUNTIF

        * IF

        * Making a Pivot Table

    * Cleaning

        * TRIM

    * Exploring

        * UNIQUE

* Use a spreadsheet to explore data

* Introduce the "data science pipeline"

.. _h257e47683de51231245397924107b3:

Reading List
============

* Find reference to refresh on basic statistics

* Find a reference/tutorial on spreadsheet basics

* https://www.youtube.com/watch?v=QTgvX5MLPC8

* \ |LINK1|\ 

.. _h85837457734576e2a582e637a44:

Time Required
=============

This can easily take four class periods.  But you could cut that down by assigning parts of it to be done outside of class.

.. _hf33f5c6794a1d5ee7c64395b788:

Research Questions
==================

#. What are the different factors that lead to happiness of a country?

#. What role does the economy play in determining the happiness of a country?

#. Which factor, on average, contributes most/least to happiness?

#. What similarities and differences do the countries experiencing the highest/lowest WHS have?  Are there any countries where there scores for some factor are very different than those of the countries around it in the rankings?

#. Does being in a certain region [continent] have any correlation to the average score of countries?

#. How have the happiness numbers changed over time?  Which countries have increased the most? Which countries have decreased the most?

#. For the countries with the largest increase which factors changed the most?  Are those factors the same as you identified in the first 3 questions?

.. _h651bd6f7d3125664c517b446bc5d4b:

Part I
******

#. Before class you should read about the data science processing pipeline and exploratory data analysis.

#. https://towardsdatascience.com/exploratory-data-analysis-8fc1cb20fd15

We will start by loading the 2017.csv file into Google Sheets.  The table below gives a bit of detail about each of the columns on the spreadsheet.


+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|Country                      |Name of the country.                                                                                                                                    |
+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|Region                       |Region the country belongs to.                                                                                                                          |
+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|Happiness Rank               |Rank of the country based on the Happiness Score.                                                                                                       |
+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|Happiness Score              |A metric measured in 2015 by asking the sampled people the question: "How would you rate your happiness on a scale of 0 to 10 where 10 is the happiest."|
+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|Standard Error               |The standard error of the happiness score.                                                                                                              |
+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|Economy (GDP per Capita)     |The extent to which GDP contributes to the calculation of the Happiness Score.                                                                          |
+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|Family                       |The extent to which Family contributes to the calculation of the Happiness Score                                                                        |
+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|Health (Life Expectancy)     |The extent to which Life expectancy contributed to the calculation of the Happiness Score                                                               |
+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|Freedom                      |The extent to which Freedom contributed to the calculation of the Happiness Score.                                                                      |
+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|Trust (Government Corruption)|The extent to which Perception of Corruption contributes to Happiness Score.                                                                            |
+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|Generosity                   |The extent to which Generosity contributed to the calculation of the Happiness Score.                                                                   |
+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
|Dystopia Residual            |The extent to which Dystopia Residual contributed to the calculation of the Happiness Score.                                                            |
+-----------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+

In this first part we will review and practice some spreadsheet calculations by doing some exploratory data analysis.  If you have never used a spreadsheet before don't worry, you will catch on quickly.  Also, remember that at this point we are just exploring so there isn't necessarily a right answer. In fact most of the time we don't know what the right answers are when we are in exploring mode.  You might even be wondering what does it mean to be in exploring mode.  The main thing we are doing is looking around at the data and seeking out things that look 'interesting' bits of statistics that stand out.  We wonder about how things might correlate or what variables might be interdependent on others.  Two of the primary tools we use in this exploring mode are:

* Summary statistics

* Visualization

#. Although the countries are ranked from most happy to least happy we might want start by looking at some summary statistics for the happiness score.

    #. Use the AVERAGE function of sheets to calculate the mean in column C.  Scroll down and click in cell C158 -- that should be an empty cell below the column of numbers for the happiness score.  Now type =AVERAGE(C2:C156) You can also type =AVERAGE( and then click and drag the numbers you want.  C2:C156 specifies a range.  From Column C Row 2 down to Column C Row 156.

    #. Many formulas in Sheets use ranges.  Ranges can span cells in a single column like we did in a.  Or they can span cells in a single row such as A1:L1 they can even span rows and columns such as A1:L156.

    #. Now calculate the STDEV and MEDIAN for the column as well.

    #. We can calculate the same statistics for the other columns by copying and pasting the formula to the cells under the other columns.  As a shortcut you can also click on the square in the lower right corner of the currently selected cell and drag it.

    #. After you have copied and pasted the formula for average to cells C158 to L158 click in L158.  The formula there looks like: =AVERAGE(L2:L156) -- Notice that Sheets is smart about changing the cell references when you copy/paste

    #. If you do NOT want Sheets to change the cell references when you are copy/pasting you can use a $ in front of the row or the column and that tells sheets to "leave this reference alone"  We see some examples of this later.

#. The STDDEV value tells us that the majority of the values are between 4.0 and 6.6 so let us check that graphically.   It is easy to make a histogram of the values in Sheets.

    #. Click on the insert graph icon

    #. Choose chart type of histogram

    #. Enter or drag the rows in column c

    #. Does it look like most of the bars are between 4 and 6.6 on your histogram?  It should.

    #. Try editing the details of the histogram to look at the distribution in other columns.

#. Because we are exploring it might also wonder "which country has the largest Economy.GDP or which country scores the highest on Family? Or generosity?  This is a great question to ask, learning about minimum and maximum values can definitely lead you in interesting directions.  It is also a great chance to learn a couple of other really powerful functions.  Let's explore the question, what country has the highest score in the Generosity column?

    #. Start by finding the maximum value in the generosity column, putting the result in cell J162 -- You should get 0.838075161 (that's really more digits than we need but we can change that later)

    #. Knowing the max is one thing, but that does not tell us which country it is.  For that we will use the MATCH and INDEX functions.  Match allows us to search for a value in a range of cells.  Just like the search function in a word processor. IN cell J163 type =match(J162,J2:J156,0) the match function says look for the value in cell J162 in the range J2:J156 and the 0 tells it that the data is not sorted. This is a really important detail.  If you leave this off it will assume that the data is sorted and stop searching and return the first cell it finds that is greater than the value in J162.  -- the result should be 114

    #. In cell J164 type =index(A2:A156,J163) This tells sheets to return the value from the range A2:A156 in the row specified by the value in J163.  In other words starting at A2 go down 114 rows and return the value.  As we will see later index is really powerful for doing all kinds of things, but primarily for now we will think of the combination of match and index being our search and retrieve powertools.

    #. We broke this process into three steps to make it clear what we were doing.  But they can be combined into a single cell by nesting the functions.  Let's figure out which country gets the lowest score for Generosity, but we'll do it in one cell.  In J165 enter =index($A2:$A156,match(min(J2:J156),J2:J156,0)) You should get an answer of Greece.  Here we are using the fact that match and min each return values and rather than have them visible in a cell for us to look at we can just use them directly as parameters to another function.  That probably seems pretty logical to you since you have done this in Python many times.

    #. Now you should practice by finding the names of the countries that have the min and max values for some other columns.  

    #. If you tried to copy/paste the functions from above you likely ran into some errors.  Check the ranges carefully and remember what sheets does when you copy and paste.  If you insist on copy/pasting then you are going to have to use $ to get it right.  But you'll have to figure that out.

#. One great way to get an overview of the data visually is to make a \ |STYLE0|\ .  A choropleth combines the geographic data with some other data such as the happiness score.  Google sheets make it very easy to graph data by country.

    #. Click on the insert graph icon

    #. Choose Geo Chart

    #. Use the country column and the happiness score column

    #. Experiment with using other columns such as freedom or generosity

#. The exploration of the happiness scores and the different factors related may have you wondering, what factors lead to some people being happier than others?  Is it their level of freedom?  Their level of wealth?   One way we can answer this question is to calculate a correlation between the happiness index and the various factors. This will create a small table that computes a correlation score between of of our columns of data.  Happiness score to Economy, Happiness score to Family etc.

    #. First let's calculate a correlation between happiness score and each other factor.

    #. To do this we can use the CORREL function, which calculates a pearson correlation between two ranges of data.  Because we want to always keep the happiness index as one of the columns, we will anchor that column using $ and but not the other columns.  This will allow us to copy the formula across. 

#. We might now try to focus in on the characteristics of the most happy countries and the least happy countries.  

    #. Recompute the correlation scores but don't do it for all of the countries do it for the top 25 and bottom 25.  What stands out for you?

    #. Calculate the average value for each of the factors for the 25 and bottom 25 countries and then calculate a difference between these values.  Which have the largest difference?  The smallest?

#. Another interesting exercise we could do is to identify some countries where their scores in some category like generosity are significantly different from the countries around them.  For example the country of Myanmar stands out on a Choropleth as being the most generous country.  Yet its happiness rank is 114.  Its Generosity score is .8 but the country right above it has a score of .3 and the country below .1.  

    #. For each country compute the total difference between its score and the country above it and below it. (have students pick a column for this)

    #. Then you can apply some conditional formatting to help visually pick out the outliers.

    #. You can also sort the region containing the rankings based on this column to gather together the countries with significant differences from their neighbors. WARNING  -- sorting by a calculated column like this will lead to unexpected results.  So copying this column and doing a paste special where you paste only the values is needed before you sort.

The Part I exercises will definitely get the students diving into a lot of basic spreadsheet functionality.  This will easily take a full class period and maybe 1 and a half if you start on this exercise the first day of class after reviewing the syllabus etc.  Always try to leave some time for independent exploration where the students can identify a research question of their own and try to explore it.  Even more important is to give the class time to compare notes or talk about the kinds of questions they chose to explore.

.. _h501f735b0476f5e696e1e2f7175266:

Part II 
********

Limiting our analysis to the data provided to us from a single source would be quite limiting.  Seldom does one file contain all the data you need to answer the questions you may have.  In this part of the project we will import a spreadsheet that has a lot more data about each country including its continent (see question 5).  This is an important lesson as it sets the stage nicely for what we will learn about later when using SQL to "join" two tables of data.

#. The first thing we need to do is to import the countries of the world spreadsheet.  This has a huge amount of data about each country and you may wish to explore some of the other data provided later.  For now we are interested in how we can use the information on this new spreadsheet to give us the continent of each country.

#. You can start by either copy/pasting the whole sheet into a new tab or importing the csv file into a new tab.

#. Next we will want to add a column to the happiness spreadsheet that contains the continent.  The way we do this is to use the VLOOKUP function.  Pay attention to this as it is one of the most powerful functions you will learn about for doing high powered calculations on a spreadsheet.  The main idea behind this is also widely used in the database world so it is worth learning in detail.

    The idea goes like this.  On our happiness spreadsheet we have a column that contains the name of each country.  It has a bunch of happiness related data about each country in other columns.  On our countries of the world sheet we have a column of country names and a bunch of other information about countries (including their continent) in other columns.  The two sheets do not have the countries in the same order, nor do they necessarily have the same list of countries -- they do have most of the same but not all.

    When we use VLOOKUP our goal is to join together these two sheets adding columns to the happiness sheet using values from the row in the countries of the world sheet from the row where the country names match.  For example in our happiness sheet Ireland is on row 15 but in the countries of the world sheet it is on row 101.  What we want to do is take (at least) column B row 101 from the countries sheet and add it to the happiness sheet on row 15 column M.   

    With VLOOKUP with do this by allowing the function to search for the value in one cell in another column, and then return the value from a different cell in the same row but in some other column.  To find the continent of Israel we would use VLOOKUP(A15, Sheet1!$A$2:$C$156, 2, FALSE)

    Let's unpack that:

    A15 is the cell containing Israel

    Sheet1!$A$2:$C$156 the range of cells we can search in as well as get values from.

    2 tells Sheets that when we find a match for Israel we want the value from the same row but in column 2 of our range.  (Sigh -- sheets and Python use different counting systems)

    Notice that column 2 of our range is the continent/Region column! Nice  You may have noticed that VLOOKUP is a bit like using match and index together, but it is a little less flexible as the column you search in must always be on the far left side of the range.

    To add a whole new column to fill in the region for each country we would type the following into M2  =vlookup(A2,Sheet1!$A$3:$C$229,2,FALSE)  Now if you double click on the blue square in the lower right corner when you have M2 selected you will see that sheets will automatically copy/past the formula down the column.  It will do this until it finds a \ |STYLE1|\  and then it will stop.  If your spreadsheet has some missing data this can lead to some unexpected results, so it's always a good idea to make sure it has pasted all the way down.

    Now let's create a table where we compute the average happiness score for all of the countries in the region.

* What are the unique region names?

* How can we compute an average for the countries that are in the same region?

#. We can get a table of the unique region names by using the UNIQUE function.  In Cell A180 the UNIQUE function takes the range that contains all of the region names and will build a table with just the unique names.

#. Hmm -- #N/A It seems that not all are found.  We don't want to compute and average for #N/A but if we try to delete that cell we get an error message about not deleting cells from an array formula

#. Here is a common trick that will help us out in just a minute.  Select and copy all the cells containing the names of the regions. Now leave that selected and choose Edit -> Paste Special -> Paste values only  -- This will replace the calculated cells with just plain values and now you can get rid of the #N/A

#. Now lets calculate an average for each region using AVERAGEIF Average if takes two ranges and a condition the first range is the range that the condition applies to.  The second case is the region where we will take the numbers from when calculating the average.  What we want to do is find the rows where the region matches the name in column A and use the happiness score from column C on that same row in our calculation of the average.  The formula looks like this:  =averageif(M$2:M$156,A174,E$2:E$156)  Now if you double click the lower left square this will fill down and calculate an average for each region.  By now you should be feeling some respect for the spreadsheet jockeys of the world. This is definitely not a toy!

#. OK, last but not least let us sort the happiness scores so we can see the regions from most to least happy.

#. Select the table and then from the Data menu select Sort Range choose column B and check the box for Z->A then sort

#. Nice - Oceania is the happiest (Aussie Aussie Aussie) and Sub-Saharan Africa is the least.

#. Add another column to our little table that tells us how many countries are in each region (COUNTIF)

#. Now Using MAXIFS, MINIFS, MATCH and INDEX lets find the most and least happy country in each region.  MAXIFS and MINIFS work alot like AVERAGEIF and COUNTIF  but allow for more conditions.  We still need only one.  If you read the popup you will know what to do.

#. We can make all of this a bit easier using a Pivot Table !  This is a really useful tool to have in your toolbox and many other tools you use will support the creation of pivot tables as well.

    #. The idea behind a pivot table is to take the unique values from some column and make them the titles of a bunch of columns, while summarizing the data for those columns from a number of rows.  For example suppose you had a three of columns: user, movie, rating   What would be more easy to look at would be to have a column for each movie and a row for each user with the rating in the cell corresponding to a user and a movie.  This is exactly the use case for pivot tables.

    #. Another good use case is to replace what we have just done.  We want to use the unique values for each continent as the row, and then calculate a number of summary statistics for each.

.. _h756a797b286237b36797fb1f277d18:

Comparing Happiness Data across years
=====================================

We have three sheets for happiness data.  One for 2015, 2016 and 2017

#. Start a new workbook and get each of the csv files for the happiness data loaded into a separate sheet.

#. Now lets create a table on a new sheet that shows the happiness rank for each country for each year.  You'll have 4 columns country name, 2015 rank, 2016 rank and 2017 rank.  Hint: Use VLOOKUP 

#. Next let us find the biggest movers from one 2015 to 2017 and from 2016 to 2017

#. Add three more columns score 2015, score 2017, score 2018  Do the countries with the biggest movement in their rank have correspondingly large changes in the scores?

#. For the five countries with the largest changes changes in ranking between 2015 and 2017 what are the factors that changed the most? For this part you can do this by making comparisons between sheets rather than creating a huge number of new columns on this summary sheet.

\ |STYLE2|\ 

#. The choropleth gave us some insight into how happiness may be related to the continent.  It was pretty clear that African nations were less happy than many others.  Lets see if we can quantify that.

    #. First we need to find a file that helps us map from country to continent.  Lets add this to our file as a new worksheet.

    #. How can we add a column (or a few columns) to our happiness spreadsheet from this spreadsheet?   -- VLOOKUP

    #. Once we have the continent name added to the spreadsheet can we find the average happiness score for each continent?

Calculating a Correlation matrix

    #. To calculate a correlation matrix we will make use of sheets INDEX and CORREL functions.  The correl function expects two ranges -- in our case two columns of numbers to compute the correlation between.  For example the happiness score and the Economy.  But to make our correlation matrix we need to compute the correlation between all pairs of columns.  Using the column letters is more compact so lets write out a few:

        #. EE, EF, EG, EH, EI, EJ, EK, EL, FE, FF, FG, FH, FI, FJ, FK, FL, …

        #. Here is a Python snippet that should give you the full idea:

    For i in "EFGHIJKL":

        For j in "EFGHIJKL":

           print("correlate column ", i, " with column ", j)

        #. The aptly named INDEX function is wwhat allows us to do this by writing one clever function and then copying and pasting it to fill out our matrix.

#. It may take a bit of experimentation to get the indexes and the $ correct but you will eventually end up with a matrix where the diagonal is 1.  This is a good indicator that you have things right.  This \ |LINK2|\  may also be useful for getting this right.

#. Once you have the numbers we can make a rough heat map by using conditional formatting.  Using some conditional formatting rules we can change the foreground and background color of the cells.  Lets start by adding  a rule that says if the correlation is between 0.75 and 1.0 then color the background green.  

#. You can add other rules to cover different ranges, but you will immediately see which cells we might want to focus on the most.


.. bottom of content


.. |STYLE0| replace:: **choropleth**

.. |STYLE1| replace:: **blank cell to the left**

.. |STYLE2| replace:: **Challenge**


.. |LINK1| raw:: html

    <a href="https://link.medium.com/ShvgHJUlhR" target="_blank">Weapons of Micro Destruction: How our Likes Hijacked Democracy</a>

.. |LINK2| raw:: html

    <a href="https://www.youtube.com/watch?v=uc55cnr8A14" target="_blank">video</a>
