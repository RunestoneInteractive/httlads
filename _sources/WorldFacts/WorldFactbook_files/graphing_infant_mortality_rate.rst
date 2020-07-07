Graphing Infant Mortality rates on a Map
=========================================

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

