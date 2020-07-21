.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Graphing Data on a Map
=======================

 
In this section, we will explore data visualization techniques that uses data to display information in a more abstract and helpful format so that the results of the data analysis are better understood.
For this exercise we will focus on graphing data on a map using Altair.


Let's take on the seemingly simple task of plotting some of the country data on
a map, like we did in Google Sheets earlier. We'll see that this is one area
where things are not quite as simple as they are in Sheets. But we can make it
work with a bit of effort.

Altair provides us with the facility to make a blank map. But filling in the
data requires a bit more work on our part.

This is a good example of learning by example, then extrapolating what you need
to do based on understanding the example.

The counties data that is passed to the chart is the data needed to
create and outline the map.


.. code:: python3

   import pandas as pd
   import altair as alt
   from vega_datasets import data
   counties = alt.topo_feature(data.us_10m.url, 'counties')
   unemp_data = data.unemployment.url


   alt.Chart(counties).mark_geoshape().project(
       type='albersUsa').properties(
       width=500,
       height=300
   )


.. image:: Figures/WorldFactbook_55_0.png


What about our encoding channels?! The primary data needed to draw the map using
a ``mark_geoshape`` was passed to the Chart, but that is really secondary data
for us. What we care about is graphing the unemployment data by county. That is
in a different data frame with a column called ``rate``.

With a geoshape, we can encode the county data using color. But, there is no
unemployment data in counties, so we have to use a ``transform_lookup`` to
**map** from the way counties are identified in the geo data to our DataFrame
that contains unemployment data.


.. code:: python3

   unemp_data = pd.read_csv('http://vega.github.io/vega-datasets/data/unemployment.tsv',sep='\t')
   unemp_data.head()


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
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>id</th>
          <th>rate</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>1001</td>
          <td>0.097</td>
        </tr>
        <tr>
          <th>1</th>
          <td>1003</td>
          <td>0.091</td>
        </tr>
        <tr>
          <th>2</th>
          <td>1005</td>
          <td>0.134</td>
        </tr>
        <tr>
          <th>3</th>
          <td>1007</td>
          <td>0.121</td>
        </tr>
        <tr>
          <th>4</th>
          <td>1009</td>
          <td>0.099</td>
        </tr>
      </tbody>
    </table>
    </div>


Using the ``transform_lookup`` method, we can arrange for the id in the
geographic data to be matched against the id in our ``unemp_data`` data frame.
This allows us to make use of two data frames in one graph. The example below is
a bit misleading, in that id is used both as the lookup, as well as the key in
the call to LookupData. The lookup value refers to the column name in the
DataFrame passed to Chart, where as the second parameter to the LookupData call
is the name of the column in the ``unemp_data`` DataFrame. It is just a
coincidence that they have the same name in this example.


.. code:: python3

   alt.Chart(counties).mark_geoshape(
   ).encode(
       color='rate:Q'
   ).transform_lookup(
       lookup='id',
       from_=alt.LookupData(unemp_data, 'id', ['rate'])
   ).project(
       type='albersUsa'
   ).properties(
       width=500,
       height=300,
       title='Unemployment by County'
   )


.. image:: Figures/WorldFactbook_59_0.png


Using a Web API to get Country Codes
------------------------------------

Now that you are familiar with graphing data on a map using Altair. We can
make use of the provided example above to create a graph of the world where
the countries are colored by one of the features in the `Starting a Business csv file <../_static/starting_a_business.csv>`_ data set.

The goal of this section is to learn how to use web API to gather data. In this
specific exercise we will use a web API to get data that maps country codes to 
country numbers. We will learn how to add columns to our Starting a Business data set
using the ``map`` function. This new column will contain country codes.

The goals for this exercies is to add a new column to our data set and then graph it on a map.
We can get the information for the new column from different sources. But this is a good chance
to learn how to get the information using web API. In order to get this information we will use a web API from a 
website. **API** stands for Application Programmer Interface. Each website will have its own
convention for how you ask it for data, and the format in which the data is
returned. Once we obtained the required data using web API, we can follow the example
in the beginning of this section to add the new column and then make a world map and show Starting_a_Business_score
from the Starting a Business data set.

First, lets familiarize ourselves with the `requests module <http://http://docs.python-requests.org>`_.
This tool is amazing because the request module is what allows us to communicate to databases across the web.
The request module documentation is really helpful, so we recommend you using it to learn about its features in detail. 
For now, we will give you the bare bones here to get you started. 


This website, ``restcountries.eu``, provides an interface where we can get data from their site
rather than a web page. It is really important that when you think of a web API, you understand how to ask
it for the data that you want. For our purposes, we are going to use ``/rest/v2/alpha/XXX``. Let's take a look
at what this means.  


* ``/rest``: Technically, REST stands for REpresentational State Transfer. This
  uses the HTTP protocol to ask for and respond with data.
* ``/v2``: This is version 2 of this website's protocol.
* ``/alpha``: This tells the website that the next thing we are going to pass
  tell it is the three-letter code for the country.
* ``XXX``: This can be any valid three-letter country code, for example "usa".


**NOTE** there are other ways to look up information, such as the countries numericCode, language, currency, and more. 
These other methods are in the website ``restcountries.eu``.

Now that we know the format, lets open a new tab in your browser and see the call in action. Paste the following 
URL in your web browser: `https://restcountries.eu/rest/v2/alpha/usa`. As you may have noticed, you do not get a 
web page in response. You get information that looks like a Python **dictionary**. We will come back to this later
on in this section, but we can do something similiar with a python program using the requests library. 

.. code:: python3

   import requests
   res = requests.get('https://restcountries.eu/rest/v2/alpha/usa')
   res.status_code


.. parsed-literal::

   200

The status code of 200 tells us that everything went fine. If you make a typo in
the URL, you may see the familiar status code of 404, meaning not found.

We can also look at the text that was returned.


.. code:: python3

   res.text


.. parsed-literal::

   '{"name":"United States of America","topLevelDomain":[".us"],"alpha2Code":"US","alpha3Code":"USA","callingCodes":["1"],"capital":"Washington, D.C.","altSpellings":["US","USA","United States of America"],"region":"Americas","subregion":"Northern America","population":323947000,"latlng":[38.0,-97.0],"demonym":"American","area":9629091.0,"gini":48.0,"timezones":["UTC-12:00","UTC-11:00","UTC-10:00","UTC-09:00","UTC-08:00","UTC-07:00","UTC-06:00","UTC-05:00","UTC-04:00","UTC+10:00","UTC+12:00"],"borders":["CAN","MEX"],"nativeName":"United States","numericCode":"840","currencies":[{"code":"USD","name":"United States dollar","symbol":"$"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"translations":{"de":"Vereinigte Staaten von Amerika","es":"Estados Unidos","fr":"États-Unis","ja":"アメリカ合衆国","it":"Stati Uniti D\'America","br":"Estados Unidos","pt":"Estados Unidos","nl":"Verenigde Staten","hr":"Sjedinjene Američke Države","fa":"ایالات متحده آمریکا"},"flag":"https://restcountries.eu/data/usa.svg","regionalBlocs":[{"acronym":"NAFTA","name":"North American Free Trade Agreement","otherAcronyms":[],"otherNames":["Tratado de Libre Comercio de América del Norte","Accord de Libre-échange Nord-Américain"]}],"cioc":"USA"}'


That looks like an ugly mess! Fortunately, it's not as bad as it seems. If you
look closely at the data, you will see that it starts with a ``{`` and ends with
a ``}``. In fact, you may realize this looks a lot like a Python dictionary! If
you thought that, you are correct. This is a big long string that represents a
Python dictionary. Better yet, we can convert this string into an actual Python
dictionary and then access the individual key-value pairs stored in the
dictionary using the usual Python syntax!

The official name for the format that we saw above is called **JSON**: JavaScript
Object Notation. It's a good acronym to know, but you don't have to know
anything about Javascript in order to make use of JSON.  You can think of the
results as a Python dictionary.  It can be a bit daunting at first as there can be
many keys and in fact JSON is often full of dictionaries of dictionaries of lists of dictionaries
but fear not, you can figure it out with a bit of experiementation.


.. code:: python3

   usa_info = res.json()
   usa_info


.. code:: javascript

   {'name': 'United States of America',
    'topLevelDomain': ['.us'],
    'alpha2Code': 'US',
    'alpha3Code': 'USA',
    'callingCodes': ['1'],
    'capital': 'Washington, D.C.',
    'altSpellings': ['US', 'USA', 'United States of America'],
    'region': 'Americas',
    'subregion': 'Northern America',
    'population': 323947000,
    'latlng': [38.0, -97.0],
    'demonym': 'American',
    'area': 9629091.0,
    'gini': 48.0,
    'timezones': ['UTC-12:00',
      'UTC-11:00',
      'UTC-10:00',
      'UTC-09:00',
      'UTC-08:00',
      'UTC-07:00',
      'UTC-06:00',
      'UTC-05:00',
      'UTC-04:00',
      'UTC+10:00',
      'UTC+12:00'],
    'borders': ['CAN', 'MEX'],
    'nativeName': 'United States',
    'numericCode': '840',
    'currencies': [{'code': 'USD',
      'name': 'United States dollar',
      'symbol': '$'}],
    'languages': [{'iso639_1': 'en',
      'iso639_2': 'eng',
      'name': 'English',
      'nativeName': 'English'}],
    'translations': {'de': 'Vereinigte Staaten von Amerika',
      'es': 'Estados Unidos',
      'fr': 'États-Unis',
      'ja': 'アメリカ合衆国',
      'it': "Stati Uniti D'America",
      'br': 'Estados Unidos',
      'pt': 'Estados Unidos',
      'nl': 'Verenigde Staten',
      'hr': 'Sjedinjene Američke Države',
      'fa': 'ایالات متحده آمریکا'},
    'flag': 'https://restcountries.eu/data/usa.svg',
    'regionalBlocs': [{'acronym': 'NAFTA',
      'name': 'North American Free Trade Agreement',
      'otherAcronyms': [],
      'otherNames': ['Tratado de Libre Comercio de América del Norte',
        'Accord de Libre-échange Nord-Américain']}],
    'cioc': 'USA'}

For example, timezones is a top level key, which produces a list of the valid timezones in the USA.

.. code:: python3

   usa_info['timezones']


.. parsed-literal::

   ['UTC-12:00',
    'UTC-11:00',
    'UTC-10:00',
    'UTC-09:00',
    'UTC-08:00',
    'UTC-07:00',
    'UTC-06:00',
    'UTC-05:00',
    'UTC-04:00',
    'UTC+10:00',
    'UTC+12:00']


But, languages is more complicated. It also returns a list but each element of the list corresponds
to one of the official languages of the country.  The USA has only one official language but other countries
have more.  For example, Malta has both Maltese and English as official languages.  Notice that the two dictionaries
have an identical structure, a key for the two letter abbreviation, a key for the three letter abbreviation, the name
and the native name.

.. parsed-literal::

    [{'iso639_1': 'mt',
      'iso639_2': 'mlt',
      'name': 'Maltese',
      'nativeName': 'Malti'},
    {'iso639_1': 'en',
      'iso639_2': 'eng',
      'name': 'English',
      'nativeName': 'English'}]


**Check Your Understanding**


.. fillintheblank:: ecuador_code_6
   :casei:

   What is the the three letter country codes of Ecuador? |blank|

   - :(ecu|'ecu'): Is the correct answer
     :x: Check your answer again


.. fillintheblank:: numeric_code_6
   :casei:

   Copy and paste the numericCode for the following countries: Colombia, Switzerland, and Spain. 
   Do not include the square brackets. |blank|, |blank|, |blank|

   - :170: Correct
     :x: Incorrect. Try again
   - :756: Correct
     :x: Incorrect. Try again
   - :724: Correct
     :x: Incorrect. Try again.


.. fillintheblank:: peru_6
   :casei:

   How many keys are in the dictionary returned for the country of Peru? |blank|

   - :24: Is the correct answer
     :x: Use the keys method after .json() to see the list of keys


For this example, we will use the Starting a Business data set and look at the Starting_a_Business_score in different countries around the world.

.. code:: python3
   
   wd = pd.read_csv('Starting_a_Business.csv')

.. code:: python3

   wd.head()

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
    <thead><tr><th title="Field #1"></th>
    <th title="Field #2">Location</th>
    <th title="Field #3">Code</th>
    <th title="Field #4">Starting_a_Business_rank</th>
    <th title="Field #5">Starting_a_Business_score</th>
    <th title="Field #6">Procedure</th>
    <th title="Field #7">Time</th>
    <th title="Field #8">Cost</th>
    <th title="Field #9">Procedure.1</th>
    <th title="Field #10">Time.1</th>
    <th title="Field #11">Cost.1</th>
    <th title="Field #12">Paid_in_min</th>
    <th title="Field #13">Income_Level</th>
    <th title="Field #14">GNI</th>
    </tr></thead>
    <tbody><tr>
    <td align="right">0 </td>
    <td>Afghanistan </td>
    <td>AFG </td>
    <td align="right">33 </td>
    <td align="right">92.0 </td>
    <td align="right">4 </td>
    <td align="right">8.0 </td>
    <td align="right">6.8 </td>
    <td align="right">5 </td>
    <td align="right">9.0 </td>
    <td align="right">6.8 </td>
    <td align="right">0.0 </td>
    <td>Low income </td>
    <td align="right">550</td>
    </tr>
    <tr>
    <td align="right">1 </td>
    <td>Albania </td>
    <td>ALB </td>
    <td align="right">34 </td>
    <td align="right">91.8 </td>
    <td align="right">5 </td>
    <td align="right">4.5 </td>
    <td align="right">10.8 </td>
    <td align="right">5 </td>
    <td align="right">4.5 </td>
    <td align="right">10.8 </td>
    <td align="right">0.0 </td>
    <td>Upper middle income </td>
    <td align="right">4860</td>
    </tr>
    <tr>
    <td align="right">2 </td>
    <td>Algeria </td>
    <td>DZA </td>
    <td align="right">98 </td>
    <td align="right">78.0 </td>
    <td align="right">12 </td>
    <td align="right">18.0 </td>
    <td align="right">11.3 </td>
    <td align="right">12 </td>
    <td align="right">18.0 </td>
    <td align="right">11.3 </td>
    <td align="right">0.0 </td>
    <td>Upper middle income </td>
    <td align="right">4060</td>
    </tr>
    <tr>
    <td align="right">3 </td>
    <td>Angola </td>
    <td>AGO </td>
    <td align="right">93 </td>
    <td align="right">79.4 </td>
    <td align="right">8 </td>
    <td align="right">36.0 </td>
    <td align="right">11.1 </td>
    <td align="right">8 </td>
    <td align="right">36.0 </td>
    <td align="right">11.1 </td>
    <td align="right">0.0 </td>
    <td>Lower middle income </td>
    <td align="right">3370</td>
    </tr>
    <tr>
    <td align="right">4 </td>
    <td>Argentina </td>
    <td>ARG </td>
    <td align="right">89 </td>
    <td align="right">80.4 </td>
    <td align="right">12 </td>
    <td align="right">11.5 </td>
    <td align="right">5.0 </td>
    <td align="right">12 </td>
    <td align="right">11.5 </td>
    <td align="right">5.0 </td>
    <td align="right">0.0 </td>
    <td>Upper middle income </td>
    <td align="right">12370</td>
    </tr>
    </tbody></table>
    </div>




Now that we have a really nice way to get the additional country information,
let's add the numeric country code as a new column in our ``wd`` DataFrame. We
can think of adding the column as a transformation of our three-letter country
code to a number. We can do this using the ``map`` function. You learned about
``map`` in the Python Review section of this book. If you need to refresh your
memory, see here :ref:`PythonReview`.

When we use Pandas, the difference is that we don't pass the list as a parameter
to ``map``. ``map`` is a method of a Series, so we use the syntax
``df.myColumn.map(function)``. This applies the function we pass as a parameter
to each element of the series and constructs a brand new series.


For our case, we need to write a function that takes a three-letter country code as a parameter and returns the numeric code we lookup converted to an integer, let’s call it get_num_code. You have all the details you need to write this function. Once you write this function, you can use the code below.




.. code:: python3

  wd['CodeNum'] = wd.Code.map(get_num_code)
  wd.head()

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
    <thead><tr><th title="Field #1"></th>
    <th title="Field #2">Location</th>
    <th title="Field #3">Code</th>
    <th title="Field #4">Starting_a_Business_rank</th>
    <th title="Field #5">Starting_a_Business_score</th>
    <th title="Field #6">Procedure</th>
    <th title="Field #7">Time</th>
    <th title="Field #8">Cost</th>
    <th title="Field #9">Procedure.1</th>
    <th title="Field #10">Time.1</th>
    <th title="Field #11">Cost.1</th>
    <th title="Field #12">Paid_in_min</th>
    <th title="Field #13">Income_Level</th>
    <th title="Field #14">GNI</th>
    <th title="Field #15">CodeNum</th>
    </tr></thead>
    <tbody><tr>
    <td align="right">0 </td>
    <td>Afghanistan </td>
    <td>AFG </td>
    <td align="right">33 </td>
    <td align="right">92.0 </td>
    <td align="right">4 </td>
    <td align="right">8.0 </td>
    <td align="right">6.8 </td>
    <td align="right">5 </td>
    <td align="right">9.0 </td>
    <td align="right">6.8 </td>
    <td align="right">0.0 </td>
    <td>Low income </td>
    <td align="right">550 </td>
    <td align="right">004</td>
    </tr>
    <tr>
    <td align="right">1 </td>
    <td>Albania </td>
    <td>ALB </td>
    <td align="right">34 </td>
    <td align="right">91.8 </td>
    <td align="right">5 </td>
    <td align="right">4.5 </td>
    <td align="right">10.8 </td>
    <td align="right">5 </td>
    <td align="right">4.5 </td>
    <td align="right">10.8 </td>
    <td align="right">0.0 </td>
    <td>Upper middle income </td>
    <td align="right">4860 </td>
    <td align="right">008</td>
    </tr>
    <tr>
    <td align="right">2 </td>
    <td>Algeria </td>
    <td>DZA </td>
    <td align="right">98 </td>
    <td align="right">78.0 </td>
    <td align="right">12 </td>
    <td align="right">18.0 </td>
    <td align="right">11.3 </td>
    <td align="right">12 </td>
    <td align="right">18.0 </td>
    <td align="right">11.3 </td>
    <td align="right">0.0 </td>
    <td>Upper middle income </td>
    <td align="right">4060 </td>
    <td align="right">012</td>
    </tr>
    <tr>
    <td align="right">3 </td>
    <td>Angola </td>
    <td>AGO </td>
    <td align="right">93 </td>
    <td align="right">79.4 </td>
    <td align="right">8 </td>
    <td align="right">36.0 </td>
    <td align="right">11.1 </td>
    <td align="right">8 </td>
    <td align="right">36.0 </td>
    <td align="right">11.1 </td>
    <td align="right">0.0 </td>
    <td>Lower middle income </td>
    <td align="right">3370 </td>
    <td align="right">024</td>
    </tr>
    <tr>
    <td align="right">4 </td>
    <td>Argentina </td>
    <td>ARG </td>
    <td align="right">89 </td>
    <td align="right">80.4 </td>
    <td align="right">12 </td>
    <td align="right">11.5 </td>
    <td align="right">5.0 </td>
    <td align="right">12 </td>
    <td align="right">11.5 </td>
    <td align="right">5.0 </td>
    <td align="right">0.0 </td>
    <td>Upper middle income </td>
    <td align="right">12370 </td>
    <td align="right">032</td>
    </tr>
    </tbody></table>
    </div>
    



.. warning:: DataFrame Gotcha

   Be careful, ``wd.CodeNum`` and ``wd['CodeNum']`` are ALMOST always
   interchangeable, except for when you create a new column. When you create a
   new column you MUST use ``wd['CodeNum'] = blah new column expression``. If
   you write ``wd.CodeNum = blah new column expression``, it will add a
   ``CodeNum`` attribute to the ``wd`` object, rather than creating a new
   column. This is consistent with standard Python syntax of allowing you to add
   an attribute on the fly to any object.

You can make a gray map of the world like this.


.. code:: python3

 countries = alt.topo_feature(data.world_110m.url, 'countries')

   alt.Chart(countries).mark_geoshape(
       fill='#666666',
       stroke='white'
   ).properties(
       width=750,
       height=450
   ).project('equirectangular')

So, now you have the information you need to use the example of the counties
above and apply that to the world below.

.. code:: python3

   base = alt.Chart(countries).mark_geoshape(
   ).encode(tooltip='Country:N',
            color=alt.Color('Starting_a_business score:Q', scale=alt.Scale(scheme="plasma"))
   ).transform_lookup( # your code here

   ).properties(
       width=750,
       height=450
   ).project('equirectangular')

   base



.. image:: Figures/WorldFactbook_74_0.png


Your final result should look like this.


.. image:: Figures/Visualization_7.png


.. reveal:: sol_business_score_map
    :instructoronly:

    This assumes that you have used the web api to add the CodeNum column to your wd dataframe.
    One key thing to point out is that the CodeNum field in wd and the id field in countries must
    match, if you have covered merging of dataframes or even vlookup this should make sense to
    the students.
    
    # This is the function, get_num_code, that converts the three letter code of each country and gets its numericCode.

    .. code:: python3
      def get_num_code(code):
        res = requests.get('https://restcountries.eu/rest/v2/alpha/' + code) # gets all the information of the country using their three letter code
        country_info = res.json() # formats all the information
        return country_info['numericCode'] # returns the correct numericCode of the country
      
    The following is the implementation of transform_lookup() in the Starting_a_Business_score data.
    
    .. code:: python3
       countries = alt.topo_feature(data.world_110m.url, 'countries')
      base = alt.Chart(countries).mark_geoshape(
      ).encode(#color='Infant mortality:Q',
              tooltip='Country:N',
              color=alt.Color('Starting_a_Business_score:Q', scale=alt.Scale(scheme="plasma")),
      ).properties(
          width=750,
          height=450
      ).project('equirectangular').transform_lookup(
              lookup='id',
              from_=alt.LookupData(wd, 'CodeNum', ['Starting_a_Business_score']))

      base


Using a Web API on Your Own
---------------------------

Find a web API that provides some numeric data that interests you. There are tons
of data available in the world of finance, sports, environment, travel, etc. A
great place to look is 
`The Programmable Web <https://www.programmableweb.com>`_. Yes, this assignment
is a bit vague and open-ended, but that is part of the excitement. You get to
find an API and graph some data that appeals to you, not something some author
or professor picked out. You might even feel like you have awesome superpowers
by the time you finish this project.

1. Use the web API to obtain the data. Most sites are going to provide it in
   JSON format similar to what we saw.

2. Next, create a graph of your data using Altair.

3. Take some time to talk about and present the data and the graph you created
   to the class.
   

**Lesson Feedback**

.. poll:: LearningZone_measure_6_3
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_measure_6_3
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_measure_6_3
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_measure_6_3
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...



