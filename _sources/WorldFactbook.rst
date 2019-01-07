
Using Jupyter Lab for data exploration
======================================

.. code:: ipython3

    %matplotlib inline
    
    import pandas as pd
    import matplotlib
    import matplotlib.pyplot as plt
    import psycopg2
    import textatistic
    import seaborn as sbn
    from altair import Chart, X, Y, Color, Scale
    import altair as alt
    from vega_datasets import data
    import requests
    from bs4 import BeautifulSoup
    matplotlib.style.use('ggplot')
    # for plotly py.offline.init_notebook_mode()

Reading List
------------

-  `One Dataset Visualized 25 Different
   Ways <https://flowingdata.com/2017/01/24/one-dataset-visualized-25-ways/>`__
   This is a great article to help you think about visualization
-  `Getting Started with
   Altair <https://altair-viz.github.io/getting_started/starting.html>`__
   Read the overview and then move to the `User
   Guide <https://altair-viz.github.io/user_guide/data.html>`__ Read
   this through data transformations.
-  `A Comprehensive Guide to the Grammar of
   Graphics <https://towardsdatascience.com/a-comprehensive-guide-to-the-grammar-of-graphics-for-effective-visualization-of-multi-dimensional-1f92b4ed4149>`__
-  `Introduction to Pandas Part
   I <http://www.gregreda.com/2013/10/26/intro-to-pandas-data-structures/>`__
-  `Screen Scraping
   101 <https://hackernoon.com/web-scraping-tutorial-with-python-tips-and-tricks-db070e70e071>`__
-  `Web Scraping Weather
   Forecasts <https://www.dataquest.io/blog/web-scraping-tutorial-python/>`__
-  `Beautiful Soup
   docs <https://www.crummy.com/software/BeautifulSoup/bs4/doc/>`__

As a warmup exercise and maybe to stimulate some questions for
investigation take the `Gapminder
quiz <http://forms.gapminder.org/s3/test-2018>`__

Let’s start by loading some data about countries. This data has been
compiled by combining information from files at:
http://gsociology.icaap.org/dataupload.html we are going to use it to
warm up our pandas skills. In this first part of the module we will
continue with some data that should be familair to you but we will use
it in Pandas instead of a spreadsheet. In the second part we will focus
on several different kinds of textual analysis using data from the
United Nations.

The goals for Part I of the module are:

-  Loading data into pandas
-  Using Altair to make some quick visualization of the data
-  Querying (filtering) our data
-  Sorting data
-  Adding new columns of data

Exploratory Questions to get started
------------------------------------

-  What are the minimum and maximum values of the data in each column?
-  How does the birth rate compare across countries? What is the
   distribution of the birth rates?
-  Is there are connection between the area of a country and its
   population?
-  How can we find all of the details on a specific country?

Loading data into a dataframe from a CSV file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The csv file is one of the most common ways to find data. CSV stands for
comma separated values and allows us to share data files in a simple
text format. The data we will use to get started with Pandas is the data
about countries we used in the spreadsheet module. You can open a CSV
file in any text editor, but its not particularly easy to read. But
because of its structure it is easy to parse. The first few lines of the
raw csv file for this project look like this:

::

   Country,Ctry,Code,CodeNum,Region,Population,Area,Pop. Density,Coastline,Net migration,Infant mortality,GDP,Literacy,Phones,Arable,Crops,Other,Climate,Birthrate,Deathrate,Agriculture,Industry,Service
   Afghanistan,Afghanistan,AFG,4,ASIA (EX. NEAR EAST)         ,31056997,647500,48.0,0.00,23.06,163.07,700,36.0,3.2,12.13,0.22,87.65,1,46.6,20.34,0.38,0.24,0.38
   Albania ,Albania,ALB,8,EASTERN EUROPE                     ,3581655,28748,124.6,1.26,-4.93,21.52,4500,86.5,71.2,21.09,4.42,74.49,3,15.11,5.22,0.232,0.188,0.579
   Algeria ,Algeria,DZA,12,NORTHERN AFRICA                    ,32930091,2381740,13.8,0.04,-0.39,31,6000,70.0,78.1,3.22,0.25,96.53,1,17.14,4.61,0.101,0.6,0.298

You may have some experience with reading and parsing CSV files on your
own with Python. If not you may wish to `have a quick
review <https://runestone.academy/runestone/static/fopp/Files/ReadingCSVFiles.html>`__

Meanwhile, we will make use of one of the many data reading functions
pandas provides for us ``read_csv``

.. code:: ipython3

    wd = pd.read_csv('world_countries.csv')

.. code:: ipython3

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
          <th>Ct</th>
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
          <td>4</td>
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
          <td>8</td>
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
          <td>12</td>
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
          <td>16</td>
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
          <td>20</td>
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



Understanding the Data
~~~~~~~~~~~~~~~~~~~~~~

-  Country
-  Area Square Miles
-  Population Density per square mile
-  Coastline coast/area ratio
-  Net migration
-  Infant mortaility per 1000 births
-  GDP $ per capita
-  Literacy %
-  Phones per 1000
-  Arable land %
-  Crops %
-  other %
-  Climate
-  Birthrate
-  Deathrate
-  Agriculture % GDP
-  Inustry % GDP
-  Service % GDP

The Climate numbers are as follows: 1. Dry tropical or tundra and ice,
classification B and E. 2. Wet tropical, classification A. 3. Temperate
humid subtropical and temperate continental, classification Cfa, Cwa,
and D. 4. Dry hot summers and wet winters,

.. code:: ipython3

    wd.to_csv('countries_of_the_world.csv', columns='Country',
     'Code',
     'Region',
     'Population',
     'Area',
     'Pop. Density',
     'Coastline',
     'Net migration',
     'Infant mortality',
     'GDP',
     'Literacy',
     'Phones',
     'Arable',
     'Crops',
     'Other',
     'Climate',
     'Birthrate',
     'Deathrate',
     'Agriculture',
     'Industry',
     'Service'])

.. code:: ipython3

    wd.describe()




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
          <th>CodeNum</th>
          <th>Population</th>
          <th>Area</th>
          <th>Pop. Density</th>
          <th>Coastline</th>
          <th>Net migration</th>
          <th>Infant mortality</th>
          <th>GDP</th>
          <th>Literacy</th>
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
          <th>count</th>
          <td>225.000000</td>
          <td>2.250000e+02</td>
          <td>2.250000e+02</td>
          <td>225.000000</td>
          <td>225.000000</td>
          <td>222.000000</td>
          <td>222.000000</td>
          <td>224.000000</td>
          <td>209.000000</td>
          <td>221.000000</td>
          <td>223.000000</td>
          <td>223.000000</td>
          <td>223.000000</td>
          <td>203.000000</td>
          <td>222.000000</td>
          <td>221.000000</td>
          <td>210.000000</td>
          <td>209.000000</td>
          <td>210.000000</td>
        </tr>
        <tr>
          <th>mean</th>
          <td>436.213333</td>
          <td>2.897847e+07</td>
          <td>6.035169e+05</td>
          <td>362.911111</td>
          <td>21.304089</td>
          <td>0.017838</td>
          <td>35.635180</td>
          <td>9770.089286</td>
          <td>82.838278</td>
          <td>236.435294</td>
          <td>13.715247</td>
          <td>4.425695</td>
          <td>81.858700</td>
          <td>2.130542</td>
          <td>21.993604</td>
          <td>9.290045</td>
          <td>0.151710</td>
          <td>0.282722</td>
          <td>0.564395</td>
        </tr>
        <tr>
          <th>std</th>
          <td>254.713527</td>
          <td>1.183891e+08</td>
          <td>1.797370e+06</td>
          <td>1650.160243</td>
          <td>72.591840</td>
          <td>4.906187</td>
          <td>35.523302</td>
          <td>10057.808157</td>
          <td>19.722173</td>
          <td>228.942889</td>
          <td>13.057554</td>
          <td>8.268356</td>
          <td>16.029195</td>
          <td>0.697558</td>
          <td>11.147278</td>
          <td>4.986086</td>
          <td>0.147199</td>
          <td>0.138935</td>
          <td>0.166357</td>
        </tr>
        <tr>
          <th>min</th>
          <td>4.000000</td>
          <td>7.026000e+03</td>
          <td>2.000000e+00</td>
          <td>0.000000</td>
          <td>0.000000</td>
          <td>-20.990000</td>
          <td>2.290000</td>
          <td>500.000000</td>
          <td>17.600000</td>
          <td>0.200000</td>
          <td>0.000000</td>
          <td>0.000000</td>
          <td>33.330000</td>
          <td>1.000000</td>
          <td>7.290000</td>
          <td>2.290000</td>
          <td>0.000000</td>
          <td>0.020000</td>
          <td>0.062000</td>
        </tr>
        <tr>
          <th>25%</th>
          <td>214.000000</td>
          <td>4.361310e+05</td>
          <td>5.128000e+03</td>
          <td>29.000000</td>
          <td>0.100000</td>
          <td>-0.962500</td>
          <td>8.070000</td>
          <td>1900.000000</td>
          <td>70.600000</td>
          <td>37.200000</td>
          <td>3.160000</td>
          <td>0.190000</td>
          <td>72.825000</td>
          <td>2.000000</td>
          <td>12.597500</td>
          <td>5.980000</td>
          <td>0.038000</td>
          <td>0.190000</td>
          <td>0.427750</td>
        </tr>
        <tr>
          <th>50%</th>
          <td>434.000000</td>
          <td>5.042920e+06</td>
          <td>8.836100e+04</td>
          <td>77.400000</td>
          <td>0.730000</td>
          <td>0.000000</td>
          <td>21.000000</td>
          <td>5700.000000</td>
          <td>92.500000</td>
          <td>176.200000</td>
          <td>10.380000</td>
          <td>1.010000</td>
          <td>86.070000</td>
          <td>2.000000</td>
          <td>18.750000</td>
          <td>8.100000</td>
          <td>0.099500</td>
          <td>0.270000</td>
          <td>0.566500</td>
        </tr>
        <tr>
          <th>75%</th>
          <td>654.000000</td>
          <td>1.765484e+07</td>
          <td>4.465500e+05</td>
          <td>183.500000</td>
          <td>10.320000</td>
          <td>0.965000</td>
          <td>56.095000</td>
          <td>15775.000000</td>
          <td>98.000000</td>
          <td>394.400000</td>
          <td>20.000000</td>
          <td>4.425000</td>
          <td>95.470000</td>
          <td>3.000000</td>
          <td>29.645000</td>
          <td>10.620000</td>
          <td>0.223000</td>
          <td>0.342000</td>
          <td>0.677500</td>
        </tr>
        <tr>
          <th>max</th>
          <td>894.000000</td>
          <td>1.313974e+09</td>
          <td>1.707520e+07</td>
          <td>16271.500000</td>
          <td>870.660000</td>
          <td>23.060000</td>
          <td>191.190000</td>
          <td>55100.000000</td>
          <td>100.000000</td>
          <td>1035.600000</td>
          <td>62.110000</td>
          <td>50.680000</td>
          <td>100.000000</td>
          <td>4.000000</td>
          <td>50.730000</td>
          <td>29.740000</td>
          <td>0.769000</td>
          <td>0.906000</td>
          <td>0.954000</td>
        </tr>
      </tbody>
    </table>
    </div>



.. code:: ipython3

    c = Chart(wd) # make a chart
    m = c.mark_bar() # set the mark -- returns a new Chart
    e = m.encode(X('Birthrate',bin=True),y='count()') # set the encoding 
    e.display()



.. image:: WorldFactbook_files/WorldFactbook_15_0.png


We can shortcut a lot of what we did above into a single line because
once we have created a mark there is really nothing more to do with it
besides add the encoding. Because the methods are all cleverly designed
to return the proper object we can string all of the calls above into a
single line. We also do not need to explicitly call display because
Altair returns an object that the Jupyter environment knows how to
display.

.. code:: ipython3

    Chart(wd).mark_bar().encode(x=X('Birthrate', bin=True), y='count()')




.. image:: WorldFactbook_files/WorldFactbook_17_0.png



Practice
~~~~~~~~

-  Create some histograms to investigate the distributions of some other
   variables of the data set



Now lets make a simple scatter plot of area versus population of the
countries.

.. code:: ipython3

    Chart(wd).mark_point().encode(x='Population', y='Area', tooltip='Country').interactive()




.. image:: WorldFactbook_files/WorldFactbook_22_0.png




Thats not a very satisfying graph. But it does make us want to focus
more on the lower left corner. Let’s redo the graph but focus on the
countrieswith a population under 150 million and an area under 4
million. Lets start with the first part

To do this we will create a new DataFrame where we focus on the
countries with populations less than 150 million and areas less than 4
million. Pandas makes this really easy with its querying power.

The statement below produces a Series of boolean values. These boolean
values are used to index the data frame and only the rows corresponding
to True values are returned in the result.

.. code:: ipython3

    (wd.Population < 150000000).head(20)




.. parsed-literal::

    0     True
    1     True
    2     True
    3     True
    4     True
    5     True
    6     True
    7     True
    8     True
    9     True
    10    True
    11    True
    12    True
    13    True
    14    True
    15    True
    16    True
    17    True
    18    True
    19    True
    Name: Population, dtype: bool



To be a bit more dramatic lets look at the countries of less than
150,000

.. code:: ipython3

    wd[wd.Population < 150000]




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
          <th>Ct</th>
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
          <th>3</th>
          <td>American Samoa</td>
          <td>American Samoa</td>
          <td>ASM</td>
          <td>16</td>
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
          <td>20</td>
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
        <tr>
          <th>6</th>
          <td>Anguilla</td>
          <td>Anguilla</td>
          <td>AIA</td>
          <td>660</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>13477</td>
          <td>102</td>
          <td>132.1</td>
          <td>59.80</td>
          <td>10.76</td>
          <td>...</td>
          <td>460.0</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>2.0</td>
          <td>14.17</td>
          <td>5.34</td>
          <td>0.040</td>
          <td>0.180</td>
          <td>0.780</td>
        </tr>
        <tr>
          <th>7</th>
          <td>Antigua &amp; Barbuda</td>
          <td>Antigua &amp; Barbuda</td>
          <td>ATA</td>
          <td>10</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>69108</td>
          <td>443</td>
          <td>156.0</td>
          <td>34.54</td>
          <td>-6.15</td>
          <td>...</td>
          <td>549.9</td>
          <td>18.18</td>
          <td>4.55</td>
          <td>77.27</td>
          <td>2.0</td>
          <td>16.93</td>
          <td>5.37</td>
          <td>0.038</td>
          <td>0.220</td>
          <td>0.743</td>
        </tr>
        <tr>
          <th>10</th>
          <td>Aruba</td>
          <td>Aruba</td>
          <td>ABW</td>
          <td>533</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>71891</td>
          <td>193</td>
          <td>372.5</td>
          <td>35.49</td>
          <td>0.00</td>
          <td>...</td>
          <td>516.1</td>
          <td>10.53</td>
          <td>0.00</td>
          <td>89.47</td>
          <td>2.0</td>
          <td>11.03</td>
          <td>6.68</td>
          <td>0.004</td>
          <td>0.333</td>
          <td>0.663</td>
        </tr>
        <tr>
          <th>22</th>
          <td>Bermuda</td>
          <td>Bermuda</td>
          <td>BMU</td>
          <td>60</td>
          <td>NORTHERN AMERICA</td>
          <td>65773</td>
          <td>53</td>
          <td>1241.0</td>
          <td>194.34</td>
          <td>2.49</td>
          <td>...</td>
          <td>851.4</td>
          <td>20.00</td>
          <td>0.00</td>
          <td>80.00</td>
          <td>2.0</td>
          <td>11.40</td>
          <td>7.74</td>
          <td>0.010</td>
          <td>0.100</td>
          <td>0.890</td>
        </tr>
        <tr>
          <th>28</th>
          <td>British Virgin Is.</td>
          <td>British Virgin Is.</td>
          <td>IOT</td>
          <td>86</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>23098</td>
          <td>153</td>
          <td>151.0</td>
          <td>52.29</td>
          <td>10.01</td>
          <td>...</td>
          <td>506.5</td>
          <td>20.00</td>
          <td>6.67</td>
          <td>73.33</td>
          <td>2.0</td>
          <td>14.89</td>
          <td>4.42</td>
          <td>0.018</td>
          <td>0.062</td>
          <td>0.920</td>
        </tr>
        <tr>
          <th>38</th>
          <td>Cayman Islands</td>
          <td>Cayman Islands</td>
          <td>CYM</td>
          <td>136</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>45436</td>
          <td>262</td>
          <td>173.4</td>
          <td>61.07</td>
          <td>18.75</td>
          <td>...</td>
          <td>836.3</td>
          <td>3.85</td>
          <td>0.00</td>
          <td>96.15</td>
          <td>2.0</td>
          <td>12.74</td>
          <td>4.89</td>
          <td>0.014</td>
          <td>0.032</td>
          <td>0.954</td>
        </tr>
        <tr>
          <th>47</th>
          <td>Cook Islands</td>
          <td>Cook Islands</td>
          <td>COK</td>
          <td>184</td>
          <td>OCEANIA</td>
          <td>21388</td>
          <td>240</td>
          <td>89.1</td>
          <td>50.00</td>
          <td>NaN</td>
          <td>...</td>
          <td>289.9</td>
          <td>17.39</td>
          <td>13.04</td>
          <td>69.57</td>
          <td>2.0</td>
          <td>21.00</td>
          <td>NaN</td>
          <td>0.151</td>
          <td>0.096</td>
          <td>0.753</td>
        </tr>
        <tr>
          <th>56</th>
          <td>Dominica</td>
          <td>Dominica</td>
          <td>DMA</td>
          <td>212</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>68910</td>
          <td>754</td>
          <td>91.4</td>
          <td>19.63</td>
          <td>-13.87</td>
          <td>...</td>
          <td>304.8</td>
          <td>6.67</td>
          <td>20.00</td>
          <td>73.33</td>
          <td>2.0</td>
          <td>15.27</td>
          <td>6.73</td>
          <td>0.177</td>
          <td>0.328</td>
          <td>0.495</td>
        </tr>
        <tr>
          <th>66</th>
          <td>Faroe Islands</td>
          <td>Faroe Islands</td>
          <td>FRO</td>
          <td>234</td>
          <td>WESTERN EUROPE</td>
          <td>47246</td>
          <td>1399</td>
          <td>33.8</td>
          <td>79.84</td>
          <td>1.41</td>
          <td>...</td>
          <td>503.8</td>
          <td>2.14</td>
          <td>0.00</td>
          <td>97.86</td>
          <td>NaN</td>
          <td>14.05</td>
          <td>8.70</td>
          <td>0.270</td>
          <td>0.110</td>
          <td>0.620</td>
        </tr>
        <tr>
          <th>77</th>
          <td>Gibraltar</td>
          <td>Gibraltar</td>
          <td>GIB</td>
          <td>292</td>
          <td>WESTERN EUROPE</td>
          <td>27928</td>
          <td>7</td>
          <td>3989.7</td>
          <td>171.43</td>
          <td>0.00</td>
          <td>...</td>
          <td>877.7</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>NaN</td>
          <td>10.74</td>
          <td>9.31</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>79</th>
          <td>Greenland</td>
          <td>Greenland</td>
          <td>GRL</td>
          <td>304</td>
          <td>NORTHERN AMERICA</td>
          <td>56361</td>
          <td>2166086</td>
          <td>0.0</td>
          <td>2.04</td>
          <td>-8.37</td>
          <td>...</td>
          <td>448.9</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>1.0</td>
          <td>15.93</td>
          <td>7.84</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>80</th>
          <td>Grenada</td>
          <td>Grenada</td>
          <td>GRD</td>
          <td>308</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>89703</td>
          <td>344</td>
          <td>260.8</td>
          <td>35.17</td>
          <td>-13.92</td>
          <td>...</td>
          <td>364.5</td>
          <td>5.88</td>
          <td>29.41</td>
          <td>64.71</td>
          <td>2.0</td>
          <td>22.08</td>
          <td>6.88</td>
          <td>0.054</td>
          <td>0.180</td>
          <td>0.766</td>
        </tr>
        <tr>
          <th>84</th>
          <td>Guernsey</td>
          <td>Guernsey</td>
          <td>GGY</td>
          <td>831</td>
          <td>WESTERN EUROPE</td>
          <td>65409</td>
          <td>78</td>
          <td>838.6</td>
          <td>64.10</td>
          <td>3.84</td>
          <td>...</td>
          <td>842.4</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>3.0</td>
          <td>8.81</td>
          <td>10.01</td>
          <td>0.030</td>
          <td>0.100</td>
          <td>0.870</td>
        </tr>
        <tr>
          <th>98</th>
          <td>Isle of Man</td>
          <td>Isle of Man</td>
          <td>IMN</td>
          <td>833</td>
          <td>WESTERN EUROPE</td>
          <td>75441</td>
          <td>572</td>
          <td>131.9</td>
          <td>27.97</td>
          <td>5.36</td>
          <td>...</td>
          <td>676.0</td>
          <td>9.00</td>
          <td>0.00</td>
          <td>91.00</td>
          <td>3.0</td>
          <td>11.05</td>
          <td>11.19</td>
          <td>0.010</td>
          <td>0.130</td>
          <td>0.860</td>
        </tr>
        <tr>
          <th>103</th>
          <td>Jersey</td>
          <td>Jersey</td>
          <td>JEY</td>
          <td>832</td>
          <td>WESTERN EUROPE</td>
          <td>91084</td>
          <td>116</td>
          <td>785.2</td>
          <td>60.34</td>
          <td>2.76</td>
          <td>...</td>
          <td>811.3</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>3.0</td>
          <td>9.30</td>
          <td>9.28</td>
          <td>0.050</td>
          <td>0.020</td>
          <td>0.930</td>
        </tr>
        <tr>
          <th>107</th>
          <td>Kiribati</td>
          <td>Kiribati</td>
          <td>KIR</td>
          <td>296</td>
          <td>OCEANIA</td>
          <td>105432</td>
          <td>811</td>
          <td>130.0</td>
          <td>140.94</td>
          <td>0.00</td>
          <td>...</td>
          <td>42.7</td>
          <td>2.74</td>
          <td>50.68</td>
          <td>46.58</td>
          <td>2.0</td>
          <td>30.65</td>
          <td>8.26</td>
          <td>0.089</td>
          <td>0.242</td>
          <td>0.668</td>
        </tr>
        <tr>
          <th>118</th>
          <td>Liechtenstein</td>
          <td>Liechtenstein</td>
          <td>LIE</td>
          <td>438</td>
          <td>WESTERN EUROPE</td>
          <td>33987</td>
          <td>160</td>
          <td>212.4</td>
          <td>0.00</td>
          <td>4.85</td>
          <td>...</td>
          <td>585.5</td>
          <td>25.00</td>
          <td>0.00</td>
          <td>75.00</td>
          <td>4.0</td>
          <td>10.21</td>
          <td>7.18</td>
          <td>0.060</td>
          <td>0.390</td>
          <td>0.550</td>
        </tr>
        <tr>
          <th>129</th>
          <td>Marshall Islands</td>
          <td>Marshall Islands</td>
          <td>MHL</td>
          <td>584</td>
          <td>OCEANIA</td>
          <td>60422</td>
          <td>11854</td>
          <td>5.1</td>
          <td>3.12</td>
          <td>-6.04</td>
          <td>...</td>
          <td>91.2</td>
          <td>16.67</td>
          <td>38.89</td>
          <td>44.44</td>
          <td>2.0</td>
          <td>33.05</td>
          <td>4.78</td>
          <td>0.317</td>
          <td>0.149</td>
          <td>0.534</td>
        </tr>
        <tr>
          <th>135</th>
          <td>Micronesia, Fed. St.</td>
          <td>Micronesia, Fed. St.</td>
          <td>FSM</td>
          <td>583</td>
          <td>OCEANIA</td>
          <td>108004</td>
          <td>702</td>
          <td>153.9</td>
          <td>870.66</td>
          <td>-20.99</td>
          <td>...</td>
          <td>114.8</td>
          <td>5.71</td>
          <td>45.71</td>
          <td>48.58</td>
          <td>2.0</td>
          <td>24.68</td>
          <td>4.75</td>
          <td>0.289</td>
          <td>0.152</td>
          <td>0.559</td>
        </tr>
        <tr>
          <th>137</th>
          <td>Monaco</td>
          <td>Monaco</td>
          <td>MCO</td>
          <td>492</td>
          <td>WESTERN EUROPE</td>
          <td>32543</td>
          <td>2</td>
          <td>16271.5</td>
          <td>205.00</td>
          <td>7.75</td>
          <td>...</td>
          <td>1035.6</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>NaN</td>
          <td>9.19</td>
          <td>12.91</td>
          <td>0.170</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>139</th>
          <td>Montserrat</td>
          <td>Montserrat</td>
          <td>MSR</td>
          <td>500</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>9439</td>
          <td>102</td>
          <td>92.5</td>
          <td>39.22</td>
          <td>0.00</td>
          <td>...</td>
          <td>NaN</td>
          <td>20.00</td>
          <td>0.00</td>
          <td>80.00</td>
          <td>2.0</td>
          <td>17.59</td>
          <td>7.10</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>143</th>
          <td>Nauru</td>
          <td>Nauru</td>
          <td>NRU</td>
          <td>520</td>
          <td>OCEANIA</td>
          <td>13287</td>
          <td>21</td>
          <td>632.7</td>
          <td>142.86</td>
          <td>0.00</td>
          <td>...</td>
          <td>143.0</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>2.0</td>
          <td>24.76</td>
          <td>6.70</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>152</th>
          <td>N. Mariana Islands</td>
          <td>N. Mariana Islands</td>
          <td>MMR</td>
          <td>104</td>
          <td>OCEANIA</td>
          <td>82459</td>
          <td>477</td>
          <td>172.9</td>
          <td>310.69</td>
          <td>9.61</td>
          <td>...</td>
          <td>254.7</td>
          <td>13.04</td>
          <td>4.35</td>
          <td>82.61</td>
          <td>2.0</td>
          <td>19.43</td>
          <td>2.29</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>156</th>
          <td>Palau</td>
          <td>Palau</td>
          <td>PLW</td>
          <td>585</td>
          <td>OCEANIA</td>
          <td>20579</td>
          <td>458</td>
          <td>44.9</td>
          <td>331.66</td>
          <td>2.85</td>
          <td>...</td>
          <td>325.6</td>
          <td>8.70</td>
          <td>4.35</td>
          <td>86.95</td>
          <td>2.0</td>
          <td>18.03</td>
          <td>6.80</td>
          <td>0.062</td>
          <td>0.120</td>
          <td>0.818</td>
        </tr>
        <tr>
          <th>170</th>
          <td>Saint Helena</td>
          <td>Saint Helena</td>
          <td>BLM</td>
          <td>652</td>
          <td>SUB-SAHARAN AFRICA</td>
          <td>7502</td>
          <td>413</td>
          <td>18.2</td>
          <td>14.53</td>
          <td>0.00</td>
          <td>...</td>
          <td>293.3</td>
          <td>12.90</td>
          <td>0.00</td>
          <td>87.10</td>
          <td>NaN</td>
          <td>12.13</td>
          <td>6.53</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>171</th>
          <td>Saint Kitts &amp; Nevis</td>
          <td>Saint Kitts &amp; Nevis</td>
          <td>SHN</td>
          <td>654</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>39129</td>
          <td>261</td>
          <td>149.9</td>
          <td>51.72</td>
          <td>-7.11</td>
          <td>...</td>
          <td>638.9</td>
          <td>19.44</td>
          <td>2.78</td>
          <td>77.78</td>
          <td>2.0</td>
          <td>18.02</td>
          <td>8.33</td>
          <td>0.035</td>
          <td>0.258</td>
          <td>0.707</td>
        </tr>
        <tr>
          <th>173</th>
          <td>St Pierre &amp; Miquelon</td>
          <td>St Pierre &amp; Miquelon</td>
          <td>LKA</td>
          <td>144</td>
          <td>NORTHERN AMERICA</td>
          <td>7026</td>
          <td>242</td>
          <td>29.0</td>
          <td>49.59</td>
          <td>-4.86</td>
          <td>...</td>
          <td>683.2</td>
          <td>13.04</td>
          <td>0.00</td>
          <td>86.96</td>
          <td>NaN</td>
          <td>13.52</td>
          <td>6.83</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>174</th>
          <td>Saint Vincent and the Grenadines</td>
          <td>Saint Vincent and the Grenadines</td>
          <td>VCT</td>
          <td>670</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>117848</td>
          <td>389</td>
          <td>303.0</td>
          <td>21.59</td>
          <td>-7.64</td>
          <td>...</td>
          <td>190.9</td>
          <td>17.95</td>
          <td>17.95</td>
          <td>64.10</td>
          <td>2.0</td>
          <td>16.18</td>
          <td>5.98</td>
          <td>0.100</td>
          <td>0.260</td>
          <td>0.640</td>
        </tr>
        <tr>
          <th>176</th>
          <td>San Marino</td>
          <td>San Marino</td>
          <td>SMR</td>
          <td>674</td>
          <td>WESTERN EUROPE</td>
          <td>29251</td>
          <td>61</td>
          <td>479.5</td>
          <td>0.00</td>
          <td>10.98</td>
          <td>...</td>
          <td>704.3</td>
          <td>16.67</td>
          <td>0.00</td>
          <td>83.33</td>
          <td>NaN</td>
          <td>10.02</td>
          <td>8.17</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>181</th>
          <td>Seychelles</td>
          <td>Seychelles</td>
          <td>SYC</td>
          <td>690</td>
          <td>SUB-SAHARAN AFRICA</td>
          <td>81541</td>
          <td>455</td>
          <td>179.2</td>
          <td>107.91</td>
          <td>-5.69</td>
          <td>...</td>
          <td>262.4</td>
          <td>2.22</td>
          <td>13.33</td>
          <td>84.45</td>
          <td>2.0</td>
          <td>16.03</td>
          <td>6.29</td>
          <td>0.032</td>
          <td>0.304</td>
          <td>0.665</td>
        </tr>
        <tr>
          <th>202</th>
          <td>Tonga</td>
          <td>Tonga</td>
          <td>TON</td>
          <td>776</td>
          <td>OCEANIA</td>
          <td>114689</td>
          <td>748</td>
          <td>153.3</td>
          <td>56.02</td>
          <td>0.00</td>
          <td>...</td>
          <td>97.7</td>
          <td>23.61</td>
          <td>43.06</td>
          <td>33.33</td>
          <td>2.0</td>
          <td>25.37</td>
          <td>5.28</td>
          <td>0.230</td>
          <td>0.270</td>
          <td>0.500</td>
        </tr>
        <tr>
          <th>207</th>
          <td>Turks &amp; Caicos Is</td>
          <td>Turks &amp; Caicos Is</td>
          <td>TKM</td>
          <td>795</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>21152</td>
          <td>430</td>
          <td>49.2</td>
          <td>90.47</td>
          <td>11.68</td>
          <td>...</td>
          <td>269.5</td>
          <td>2.33</td>
          <td>0.00</td>
          <td>97.67</td>
          <td>2.0</td>
          <td>21.84</td>
          <td>4.21</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>208</th>
          <td>Tuvalu</td>
          <td>Tuvalu</td>
          <td>TUV</td>
          <td>798</td>
          <td>OCEANIA</td>
          <td>11810</td>
          <td>26</td>
          <td>454.2</td>
          <td>92.31</td>
          <td>0.00</td>
          <td>...</td>
          <td>59.3</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>2.0</td>
          <td>22.18</td>
          <td>7.11</td>
          <td>0.166</td>
          <td>0.272</td>
          <td>0.562</td>
        </tr>
        <tr>
          <th>219</th>
          <td>Virgin Islands</td>
          <td>Virgin Islands</td>
          <td>VIR</td>
          <td>850</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>108605</td>
          <td>1910</td>
          <td>56.9</td>
          <td>9.84</td>
          <td>-8.94</td>
          <td>...</td>
          <td>652.8</td>
          <td>11.76</td>
          <td>2.94</td>
          <td>85.30</td>
          <td>2.0</td>
          <td>13.96</td>
          <td>6.43</td>
          <td>0.010</td>
          <td>0.190</td>
          <td>0.800</td>
        </tr>
        <tr>
          <th>220</th>
          <td>Wallis and Futuna</td>
          <td>Wallis and Futuna</td>
          <td>WLF</td>
          <td>876</td>
          <td>OCEANIA</td>
          <td>16025</td>
          <td>274</td>
          <td>58.5</td>
          <td>47.08</td>
          <td>NaN</td>
          <td>...</td>
          <td>118.6</td>
          <td>5.00</td>
          <td>25.00</td>
          <td>70.00</td>
          <td>2.0</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
      </tbody>
    </table>
    <p>37 rows × 23 columns</p>
    </div>



Now lets graph these countries. The easiest way to do this is to plug
the query right into the call to create a Chart rather than assigning it
to a variable first.

.. code:: ipython3

    Chart(wd[wd.Population < 150000]).mark_point().encode(x='Population', y='Area', tooltip='Country').interactive()




.. image:: WorldFactbook_files/WorldFactbook_30_0.png



How interesting! One country pushes all the others down. We added a
tooltip parameter so that if you hover over that point you will see it
is Greenland! Lots of land area but not too many people. There are large
universities that have more people than the country of Greenland. Lets
improve out query to focus on area less than 200,000

We can do more complicated boolean expressions by using the ``|``
(logical or) and ``&`` (logical and) operators. Normally in Python these
two operators are used for bitwise or and bitwise and. So we can create
a more complicated boolean expression to limit our DataFrame in both
directions.

.. code:: ipython3

    wd[(wd.Population < 150000) & (wd.Area < 200000)]




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
          <th>Ct</th>
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
          <th>3</th>
          <td>American Samoa</td>
          <td>American Samoa</td>
          <td>ASM</td>
          <td>16</td>
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
          <td>20</td>
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
        <tr>
          <th>6</th>
          <td>Anguilla</td>
          <td>Anguilla</td>
          <td>AIA</td>
          <td>660</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>13477</td>
          <td>102</td>
          <td>132.1</td>
          <td>59.80</td>
          <td>10.76</td>
          <td>...</td>
          <td>460.0</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>2.0</td>
          <td>14.17</td>
          <td>5.34</td>
          <td>0.040</td>
          <td>0.180</td>
          <td>0.780</td>
        </tr>
        <tr>
          <th>7</th>
          <td>Antigua &amp; Barbuda</td>
          <td>Antigua &amp; Barbuda</td>
          <td>ATA</td>
          <td>10</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>69108</td>
          <td>443</td>
          <td>156.0</td>
          <td>34.54</td>
          <td>-6.15</td>
          <td>...</td>
          <td>549.9</td>
          <td>18.18</td>
          <td>4.55</td>
          <td>77.27</td>
          <td>2.0</td>
          <td>16.93</td>
          <td>5.37</td>
          <td>0.038</td>
          <td>0.220</td>
          <td>0.743</td>
        </tr>
        <tr>
          <th>10</th>
          <td>Aruba</td>
          <td>Aruba</td>
          <td>ABW</td>
          <td>533</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>71891</td>
          <td>193</td>
          <td>372.5</td>
          <td>35.49</td>
          <td>0.00</td>
          <td>...</td>
          <td>516.1</td>
          <td>10.53</td>
          <td>0.00</td>
          <td>89.47</td>
          <td>2.0</td>
          <td>11.03</td>
          <td>6.68</td>
          <td>0.004</td>
          <td>0.333</td>
          <td>0.663</td>
        </tr>
        <tr>
          <th>22</th>
          <td>Bermuda</td>
          <td>Bermuda</td>
          <td>BMU</td>
          <td>60</td>
          <td>NORTHERN AMERICA</td>
          <td>65773</td>
          <td>53</td>
          <td>1241.0</td>
          <td>194.34</td>
          <td>2.49</td>
          <td>...</td>
          <td>851.4</td>
          <td>20.00</td>
          <td>0.00</td>
          <td>80.00</td>
          <td>2.0</td>
          <td>11.40</td>
          <td>7.74</td>
          <td>0.010</td>
          <td>0.100</td>
          <td>0.890</td>
        </tr>
        <tr>
          <th>28</th>
          <td>British Virgin Is.</td>
          <td>British Virgin Is.</td>
          <td>IOT</td>
          <td>86</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>23098</td>
          <td>153</td>
          <td>151.0</td>
          <td>52.29</td>
          <td>10.01</td>
          <td>...</td>
          <td>506.5</td>
          <td>20.00</td>
          <td>6.67</td>
          <td>73.33</td>
          <td>2.0</td>
          <td>14.89</td>
          <td>4.42</td>
          <td>0.018</td>
          <td>0.062</td>
          <td>0.920</td>
        </tr>
        <tr>
          <th>38</th>
          <td>Cayman Islands</td>
          <td>Cayman Islands</td>
          <td>CYM</td>
          <td>136</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>45436</td>
          <td>262</td>
          <td>173.4</td>
          <td>61.07</td>
          <td>18.75</td>
          <td>...</td>
          <td>836.3</td>
          <td>3.85</td>
          <td>0.00</td>
          <td>96.15</td>
          <td>2.0</td>
          <td>12.74</td>
          <td>4.89</td>
          <td>0.014</td>
          <td>0.032</td>
          <td>0.954</td>
        </tr>
        <tr>
          <th>47</th>
          <td>Cook Islands</td>
          <td>Cook Islands</td>
          <td>COK</td>
          <td>184</td>
          <td>OCEANIA</td>
          <td>21388</td>
          <td>240</td>
          <td>89.1</td>
          <td>50.00</td>
          <td>NaN</td>
          <td>...</td>
          <td>289.9</td>
          <td>17.39</td>
          <td>13.04</td>
          <td>69.57</td>
          <td>2.0</td>
          <td>21.00</td>
          <td>NaN</td>
          <td>0.151</td>
          <td>0.096</td>
          <td>0.753</td>
        </tr>
        <tr>
          <th>56</th>
          <td>Dominica</td>
          <td>Dominica</td>
          <td>DMA</td>
          <td>212</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>68910</td>
          <td>754</td>
          <td>91.4</td>
          <td>19.63</td>
          <td>-13.87</td>
          <td>...</td>
          <td>304.8</td>
          <td>6.67</td>
          <td>20.00</td>
          <td>73.33</td>
          <td>2.0</td>
          <td>15.27</td>
          <td>6.73</td>
          <td>0.177</td>
          <td>0.328</td>
          <td>0.495</td>
        </tr>
        <tr>
          <th>66</th>
          <td>Faroe Islands</td>
          <td>Faroe Islands</td>
          <td>FRO</td>
          <td>234</td>
          <td>WESTERN EUROPE</td>
          <td>47246</td>
          <td>1399</td>
          <td>33.8</td>
          <td>79.84</td>
          <td>1.41</td>
          <td>...</td>
          <td>503.8</td>
          <td>2.14</td>
          <td>0.00</td>
          <td>97.86</td>
          <td>NaN</td>
          <td>14.05</td>
          <td>8.70</td>
          <td>0.270</td>
          <td>0.110</td>
          <td>0.620</td>
        </tr>
        <tr>
          <th>77</th>
          <td>Gibraltar</td>
          <td>Gibraltar</td>
          <td>GIB</td>
          <td>292</td>
          <td>WESTERN EUROPE</td>
          <td>27928</td>
          <td>7</td>
          <td>3989.7</td>
          <td>171.43</td>
          <td>0.00</td>
          <td>...</td>
          <td>877.7</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>NaN</td>
          <td>10.74</td>
          <td>9.31</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>80</th>
          <td>Grenada</td>
          <td>Grenada</td>
          <td>GRD</td>
          <td>308</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>89703</td>
          <td>344</td>
          <td>260.8</td>
          <td>35.17</td>
          <td>-13.92</td>
          <td>...</td>
          <td>364.5</td>
          <td>5.88</td>
          <td>29.41</td>
          <td>64.71</td>
          <td>2.0</td>
          <td>22.08</td>
          <td>6.88</td>
          <td>0.054</td>
          <td>0.180</td>
          <td>0.766</td>
        </tr>
        <tr>
          <th>84</th>
          <td>Guernsey</td>
          <td>Guernsey</td>
          <td>GGY</td>
          <td>831</td>
          <td>WESTERN EUROPE</td>
          <td>65409</td>
          <td>78</td>
          <td>838.6</td>
          <td>64.10</td>
          <td>3.84</td>
          <td>...</td>
          <td>842.4</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>3.0</td>
          <td>8.81</td>
          <td>10.01</td>
          <td>0.030</td>
          <td>0.100</td>
          <td>0.870</td>
        </tr>
        <tr>
          <th>98</th>
          <td>Isle of Man</td>
          <td>Isle of Man</td>
          <td>IMN</td>
          <td>833</td>
          <td>WESTERN EUROPE</td>
          <td>75441</td>
          <td>572</td>
          <td>131.9</td>
          <td>27.97</td>
          <td>5.36</td>
          <td>...</td>
          <td>676.0</td>
          <td>9.00</td>
          <td>0.00</td>
          <td>91.00</td>
          <td>3.0</td>
          <td>11.05</td>
          <td>11.19</td>
          <td>0.010</td>
          <td>0.130</td>
          <td>0.860</td>
        </tr>
        <tr>
          <th>103</th>
          <td>Jersey</td>
          <td>Jersey</td>
          <td>JEY</td>
          <td>832</td>
          <td>WESTERN EUROPE</td>
          <td>91084</td>
          <td>116</td>
          <td>785.2</td>
          <td>60.34</td>
          <td>2.76</td>
          <td>...</td>
          <td>811.3</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>3.0</td>
          <td>9.30</td>
          <td>9.28</td>
          <td>0.050</td>
          <td>0.020</td>
          <td>0.930</td>
        </tr>
        <tr>
          <th>107</th>
          <td>Kiribati</td>
          <td>Kiribati</td>
          <td>KIR</td>
          <td>296</td>
          <td>OCEANIA</td>
          <td>105432</td>
          <td>811</td>
          <td>130.0</td>
          <td>140.94</td>
          <td>0.00</td>
          <td>...</td>
          <td>42.7</td>
          <td>2.74</td>
          <td>50.68</td>
          <td>46.58</td>
          <td>2.0</td>
          <td>30.65</td>
          <td>8.26</td>
          <td>0.089</td>
          <td>0.242</td>
          <td>0.668</td>
        </tr>
        <tr>
          <th>118</th>
          <td>Liechtenstein</td>
          <td>Liechtenstein</td>
          <td>LIE</td>
          <td>438</td>
          <td>WESTERN EUROPE</td>
          <td>33987</td>
          <td>160</td>
          <td>212.4</td>
          <td>0.00</td>
          <td>4.85</td>
          <td>...</td>
          <td>585.5</td>
          <td>25.00</td>
          <td>0.00</td>
          <td>75.00</td>
          <td>4.0</td>
          <td>10.21</td>
          <td>7.18</td>
          <td>0.060</td>
          <td>0.390</td>
          <td>0.550</td>
        </tr>
        <tr>
          <th>129</th>
          <td>Marshall Islands</td>
          <td>Marshall Islands</td>
          <td>MHL</td>
          <td>584</td>
          <td>OCEANIA</td>
          <td>60422</td>
          <td>11854</td>
          <td>5.1</td>
          <td>3.12</td>
          <td>-6.04</td>
          <td>...</td>
          <td>91.2</td>
          <td>16.67</td>
          <td>38.89</td>
          <td>44.44</td>
          <td>2.0</td>
          <td>33.05</td>
          <td>4.78</td>
          <td>0.317</td>
          <td>0.149</td>
          <td>0.534</td>
        </tr>
        <tr>
          <th>135</th>
          <td>Micronesia, Fed. St.</td>
          <td>Micronesia, Fed. St.</td>
          <td>FSM</td>
          <td>583</td>
          <td>OCEANIA</td>
          <td>108004</td>
          <td>702</td>
          <td>153.9</td>
          <td>870.66</td>
          <td>-20.99</td>
          <td>...</td>
          <td>114.8</td>
          <td>5.71</td>
          <td>45.71</td>
          <td>48.58</td>
          <td>2.0</td>
          <td>24.68</td>
          <td>4.75</td>
          <td>0.289</td>
          <td>0.152</td>
          <td>0.559</td>
        </tr>
        <tr>
          <th>137</th>
          <td>Monaco</td>
          <td>Monaco</td>
          <td>MCO</td>
          <td>492</td>
          <td>WESTERN EUROPE</td>
          <td>32543</td>
          <td>2</td>
          <td>16271.5</td>
          <td>205.00</td>
          <td>7.75</td>
          <td>...</td>
          <td>1035.6</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>NaN</td>
          <td>9.19</td>
          <td>12.91</td>
          <td>0.170</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>139</th>
          <td>Montserrat</td>
          <td>Montserrat</td>
          <td>MSR</td>
          <td>500</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>9439</td>
          <td>102</td>
          <td>92.5</td>
          <td>39.22</td>
          <td>0.00</td>
          <td>...</td>
          <td>NaN</td>
          <td>20.00</td>
          <td>0.00</td>
          <td>80.00</td>
          <td>2.0</td>
          <td>17.59</td>
          <td>7.10</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>143</th>
          <td>Nauru</td>
          <td>Nauru</td>
          <td>NRU</td>
          <td>520</td>
          <td>OCEANIA</td>
          <td>13287</td>
          <td>21</td>
          <td>632.7</td>
          <td>142.86</td>
          <td>0.00</td>
          <td>...</td>
          <td>143.0</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>2.0</td>
          <td>24.76</td>
          <td>6.70</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>152</th>
          <td>N. Mariana Islands</td>
          <td>N. Mariana Islands</td>
          <td>MMR</td>
          <td>104</td>
          <td>OCEANIA</td>
          <td>82459</td>
          <td>477</td>
          <td>172.9</td>
          <td>310.69</td>
          <td>9.61</td>
          <td>...</td>
          <td>254.7</td>
          <td>13.04</td>
          <td>4.35</td>
          <td>82.61</td>
          <td>2.0</td>
          <td>19.43</td>
          <td>2.29</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>156</th>
          <td>Palau</td>
          <td>Palau</td>
          <td>PLW</td>
          <td>585</td>
          <td>OCEANIA</td>
          <td>20579</td>
          <td>458</td>
          <td>44.9</td>
          <td>331.66</td>
          <td>2.85</td>
          <td>...</td>
          <td>325.6</td>
          <td>8.70</td>
          <td>4.35</td>
          <td>86.95</td>
          <td>2.0</td>
          <td>18.03</td>
          <td>6.80</td>
          <td>0.062</td>
          <td>0.120</td>
          <td>0.818</td>
        </tr>
        <tr>
          <th>170</th>
          <td>Saint Helena</td>
          <td>Saint Helena</td>
          <td>BLM</td>
          <td>652</td>
          <td>SUB-SAHARAN AFRICA</td>
          <td>7502</td>
          <td>413</td>
          <td>18.2</td>
          <td>14.53</td>
          <td>0.00</td>
          <td>...</td>
          <td>293.3</td>
          <td>12.90</td>
          <td>0.00</td>
          <td>87.10</td>
          <td>NaN</td>
          <td>12.13</td>
          <td>6.53</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>171</th>
          <td>Saint Kitts &amp; Nevis</td>
          <td>Saint Kitts &amp; Nevis</td>
          <td>SHN</td>
          <td>654</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>39129</td>
          <td>261</td>
          <td>149.9</td>
          <td>51.72</td>
          <td>-7.11</td>
          <td>...</td>
          <td>638.9</td>
          <td>19.44</td>
          <td>2.78</td>
          <td>77.78</td>
          <td>2.0</td>
          <td>18.02</td>
          <td>8.33</td>
          <td>0.035</td>
          <td>0.258</td>
          <td>0.707</td>
        </tr>
        <tr>
          <th>173</th>
          <td>St Pierre &amp; Miquelon</td>
          <td>St Pierre &amp; Miquelon</td>
          <td>LKA</td>
          <td>144</td>
          <td>NORTHERN AMERICA</td>
          <td>7026</td>
          <td>242</td>
          <td>29.0</td>
          <td>49.59</td>
          <td>-4.86</td>
          <td>...</td>
          <td>683.2</td>
          <td>13.04</td>
          <td>0.00</td>
          <td>86.96</td>
          <td>NaN</td>
          <td>13.52</td>
          <td>6.83</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>174</th>
          <td>Saint Vincent and the Grenadines</td>
          <td>Saint Vincent and the Grenadines</td>
          <td>VCT</td>
          <td>670</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>117848</td>
          <td>389</td>
          <td>303.0</td>
          <td>21.59</td>
          <td>-7.64</td>
          <td>...</td>
          <td>190.9</td>
          <td>17.95</td>
          <td>17.95</td>
          <td>64.10</td>
          <td>2.0</td>
          <td>16.18</td>
          <td>5.98</td>
          <td>0.100</td>
          <td>0.260</td>
          <td>0.640</td>
        </tr>
        <tr>
          <th>176</th>
          <td>San Marino</td>
          <td>San Marino</td>
          <td>SMR</td>
          <td>674</td>
          <td>WESTERN EUROPE</td>
          <td>29251</td>
          <td>61</td>
          <td>479.5</td>
          <td>0.00</td>
          <td>10.98</td>
          <td>...</td>
          <td>704.3</td>
          <td>16.67</td>
          <td>0.00</td>
          <td>83.33</td>
          <td>NaN</td>
          <td>10.02</td>
          <td>8.17</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>181</th>
          <td>Seychelles</td>
          <td>Seychelles</td>
          <td>SYC</td>
          <td>690</td>
          <td>SUB-SAHARAN AFRICA</td>
          <td>81541</td>
          <td>455</td>
          <td>179.2</td>
          <td>107.91</td>
          <td>-5.69</td>
          <td>...</td>
          <td>262.4</td>
          <td>2.22</td>
          <td>13.33</td>
          <td>84.45</td>
          <td>2.0</td>
          <td>16.03</td>
          <td>6.29</td>
          <td>0.032</td>
          <td>0.304</td>
          <td>0.665</td>
        </tr>
        <tr>
          <th>202</th>
          <td>Tonga</td>
          <td>Tonga</td>
          <td>TON</td>
          <td>776</td>
          <td>OCEANIA</td>
          <td>114689</td>
          <td>748</td>
          <td>153.3</td>
          <td>56.02</td>
          <td>0.00</td>
          <td>...</td>
          <td>97.7</td>
          <td>23.61</td>
          <td>43.06</td>
          <td>33.33</td>
          <td>2.0</td>
          <td>25.37</td>
          <td>5.28</td>
          <td>0.230</td>
          <td>0.270</td>
          <td>0.500</td>
        </tr>
        <tr>
          <th>207</th>
          <td>Turks &amp; Caicos Is</td>
          <td>Turks &amp; Caicos Is</td>
          <td>TKM</td>
          <td>795</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>21152</td>
          <td>430</td>
          <td>49.2</td>
          <td>90.47</td>
          <td>11.68</td>
          <td>...</td>
          <td>269.5</td>
          <td>2.33</td>
          <td>0.00</td>
          <td>97.67</td>
          <td>2.0</td>
          <td>21.84</td>
          <td>4.21</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>208</th>
          <td>Tuvalu</td>
          <td>Tuvalu</td>
          <td>TUV</td>
          <td>798</td>
          <td>OCEANIA</td>
          <td>11810</td>
          <td>26</td>
          <td>454.2</td>
          <td>92.31</td>
          <td>0.00</td>
          <td>...</td>
          <td>59.3</td>
          <td>0.00</td>
          <td>0.00</td>
          <td>100.00</td>
          <td>2.0</td>
          <td>22.18</td>
          <td>7.11</td>
          <td>0.166</td>
          <td>0.272</td>
          <td>0.562</td>
        </tr>
        <tr>
          <th>219</th>
          <td>Virgin Islands</td>
          <td>Virgin Islands</td>
          <td>VIR</td>
          <td>850</td>
          <td>LATIN AMER. &amp; CARIB</td>
          <td>108605</td>
          <td>1910</td>
          <td>56.9</td>
          <td>9.84</td>
          <td>-8.94</td>
          <td>...</td>
          <td>652.8</td>
          <td>11.76</td>
          <td>2.94</td>
          <td>85.30</td>
          <td>2.0</td>
          <td>13.96</td>
          <td>6.43</td>
          <td>0.010</td>
          <td>0.190</td>
          <td>0.800</td>
        </tr>
        <tr>
          <th>220</th>
          <td>Wallis and Futuna</td>
          <td>Wallis and Futuna</td>
          <td>WLF</td>
          <td>876</td>
          <td>OCEANIA</td>
          <td>16025</td>
          <td>274</td>
          <td>58.5</td>
          <td>47.08</td>
          <td>NaN</td>
          <td>...</td>
          <td>118.6</td>
          <td>5.00</td>
          <td>25.00</td>
          <td>70.00</td>
          <td>2.0</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
      </tbody>
    </table>
    <p>36 rows × 23 columns</p>
    </div>



.. code:: ipython3

    Chart(wd[(wd.Population < 150000) & (wd.Area < 200000)]).mark_point().encode(x='Population', y='Area', tooltip='Country').interactive()




.. image:: WorldFactbook_files/WorldFactbook_34_0.png



OK, so maybe you have a favorite country you have visited or lived in at
some point. I lived in Malta for six months, so I’m always curious about
Malta. Lets see what data we have in the data frame for Malta using an
equality:

.. code:: ipython3

    wd[wd.Country == 'Malta']




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
          <th>Ct</th>
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
      </tbody>
    </table>
    <p>0 rows × 23 columns</p>
    </div>



Hmmm.. that seems odd that Malta would not be in the dataset. Lets try
some other countries. Nothing seems to work. One common problem is that
names and other strings can end up with spaces at the beginning or the
end. If you do a quick try you will see that ‘Malta’ works. But that is
horrible. We don’t want to have to remember to put spaces at the end of
every string all the time. We should do a little data cleanup and strip
those spaces.

.. code:: ipython3

    wd[wd.Country == 'Malta ']




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
          <th>Ct</th>
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
          <th>128</th>
          <td>Malta</td>
          <td>Malta</td>
          <td>MLT</td>
          <td>470</td>
          <td>WESTERN EUROPE</td>
          <td>400214</td>
          <td>316</td>
          <td>1266.5</td>
          <td>62.28</td>
          <td>2.07</td>
          <td>...</td>
          <td>505.0</td>
          <td>28.13</td>
          <td>3.13</td>
          <td>68.74</td>
          <td>NaN</td>
          <td>10.22</td>
          <td>8.1</td>
          <td>0.03</td>
          <td>0.23</td>
          <td>0.74</td>
        </tr>
      </tbody>
    </table>
    <p>1 rows × 23 columns</p>
    </div>



You may recall that Python has a string method called ``strip`` that
does exactly what we want. How can we get that to apply to all of the
strings in the Series? Pandas allows us to do this using the str
attribute of the series in combination with most of the standard string
methods you know about.

.. code:: ipython3

    wd.Country.str.strip()




.. parsed-literal::

    0                                            Afghanistan
    1                                                Albania
    2                                                Algeria
    3                                         American Samoa
    4                                                Andorra
    5                                                 Angola
    6                                               Anguilla
    7                                      Antigua & Barbuda
    8                                              Argentina
    9                                                Armenia
    10                                                 Aruba
    11                                             Australia
    12                                               Austria
    13                                            Azerbaijan
    14                                          Bahamas, The
    15                                               Bahrain
    16                                            Bangladesh
    17                                              Barbados
    18                                               Belarus
    19                                               Belgium
    20                                                Belize
    21                                                 Benin
    22                                               Bermuda
    23                                                Bhutan
    24                                               Bolivia
    25                                  Bosnia & Herzegovina
    26                                              Botswana
    27                                                Brazil
    28                                    British Virgin Is.
    29                                                Brunei
                                 ...                        
    195                                          Switzerland
    196                                                Syria
    197                                               Taiwan
    198                                           Tajikistan
    199                                             Tanzania
    200                                             Thailand
    201                                                 Togo
    202                                                Tonga
    203                                    Trinidad & Tobago
    204                                              Tunisia
    205                                               Turkey
    206                                         Turkmenistan
    207                                    Turks & Caicos Is
    208                                               Tuvalu
    209                                               Uganda
    210                                              Ukraine
    211                                 United Arab Emirates
    212    United Kingdom of Great Britain and Northern I...
    213                             United States of America
    214                                              Uruguay
    215                                           Uzbekistan
    216                                              Vanuatu
    217                                            Venezuela
    218                                              Vietnam
    219                                       Virgin Islands
    220                                    Wallis and Futuna
    221                                       Western Sahara
    222                                                Yemen
    223                                               Zambia
    224                                             Zimbabwe
    Name: Country, Length: 225, dtype: object



Now we can replace our original Country column with the stripped column.

.. code:: ipython3

    wd['Country'] = wd.Country.str.strip()

.. code:: ipython3

    wd[wd.Country == 'Malta']




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
          <th>Ct</th>
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
          <th>128</th>
          <td>Malta</td>
          <td>Malta</td>
          <td>MLT</td>
          <td>470</td>
          <td>WESTERN EUROPE</td>
          <td>400214</td>
          <td>316</td>
          <td>1266.5</td>
          <td>62.28</td>
          <td>2.07</td>
          <td>...</td>
          <td>505.0</td>
          <td>28.13</td>
          <td>3.13</td>
          <td>68.74</td>
          <td>NaN</td>
          <td>10.22</td>
          <td>8.1</td>
          <td>0.03</td>
          <td>0.23</td>
          <td>0.74</td>
        </tr>
      </tbody>
    </table>
    <p>1 rows × 23 columns</p>
    </div>



Power Tools – Scatter Matrix
----------------------------

It would be pretty tedius to look at all the different pairs of things
we might want to look at for correlation one at a time, but we can Use a
scatter matrix to make life easier.

.. code:: ipython3

    alt.Chart(wd).mark_circle().encode(
        alt.X(alt.repeat("column"), type='quantitative'),
        alt.Y(alt.repeat("row"), type='quantitative'),
        color='Region:N'
    ).properties(
        width=150,
        height=150
    ).repeat(
        row=['Birthrate', 'Deathrate', 'Infant mortality', 'GDP'],
        column=['Birthrate', 'Deathrate', 'Infant mortality', 'GDP']
    ).interactive()




.. image:: WorldFactbook_files/WorldFactbook_45_0.png



.. code:: ipython3

    list(reversed(['a','b']))





.. parsed-literal::

    ['b', 'a']




Developing Fluency
------------------

Pandas will only become a part of your daily workflow when you develop
fluency with the basics. You need to be able to do easy queries without
having to think hard about the syntax. The only way that happens is
through repetition. Lots of repetition and ideally that repetitive
practice is spread out over time.

That doesn’t mean you can’t go on and do lots of much harder things, it
just means it will take longer at first as you have to go back and
review documentation in order to become efficient.

Practice Questions
~~~~~~~~~~~~~~~~~~

1. What are the top 10 countries with the largest GDP?
2. What are the top 20 countries by Population?
3. What are the 10 countries with the largest net migration?
4. What is distribution of Argiculture, Industry, and service for the
   countries in Western Europe?
5. What are the names, population and Area of the 5 largest (by area)
   landlocked countries?
6. What are the names and population of the five most populous
   landlocked countries?
7. What what is the name and GDP of the 10 countries with the most cell
   phones/1000 people?
8. What are the 10 countries with the largest GDP that have a “Wet
   Tropical” climate?

.. code:: ipython3

    from math import log
    wd['logpop'] = wd.Population.map(lambda x: log(x))

.. code:: ipython3

    Chart(wd).mark_point().encode(x='Birthrate', y='Deathrate', size='GDP', color='logpop', tooltip='Country').interactive()




.. image:: WorldFactbook_files/WorldFactbook_50_0.png



.. code:: ipython3

    Chart(wd).mark_point().encode(y='Infant mortality',x='Birthrate', size='GDP')




.. image:: WorldFactbook_files/WorldFactbook_51_0.png



.. code:: ipython3

    wd[['Infant mortality', 'Birthrate']].corr()




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
          <th>Infant mortality</th>
          <th>Birthrate</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Infant mortality</th>
          <td>1.000000</td>
          <td>0.856764</td>
        </tr>
        <tr>
          <th>Birthrate</th>
          <td>0.856764</td>
          <td>1.000000</td>
        </tr>
      </tbody>
    </table>
    </div>



.. code:: ipython3

    wd.groupby('Region')['Birthrate', 'Infant mortality'].mean()




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
          <th>Birthrate</th>
          <th>Infant mortality</th>
        </tr>
        <tr>
          <th>Region</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>ASIA (EX. NEAR EAST)</th>
          <td>21.157857</td>
          <td>41.780000</td>
        </tr>
        <tr>
          <th>BALTICS</th>
          <td>9.343333</td>
          <td>8.103333</td>
        </tr>
        <tr>
          <th>C.W. OF IND. STATES</th>
          <td>17.855833</td>
          <td>44.410000</td>
        </tr>
        <tr>
          <th>EASTERN EUROPE</th>
          <td>10.370909</td>
          <td>12.686667</td>
        </tr>
        <tr>
          <th>LATIN AMER. &amp; CARIB</th>
          <td>19.081111</td>
          <td>20.092667</td>
        </tr>
        <tr>
          <th>NEAR EAST</th>
          <td>23.527857</td>
          <td>23.677857</td>
        </tr>
        <tr>
          <th>NORTHERN AFRICA</th>
          <td>20.814000</td>
          <td>30.916000</td>
        </tr>
        <tr>
          <th>NORTHERN AMERICA</th>
          <td>13.154000</td>
          <td>8.628000</td>
        </tr>
        <tr>
          <th>OCEANIA</th>
          <td>22.108000</td>
          <td>20.203684</td>
        </tr>
        <tr>
          <th>SUB-SAHARAN AFRICA</th>
          <td>36.043922</td>
          <td>80.039216</td>
        </tr>
        <tr>
          <th>WESTERN EUROPE</th>
          <td>10.553571</td>
          <td>4.730357</td>
        </tr>
      </tbody>
    </table>
    </div>



Graphing Infant Mortality on a map
----------------------------------

Let us take on the seemingly simple task of plotting some of the country
data on a map. Like we did in Google Sheets earlier. We’ll see that this
is one area where things are not quite as simple as they are in Sheets.
But we can make it work with a bit of effort.

Altair provides us with the facility to make a blank map. But filling in
the data requires a bit more work on our part.

This is a good example of learning by example and extrapolating what you
need to do based on understanding the example.

The counties data that is passed to the chart is the data needed to
create and outline the map

.. code:: ipython3

    import altair as alt
    from vega_datasets import data
    counties = alt.topo_feature(data.us_10m.url, 'counties')
    unemp_data = data.unemployment.url
    
    
    alt.Chart(counties).mark_geoshape().project(
        type='albersUsa').properties(
        width=500,
        height=300
    )




.. image:: WorldFactbook_files/WorldFactbook_55_0.png



What about our encoding channels??!! The primary data needed to draw the
map using a ``mark_geoshape`` was passed to the Chart, but that is
really secondary data for us, what we care about is graphing the
unemployment data by county. That is in a different data frame with a
column called rate.

With a geoshape we can encode the county data using color. But there is
no unemployment data in counties so we have to use a
``transform_lookup`` to **map** from the way counties are identified in
the geo data to our dataframe that contains unemployment data.

.. code:: ipython3

    unemp_data = pd.read_csv('http://vega.github.io/vega-datasets/data/unemployment.tsv',sep='\t')
    unemp_data.head()




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



Using the transform_lookup method we can arrange for the id in the
geographic data to be matched against the id in our unemp_data data
frame. This allows us to make use of two data frames in one graph. The
example below is a bit misleading in that id is used both as th lookup
as well as the key in the call to LookupData. The lookup value refers to
the column name in the dataframe passed to Chart where as the second
parameter to the LookupData call is the name of the column in the
unemp_data dataframe. It is just a coincidence that they have the same
name in this example.

.. code:: ipython3

    
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




.. image:: WorldFactbook_files/WorldFactbook_59_0.png



Screen Scraping Country IDs
---------------------------

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

.. code:: ipython3

    ## DELETE ME
    cc_map = {}
    for row in soup.select("tr.border1"):
        col_list = row.select('td')
        if col_list[4].text.isnumeric():
            cc_map[col_list[3].text.strip()] = int(col_list[4].text)

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



.. code:: ipython3

    ## DELETE from final version
    countries = alt.topo_feature(data.world_110m.url, 'countries')
    
    base = alt.Chart(countries).mark_geoshape(
        fill='#666666',
        stroke='white'
    ).encode(color='Infant mortality:Q', 
             tooltip='Country:N'
    ).properties(
        width=750,
        height=450
    ).project('equirectangular').transform_lookup(
            lookup='id',
            from_=alt.LookupData(wd, 'CodeNum', ['Infant mortality', 'Country']))
    
    base




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



Screen Scraping the CIA
~~~~~~~~~~~~~~~~~~~~~~~

Now its time to live dangerously! The country data that we have been
using was compiled and turned into a csv file in 2006. Much of that data
comes from the CIA World Factbook. (not Facebook - as autocorrect so
often thinks)

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
unzip the file on your local computer but still use ``requests`` without
drawing attention to yourself on the CIA’s website!

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










