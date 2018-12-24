.. _h501f735b0476f5e696e1e2f7175266:

Part II Adding More Data
========================

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

Happiness by Region
-------------------

Now let's create a table where we compute the average happiness score for all of the countries in the region.  To get started we need to answer a couple of questions:  What are the unique region names? How can we compute an average for the countries that are in the same region?

#. We can get a table of the unique region names by using the UNIQUE function.  In Cell A180 the UNIQUE function takes the range that contains all of the region names and will build a table with just the unique names.

#. Hmm -- #N/A It seems that not all are found.  We don't want to compute and average for #N/A but if we try to delete that cell we get an error message about not deleting cells from an array formula

#. Here is a common strategy that will help us out in just a minute.  Select and copy all the cells containing the names of the regions. Now leave that selected and choose Edit -> Paste Special -> Paste values only  -- This will replace the calculated cells with just plain values and now you can get rid of the #N/A

#. Now lets calculate an average for each region using AVERAGEIF Average if takes two ranges and a condition the first range is the range that the condition applies to.  The second case is the region where we will take the numbers from when calculating the average.  What we want to do is find the rows where the region matches the name in column A and use the happiness score from column C on that same row in our calculation of the average.  The formula looks like this:  =averageif(M$2:M$156,A174,E$2:E$156)  Now if you double click the lower left square this will fill down and calculate an average for each region.  By now you should be feeling some respect for the spreadsheet jockeys of the world. This is definitely not a toy!

#. OK, last but not least let us sort the happiness scores so we can see the regions from most to least happy.

#. Select the table and then from the Data menu select Sort Range choose column B and check the box for Z->A then sort

#. Nice - Oceania is the happiest (Aussie Aussie Aussie) and Sub-Saharan Africa is the least.

#. Add another column to our little table that tells us how many countries are in each region (COUNTIF)

#. Now Using MAXIFS, MINIFS, MATCH and INDEX lets find the most and least happy country in each region.  MAXIFS and MINIFS work alot like AVERAGEIF and COUNTIF  but allow for more conditions.  We still need only one.  If you read the popup you will know what to do.

#. We can make all of this a bit easier using a Pivot Table !  This is a really useful tool to have in your toolbox and many other tools you use will support the creation of pivot tables as well.

    #. The idea behind a pivot table is to take the unique values from some column and make them the titles of a bunch of columns, while summarizing the data for those columns from a number of rows.  For example suppose you had a three of columns: user, movie, rating   What would be more easy to look at would be to have a column for each movie and a row for each user with the rating in the cell corresponding to a user and a movie.  This is exactly the use case for pivot tables.

    #. Another good use case is to replace what we have just done.  We want to use the unique values for each continent as the row, and then calculate a number of summary statistics for each.

.. bottom of content


.. |STYLE1| replace:: **blank cell to the left**


