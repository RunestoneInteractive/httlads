.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.

Mapping Bike Stations Using Colab
=================================

This section will show you how to map our bikeshare data on **Google Colab**. We are going to be using
a module called ``folium`` instead of ``ipyleaflets`` (as shown in 9.8) because Colab does not support Jupyter widgets.
We will be using the package ``folium`` which is a module that allows for mapping  static data in both Jupyter Notebooks
and Colab.

Next, we want to put all the latitude and longitude values from each of the bikeshare stations into a list. What
we want to do is combine the two columns from the ``DataFrame`` into tuples and put them in a list. The aim is to
get something that would look like this: ``[(lat1, long1), (lat2, long2), ...]`` which the Google Maps interface can accept.
While a for loop might be used for this, we will be using a simpler way.

Suppose we have two lists:

.. code:: python3

    list1 = ['a', 'b', 'c']
    list2 = [1, 2, 3]


We want to combine these lists into ``[('a', 1), ('b', 2), ('c', 3)]``. Python has a built-in ``zip`` function
that takes in any number of iterable objects and "zips" them together. The ``zip`` function will take the first elements
from each iterable object and puts them in a tuple; then it will do the same for the second element from each object,
then the third, then the fourth, etc. We can use the zip function like this ``zip(list1, list2)``. Let us expand our
example.

.. code:: python3

    list1 = ['a', 'b', 'c']
    list2 = [1, 2, 3]
    str1 = "XYZ"

If we were to run ``list(zip(list1, list2, str1))`` it would return ``[('a', 1, 'X'), ('b', 2, 'Y'), ('c', 3, 'Z')]``.
Why do we need to put ``zip`` into a ``list``? ``zip`` returns an iterator that, under most circumstances, behaves like
a list, except when we want to see specific examples. If we want to index into something that has been zipped (or simply
print the zipped values) we have to turn it into a list first. Series are also iterable objects, which means that it is
possible to ``zip`` them.

::

    import pandas as pd

    stations = pd.read_csv("https://media.githubusercontent.com/media/RunestoneInteractive/httlads/master/Data/bikeshare_stations.csv")
    stations.head()

Let us start by loading the stations data into Colab. You can load data into Colab from a database, local file, or remotely as it is
being done here. After the file has been loaded, we will create a marker for each station using the longitude and latitude data.

::

   import folium

   Locations = list(zip(stations.latitude, stations.longitude))
   dc_center = (38.9072, -77.0369)

   dcmap = folium.Map(location=dc_center, zoom_start=12)

   for loc in Locations:
      markers = folium.CircleMarker(location=loc,radius=5,fill=True, fill_opacity=1)
      dcmap.add_child(markers)

   dcmap

Practice and Further Exploration
---------------------------------

1. The map seems a little busy with all those markers.  Redo the map so that it only shows the 20 busiest stations.  That is the 20 stations with the highest starting counts.

2. It would also be interesting to add the 20 stations with the largest ending counts. Can you add those in a different color?

3. Investigate the interface to see if there is a way for you to color code the markers based on the number of rides originating from that station.  Show the 50 most popular stations using five different colors. 1 color for the top 10 another for the next 10 and so on.

4. Bikeshare datasets are available for many cities.  Most of them come in a similar format to this one.  Find some bikeshare data for a city close to you or for your favorite city and see if you can reproduce this map.  Hint, if your data does not come with latitude and longitude then investigate the ``geopy`` package, you can use a free service like GeocodeFarm to use the address of the station to get the latitude and longitude.

5. Here is a real **challenge** for you, pick a station and then follow the rentals, but only map the stations where a bike ends up back at your original starting point.  In other words for the bikes that started at station A, go to station B, then D then pause for a while then on to station X and finally back to A. Others may take a different route. If you can do this, you can investigate the AntPath plugin by first importing all folium plugins (``from folium import plugins``). Then you can show the routes that the various bikes took to make their way back to the starting point. You may want to limit the time on this to one day or a week.

6. **Another Challenge** ``folium`` also allows you to add a heatmap layer by importing the plugin ( called ``HeatMap``). This sounds like it could a very interesting way to overlay the popularity of different stations and routes on the map. Investigate this layer and what the data should look like, then see if you can find a way to get the data into the appropriate form to make a heatmap.
