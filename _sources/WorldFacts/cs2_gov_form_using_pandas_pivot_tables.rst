.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.



Case Study 2: Comparing Government Forms
=========================================

The goal of this section is to be able to summarize, sort, organize, or count the
data in a specific database using pivot tables. In this section, we will work with the data that we scraped from the CIA World Factbook website. We will compare different forms
of government and how the form of government might impact the countries' economic success. For this example, 
we will measure financial stability based on GDP. We'll do this by building a pivot table in Pandas. You have
already done this in a spreadsheet, so it's good to see how to do it in Pandas
. To accomplish this, we are going to have to do the following.

1. Learn or review how you can do some web scraping to get the form of government.
2. Learn about the ``pivot_table`` and ``pivot`` methods
3. Practice adding new data to a data frame


If you haven't already, you should review the example of ref:`screenscrape`.
This will show you the basics of reading and grabbing information out of a page.


**NOTE:** If you scraped the whole data from CIA World Factbook 2017 in the previous exercise, you should be able to use the Government Type field from the CSV file you saved. However, you can also
dig into getting the information the Government type information from `this page <../_static/government_type.html>`_.
If you decide to use this link, make sure to add the new information to your existing data set.


Now, let's look at making a pivot table. We will do an example to see how government forms, regions
of the world, and parts of the economy might be related. For this exercise, we will use GDP.
We have a column for the region, a column for government forms, and information on the GDP.
We want to summarize that information in a table where we have a row
for each region and a column for each classification of government form. Then in each
cell, we would like to summarize the fraction of the economy that comes from
GDP.


We have used government forms for our nominal classification. If the information you choose for the column is numeric and you want to change it to
nominal, you can use the ``map`` method, a lambda function, and a dictionary that maps from that specific column number to a label. 

Now, let's pivot the table. The pivot table method takes three parameters:
``index``, ``columns``, and ``values``. The index parameter asks, "what values
from the original table should I use as the new row index?". The columns
parameter asks, "what values from the original table should I use as the column
headings?". The values parameter says what values to include in the cells. In
most cases, these values will need to be aggregated in some way, and by default,
the aggregation is to take the mean.


.. code:: python3

   wd.pivot_table(index='Region', columns='Government Type', 'GDP')


.. raw:: html

    <div style="max-width: 800px; overflow: scroll;">
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table class="table table-bordered table-hover table-condensed">
    <thead><tr><th title="Field #1">Government Type</th>
    <th title="Field #2">absolute monarchy</th>
    <th title="Field #3">absolute monarchy or sultanate</th>
    <th title="Field #4">communist state</th>
    <th title="Field #5">constitutional federal republic</th>
    <th title="Field #6">constitutional monarchy</th>
    <th title="Field #7">dictatorship</th>
    <th title="Field #8">federal parliamentary constitutional monarchy</th>
    <th title="Field #9">federal parliamentary democracy</th>
    <th title="Field #10">federal parliamentary democracy</th>
    <th title="Field #11">federal parliamentary republic</th>
    <th title="Field #12">...</th>
    <th title="Field #13">parliamentary democracy (House of Assembly)</th>
    <th title="Field #14">parliamentary republic</th>
    <th title="Field #15">presidential Islamic republic</th>
    <th title="Field #16">presidential democracy</th>
    <th title="Field #17">presidential limited democracy</th>
    <th title="Field #18">presidential republic</th>
    <th title="Field #19">self-governing parliamentary democracy</th>
    <th title="Field #20">semi-presidential federation</th>
    <th title="Field #21">semi-presidential republic</th>
    <th title="Field #22">theocratic republic</th>
    </tr></thead>
    <tbody><tr>
    <td>Region </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    </tr>
    <tr>
    <td>ASIA (EX. NEAR EAST) </td>
    <td>NaN </td>
    <td>18600.0 </td>
    <td>3066.666667 </td>
    <td>NaN </td>
    <td>4350.0 </td>
    <td>1300.0 </td>
    <td>9000.0 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>2133.333333 </td>
    <td>... </td>
    <td>NaN </td>
    <td>12800.000000 </td>
    <td>700.0 </td>
    <td>NaN </td>
    <td>24100.0 </td>
    <td>6640.000000 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>8566.666667 </td>
    <td>7000.0</td>
    </tr>
    <tr>
    <td>BALTICS </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>... </td>
    <td>NaN </td>
    <td>11250.000000 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>11400.000000 </td>
    <td>NaN</td>
    </tr>
    <tr>
    <td>C.W. OF IND. STATES </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>... </td>
    <td>NaN </td>
    <td>1700.000000 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>4050.000000 </td>
    <td>NaN </td>
    <td>8900.0 </td>
    <td>3950.000000 </td>
    <td>NaN</td>
    </tr>
    <tr>
    <td>EASTERN EUROPE </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>... </td>
    <td>NaN </td>
    <td>10063.636364 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>7000.000000 </td>
    <td>NaN</td>
    </tr>
    <tr>
    <td>LATIN AMER. &amp; CARIB </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>2900.000000 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>8800.0 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>... </td>
    <td>16000.0 </td>
    <td>6300.000000 </td>
    <td>NaN </td>
    <td>17000.000000 </td>
    <td>NaN </td>
    <td>6429.411765 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>5966.666667 </td>
    <td>NaN</td>
    </tr>
    <tr>
    <td>NEAR EAST </td>
    <td>15466.666667 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>17950.0 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>1500.000000 </td>
    <td>... </td>
    <td>NaN </td>
    <td>5750.000000 </td>
    <td>NaN </td>
    <td>19200.000000 </td>
    <td>NaN </td>
    <td>3300.000000 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN</td>
    </tr>
    <tr>
    <td>NORTHERN AFRICA </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>... </td>
    <td>NaN </td>
    <td>6900.000000 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>5000.000000 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN</td>
    </tr>
    <tr>
    <td>NORTHERN AMERICA </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>37800.0 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>29800.0 </td>
    <td>NaN </td>
    <td>... </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN</td>
    </tr>
    <tr>
    <td>OCEANIA </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>2200.0 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>... </td>
    <td>NaN </td>
    <td>4825.000000 </td>
    <td>NaN </td>
    <td>13833.333333 </td>
    <td>NaN </td>
    <td>4900.000000 </td>
    <td>5000.0 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN</td>
    </tr>
    <tr>
    <td>SUB-SAHARAN AFRICA </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>600.000000 </td>
    <td>... </td>
    <td>NaN </td>
    <td>5725.000000 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>1868.965517 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>1050.000000 </td>
    <td>NaN</td>
    </tr>
    <tr>
    <td>WESTERN EUROPE </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>35700.0 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>29100.0 </td>
    <td>28800.000000 </td>
    <td>... </td>
    <td>NaN </td>
    <td>26700.000000 </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>NaN </td>
    <td>22800.000000 </td>
    <td>NaN</td>
    </tr>
    <tr>
    <td>11 rows × 28 columns</td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    </tr>
    </tbody></table>
    </div>



The ``pivot`` function works like the ``pivot_table`` function but does not do
any aggregation. Therefore, it will throw an error if you have duplicate index
rows.


Try changing the values parameter to be a list of columns may be Agriculture,
Service and Industry. How does that change your table?


Project
-------

In this project, we will see how climate, a region of the world, and parts of the economy might be related.

Create a pivot table using the region as the rows, climate as
the columns, and summarize the fraction of the economy that comes from
agriculture.



