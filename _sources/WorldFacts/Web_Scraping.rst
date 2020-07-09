Web Scraping using Panda and BeautifulSoup 
===========================================


The data that we have been using so far was compiled and turned into a CSV file. 
Much of the data comes from The World Bank website which offers the data in CSV format.
However, some websites do not proved their data in the form of a nice and convenient CSV file, so
we need to convert the data from its human-readable format (as a webpage) to a Pandas friendly format, 
a CSV file. We will use the data that comes from the CIA World Factbook in this chapter.

The goal of this exercise is to create an up-to-date version of our country data
(at least up to 2018, as this is being written). This will be challenging and
fun as each column of the data is on its own page. But you can do it, and you
will see how powerful you can be when you have the right tools!

**Think Generally!** At the end of this we would like to be able to scrape the
CIA data for **any** year not just 2018, so keep that in mind.

You can download each year of the factbook going back to the year 2000
`from the CIA <https://www.cia.gov/library/publications/download/>`_. Start with
the year 2018. The nice thing about this is that you can unzip the file on your
local computer but still use ``requests``.

The challenge of this project is that each variable is on its own page. So, we
are going to have to combine many pages into a single coherent data frame. Then,
when we have gathered all of the columns, we can pull them together into one
nice data frame and we'll learn how to save that to a CSV file.

Again, think generally. If you design a good function for finding and scraping
one piece of information, make it work for all pieces of information, and at the
end you will have a minimal amount of code that does a LOT of work.



Copy path from your file explorer. Here is an example of how it should look like.

.. code:: python3

   C:\Users\mainuser\factbook
   

Lets take a look at the file structure of the downloaded data from 2018.

.. code:: python3
   
   import os
   files = os.listdir('C:\\Users\\mainuser\\factbook\\fields')
   print(sorted(files)[:10])

.. parsed-literal::
 
   ['196.html', '196rank.html', '197.html', '197rank.html', '198.html', '199.html', '202.html', '204.html', '204rank.html', '205.html']


Getting a List of All Fields
----------------------------

That may not look terribly useful, but each of the numbered files contains one
field that we can add to our data frame. Examine one of them closely, and see if
you can figure out a good marker we can use to find the field contained in each.

In fact, now that you are investigating and if you stop and think for a minute,
you may conclude that there must be some kind of nice human-readable table of
contents. In fact, there is. Take a look at the file ``rankorderguide.html``

In the spirit of starting small and working our way up to a larger project,
let's write some code to scrape all of the fields and the file they are in from
the ``rankorderguide.html`` file.

The webpage for that file looks like this.

.. figure:: Figures/Viasualization_8.png

   Part of the Guide to country comparisons page for the World Factbook 2018.

There are a couple of important things on this page that we will want to get:
the feature name (like Inflation rate (consumer prices) or Industrial production growth rate) and the link to the
page that has all of the data for this feature for each country.

When we **screen scrape** a webpage, we take advantage of the fact that we can
get that webpage using the ``requests`` module we learned about in the previous
chapter, and treat the web page as a simple text file. Let's look at part of the
text for this page.


.. parsed-literal:: html

    <caption class=\'sr-only\'>Rank Order Listing for the Inflation rate (consumer prices) field</caption>
    \n  
    <thead>
    \n    
    <tr>
        \n      
        <th scope=\'col\'>Rank</th>
        \n      
        <th scope=\'col\'>Country</th>
        \n      
        <th scope=\'col\'>\n          (%)\n      </th>
        \n      
        <th scope=\'col\'>Date of Information</th>
        \n    
    </tr>
    \n  
    </thead>
    \n  
    <tbody>   
    \n    
    <tr id="TO" class=\'rankorder africa\'>
        \n      
        <td scope=\'row\'>4</td>
        \n      
        <td class=\'region\'>\n          
        <a href=\'../geos/to.html\'>Togo</a>\n      
        </td>
        \n      
        <td>-0.70</td>
        \n      
        <td>2017 est.</td>
        \n    
    </tr>
    \n

If you have not seen HTML before, this may look a bit confusing. One of the
skills you will develop as a data scientist is learning what to focus on and
what to ignore. This takes practice and experience, so don't be frustrated if it
seems a bit overwhelming at the beginning.

The two things to focus on here are:

* `` <td class=\'region\'>\n <a href=\'../geos/to.html\'>Togo</a>\n </td> ``
* `` <a href=\'../geos/to.html\'>Togo</a>\n </td> ``

he ``<td>`` is a tag that defines a cell in a table. The page you see in the
figure is composed of many small tables, each table has one row and two columns.
The first column contains the feature we are interested in and the second
contains the icon. This would not be considered as good page design by many web
developers today, but you have to learn to work with what you've got. The icon
is embedded in an ``<a>`` tag. This is the tag that is used to link one web page
to another. You click on things defined by ``<a>`` tags all the time.  The part
``href=\'../geos/to.html`` is a hyper-ref, that contains the URL of where
the link should take you. For example, `This Link <https://runestone.academy>`_
takes you to the Runestone homepage and looks like this in html
``<a href="https://runestone.academy">This Link</a>``.

The indentation of the above code not accidental; the indentation shows the
hierarchical structure of an HTML document. Blocks that are indented to the same
level are siblings, blocks that are nested inside other blocks have a
parent-child relationship. We can draw a diagram that illustrates these
relationships as follows.

.. figure:: Figures/htmltree.png



.. parsed-literal:: html

   <span class="region_name">Inflation rate (consumer prices)</span>\n    \n      
    <span class="btn-print">\n          
    <a href="../fields/rawdata_229.txt" title=\'Download\'>\n            
        <i class="fa fa-download"></i>\n            
        <span class=\'sr-only\'>Download</span>\n          
    </a>\n      
    </span>\n  </div>\n\n  <section class="reference_content">\n      
    <div class=\'category_data\'>\n    Inflation rate (consumer prices) compares the annual percent change in consumer prices with the previous year&#39;s consumer prices.\n 
    </div>\n<form class=\'region-selector-form\' action="#" method="GET">\n  
      <label for=\'filter-by-region\'>Filter by the Region: </label>\n 
      <select name="region_selector" class="region_selector" id='filter-by-region' aria-label='Use this to only show countries for a specific region'</select>\n    
        <option value="" data-region=\'rankorder\'>All</option>\n      
        <option value="Africa" data-region="africa">\n Africa\n </option>\n

So, what we need to do is look at the page as a whole and see if we can find a
pattern that will allow us to find the two items we are interested in. In newer
web pages, this can be a bit easier, as designers will use classes and more
descriptive attributes to set off parts of the web page. But we can still
accomplish the goal.

**DON'T FORGET TO CHANGE THIS BELOW**
In this case, if we look carefully, we see that the each table we want is
contained in a ``span``, and the span has the attribute ``class="category"``.

Now that we know the pattern we are looking for, the big question is how we go
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

First, let's import the module, and read the entire webpage as a string.

.. code:: python3

   from bs4 import BeautifulSoup
page = open('.../factbook/docs/rankorderguide.html').read()
page[:200]

.. parsed-literal::

   '<!DOCTYPE html>\n<!-- THIS TEMPLATE IS USED TO GENERATE THE AGENCY VERSION OF THE WFB SITE -->\n<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en">\n<![endif]--><!--[if IE 7]>\n<html cla'

Now, let's have BeautifulSoup take control.

.. code:: python3

   page = BeautifulSoup(page)
   print(page.prettify()[:1000])
    
.. parsed-literal::

   <!DOCTYPE html>
    <!-- THIS TEMPLATE IS USED TO GENERATE THE AGENCY VERSION OF THE WFB SITE -->
    <!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en">
    <![endif]-->
    <!--[if IE 7]>
    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
    <!--[if IE 8]>
    <html class="no-js lt-ie9" lang="en"> <![endif]-->
    <!--[if gt IE 8]>
    <!-->
    <html class="no-js" lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <!--<![endif]-->
    <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <meta charset="utf-8"/>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"/>
    <title>
    References :: Guide to Country Comparisons â€” The World Factbook - Central Intelligence Agency
    </title>
    <meta content="" name="description"/>
    <meta content="width=device-width" name="viewport"/>
    <meta content="FEB 1, 2018" name="LastModified"/>
    <link href="../stylesheets/smallscreen.css" rel="stylesheet" type="text/css"/>
    <!--[if lt IE 9]>
    <link href="../styl