Challenge:  Screen Scraping the CIA
===================================

The country data that we have been
using was compiled and turned into a csv file in 2006. Much of that data
comes from the CIA World Factbook. (not Facebook - as autocorrect so
often thinks) However, the CIA does not provide the factbook in the form of a nice convenient CSV file, so we need to do that part ourselves.

The goal of this exercise is to create an up to date version of our
country data (at least 2017 as I write this) This will be challenging
and fun as each column of the data is on its own page. But you can do
it, and you will see how powerful you are when you have the right tools!

However – **Think Generally!** At the end of this we would like to be
able to scrape the CIA data for **any** year not just 2017. So keep that
in mind.

You can download each year of the factbook going back to the year 2000
`from the CIA <https://www.cia.gov/library/publications/download/>`__.
Start with the year 2017. The nice thing about this is that you can
unzip the file on your local computer but still use ``requests``.

The Challenge of this project is that each variable is on its own page.
So we are going to have to combine many pages into a single coherent
data frame. Then when we have gathered all of the columns we can pull
them together into one nice data frame and we’ll learn how to save that
to a CSV file.

Again, think generally. If you design a good function for finding and
scraping one piece of information make it work for all pieces of
information and at the end you will have a little code that does a LOT
of work.

Lets take a look at the file structure of the downloaded data from 2017

.. code:: ipython3

    ls factbook/2017


.. parsed-literal::

    [34mappendix[m[m/          [34mfonts[m[m/             index.html         [34mrankorder[m[m/
    [34mcss[m[m/               [34mgeos[m[m/              [34mjs[m[m/                [34mscripts[m[m/
    [34mdocs[m[m/              [34mgraphics[m[m/          [34mprint[m[m/             [34mstyles[m[m/
    [34mfields[m[m/            [34mimages[m[m/            print_Contact.pdf  [34mwfbExt[m[m/


The folder that may jump out at you is called fields, so lets look at
that in more detail.

.. code:: ipython3

    import os
    files = os.listdir('factbook/2017/fields')
    print(sorted(files)[:10])


.. parsed-literal::

    ['2001.html', '2002.html', '2003.html', '2004.html', '2006.html', '2007.html', '2008.html', '2010.html', '2011.html', '2012.html']


Getting a list of all fields
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

That may not look terribly useful but each of the numbered files
contains one field that we can add to our data frame. Examine one of
them closely and see if you can figure out a good marker we can use to
find the field contained in each.

In fact now that you are investigating and if you stop and think for a
minute you may conclude that there must be some kind of nice human
readable table of contents. In fact there is take a look at the file
``notesanddefs.html``

In the spirit of starting small and working our way up to a larger
project write some code in the cell below to scrape all of the fields
and the file they are in from the notesanddefs.html file.


Loading all the data in rough form
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One more thing to note. You might assume that the country names will all
be consistent from field to field but that probably isn’t the case. What
is consistent is the two letter country code used in the URL to the
detail information about each country. So, what you are are going to
have to do is build a data structure for each field. you will want a
name for the field, then a dictionary that maps from the two digit
country code to the value of the field.

::

   all_data = {'field name' : {coutry_code : value} ...}

It may be that the data for the field and the country is more than we
want, but it will be easiest for now to just get the data in rough form
then we can clean it up once we have it in a dataframe

There are 177 different fields in the 2017 data. Loading all of them
would be a huge amount of work and more data than we need. Lets start
with a list that is close to our original data above

-  Country – name
-  Code2
-  Code3
-  CodeNum
-  Population
-  Area
-  Coastline
-  Climate
-  Net migration
-  Birth rate
-  Death rate
-  Infant mortality rate
-  Literacy
-  GDP
-  Government type
-  Inflation rate
-  Health expenditures
-  GDP - composition, by sector of origin
-  Land use
-  Internet users

Feel free to add others if they interest you.

If you use the structure given above you can just pass that to the
DataFrame constructor and you should have something that looks like
this:

.. code:: ipython3

    #pd.DataFrame(data).head()




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
          <th>Area</th>
          <th>Birth rate</th>
          <th>Climate</th>
          <th>Coastline</th>
          <th>Death rate</th>
          <th>GDP (purchasing power parity)</th>
          <th>GDP - composition, by sector of origin</th>
          <th>Government type</th>
          <th>Health expenditures</th>
          <th>Infant mortality rate</th>
          <th>Internet users</th>
          <th>Land use</th>
          <th>Literacy</th>
          <th>Population</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>aa</th>
          <td>total: 180 sq km\nland: 180 sq km\nwater: 0 sq km</td>
          <td>12.4 births/1,000 population (2017 est.)</td>
          <td>tropical marine; little seasonal temperature v...</td>
          <td>68.5 km</td>
          <td>8.4 deaths/1,000 population (2017 est.)</td>
          <td>$2.516 billion (2009 est.)\n$2.258 billion (20...</td>
          <td>agriculture: 0.4%\nindustry: 33.3%\nservices: ...</td>
          <td>parliamentary democracy (Legislature); part of...</td>
          <td>NaN</td>
          <td>total: 10.7 deaths/1,000 live births\nmale: 14...</td>
          <td>total: 106,309\npercent of population: 93.5% (...</td>
          <td>agricultural land: 11.1%\narable land 11.1%; p...</td>
          <td>definition: age 15 and over can read and write...</td>
          <td>115,120 (July 2017 est.)</td>
          <td>Aruba</td>
        </tr>
        <tr>
          <th>ac</th>
          <td>total: 442.6 sq km (Antigua 280 sq km; Barbuda...</td>
          <td>15.7 births/1,000 population (2017 est.)</td>
          <td>tropical maritime; little seasonal temperature...</td>
          <td>153 km</td>
          <td>5.7 deaths/1,000 population (2017 est.)</td>
          <td>$2.288 billion (2016 est.)\n$2.145 billion (20...</td>
          <td>agriculture: 2.3%\nindustry: 20.2%\nservices: ...</td>
          <td>parliamentary democracy (Parliament) under a c...</td>
          <td>5.5% of GDP (2014)</td>
          <td>total: 12.1 deaths/1,000 live births\nmale: 13...</td>
          <td>total: 60,000\npercent of population: 65.2% (J...</td>
          <td>agricultural land: 20.5%\narable land 9.1%; pe...</td>
          <td>definition: age 15 and over has completed five...</td>
          <td>94,731 (July 2017 est.)</td>
          <td>Antigua and Barbuda</td>
        </tr>
        <tr>
          <th>ae</th>
          <td>total: 83,600 sq km\nland: 83,600 sq km\nwater...</td>
          <td>15.1 births/1,000 population (2017 est.)</td>
          <td>desert; cooler in eastern mountains</td>
          <td>1,318 km</td>
          <td>1.9 deaths/1,000 population (2017 est.)</td>
          <td>$671.1 billion (2016 est.)\n$643.1 billion (20...</td>
          <td>agriculture: 0.8%\nindustry: 39.5%\nservices: ...</td>
          <td>federation of monarchies</td>
          <td>3.6% of GDP (2014)</td>
          <td>total: 10 deaths/1,000 live births\nmale: 11.6...</td>
          <td>total: 5,370,299\npercent of population: 90.6%...</td>
          <td>agricultural land: 4.6%\narable land 0.5%; per...</td>
          <td>definition: age 15 and over can read and write...</td>
          <td>6,072,475 (July 2017 est.)\nnote: the UN estim...</td>
          <td>United Arab Emirates</td>
        </tr>
        <tr>
          <th>af</th>
          <td>total: 652,230 sq km\nland: 652,230 sq km\nwat...</td>
          <td>37.9 births/1,000 population (2017 est.)</td>
          <td>arid to semiarid; cold winters and hot summers</td>
          <td>0 km (landlocked)</td>
          <td>13.4 deaths/1,000 population (2017 est.)</td>
          <td>$66.65 billion (2016 est.)\n$64.29 billion (20...</td>
          <td>agriculture: 22%\nindustry: 22%\nservices: 56%...</td>
          <td>presidential Islamic republic</td>
          <td>8.2% of GDP (2014)</td>
          <td>total: 110.6 deaths/1,000 live births\nmale: 1...</td>
          <td>total: 3,531,770\npercent of population: 10.6%...</td>
          <td>agricultural land: 58.07%\narable land 20.5%; ...</td>
          <td>definition: age 15 and over can read and write...</td>
          <td>34,124,811 (July 2017 est.)</td>
          <td>Afghanistan</td>
        </tr>
        <tr>
          <th>ag</th>
          <td>total: 2,381,741 sq km\nland: 2,381,741 sq km\...</td>
          <td>22.2 births/1,000 population (2017 est.)</td>
          <td>arid to semiarid; mild, wet winters with hot, ...</td>
          <td>998 km</td>
          <td>4.3 deaths/1,000 population (2017 est.)</td>
          <td>$609.6 billion (2016 est.)\n$582.7 billion (20...</td>
          <td>agriculture: 12.9%\nindustry: 36.2%\nservices:...</td>
          <td>presidential republic</td>
          <td>7.2% of GDP (2014)</td>
          <td>total: 19.6 deaths/1,000 live births\nmale: 21...</td>
          <td>total: 17,291,463\npercent of population: 42.9...</td>
          <td>agricultural land: 17.4%\narable land 18.02%; ...</td>
          <td>definition: age 15 and over can read and write...</td>
          <td>40,969,443 (July 2017 est.)</td>
          <td>Algeria</td>
        </tr>
      </tbody>
    </table>
    </div>



So, we have made lot of progress but we have a lot of cleanup to do!


Cleaning the data
~~~~~~~~~~~~~~~~~

With the data now in a dataframe we can begin the hard work of cleaning.
it up and adding our last few columns – the 3 letter and numeric country
codes! But those are easy to get from the two digit country code using
the same website we used before!

We can do this nicely and tackle one column at a time. This is a lot of
string processing and type conversion work. A lot of this can be made
easier by using regular expression pattern matching. Which is a very big
skill to add to your arsenal. If you haven’t used them before or are out
of practice `Go through this
tutorial <http://evc-cit.info/comsc020/python-regex-tutorial/>`__

**Instructors Note:** This would work well as a class project where each
team gets a column to transform and then everyone can share their
solution with everyone else. Or if you don’t have enough students then
each team can take one or more columns.



Saving the data
~~~~~~~~~~~~~~~

We can save the data using ``to_csv``


Rinse Repeat
~~~~~~~~~~~~

If you try to repeat the exercise above for 2016 it works great! What
about 2015? Earlier? How far back can you go before your code breaks?


What you will find when you go back illustrates one of the real ugly
parts of screen scraping. Which is that you are at the mercy of the web
site designer. All they have to do is make one little change to a CSS
class or the id of an element and boom your whole strategy goes away

Comparing across the years.
~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you or you and your classmates can scrape all 17 years of world
factbook data you will really have achieved something. And are destined
for internet fame if you make your notebooks public. You will likely
have noticed that lots of people want this data in a more convenient
format.

