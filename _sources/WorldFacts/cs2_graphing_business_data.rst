.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Case Study 2: Graphing Business Data on a Map
===============================================
 
In this section, we will explore visualization techniques that use data to display information in a more abstract and helpful format so that the data analysis results are better understood.
For this case study, we will focus on graphing business data on a map using Altair.

Getting Country Codes from a Web API
------------------------------------

Now that you are familiar with graphing data on a map using Altair from the previous case study. We can
make use of the provided example in the previous case study to create a graph of the world where
the countries are colored by one of the features in the `starting a business <../_static/starting_a_business.csv>`_ data set.

In this specific exercise, we will use a web API to get data that maps country codes to country numbers.
We will use the ``map`` function to add columns to our starting a business data. This new column will contain country codes.

We can get the information for the new column from different sources. To get this information, we will use a web API from a 
website. Each website has its specific API format and a protocol to obtain that API. Once we obtained the required data using the web API, we can follow the example
from the previous case study to add the new column and then make a world map to show Starting_a_Business_score column
from the starting a business data set.

We will use the `requests module <http://http://docs.python-requests.org>`_ as it is a great tool that allows us to communicate with databases 
across the web. We will also use the ``restcountries.eu``, as it provides us an interface where we can get data from their site rather
than a web page. If you recall, there is a way to ask for the data that you want. We will use ``/rest/v2/alpha/XXX``.

* ``/rest``: Technically, REST stands for REpresentational State Transfer. This uses the HTTP protocol to ask for and respond with data.
* ``/v2``: This is version 2 of this website's protocol.
* ``/alpha``: This tells the website that the next thing we are going to pass is the country's three-letter code.
* ``XXX``: This can be any valid three-letter country code, for example, "usa".

**NOTE** there are other ways to look up information, such as the countries' numericCode, language, currency, and more. 
These other methods are in the website ``restcountries.eu``.

Open a new tab in your browser and see the call in action. Paste the following 
URL in your web browser: `https://restcountries.eu/rest/v2/alpha/usa` and make a request. 
Let's also check if our request was processed correctly with ``status_code``. A status code of 200 means everything went fine.

.. code:: python3

   import requests
   res = requests.get('https://restcountries.eu/rest/v2/alpha/usa')
   res.status_code



.. parsed-literal::

   200


We can also look at the text that was returned.

.. code:: python3

   res.text


.. parsed-literal::

   '{"name":"United States of America","topLevelDomain":[".us"],"alpha2Code":"US","alpha3Code":"USA","callingCodes":["1"],"capital":"Washington, D.C.","altSpellings":["US","USA","United States of America"],"region":"Americas","subregion":"Northern America","population":323947000,"latlng":[38.0,-97.0],"demonym":"American","area":9629091.0,"gini":48.0,"timezones":["UTC-12:00","UTC-11:00","UTC-10:00","UTC-09:00","UTC-08:00","UTC-07:00","UTC-06:00","UTC-05:00","UTC-04:00","UTC+10:00","UTC+12:00"],"borders":["CAN","MEX"],"nativeName":"United States","numericCode":"840","currencies":[{"code":"USD","name":"United States dollar","symbol":"$"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"translations":{"de":"Vereinigte Staaten von Amerika","es":"Estados Unidos","fr":"États-Unis","ja":"アメリカ合衆国","it":"Stati Uniti D\'America","br":"Estados Unidos","pt":"Estados Unidos","nl":"Verenigde Staten","hr":"Sjedinjene Američke Države","fa":"ایالات متحده آمریکا"},"flag":"https://restcountries.eu/data/usa.svg","regionalBlocs":[{"acronym":"NAFTA","name":"North American Free Trade Agreement","otherAcronyms":[],"otherNames":["Tratado de Libre Comercio de América del Norte","Accord de Libre-échange Nord-Américain"]}],"cioc":"USA"}'

If you recall, this long string resembles a Python dictionary. We can convert this string into an actual Python
dictionary and then access the individual key-value pairs stored in the dictionary using the usual Python syntax.
The official name for the format that we saw above is called **JSON**. As you recall, JSON is full of dictionaries 
of dictionaries of lists of dictionaries.


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


**Check Your Understanding**


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


For this example, we will use the starting a business data set and look at the Starting_a_Business_score column in different countries around the world.

.. code:: python3
   
   wd = pd.read_csv('starting_a_business.csv')

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

Since we know how to get additional country information, we can add a new column that contains the numeric code 
of each country. We can add this new column in our ``wd`` data frame. We can do this by using the ``map`` function, which we learned in 
the previous case study. If you need to refresh your memory, see here :ref:`PythonReview`.

Use ``df.myColumn.map(function)`` to ``map`` the data. Remember, we don't pass the
list as a parameter to ``map`` since it is a method of a Series.


You have already gone through the process of getting a three-letter country code for the previous case study. We will
use the same function to add the country code to the protecting minority investors data set. We can use the code below to proceed.


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
      
    The following is the implementation of transform_lookup() in the Starting_a_Business_score column.
    
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


**Lesson Feedback**

.. poll:: LearningZone_measure_6_2_cs2
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_measure_6_2_cs2
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_measure_6_2_cs2
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_measure_6_2_cs2
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...