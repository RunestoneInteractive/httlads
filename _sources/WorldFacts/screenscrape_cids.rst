Screen Scraping Country IDs (optional)
======================================

Can you make use of the provided example and the altair documentation to
produce a graph of the world where the countries are colored by one of
the features in the data?

You have some work to do:

In this part of the project we will:

-  Review the structure of a web page
-  Review the CSS Query selector language
-  Learn to use the requests module to get data from the web into our
   program
-  Learn about the Beautiful Soup package for scraping data from a
   webpage
-  Learn how to add columns to a data frame using the ``map`` function.
   And possibly learn to use a lambda function if you’ve never used one
   before.

Lets make a todo list:

1. We need to add a column to our wd dataframe that contains the
   numerical country id. Where can we get this data? There may be some
   CSV files with this information already in them, but this is a good
   chance to learn about a common technique used by data scientists
   everywhere. **screen scraping**

.. code:: ipython3

    page = requests.get('https://www.nationsonline.org/oneworld/country_code_list.htm')
    soup = BeautifulSoup(page.text, 'html.parser')

The soup object is now a representation of the web page that we can work
with and query. In fact if you have done any web programming you will be
able to use the familiar CSS query selector syntax to query the object
and get back matching elements. If you need a refresher on that or if
you have never done anything with that then take a look at `This
W3Schools
reference <https://www.w3schools.com/cssref/css_selectors.asp>`__

We can use ``print(soup.prettify())`` to print out all of the source for
the web page we just downloaded. If we do some searching through that
text we will see that each row of the table containing the data we want
looks like this:

::

    <tr class="border1" style=" margin-top:3px; margin-bottom:3px">
       <td style="width:20px">
        <div class="flag" id="AFG">
        </div>
       </td>
       <td class="abs">
        <a href="afghanistan.htm">
         Afghanistan
        </a>
       </td>
       <td style="text-align:center">
        AF
       </td>
       <td style="text-align:center">
        AFG
       </td>
       <td style="text-align:center">
        004
       </td>
      </tr>
      <tr class="border1">
       <td style="width:20px">
        <img alt="ALA" height="12" src="../flags12/Aaland12_flag.gif" width="20"/>
       </td>
       <td class="abs">
        <em>
         Aland Islands
        </em>
       </td>
       <td style="text-align:center">
        AX
       </td>
       <td style="text-align:center">
        ALA
       </td>
       <td style="text-align:center">
        248
       </td>
      </tr>

Now you may think this is a horrible mess to work with. But it is
actually very structured:

1. We have a table
2. The table has rows (tr tags) and each row has five columns.
3. The three letter country code is always in the 4th column
4. The numeric country code is always in the 5th column.

When you break it down like that it doesn’t seem so hard. Now the trick
is getting past all of the extra stuff, and that is where Beautiful Soup
is our friend!

If you have not used Beautiful Soup before now would be an excellent
time to work through this `video
tutorial <https://www.youtube.com/watch?v=ng2o98k983k>`__ or if you
prefer text this `blog
post <https://www.dataquest.io/blog/web-scraping-tutorial-python/>`__ is
good.

What we want to do is search for a ``tr`` tag with the class “border1”
Using our CSS selector language we can find all of the instances of that
on the web page using “tr.border1” If there are multiple matches select
will return them as a list. So lets look at the first 3 elements we get
back from searching our page.

.. code:: ipython3

    soup.select("tr.border1")[:3]




.. parsed-literal::

    [<tr class="border1" style=" margin-top:3px; margin-bottom:3px">
     <td style="width:20px"> </td>
     <td> </td>
     <td style="text-align:center"> </td>
     <td style="text-align:center"> </td>
     <td style="text-align:center"> </td>
     </tr>, <tr class="border1" style=" margin-top:3px; margin-bottom:3px">
     <td style="width:20px"><div class="flag" id="AFG"></div></td>
     <td class="abs"><a href="afghanistan.htm">Afghanistan</a></td>
     <td style="text-align:center"> AF</td>
     <td style="text-align:center">AFG</td>
     <td style="text-align:center">004</td>
     </tr>, <tr class="border1">
     <td style="width:20px"><img alt="ALA" height="12" src="../flags12/Aaland12_flag.gif" width="20"/></td>
     <td class="abs"><em>Aland Islands</em></td>
     <td style="text-align:center">AX</td>
     <td style="text-align:center">ALA</td>
     <td style="text-align:center">248</td>
     </tr>]



Select returns a list of items that we can iterate over or use for
further queryies.

Let’s look at an easy way to use another select to get the ``td``
elements from each row and print out the the text contained in the 4th
and 5th ``td``

.. code:: ipython3

    for row in soup.select("tr.border1")[:10]:
        col_list = row.select('td')
        print(col_list[3].text, col_list[4].text)


.. parsed-literal::

       
    AFG 004
    ALA 248
    ALB 008
    DZA 012
    ASM 016
    AND 020
    AGO 024
    AIA 660
    ATA 010


OK, now modify the code above so instead of printing the values you
create a dictionary. The key should be the three digit country code and
the value should be the numeric code converted to an integer. You will
need to check your work to make sure that the dictionary is clean. You
don’t want keys that have whitespace in them and you may need to account
for the occasional blank row in the table.


Now that you have the dictionary we can take the next step of adding the
numeric information as a new column to our wd dataframe. The most common
way of doing this is through the use of the ``map`` function. Map is a
very common in functional programming as well as for Pandas programmers.
The pattern is as follows ``dataframe.column.map(afunction)`` . The
function you pass to map should take a single parameter and return the
value you want to go into the new column. The parameter will be the
value from ``column`` for a particular row. So to add a column to our wd
dataframe that contains the code number for acountry we can simply do:

.. code:: ipython3

    wd['CodeNum'] = wd.Code.map(cc_map.get)
    wd.head()




.. raw:: html

    <div>
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
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>Country</th>
          <th>Ctry</th>
          <th>Code</th>
          <th>CodeNum</th>
          <th>Region</th>
          <th>Population</th>
          <th>Area</th>
          <th>Pop. Density</th>
          <th>Coastline</th>
          <th>Net migration</th>
          <th>...</th>
          <th>Phones</th>
          <th>Arable</th>
          <th>Crops</th>
          <th>Other</th>
          <th>Climate</th>
          <th>Birthrate</th>
          <th>Deathrate</th>
          <th>Agriculture</th>
          <th>Industry</th>
          <th>Service</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>Afghanistan</td>
          <td>Afghanistan</td>
          <td>AFG</td>
          <td>4.0</td>
          <td>ASIA (EX. NEAR EAST)</td>
          <td>31056997</td>
          <td>647500</td>
          <td>48.0</td>
          <td>0.00</td>
          <td>23.06</td>
          <td>...</td>
          <td>3.2</td>
          <td>12.13</td>
          <td>0.22</td>
          <td>87.65</td>
          <td>1.0</td>
          <td>46.60</td>
          <td>20.34</td>
          <td>0.380</td>
          <td>0.240</td>
          <td>0.380</td>
        </tr>
        <tr>
          <th>1</th>
          <td>Albania</td>
          <td>Albania</td>
          <td>ALB</td>
          <td>8.0</td>
          <td>EASTERN EUROPE</td>
          <td>3581655</td>
          <td>28748</td>
          <td>124.6</td>
          <td>1.26</td>
          <td>-4.93</td>
          <td>...</td>
          <td>71.2</td>
          <td>21.09</td>
          <td>4.42</td>
          <td>74.49</td>
          <td>3.0</td>
          <td>15.11</td>
          <td>5.22</td>
          <td>0.232</td>
          <td>0.188</td>
          <td>0.579</td>
        </tr>
        <tr>
          <th>2</th>
          <td>Algeria</td>
          <td>Algeria</td>
          <td>DZA</td>
          <td>12.0</td>
          <td>NORTHERN AFRICA</td>
          <td>32930091</td>
          <td>2381740</td>
          <td>13.8</td>
          <td>0.04</td>
          <td>-0.39</td>
          <td>...</td>
          <td>78.1</td>
          <td>3.22</td>
          <td>0.25</td>
          <td>96.53</td>
          <td>1.0</td>
          <td>17.14</td>
          <td>4.61</td>
          <td>0.101</td>
          <td>0.600</td>
          <td>0.298</td>
        </tr>
        <tr>
          <th>3</th>
          <td>American Samoa</td>
          <td>American Samoa</td>
          <td>ASM</td>
          <td>16.0</td>
          <td>OCEANIA</td>
          <td>57794</td>
          <td>199</td>
          <td>290.4</td>
          <td>58.29</td>
          <td>-20.71</td>
          <td>...</td>
          <td>259.5</td>
          <td>10.00</td>
          <td>15.00</td>
          <td>75.00</td>
          <td>2.0</td>
          <td>22.46</td>
          <td>3.27</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>4</th>
          <td>Andorra</td>
          <td>Andorra</td>
          <td>AND</td>
          <td>20.0</td>
          <td>WESTERN EUROPE</td>
          <td>71201</td>
          <td>468</td>
          <td>152.1</td>
          <td>0.00</td>
          <td>6.60</td>
          <td>...</td>
          <td>497.2</td>
          <td>2.22</td>
          <td>0.00</td>
          <td>97.78</td>
          <td>3.0</td>
          <td>8.71</td>
          <td>6.25</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
      </tbody>
    </table>
    <p>5 rows × 23 columns</p>
    </div>



So – why did ``cc_map.get`` work? Because it is a function that takes a
single parameter, namely the three letter country code and returns the
corresponding value in the dictionary. This is really convenient, but is
definitely not the only way to do it. The most common ways are

-  use a ``lambda`` function
-  Write a function using def

We can modify the statement above to use a lambda as follows:
``wd.Code.map(lambda x: cc_map[x])`` That is a bit clearer about what’s
going on if you understand lambdas. If you have never used lambda
functions before you should read `This
post <https://pythonconquerstheuniverse.wordpress.com/2011/08/29/lambda_tutorial/>`__

So, now you have the information you need to use the example of the
counties above and apply that to the world below.

.. code:: ipython3

    alt.Chart(countries).mark_geoshape(
        fill='#666666',
        stroke='white'
    ).properties(
        width=750,
        height=450
    ).project('equirectangular')




.. image:: WorldFactbook_files/WorldFactbook_74_0.png



.. image:: WorldFactbook_files/WorldFactbook_75_0.png



More Practice
-------------

Screen Scraping Stock Prices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create a graph of the closing price of Google Stock over the last year,
using https://finance.yahoo.com/quote/GOOG/history?p=GOOG as your
source.

1. you will need to screen scrape the table of data and make a DataFrame
   from the results.



2. Next create a line graph using Altair



3. Can you figure out how to make a line graph that shows the opening
   price as well as the closing price for each day? Hint: If you data is
   an a tidy narrow format it will “just work” if you use the color
   channel to encode opening and closing

