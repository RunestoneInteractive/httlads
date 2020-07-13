Web Scraping using Panda and BeautifulSoup 
===========================================

Below are some great articles that will help you understand web scrapping and the BeauituflSoup library. Make sure
you read all three articles before you move on to section 6.4.

-  `Screen Scraping 101 <https://hackernoon.com/web-scraping-tutorial-with-python-tips-and-tricks-db070e70e071>`_
-  `Web Scraping Weather Forecasts <https://www.dataquest.io/blog/web-scraping-tutorial-python/>`_
-  `Beautiful Soup Docs <https://www.crummy.com/software/BeautifulSoup/bs4/doc/>`_


The data that we have been using so far was compiled and turned into a CSV file. 
Much of the data comes from The World Bank website which offers the data in CSV format.
However, some websites do not proved their data in the form of a nice and convenient CSV file, so
we need to convert the data from its human-readable format (as a webpage) to a Pandas friendly format, 
a CSV file. We will use the data that comes from the CIA World Factbook in this chapter.

The goal of this exercise is to web scrape the CIA World Factbook and create country data for 2017. 

Let's start scrapping the country data from 2017. At the end of this exercise you will be able to scrap
data from any year.

You can download each year of the factbook going back to the year 2000
`from the CIA <https://www.cia.gov/library/publications/download/>`_. For this exercise, we will scrape 
the data from the year 2017. Once you have downloaded the data, you can unzip the file on your
local computer.

The challenge of this project is that each variable is on its own page. So, we
are going to have to combine many pages into a single coherent data frame. Then,
when we have gathered all of the columns, we can pull them together into one
nice data frame and we'll learn how to save that to a CSV file.

Again, think generally. If you design a good function for finding and scraping
one piece of information, make it work for all pieces of information, and at the
end you will have a minimal amount of code that does a LOT of work. Therefore, try scraping 
one or two pages and when you have become comfortable scraping single pages. You can gather 
all the columns and urls, from the ``notesanddefs.html`` file, and loop through the urls
to go to each page and retrieve all the information you want. 

Copy path from your file explorer. Here is an example of how it should look like.

.. code:: python3

   C:\Users\mainuser\factbook
   

Lets take a look at the file structure of the downloaded data from 2017.

.. code:: python3
   
   import os
   files = os.listdir('C:\\Users\\mainuser\\factbook\\fields')
   print(sorted(files)[:10])

.. parsed-literal::

   ['2001.html', '2002.html', '2003.html', '2004.html', '2006.html', '2007.html', '2008.html', '2010.html', '2011.html', '2012.html']


Getting a List of All Fields
----------------------------

This may look intimidating to see, but there is a method behind this madness. For each
numbered file, it contains one field that we can add to our data frame. Try to Examine
one closely, and see if you can figure out a good marker that we can use to find the field 
contained in each. 

Since you are investigating, if you stop and think, just like any other web page there 
should be some kind of nice human-readble table of contents that can help us. Luckily, 
there is one and we can find it in the file ``rankorderguide.html``.

For now, let's start small and work our way up to the bigger problem. We can write
some code to scrape all the fields and the file they are in from the ``rankorderguide.html`` file.

The webpage for that file looks like this.

.. figure:: Figures/factbook_notes.png

   Part of the Definitions and Notes page for the World Factbook 2017.

There are a couple of important things on this page that we will want to get:
the feature name (like Inflation rate (consumer prices) or Industrial production growth rate) and the link to the
page that has all of the data for this feature for each country.

Before we start scrapping the CIA World Factbook data, let's get a little bit more familiar with html structure.
Below is an excerpt of the html page that has information about inflation rate. Let us closely examine each tag and element in html so we 
can scrape the data more effeciently.

**NOTE:** You can view a page in its html format in any browser. For Google Chrome, right-click the page you want to view and click on view page source.
If you are using other browerser, you can always look up online how to view the page in html.

.. parsed-literal:: html

 <a name="2092"></a>
				<div id="2092" name="2092">
					<li style="list-style-type: none; line-height: 20px; padding-bottom: 3px;" > 
					<span style="padding: 2px; display:block; background-color:#F8f8e7;" class="category">
						<table width="100%" border="0" cellpadding="0" cellspacing="0" >
							<tr>
								<td style="width: 90%;" >Inflation rate (consumer prices)</td><td align="right" valign="middle">
								
											<a href="../fields/2092.html#119" title="Field info displayed for all countries in alpha order."> <img src="../graphics/field_listing_on.gif" border="0" style="padding:0px;" > </a>
												
								</td>
							</tr>
						</table>
					</span>
					<div id="data" class="category_data" style="width: 98%; font-weight: normal; background-color: #fff; padding: 5px; margin-left: 0px; border-top: 1px solid #ccc;" >
					<div class="category_data" style="text-transform:none"> 
						
						This entry furnishes the annual percent change in consumer prices compared with the previous year's consumer prices.</div>
				</div>
			</li>
			</div> 

If you have not seen HTML before, this may look a bit confusing. One of the
skills you will develop as a data scientist is learning what to focus on and
what to ignore. This takes practice and experience, so don't be frustrated if it
seems a bit overwhelming at the beginning.

The two things to focus on here are:

* ``<td style="width: 90%;" >Inflation rate (consumer prices)</td><td align="right" valign="middle">``
* ``<a href="../fields/2092.html#119" title="Field info displayed for all countries in alpha order."><img src="../graphics/field_listing_on.gif" border="0" style="padding:0px;" > </a>``

the ``<td>`` is a tag that defines a cell in a table. The page you see in the
figure is composed of many small tables, each table has one row and two columns.
The first column contains the feature we are interested in and the second
contains the icon. This would not be considered as good page design by many web
developers today, but you have to learn to work with what you've got. The icon
is embedded in an ``<a>`` tag. This is the tag that is used to link one web page
to another. You click on things defined by ``<a>`` tags all the time.  The part
``href="../fields/2092.html#119`` is a hyper-ref, that contains the URL of where
the link should take you. For example, `This Link <https://runestone.academy>`_
takes you to the Runestone homepage and looks like this in html
``<a href="https://runestone.academy">This Link</a>``.

The indentation in the code shows the hierarchical structure of an HTML document. Some very important things to note is that,
blocks that are indented to the same level are sibling, and blocks that are nested inside other blcks have a parent-child relationship. 
We can take a look at examples of these relationships in the following diagram. 


.. figure:: Figures/htmltree.png


Now, we need to look closely at the html page as a whole and see if we can find a pattern
that can help us find the two items that we are interested in. 

In the 2017 country data, we see that the each table we want is
contained in a ``span``, and the span has the attribute ``class="category"``. Keep in 
mind that this is not always the pattern for every webpage. For future web scrapping, pay
attention to the particular pattern of a webpage and scrape accordingly.

Now that we know the pattern of the 2017 country data, the big question is how we go
about finding and working with each instance of what we are looking for in our
web page. We could just treat each page like a big long string and use Python's
string searching facilities. But, that would be *painful* for sure. Instead, we
will turn to another of Python's packages that will make the job fun and very
manageable. That package is called
`BeautifulSoup <https://www.crummy.com/software/BeautifulSoup/bs4/doc/>`_. The
name "Beautiful Soup" comes from *Alice in Wonderland*; it is the title of a
song sung by the Mock Turtle. (Yes, its turtles everywhere!) Using
BeautifulSoup, we can get the web page into a form that we can use some real
power search tools.

First, let's import the module, and read the entire webpage as a string. In this exercise, since we downloaded
the data to our computer we are going to use ``open()`` to read the data. However, you can use ``requests`` to read
data from online sources.

.. code:: python3

   from bs4 import BeautifulSoup
   page = open('../Data/factbook/2017/docs/notesanddefs.html').read()
   page[:200]

**NOTE:** If you get an error openning the file. You can place ``r`` before the URL, ``(r'../Data/factbook/2017/docs/notesanddefs.html')``. If you get a ``UnicodeDecodeError``, try
putting, ``encoding = 'utf-8'``. ``Open(r'../Data/factbook/2017/docs/notesanddefs.html', encoding = 'utf-8')``.

.. parsed-literal::

   '<!doctype html>\n<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->\n<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->\n<!--[if IE 8]>    <html c'


Now, let's have BeautifulSoup take control.


.. code:: python3

   page = BeautifulSoup(page)
   print(page.prettify()[:1000])
   
    
.. parsed-literal::

   <!DOCTYPE html>
   <!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
   <!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
   <!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
   <!--[if gt IE 8]><!-->
   <!--<![endif]-->
   <html class="no-js" lang="en">
    <!-- InstanceBegin template="/Templates/wfbext_template.dwt.cfm" codeOutsideHTMLIsLocked="false" -->
    <head>
     <meta charset="utf-8"/>
     <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"/>
     <!-- InstanceBeginEditable name="doctitle" -->
     <title>
      The World Factbook
     </title>
     <!-- InstanceEndEditable -->
     <meta content="" name="description"/>
     <meta content="width=device-width" name="viewport"/>
     <link href="../css/fullscreen-external.css" rel="stylesheet" type="text/css"/>
     <script src="../js/modernizr-latest.js">
     </script>
     <!--developers version - switch to specific production http://modernizr.com/download/-->
     <script src="../js/jquery-1.8.3.min.


So far, this doesn't seem like much help, but let's see how we can use the
search capabilities of BeautifulSoup to find all of the ``span`` tags with the
``class`` "category". To do this, we will use a search syntax that is commonly
used in the web development community. It is the same syntax that is used to
write the rules for the Cascading Style Sheets (CSS) that are used to make our
web pages look nice.

The search syntax allows us to:

* Search for all matching tags
* Search for all matching tags with a particular class
* Search for some tag that has the given id
* Search for classes that have a specific id 
* Search for all matching tags that are the children of some other tag
* Many other things of a similar essence

The search syntax is uses a couple of special characters to indicate
relationships or to identify classes and ids.

* ``.`` is used to specify a class, so ``.category`` finds all tags that have
  the attribute ``class=category``. ``tag.class`` makes that more specific and
  limits the results to just the particular tags that have that class. For
  example, ``span.category`` will only select span tags with ``class=category``.
* ``#`` is used to specify an id so ``div#2053`` would only match a div tag with
  id=2053. ``#2053`` would find any tag with id=2053. Note ids are meant to be
  unique within a web page so ``#2053`` should ony find a single tag.
* `` `` indicates parent-child relationship, so ``span table`` would find all of
  the table tags that are children of a span, and ``div span table`` would find
  all the tables that are children of a span that are children of a div.

You can definitely get more complicated than that, but knowing only those 3
concepts is a really good start. To make use of the search capability, we will
use the
`select <https://www.crummy.com/software/BeautifulSoup/bs4/doc/#css-selectors>`_
method of a BeautifulSoup object. In our case, we have created a BeautifulSoup
object called ``page``. ``select`` will always return a list, so you can iterate
over the list or index into the list. Let's try an example. 


.. code:: python3

   links = page.select('a')
   print(len(links))
   links[-1]


.. parsed-literal::

   625
   <a class="go-top" href="#">GO TOP</a>


So, this tells us that there are 625 ``a`` tags on the page, and the last one
takes us to the top of the page.


Practice Questions
====================
Questions to be added later


Now, let's put this all together and see if we can make a list of the columns
and the paths to the files that contain the data. We will do this by creating a
list of all of the ``span`` tags with the class category. As we iterate over
each of them, we can use ``select`` to find the ``td`` tags inside the span.
There should be two of them in each. The first will give us the name of the
column and the second will have the path to the file contained in the ``href``
attribute.

Starting small, let's print the column names.


.. code:: python3

   cols = page.select("span.category")
   for col in cols:
       cells = col.select('td')
       col_name = cells[0].text
       print(col_name)


.. parsed-literal::

   Administrative divisions
   Age structure
   Agriculture - products
   Airports
   Airports - with paved runways
   Airports - with unpaved runways
   Area
   Area - comparative
   Background
   Birth rate
   Broadcast media
   Budget


Next, let's expand on this example to get the path to the file.


.. code:: python3

   cols = page.select("span.category")
   for col in cols:
       cells = col.select('td')
       colname = cells[0].text
       links = cells[1].select('a')
       if len(links) > 0:
           fpath = links[0]['href']
           print(colname, fpath)


.. parsed-literal::

   Administrative divisions ../fields/2051.html#3
   Age structure ../fields/2010.html#4
   Agriculture - products ../fields/2052.html#5
   Airports ../fields/2053.html#6
   Airports - with paved runways ../fields/2030.html#7
   Airports - with unpaved runways ../fields/2031.html#8
   Area ../fields/2147.html#10
   Area - comparative ../fields/2023.html#11
   Background ../fields/2028.html#12
   Birth rate ../fields/2054.html#13
   Broadcast media ../fields/2213.html#14
   Budget ../fields/2056.html#15
   Budget surplus (+) or deficit (-) ../fields/2222.html#16


Success!

So, now we have the means to get the names and paths, so we can populate a
DataFrame with columns and data for each country. Your task is now to create a
DataFrame with as many of the same columns as you can. You'll have to do your own investigation into the
structure of the file to find a way to scrape the information.

Like mentioned earlier, we suggest starting by scrapping one or two page and get all the information from those pages. Then, when 
you are comfortable and make a function that gives you all the information, you can itterate through the urls and scrape
all the pages with minimal code. 


Loading All the Data in Rough Form
----------------------------------

One more thing to note: you might assume that the country names will all be
consistent from field to field but that probably isn't always the case. Therefore, if the country names 
are consistent in the fields, go ahead and use country names.
However, if that is not the case, you can use the two-letter country code used in the URL 
to the detail information about each country, as well as the id of the ``tr`` tag in the large
table that contains the data you want. So, what you are are going to have to do
is build a data structure for each field. You will want a name for the field,
then a dictionary that maps from either country name or the two-digit country code to the value of the
field.


.. code-block:: none

   all_data = {'field name' : {coutry_code : value} ...}

It may be that the data for the field and the country is more than we want, but
it will be easiest for now to just get the data in rough form, then we can clean
it up once we have it in a DataFrame.

There are 177 different fields in the 2017 data. Loading all of them would be a
huge amount of work, and more data than we need. Let's start with a list that is
close to our original data above.

-  Country - name
-  GDP - Real Growth Rate
-  Unemployment Rate
-  Inflation Rate
-  Budget
-  Tax and other revenues
-  Imports
-  Exports
-  Agriculture - Products

Feel free to add others if they interest you.

If you use the structure given above, you can just pass the dictionary that you created to the DataFrame
constructor and you should have something that looks like this.


.. code:: python3

   pd.DataFrame(all_data).head()


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
    <table class="table table-bordered table-hover table-condensed">
      <thead><tr><th title="Field #1"></th>
      <th title="Field #2">GDP - Real Growth Rate</th>
      <th title="Field #3">Unemployment Rate</th>
      <th title="Field #4">Inflation Rate</th>
      <th title="Field #5">Budget</th>
      <th title="Field #6">Tax and other revenues</th>
      <th title="Field #7">Imports</th>
      <th title="Field #8">Exports</th>
      <th title="Field #9">Agriculture - Products</th>
      </tr></thead>
      <tbody><tr>
      <td>Afghanistan</td>
      <td>\n2.4% (2016 est.)\n1.3% (2015 est.)\n2.7% (20...</td>
      <td>\n35% (2008 est.)\n40% (2005 est.)\n</td>
      <td>\n4.4% (2016 est.)\n-2.9% (2015 est.)\n</td>
      <td>\nrevenues:  1.992𝑏𝑖𝑙𝑙𝑖𝑜𝑛\nexpenditures: 6.6...</td>
      <td>\n10.5% of GDP (2016 est.)\n</td>
      <td>\n 6.16𝑏𝑖𝑙𝑙𝑖𝑜𝑛(2016𝑒𝑠𝑡.)\n 7.034 billion (2...</td>
      <td>\n 619.2𝑚𝑖𝑙𝑙𝑖𝑜𝑛(2016𝑒𝑠𝑡.)\n 580 million (20...</td>
      <td>\nopium, wheat, fruits, nuts; wool, mutton, sh...</td>
      </tr>
      <tr>
      <td>Albania</td>
      <td>\n3.4% (2016 est.)\n2.2% (2015 est.)\n1.8% (20...</td>
      <td>\n15.2% (2016 est.)\n13.3% (2015 est.)\nnote: ...</td>
      <td>\n1.3% (2016 est.)\n1.9% (2015 est.)\n</td>
      <td>\nrevenues:  3.279𝑏𝑖𝑙𝑙𝑖𝑜𝑛\nexpenditures: 3.4...</td>
      <td>\n27% of GDP (2016 est.)\n</td>
      <td>\n 3.671𝑏𝑖𝑙𝑙𝑖𝑜𝑛(2016𝑒𝑠𝑡.)\n 3.402 billion (...</td>
      <td>\n 789.1𝑚𝑖𝑙𝑙𝑖𝑜𝑛(2016𝑒𝑠𝑡.)\n 854.7 million (...</td>
      <td>\nwheat, corn, potatoes, vegetables, fruits, o...</td>
      </tr>
      <tr>
      <td>Algeria</td>
      <td>\n3.3% (2016 est.)\n3.7% (2015 est.)\n3.8% (20...</td>
      <td>\n10.5% (2016 est.)\n11.2% (2015 est.)\n</td>
      <td>\n6.4% (2016 est.)\n4.8% (2015 est.)\n</td>
      <td>\nrevenues:  45.37𝑏𝑖𝑙𝑙𝑖𝑜𝑛\nexpenditures: 67....</td>
      <td>\n28.2% of GDP (2016 est.)\n</td>
      <td>\n 49.43𝑏𝑖𝑙𝑙𝑖𝑜𝑛(2016𝑒𝑠𝑡.)\n 52.65 billion (...</td>
      <td>\n 29.06𝑏𝑖𝑙𝑙𝑖𝑜𝑛(2016𝑒𝑠𝑡.)\n 34.57 billion (...</td>
      <td>\nwheat, barley, oats, grapes, olives, citrus,...</td>
      </tr>
      <tr>
      <td>American Samoa</td>
      <td>\n-2.4% (2013 est.)\n-2.7% (2012 est.)\n0.6% (...</td>
      <td>\n29.8% (2005)\n</td>
      <td>\n2.1% (2013)\n3.5% (2012)\n</td>
      <td>\nrevenues:  241.2𝑚𝑖𝑙𝑙𝑖𝑜𝑛\nexpenditures: 243...</td>
      <td>\n32.2% of GDP (2013 est.)\n</td>
      <td>\n 564𝑚𝑖𝑙𝑙𝑖𝑜𝑛(2013𝑒𝑠𝑡.)\n 508 million (2012)\n</td>
      <td>\n 459𝑚𝑖𝑙𝑙𝑖𝑜𝑛(2013𝑒𝑠𝑡.)\n 489 million (2012)\n</td>
      <td>\nbananas, coconuts, vegetables, taro, breadfr...</td>
      </tr>
      <tr>
      <td>Andorra</td>
      <td>\n-1.1% (2015 est.)\n1.4% (2014 est.)\n-0.1% (...</td>
      <td>\n3.7% (2016 est.)\n4.1% (2015 est.)\n</td>
      <td>\n-0.9% (2015 est.)\n-0.1% (2014 est.)\n</td>
      <td>\nrevenues:  1.872𝑏𝑖𝑙𝑙𝑖𝑜𝑛\nexpenditures: 2.0...</td>
      <td>\n69% of GDP (2016)\n</td>
      <td>\n 1.257𝑏𝑖𝑙𝑙𝑖𝑜𝑛(2015𝑒𝑠𝑡.)\n 1.264 billion (...</td>
      <td>\n 78.71𝑚𝑖𝑙𝑙𝑖𝑜𝑛(2015𝑒𝑠𝑡.)\n 79.57 million (...</td>
      <td>\nsmall quantities of rye, wheat, barley, oats...</td>
      </tr>
      </tbody></table>
      </div>

So, we have made lot of progress but we still have a lot of cleanup to do! You
will have noticed that many of the fields that we wanted to be numeric are
definitely not. Many of them are in a more human-readable format than
computer-digestible. You should consult the documentation on the ``extract``
method in Pandas, as it will help you get want you want from the strings you
currently have.


Cleaning the Data
-----------------

With the data now in a DataFrame, we can begin the hard work of cleaning it up.
We can do this nicely and tackle one column at a time. This is a lot of string
processing and type conversion. A lot of this can be made easier by using
regular expression pattern matching, which is a very big skill to add to your
arsenal. If you haven't used them before or are out of practice, go through
`this tutorial <http://evc-cit.info/comsc020/python-regex-tutorial/>`_.

**Instructors Note:** This would work well as a class project, where each team
gets a column to transform. Everyone can then share their solution with everyone
else, or if you don’t have enough students, then each team can take one or more
columns.


Saving the Data
---------------

We can save the data using ``to_csv``.


Comparing Across the Years
--------------------------

If you try to repeat the exercise above for 2016, it works great! How about
2015? Earlier? How far back can you go before your code breaks?

What you will find when you go back illustrates one of the really ugly parts of
screen scraping, which is that you are at the mercy of the website designer. All
they have to do is make one little change to a CSS class or the id of an
element, and your whole strategy goes away.

If you or your classmates can scrape all 17 years of world factbook data, you
will really have achieved something special. (And, you will be destined for
internet fame if you make your notebooks public.) You will likely have noticed
that lots of people want this data in a more convenient format.


Practice Questions
-------------------
Questions to be added here.


.. reveal:: web_scrapping_2017_data
    :instructoronly:
    
    Here we have the code that enables you to scrape one page, get all the information, and put it in a dictionary.
    .. code:: python3
       from bs4 import BeautifulSoup
       import pandas as pd
       # file = open(filename, encoding="utf8")
       page = open(r"C:/Users/santoshernandezr/factbook2017/fields/2003.html", encoding='utf-8').read()
       page[:200]

       gdp_content = BeautifulSoup(page)
       gdp_content
       gdp_content = gdp_content.find(id="fieldListing") # gets all the data where the country and the data is stored

       country_tags = gdp_content.select("#fieldListing .country") # gets all the information where the countries are
       gdp_country = [pt.get_text() for pt in country_tags] # gets all the countries
       # print(gdp_country)

       period_tags = gdp_content.select("#fieldListing .fieldData") # gets all the gdp data of each country
       gdp_data = [pt.get_text() for pt in period_tags] # gets data
       # print(gdp_data)
            
       dict = {gdp_country[i]: gdp_data[i] for i in range(len(gdp_country))}
       #print(dict)

    Below we have the code that iterates through all the urls to scrape all the data without having to scrape each one individually.
    
    .. code:: python3
       from bs4 import BeautifulSoup
       import pandas as pd
       page = open(r"C:/Users/santoshernandezr/factbook2017/docs/notesanddefs.html", encoding='utf-8').read()
       page[:200]

       all_info = BeautifulSoup(page)
       # print(page.prettify()[:1000])

       country_tags = all_info.select(".header_ul .category") 
       urls = []

       for col in country_tags:
          links = col.select('a')
          if len(links) > 0:
             fpath = links[0]['href']
             fpath = fpath[2:] 
             urls.append("C:/Users/santoshernandezr/factbook2017" + fpath)
       # print(urls)

       from bs4 import BeautifulSoup
       import pandas as pd

       all_data = {}

       for url in urls[:20]:
          new_url = url[:55]
          # print(new_url)
          page = open(new_url, encoding='utf-8').read()
          page_content = BeautifulSoup(page)
         
          header_info = page_content.select("tr.fieldHeading")
          header = header_info[0].get_text()[7:]
          # print(header)
         
          page_content = page_content.find(id="fieldListing") # gets all the data where the country and the data is stored
         
          find_country = page_content.select("#fieldListing .country") # gets all the countries
          country_name = [pt.get_text() for pt in find_country] # gets all the countries
          #print(country_name)
         
          find_data = page_content.select("#fieldListing .fieldData") # finding where the data is
          country_data = [pt.get_text()[1:-1] for pt in find_data] # retrieving the data
         
          dict = {country_name[i]: country_data[i] for i in range(len(country_name))} # dictionary that maps each country to the info
          all_data[header] = dict # having a header for the dictionary of the information
         
          dict = {}
         
          # print(all_data)
          web_scrape = pd.DataFrame(all_data).head()