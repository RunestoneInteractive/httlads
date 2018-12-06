
SQL in one lesson
=================

.. figure:: https://imgs.xkcd.com/comics/exploits_of_a_mom.png
   :alt: exploits_of_a_mom.png

   exploits_of_a_mom.png

A lot of the data that we interact with today is stored in databases.
For example:

-  Student records, including grades, at a school
-  Posts and friends in your favorite social network
-  News stories on a newspaper’s website
-  Your contacts list on your mobile phone
-  All images that make up Google Maps

All these bits of information are stored in various kinds of databases.
Some of these are stored in relational databases that are available as
open source tools like Postgresql, MySQL and SQLite.

Others are stored in proprietary systems like Google’s
`BigTable <https://en.wikipedia.org/wiki/Bigtable>`__ or Facebook’s
`Haystack Object
Store <https://code.fb.com/core-data/needle-in-a-haystack-efficient-storage-of-billions-of-photos/>`__.

Reading List
------------

-  `Jupyter Magics with
   SQL <https://towardsdatascience.com/jupyter-magics-with-sql-921370099589>`__

Whatever the database might, there needs to be a way to extract data
from it and a lot of these systems have agreed on a shared language for
accessing data.

This language is called SQL (Structured Query Language, pronounced like
“sequel”).

To try out SQL, we’re going to be using a data set about sales of video
games.

Let’s start by connecting to the database and taking a peek at the table
called ``vgsale``.

.. code:: ipython3

    %load_ext sql


.. parsed-literal::

    The sql extension is already loaded. To reload it, use:
      %reload_ext sql


.. code:: ipython3

    %%sql sqlite:///vgsales.db
    SELECT * FROM vgsale LIMIT 10



.. parsed-literal::

    Done.




.. raw:: html

    <table>
        <tr>
            <th>index</th>
            <th>Rank</th>
            <th>Name</th>
            <th>Platform</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Publisher</th>
            <th>NA_Sales</th>
            <th>EU_Sales</th>
            <th>JP_Sales</th>
            <th>Other_Sales</th>
            <th>Global_Sales</th>
        </tr>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>Wii Sports</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>41.49</td>
            <td>29.02</td>
            <td>3.77</td>
            <td>8.46</td>
            <td>82.74</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>Super Mario Bros.</td>
            <td>NES</td>
            <td>1985.0</td>
            <td>Platform</td>
            <td>Nintendo</td>
            <td>29.08</td>
            <td>3.58</td>
            <td>6.81</td>
            <td>0.77</td>
            <td>40.24</td>
        </tr>
        <tr>
            <td>2</td>
            <td>3</td>
            <td>Mario Kart Wii</td>
            <td>Wii</td>
            <td>2008.0</td>
            <td>Racing</td>
            <td>Nintendo</td>
            <td>15.85</td>
            <td>12.88</td>
            <td>3.79</td>
            <td>3.31</td>
            <td>35.82</td>
        </tr>
        <tr>
            <td>3</td>
            <td>4</td>
            <td>Wii Sports Resort</td>
            <td>Wii</td>
            <td>2009.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>15.75</td>
            <td>11.01</td>
            <td>3.28</td>
            <td>2.96</td>
            <td>33.0</td>
        </tr>
        <tr>
            <td>4</td>
            <td>5</td>
            <td>Pokemon Red/Pokemon Blue</td>
            <td>GB</td>
            <td>1996.0</td>
            <td>Role-Playing</td>
            <td>Nintendo</td>
            <td>11.27</td>
            <td>8.89</td>
            <td>10.22</td>
            <td>1.0</td>
            <td>31.37</td>
        </tr>
        <tr>
            <td>5</td>
            <td>6</td>
            <td>Tetris</td>
            <td>GB</td>
            <td>1989.0</td>
            <td>Puzzle</td>
            <td>Nintendo</td>
            <td>23.2</td>
            <td>2.26</td>
            <td>4.22</td>
            <td>0.58</td>
            <td>30.26</td>
        </tr>
        <tr>
            <td>6</td>
            <td>7</td>
            <td>New Super Mario Bros.</td>
            <td>DS</td>
            <td>2006.0</td>
            <td>Platform</td>
            <td>Nintendo</td>
            <td>11.38</td>
            <td>9.23</td>
            <td>6.5</td>
            <td>2.9</td>
            <td>30.01</td>
        </tr>
        <tr>
            <td>7</td>
            <td>8</td>
            <td>Wii Play</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Misc</td>
            <td>Nintendo</td>
            <td>14.03</td>
            <td>9.2</td>
            <td>2.93</td>
            <td>2.85</td>
            <td>29.02</td>
        </tr>
        <tr>
            <td>8</td>
            <td>9</td>
            <td>New Super Mario Bros. Wii</td>
            <td>Wii</td>
            <td>2009.0</td>
            <td>Platform</td>
            <td>Nintendo</td>
            <td>14.59</td>
            <td>7.06</td>
            <td>4.7</td>
            <td>2.26</td>
            <td>28.62</td>
        </tr>
        <tr>
            <td>9</td>
            <td>10</td>
            <td>Duck Hunt</td>
            <td>NES</td>
            <td>1984.0</td>
            <td>Shooter</td>
            <td>Nintendo</td>
            <td>26.93</td>
            <td>0.63</td>
            <td>0.28</td>
            <td>0.47</td>
            <td>28.31</td>
        </tr>
    </table>



The first line of that code block is just a magic invocation that
connects us to the database we are going to use.

The second line introduces SQL syntax for the first time. To help you
understand the SQL commands we are using, the SQL syntax words are
listed in CAPITAL letters, the lowercase words are the names of tables
or columns.

The above statement translates to: grab (SELECT) all the values (*) in
the table called vgsale (FROM vgsale) but only show me the first ten
(LIMIT 10).

The table is composed of several columns:

-  rank: The sales rank of that game
-  name: The name of the game
-  platform: The gaming system that it was published for
-  year: The year that the game was published
-  genre: The genre of the game
-  publisher: The company that published the game
-  na_sales: Millions of copies sold in North America
-  eu_sales: Millions of copies sold in Europe
-  jp_sales: Millions of copies sold in Japan
-  other_sales: Millions of copies sold in the rest of the world
-  global_sales: Millions of copies sold in total

We don’t always want to read all the columns in a table. For example, if
we just want the name, year and global sales numbers we could select:

.. code:: ipython3

    %%sql
    SELECT name, year, global_sales
    FROM vgsale
    LIMIT 10


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Global_Sales</th>
        </tr>
        <tr>
            <td>Wii Sports</td>
            <td>2006.0</td>
            <td>82.74</td>
        </tr>
        <tr>
            <td>Super Mario Bros.</td>
            <td>1985.0</td>
            <td>40.24</td>
        </tr>
        <tr>
            <td>Mario Kart Wii</td>
            <td>2008.0</td>
            <td>35.82</td>
        </tr>
        <tr>
            <td>Wii Sports Resort</td>
            <td>2009.0</td>
            <td>33.0</td>
        </tr>
        <tr>
            <td>Pokemon Red/Pokemon Blue</td>
            <td>1996.0</td>
            <td>31.37</td>
        </tr>
        <tr>
            <td>Tetris</td>
            <td>1989.0</td>
            <td>30.26</td>
        </tr>
        <tr>
            <td>New Super Mario Bros.</td>
            <td>2006.0</td>
            <td>30.01</td>
        </tr>
        <tr>
            <td>Wii Play</td>
            <td>2006.0</td>
            <td>29.02</td>
        </tr>
        <tr>
            <td>New Super Mario Bros. Wii</td>
            <td>2009.0</td>
            <td>28.62</td>
        </tr>
        <tr>
            <td>Duck Hunt</td>
            <td>1984.0</td>
            <td>28.31</td>
        </tr>
    </table>



SQL doesn’t care about line breaks so we can spread a SQL query over
multiple lines just to make it easier to read.

Filtering
---------

We’ve seen how to look only at certain columns of the table but it is
often useful to only look at certain rows in a table. For example, we
could want to look only at the top selling games that have been released
since you’ve been playing video games. Let’s say you’ve been playing
since 2010:

.. code:: ipython3

    %%sql
    
    SELECT rank, name, year, publisher, platform
    FROM vgsale
    WHERE year >= 2010 
    LIMIT 20;



.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Year</th>
            <th>Publisher</th>
            <th>Platform</th>
        </tr>
        <tr>
            <td>16</td>
            <td>Kinect Adventures!</td>
            <td>2010.0</td>
            <td>Microsoft Game Studios</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>17</td>
            <td>Grand Theft Auto V</td>
            <td>2013.0</td>
            <td>Take-Two Interactive</td>
            <td>PS3</td>
        </tr>
        <tr>
            <td>24</td>
            <td>Grand Theft Auto V</td>
            <td>2013.0</td>
            <td>Take-Two Interactive</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>27</td>
            <td>Pokemon Black/Pokemon White</td>
            <td>2010.0</td>
            <td>Nintendo</td>
            <td>DS</td>
        </tr>
        <tr>
            <td>30</td>
            <td>Call of Duty: Modern Warfare 3</td>
            <td>2011.0</td>
            <td>Activision</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>32</td>
            <td>Call of Duty: Black Ops</td>
            <td>2010.0</td>
            <td>Activision</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>33</td>
            <td>Pokemon X/Pokemon Y</td>
            <td>2013.0</td>
            <td>Nintendo</td>
            <td>3DS</td>
        </tr>
        <tr>
            <td>34</td>
            <td>Call of Duty: Black Ops 3</td>
            <td>2015.0</td>
            <td>Activision</td>
            <td>PS4</td>
        </tr>
        <tr>
            <td>35</td>
            <td>Call of Duty: Black Ops II</td>
            <td>2012.0</td>
            <td>Activision</td>
            <td>PS3</td>
        </tr>
        <tr>
            <td>36</td>
            <td>Call of Duty: Black Ops II</td>
            <td>2012.0</td>
            <td>Activision</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>38</td>
            <td>Call of Duty: Modern Warfare 3</td>
            <td>2011.0</td>
            <td>Activision</td>
            <td>PS3</td>
        </tr>
        <tr>
            <td>41</td>
            <td>Call of Duty: Black Ops</td>
            <td>2010.0</td>
            <td>Activision</td>
            <td>PS3</td>
        </tr>
        <tr>
            <td>43</td>
            <td>Mario Kart 7</td>
            <td>2011.0</td>
            <td>Nintendo</td>
            <td>3DS</td>
        </tr>
        <tr>
            <td>45</td>
            <td>Grand Theft Auto V</td>
            <td>2014.0</td>
            <td>Take-Two Interactive</td>
            <td>PS4</td>
        </tr>
        <tr>
            <td>50</td>
            <td>Pokemon Omega Ruby/Pokemon Alpha Sapphire</td>
            <td>2014.0</td>
            <td>Nintendo</td>
            <td>3DS</td>
        </tr>
        <tr>
            <td>54</td>
            <td>Super Mario 3D Land</td>
            <td>2011.0</td>
            <td>Nintendo</td>
            <td>3DS</td>
        </tr>
        <tr>
            <td>55</td>
            <td>Gran Turismo 5</td>
            <td>2010.0</td>
            <td>Sony Computer Entertainment</td>
            <td>PS3</td>
        </tr>
        <tr>
            <td>61</td>
            <td>Just Dance 3</td>
            <td>2011.0</td>
            <td>Ubisoft</td>
            <td>Wii</td>
        </tr>
        <tr>
            <td>62</td>
            <td>Call of Duty: Ghosts</td>
            <td>2013.0</td>
            <td>Activision</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>63</td>
            <td>Halo: Reach</td>
            <td>2010.0</td>
            <td>Microsoft Game Studios</td>
            <td>X360</td>
        </tr>
    </table>



It’s also possible to filter by multiple criteria. For example to look
at only XBox 360 games released since 2010:

.. code:: ipython3

    %%sql
    SELECT rank, name, year, publisher, platform
    FROM vgsale
    WHERE year >= 2010
    AND platform = 'X360'
    LIMIT 20


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Year</th>
            <th>Publisher</th>
            <th>Platform</th>
        </tr>
        <tr>
            <td>16</td>
            <td>Kinect Adventures!</td>
            <td>2010.0</td>
            <td>Microsoft Game Studios</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>24</td>
            <td>Grand Theft Auto V</td>
            <td>2013.0</td>
            <td>Take-Two Interactive</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>30</td>
            <td>Call of Duty: Modern Warfare 3</td>
            <td>2011.0</td>
            <td>Activision</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>32</td>
            <td>Call of Duty: Black Ops</td>
            <td>2010.0</td>
            <td>Activision</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>36</td>
            <td>Call of Duty: Black Ops II</td>
            <td>2012.0</td>
            <td>Activision</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>62</td>
            <td>Call of Duty: Ghosts</td>
            <td>2013.0</td>
            <td>Activision</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>63</td>
            <td>Halo: Reach</td>
            <td>2010.0</td>
            <td>Microsoft Game Studios</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>66</td>
            <td>Halo 4</td>
            <td>2012.0</td>
            <td>Microsoft Game Studios</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>73</td>
            <td>Minecraft</td>
            <td>2013.0</td>
            <td>Microsoft Game Studios</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>76</td>
            <td>The Elder Scrolls V: Skyrim</td>
            <td>2011.0</td>
            <td>Bethesda Softworks</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>100</td>
            <td>Battlefield 3</td>
            <td>2011.0</td>
            <td>Electronic Arts</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>135</td>
            <td>Red Dead Redemption</td>
            <td>2010.0</td>
            <td>Take-Two Interactive</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>140</td>
            <td>Kinect Sports</td>
            <td>2010.0</td>
            <td>Microsoft Game Studios</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>141</td>
            <td>Gears of War 3</td>
            <td>2011.0</td>
            <td>Microsoft Game Studios</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>173</td>
            <td>Assassin&#x27;s Creed III</td>
            <td>2012.0</td>
            <td>Ubisoft</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>186</td>
            <td>FIFA Soccer 13</td>
            <td>2012.0</td>
            <td>Electronic Arts</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>193</td>
            <td>Fable III</td>
            <td>2010.0</td>
            <td>Microsoft Game Studios</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>223</td>
            <td>Batman: Arkham City</td>
            <td>2011.0</td>
            <td>Warner Bros. Interactive Entertainment</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>229</td>
            <td>Forza Motorsport 4</td>
            <td>2011.0</td>
            <td>Microsoft Game Studios</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>257</td>
            <td>FIFA 14</td>
            <td>2013.0</td>
            <td>Electronic Arts</td>
            <td>X360</td>
        </tr>
    </table>



Exercise 1
~~~~~~~~~~

Figure out how to get the 20 best-selling games published by Nintendo
whose genre is ‘Platform’.

.. code:: ipython3

    %%sql
    SELECT rank, name FROM vgsale
    WHERE publisher = 'Nintendo' AND genre='Platform'
    LIMIT 20


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Rank</th>
            <th>Name</th>
        </tr>
        <tr>
            <td>2</td>
            <td>Super Mario Bros.</td>
        </tr>
        <tr>
            <td>7</td>
            <td>New Super Mario Bros.</td>
        </tr>
        <tr>
            <td>9</td>
            <td>New Super Mario Bros. Wii</td>
        </tr>
        <tr>
            <td>19</td>
            <td>Super Mario World</td>
        </tr>
        <tr>
            <td>22</td>
            <td>Super Mario Land</td>
        </tr>
        <tr>
            <td>23</td>
            <td>Super Mario Bros. 3</td>
        </tr>
        <tr>
            <td>47</td>
            <td>Super Mario 64</td>
        </tr>
        <tr>
            <td>49</td>
            <td>Super Mario Galaxy</td>
        </tr>
        <tr>
            <td>54</td>
            <td>Super Mario 3D Land</td>
        </tr>
        <tr>
            <td>58</td>
            <td>Super Mario All-Stars</td>
        </tr>
        <tr>
            <td>60</td>
            <td>Super Mario 64</td>
        </tr>
        <tr>
            <td>65</td>
            <td>New Super Mario Bros. 2</td>
        </tr>
        <tr>
            <td>72</td>
            <td>Donkey Kong Country</td>
        </tr>
        <tr>
            <td>92</td>
            <td>Super Mario Galaxy 2</td>
        </tr>
        <tr>
            <td>97</td>
            <td>Super Mario Bros. 2</td>
        </tr>
        <tr>
            <td>126</td>
            <td>Donkey Kong Country Returns</td>
        </tr>
        <tr>
            <td>136</td>
            <td>Super Mario Sunshine</td>
        </tr>
        <tr>
            <td>163</td>
            <td>Super Mario Advance</td>
        </tr>
        <tr>
            <td>165</td>
            <td>Super Mario World</td>
        </tr>
        <tr>
            <td>176</td>
            <td>Donkey Kong 64</td>
        </tr>
    </table>



Sorting
-------

So far, we’ve only looked at highest-ranked games and, since the table
lists them first, we’ve been able to look at the top 10 or 20 just by
setting a ``LIMIT``. What if the data aren’t in the order that we want
to see them in? We use the ``ORDER BY`` command to sort them by some
other criteria.

For example, to see the games in the order in which they were published,
we could run:

.. code:: ipython3

    %%sql
    
    SELECT name, year, publisher, global_sales
    FROM vgsale 
    ORDER BY year 
    LIMIT 10


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Publisher</th>
            <th>Global_Sales</th>
        </tr>
        <tr>
            <td>Madden NFL 2004</td>
            <td>None</td>
            <td>Electronic Arts</td>
            <td>5.23</td>
        </tr>
        <tr>
            <td>FIFA Soccer 2004</td>
            <td>None</td>
            <td>Electronic Arts</td>
            <td>3.49</td>
        </tr>
        <tr>
            <td>LEGO Batman: The Videogame</td>
            <td>None</td>
            <td>Warner Bros. Interactive Entertainment</td>
            <td>3.17</td>
        </tr>
        <tr>
            <td>wwe Smackdown vs. Raw 2006</td>
            <td>None</td>
            <td>None</td>
            <td>3.0</td>
        </tr>
        <tr>
            <td>Space Invaders</td>
            <td>None</td>
            <td>Atari</td>
            <td>2.53</td>
        </tr>
        <tr>
            <td>Rock Band</td>
            <td>None</td>
            <td>Electronic Arts</td>
            <td>2.48</td>
        </tr>
        <tr>
            <td>Frogger&#x27;s Adventures: Temple of the Frog</td>
            <td>None</td>
            <td>Konami Digital Entertainment</td>
            <td>2.39</td>
        </tr>
        <tr>
            <td>LEGO Indiana Jones: The Original Adventures</td>
            <td>None</td>
            <td>LucasArts</td>
            <td>2.39</td>
        </tr>
        <tr>
            <td>Call of Duty 3</td>
            <td>None</td>
            <td>Activision</td>
            <td>2.26</td>
        </tr>
        <tr>
            <td>Rock Band</td>
            <td>None</td>
            <td>MTV Games</td>
            <td>2.11</td>
        </tr>
    </table>



Of course, we can mix ``WHERE`` and ``ORDER BY``, to get only the more
recent games in the order they were published.

.. code:: ipython3

    %%sql
    SELECT name, year, publisher, global_sales
    FROM vgsale 
    WHERE year > 2015
    ORDER BY year 
    LIMIT 10


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Publisher</th>
            <th>Global_Sales</th>
        </tr>
        <tr>
            <td>FIFA 17</td>
            <td>2016.0</td>
            <td>Electronic Arts</td>
            <td>4.77</td>
        </tr>
        <tr>
            <td>Uncharted 4: A Thief&#x27;s End</td>
            <td>2016.0</td>
            <td>Sony Computer Entertainment</td>
            <td>4.2</td>
        </tr>
        <tr>
            <td>Tom Clancy&#x27;s The Division</td>
            <td>2016.0</td>
            <td>Ubisoft</td>
            <td>3.61</td>
        </tr>
        <tr>
            <td>Far Cry: Primal</td>
            <td>2016.0</td>
            <td>Ubisoft</td>
            <td>2.13</td>
        </tr>
        <tr>
            <td>Tom Clancy&#x27;s The Division</td>
            <td>2016.0</td>
            <td>Ubisoft</td>
            <td>2.01</td>
        </tr>
        <tr>
            <td>Overwatch</td>
            <td>2016.0</td>
            <td>Activision</td>
            <td>1.73</td>
        </tr>
        <tr>
            <td>No Man&#x27;s Sky</td>
            <td>2016.0</td>
            <td>Hello Games</td>
            <td>1.6</td>
        </tr>
        <tr>
            <td>Dark Souls III</td>
            <td>2016.0</td>
            <td>Namco Bandai Games</td>
            <td>1.56</td>
        </tr>
        <tr>
            <td>FIFA 17</td>
            <td>2016.0</td>
            <td>Electronic Arts</td>
            <td>1.53</td>
        </tr>
        <tr>
            <td>Doom (2016)</td>
            <td>2016.0</td>
            <td>Bethesda Softworks</td>
            <td>1.39</td>
        </tr>
    </table>



Exercise 2
~~~~~~~~~~

Get the names and platforms of all the games published in 2014 in
alphabetical order of their names (note that computers sort numbers
before letters so you’ll get some games whose name starts with some
numbers before the first ‘A’ game).

.. code:: ipython3

    %%sql
    
    SELECT name, platform
    FROM vgsale
    WHERE year = 2014
    ORDER BY name
    LIMIT 20



.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Name</th>
            <th>Platform</th>
        </tr>
        <tr>
            <td>12-Sai. Honto no Kimochi</td>
            <td>3DS</td>
        </tr>
        <tr>
            <td>2014 FIFA World Cup Brazil</td>
            <td>PS3</td>
        </tr>
        <tr>
            <td>2014 FIFA World Cup Brazil</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>3rd Super Robot Wars Z Jigoku Hen</td>
            <td>PS3</td>
        </tr>
        <tr>
            <td>3rd Super Robot Wars Z Jigoku Hen</td>
            <td>PSV</td>
        </tr>
        <tr>
            <td>A-Train: City Simulator</td>
            <td>3DS</td>
        </tr>
        <tr>
            <td>AMNESIA World</td>
            <td>PSV</td>
        </tr>
        <tr>
            <td>Adventure Time: The Secret of the Nameless</td>
            <td>3DS</td>
        </tr>
        <tr>
            <td>Adventure Time: The Secret of the Nameless</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>Adventure Time: The Secret of the Nameless Kingdom</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>Adventure Time: The Secret of the Nameless Kingdom</td>
            <td>3DS</td>
        </tr>
        <tr>
            <td>Aikatsu! 365 Idol Days</td>
            <td>3DS</td>
        </tr>
        <tr>
            <td>Akiba&#x27;s Trip: Undead &amp; Undressed</td>
            <td>PS4</td>
        </tr>
        <tr>
            <td>Alien: Isolation</td>
            <td>PS4</td>
        </tr>
        <tr>
            <td>Alien: Isolation</td>
            <td>XOne</td>
        </tr>
        <tr>
            <td>Alien: Isolation</td>
            <td>PS3</td>
        </tr>
        <tr>
            <td>Alien: Isolation</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>Alien: Isolation</td>
            <td>PC</td>
        </tr>
        <tr>
            <td>Amagami</td>
            <td>PSV</td>
        </tr>
        <tr>
            <td>Amnesia Later</td>
            <td>PSV</td>
        </tr>
    </table>



Aggregation
-----------

One very powerful feature of SQL is that it allows us to create summary
information by grouping rows together. For example, we could ask
ourselves which publishers have published games that have sold more than
10 million copies and how many such games did they make?

.. code:: ipython3

    %%sql
    SELECT publisher, COUNT(*) 
    FROM vgsale 
    WHERE global_sales > 10 
    GROUP BY publisher 


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Publisher</th>
            <th>COUNT(*)</th>
        </tr>
        <tr>
            <td>Activision</td>
            <td>10</td>
        </tr>
        <tr>
            <td>Microsoft Game Studios</td>
            <td>2</td>
        </tr>
        <tr>
            <td>Nintendo</td>
            <td>37</td>
        </tr>
        <tr>
            <td>Sony Computer Entertainment</td>
            <td>4</td>
        </tr>
        <tr>
            <td>Take-Two Interactive</td>
            <td>8</td>
        </tr>
        <tr>
            <td>Ubisoft</td>
            <td>1</td>
        </tr>
    </table>



``GROUP BY publisher`` takes all the rows with a given publisher and
produces a single row in the result. This means that we need to tell SQL
how we want to combine the other columns’ values into a single row. The
above example uses ``COUNT (*)`` which reports of the number of rows
that were combined.

Let’s take a closer look at the 4 rows for Sony:

.. code:: ipython3

    %%sql
    SELECT * 
    FROM vgsale 
    WHERE global_sales > 10 
    AND publisher = 'Sony Computer Entertainment'


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>index</th>
            <th>Rank</th>
            <th>Name</th>
            <th>Platform</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Publisher</th>
            <th>NA_Sales</th>
            <th>EU_Sales</th>
            <th>JP_Sales</th>
            <th>Other_Sales</th>
            <th>Global_Sales</th>
        </tr>
        <tr>
            <td>28</td>
            <td>29</td>
            <td>Gran Turismo 3: A-Spec</td>
            <td>PS2</td>
            <td>2001.0</td>
            <td>Racing</td>
            <td>Sony Computer Entertainment</td>
            <td>6.85</td>
            <td>5.09</td>
            <td>1.87</td>
            <td>1.16</td>
            <td>14.98</td>
        </tr>
        <tr>
            <td>47</td>
            <td>48</td>
            <td>Gran Turismo 4</td>
            <td>PS2</td>
            <td>2004.0</td>
            <td>Racing</td>
            <td>Sony Computer Entertainment</td>
            <td>3.01</td>
            <td>0.01</td>
            <td>1.1</td>
            <td>7.53</td>
            <td>11.66</td>
        </tr>
        <tr>
            <td>52</td>
            <td>53</td>
            <td>Gran Turismo</td>
            <td>PS</td>
            <td>1997.0</td>
            <td>Racing</td>
            <td>Sony Computer Entertainment</td>
            <td>4.02</td>
            <td>3.87</td>
            <td>2.54</td>
            <td>0.52</td>
            <td>10.95</td>
        </tr>
        <tr>
            <td>54</td>
            <td>55</td>
            <td>Gran Turismo 5</td>
            <td>PS3</td>
            <td>2010.0</td>
            <td>Racing</td>
            <td>Sony Computer Entertainment</td>
            <td>2.96</td>
            <td>4.88</td>
            <td>0.81</td>
            <td>2.12</td>
            <td>10.77</td>
        </tr>
    </table>



Aggregating the values for ``publisher`` is not hard, since they’re all
the same, SQL just gives us a single copy of the publisher name. Other
columns, we need to either ignore (causing them to be omitted from the
output) or specify a way to aggregate them.

If we don’t specify a way to aggregate the value, SQL will complain. For
example, the following query should fail:

.. code:: ipython3

    %%sql
    SELECT publisher, genre
    FROM vgsale
    WHERE global_sales > 10 
    GROUP BY publisher 


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Publisher</th>
            <th>Genre</th>
        </tr>
        <tr>
            <td>Activision</td>
            <td>Shooter</td>
        </tr>
        <tr>
            <td>Microsoft Game Studios</td>
            <td>Shooter</td>
        </tr>
        <tr>
            <td>Nintendo</td>
            <td>Platform</td>
        </tr>
        <tr>
            <td>Sony Computer Entertainment</td>
            <td>Racing</td>
        </tr>
        <tr>
            <td>Take-Two Interactive</td>
            <td>Action</td>
        </tr>
        <tr>
            <td>Ubisoft</td>
            <td>Misc</td>
        </tr>
    </table>



Even though genre is all ‘Racing’ for Sony, SQL doesn’t know how to
combine the values and errors out.

We must specify an aggregate function for any column that we ``SELECT``
in our query (except the column that we’re grouping by) in order for the
command to succeed.

There are `many such
functions <https://www.postgresql.org/docs/9.5/functions-aggregate.html>`__.
Some common ones include:

-  ``SUM``: To add the values together
-  ``AVG``: To compute the mean of the values
-  ``MIN`` or ``MAX``: To compute the minimum and maximum respectively

So we could for example compute the total number of copies of these
top-selling games that were sold by running:

.. code:: ipython3

    %%sql
    SELECT publisher, SUM(global_sales)
    FROM vgsale
    WHERE global_sales > 10 
    GROUP BY publisher 


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Publisher</th>
            <th>SUM(global_sales)</th>
        </tr>
        <tr>
            <td>Activision</td>
            <td>132.0</td>
        </tr>
        <tr>
            <td>Microsoft Game Studios</td>
            <td>33.96</td>
        </tr>
        <tr>
            <td>Nintendo</td>
            <td>793.0499999999998</td>
        </tr>
        <tr>
            <td>Sony Computer Entertainment</td>
            <td>48.36</td>
        </tr>
        <tr>
            <td>Take-Two Interactive</td>
            <td>121.40999999999997</td>
        </tr>
        <tr>
            <td>Ubisoft</td>
            <td>10.26</td>
        </tr>
    </table>



Note that this does not mean that Nintendo has sold a total of 793
million games in total. This means that Nintendo has sold 793 million
copies of its games that sold more than 10 million copies.

The ``WHERE global_sales > 10`` portion of the query removes all games
that sold 10 million copies or less BEFORE the grouping happens so those
games are excluded from the result.

If we wish to filter the results AFTER the grouping happens, we need to
use the ``HAVING`` command. For example, to see all publishers that have
sold a total of 50 million games or more we would run:

.. code:: ipython3

    %%sql
    SELECT publisher, SUM(global_sales)
    FROM vgsale
    GROUP BY publisher
    HAVING SUM(global_sales) >= 50 


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Publisher</th>
            <th>SUM(global_sales)</th>
        </tr>
        <tr>
            <td>505 Games</td>
            <td>55.91000000000003</td>
        </tr>
        <tr>
            <td>Acclaim Entertainment</td>
            <td>64.13999999999997</td>
        </tr>
        <tr>
            <td>Activision</td>
            <td>727.4599999999983</td>
        </tr>
        <tr>
            <td>Atari</td>
            <td>157.22000000000025</td>
        </tr>
        <tr>
            <td>Bethesda Softworks</td>
            <td>82.14000000000003</td>
        </tr>
        <tr>
            <td>Capcom</td>
            <td>200.89000000000001</td>
        </tr>
        <tr>
            <td>Disney Interactive Studios</td>
            <td>119.96000000000004</td>
        </tr>
        <tr>
            <td>Eidos Interactive</td>
            <td>98.97999999999998</td>
        </tr>
        <tr>
            <td>Electronic Arts</td>
            <td>1110.3199999999915</td>
        </tr>
        <tr>
            <td>Konami Digital Entertainment</td>
            <td>283.639999999998</td>
        </tr>
        <tr>
            <td>LucasArts</td>
            <td>87.34000000000003</td>
        </tr>
        <tr>
            <td>Microsoft Game Studios</td>
            <td>245.79000000000005</td>
        </tr>
        <tr>
            <td>Midway Games</td>
            <td>69.84999999999994</td>
        </tr>
        <tr>
            <td>Namco Bandai Games</td>
            <td>254.0900000000008</td>
        </tr>
        <tr>
            <td>Nintendo</td>
            <td>1786.5599999999981</td>
        </tr>
        <tr>
            <td>Sega</td>
            <td>272.98999999999927</td>
        </tr>
        <tr>
            <td>Sony Computer Entertainment</td>
            <td>607.4999999999989</td>
        </tr>
        <tr>
            <td>Square Enix</td>
            <td>145.18000000000026</td>
        </tr>
        <tr>
            <td>SquareSoft</td>
            <td>57.65</td>
        </tr>
        <tr>
            <td>THQ</td>
            <td>340.7699999999994</td>
        </tr>
        <tr>
            <td>Take-Two Interactive</td>
            <td>399.5399999999996</td>
        </tr>
        <tr>
            <td>Tecmo Koei</td>
            <td>53.55000000000003</td>
        </tr>
        <tr>
            <td>Ubisoft</td>
            <td>474.71999999999935</td>
        </tr>
        <tr>
            <td>Vivendi Games</td>
            <td>58.21000000000002</td>
        </tr>
        <tr>
            <td>Warner Bros. Interactive Entertainment</td>
            <td>153.89000000000013</td>
        </tr>
    </table>



Nintendo sales are now totalling 1786 million. That means that nearly 1
billion of their sales came from titles that didn’t sell 10 million
copies (1786 million total - 793 million from the previous query).

Exercise 3
~~~~~~~~~~

Compute the average number of games sold by Nintendo each year (of
publication) and list them in chronological order.

.. code:: ipython3

    %%sql
    SELECT year, AVG(global_sales)
    FROM vgsale
    WHERE publisher = 'Nintendo'
    GROUP BY year
    ORDER BY year


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Year</th>
            <th>AVG(global_sales)</th>
        </tr>
        <tr>
            <td>None</td>
            <td>0.3042857142857143</td>
        </tr>
        <tr>
            <td>1983.0</td>
            <td>1.8266666666666664</td>
        </tr>
        <tr>
            <td>1984.0</td>
            <td>5.062222222222223</td>
        </tr>
        <tr>
            <td>1985.0</td>
            <td>7.135714285714286</td>
        </tr>
        <tr>
            <td>1986.0</td>
            <td>2.6966666666666668</td>
        </tr>
        <tr>
            <td>1987.0</td>
            <td>2.9875000000000003</td>
        </tr>
        <tr>
            <td>1988.0</td>
            <td>6.073333333333334</td>
        </tr>
        <tr>
            <td>1989.0</td>
            <td>7.097777777777779</td>
        </tr>
        <tr>
            <td>1990.0</td>
            <td>5.07</td>
        </tr>
        <tr>
            <td>1991.0</td>
            <td>1.2284615384615385</td>
        </tr>
        <tr>
            <td>1992.0</td>
            <td>3.810999999999999</td>
        </tr>
        <tr>
            <td>1993.0</td>
            <td>2.2266666666666666</td>
        </tr>
        <tr>
            <td>1994.0</td>
            <td>3.12375</td>
        </tr>
        <tr>
            <td>1995.0</td>
            <td>1.6719999999999995</td>
        </tr>
        <tr>
            <td>1996.0</td>
            <td>4.3352941176470585</td>
        </tr>
        <tr>
            <td>1997.0</td>
            <td>1.9846153846153847</td>
        </tr>
        <tr>
            <td>1998.0</td>
            <td>2.8476470588235294</td>
        </tr>
        <tr>
            <td>1999.0</td>
            <td>3.2665000000000006</td>
        </tr>
        <tr>
            <td>2000.0</td>
            <td>1.4804347826086959</td>
        </tr>
        <tr>
            <td>2001.0</td>
            <td>2.062272727272728</td>
        </tr>
        <tr>
            <td>2002.0</td>
            <td>2.1959090909090904</td>
        </tr>
        <tr>
            <td>2003.0</td>
            <td>1.4125925925925924</td>
        </tr>
        <tr>
            <td>2004.0</td>
            <td>1.0640350877192986</td>
        </tr>
        <tr>
            <td>2005.0</td>
            <td>2.8326666666666664</td>
        </tr>
        <tr>
            <td>2006.0</td>
            <td>3.8794339622641507</td>
        </tr>
        <tr>
            <td>2007.0</td>
            <td>2.4804761904761907</td>
        </tr>
        <tr>
            <td>2008.0</td>
            <td>2.8506250000000013</td>
        </tr>
        <tr>
            <td>2009.0</td>
            <td>4.0278125</td>
        </tr>
        <tr>
            <td>2010.0</td>
            <td>2.1810714285714288</td>
        </tr>
        <tr>
            <td>2011.0</td>
            <td>1.981923076923077</td>
        </tr>
        <tr>
            <td>2012.0</td>
            <td>1.8216129032258066</td>
        </tr>
        <tr>
            <td>2013.0</td>
            <td>2.295217391304348</td>
        </tr>
        <tr>
            <td>2014.0</td>
            <td>2.4324999999999997</td>
        </tr>
        <tr>
            <td>2015.0</td>
            <td>0.8462500000000001</td>
        </tr>
        <tr>
            <td>2016.0</td>
            <td>0.347</td>
        </tr>
    </table>



Exercise 3 (continued)
~~~~~~~~~~~~~~~~~~~~~~

List the years in which Sports game (genre) have sold more than 60
million copies and the number of those games sold that year (Hint:
you’ll need to use both ``WHERE`` and ``HAVING``)

.. code:: ipython3

    %%sql
    SELECT year, SUM(global_sales)
    FROM vgsale
    WHERE genre='Sports'
    GROUP BY year
    HAVING SUM(global_sales) > 60
    ORDER BY year


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Year</th>
            <th>SUM(global_sales)</th>
        </tr>
        <tr>
            <td>2002.0</td>
            <td>65.41999999999999</td>
        </tr>
        <tr>
            <td>2004.0</td>
            <td>63.68000000000003</td>
        </tr>
        <tr>
            <td>2006.0</td>
            <td>136.16000000000003</td>
        </tr>
        <tr>
            <td>2007.0</td>
            <td>98.20000000000002</td>
        </tr>
        <tr>
            <td>2008.0</td>
            <td>95.33999999999996</td>
        </tr>
        <tr>
            <td>2009.0</td>
            <td>138.5200000000001</td>
        </tr>
        <tr>
            <td>2010.0</td>
            <td>92.53</td>
        </tr>
    </table>



Joining
-------

It is frequently the case that the data we need is spread across
multiple tables in our database. For example, we might want to store
information about the number of gaming units of each platform that have
been sold and we could store that in a table called ``platformsale``.

.. code:: ipython3

    %%sql
    select * from platformsale limit 10


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>index</th>
            <th>Platform</th>
            <th>Firm</th>
            <th>Released_year</th>
            <th>Units_sold</th>
            <th>platform_abbreviation</th>
        </tr>
        <tr>
            <td>0</td>
            <td>PlayStation 2</td>
            <td>Sony</td>
            <td>2000</td>
            <td>155.0</td>
            <td>PS2</td>
        </tr>
        <tr>
            <td>1</td>
            <td>Nintendo DS</td>
            <td>Nintendo</td>
            <td>2004</td>
            <td>154.02</td>
            <td>DS</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Game Boy</td>
            <td>Nintendo</td>
            <td>1989</td>
            <td>118.69</td>
            <td>GB</td>
        </tr>
        <tr>
            <td>3</td>
            <td>PlayStation</td>
            <td>Sony</td>
            <td>1994</td>
            <td>102.49</td>
            <td>PS</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Wii</td>
            <td>Nintendo</td>
            <td>2006</td>
            <td>101.63</td>
            <td>Wii</td>
        </tr>
        <tr>
            <td>5</td>
            <td>PlayStation 4</td>
            <td>Sony</td>
            <td>2013</td>
            <td>86.1</td>
            <td>PS4</td>
        </tr>
        <tr>
            <td>6</td>
            <td>Xbox 360</td>
            <td>Microsoft</td>
            <td>2005</td>
            <td>84.0</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>7</td>
            <td>PlayStation 3</td>
            <td>Sony</td>
            <td>2006</td>
            <td>83.8</td>
            <td>PS3</td>
        </tr>
        <tr>
            <td>8</td>
            <td>PlayStation Portable</td>
            <td>Sony</td>
            <td>2004</td>
            <td>82.0</td>
            <td>PSP</td>
        </tr>
        <tr>
            <td>9</td>
            <td>Game Boy Advance</td>
            <td>Nintendo</td>
            <td>2001</td>
            <td>81.51</td>
            <td>GBA</td>
        </tr>
    </table>



This means that we now have the data to answer questions like “What
percentage of Wii had Wii Sports installed?” but the data are spread
across two tables?

We could imagine storing the ``units_sold`` column in our ``vgsale``
table since we list the platform for each game but there are a few
important reasons why that’s a bad idea:

1. We would waste space by duplicating data (not a big deal for this
   example but a real concern for large systems)
2. Updating data (for example new Xbox 360 sales numbers since that
   system is still on sale) would require updating each row in
   ``vgsale`` that refers to that platform. This is time-consuming and
   error-prone.

Instead we leave the data in two separate tables and need a way to
‘join’ the values together. We can do that by just listing multiple
table names but the result is a mess:

.. code:: ipython3

    %%sql 
    SELECT *
    FROM vgsale, platformsale
    LIMIT 10


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>index</th>
            <th>Rank</th>
            <th>Name</th>
            <th>Platform</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Publisher</th>
            <th>NA_Sales</th>
            <th>EU_Sales</th>
            <th>JP_Sales</th>
            <th>Other_Sales</th>
            <th>Global_Sales</th>
            <th>index_1</th>
            <th>Platform_1</th>
            <th>Firm</th>
            <th>Released_year</th>
            <th>Units_sold</th>
            <th>platform_abbreviation</th>
        </tr>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>Wii Sports</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>41.49</td>
            <td>29.02</td>
            <td>3.77</td>
            <td>8.46</td>
            <td>82.74</td>
            <td>0</td>
            <td>PlayStation 2</td>
            <td>Sony</td>
            <td>2000</td>
            <td>155.0</td>
            <td>PS2</td>
        </tr>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>Wii Sports</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>41.49</td>
            <td>29.02</td>
            <td>3.77</td>
            <td>8.46</td>
            <td>82.74</td>
            <td>1</td>
            <td>Nintendo DS</td>
            <td>Nintendo</td>
            <td>2004</td>
            <td>154.02</td>
            <td>DS</td>
        </tr>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>Wii Sports</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>41.49</td>
            <td>29.02</td>
            <td>3.77</td>
            <td>8.46</td>
            <td>82.74</td>
            <td>2</td>
            <td>Game Boy</td>
            <td>Nintendo</td>
            <td>1989</td>
            <td>118.69</td>
            <td>GB</td>
        </tr>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>Wii Sports</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>41.49</td>
            <td>29.02</td>
            <td>3.77</td>
            <td>8.46</td>
            <td>82.74</td>
            <td>3</td>
            <td>PlayStation</td>
            <td>Sony</td>
            <td>1994</td>
            <td>102.49</td>
            <td>PS</td>
        </tr>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>Wii Sports</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>41.49</td>
            <td>29.02</td>
            <td>3.77</td>
            <td>8.46</td>
            <td>82.74</td>
            <td>4</td>
            <td>Wii</td>
            <td>Nintendo</td>
            <td>2006</td>
            <td>101.63</td>
            <td>Wii</td>
        </tr>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>Wii Sports</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>41.49</td>
            <td>29.02</td>
            <td>3.77</td>
            <td>8.46</td>
            <td>82.74</td>
            <td>5</td>
            <td>PlayStation 4</td>
            <td>Sony</td>
            <td>2013</td>
            <td>86.1</td>
            <td>PS4</td>
        </tr>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>Wii Sports</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>41.49</td>
            <td>29.02</td>
            <td>3.77</td>
            <td>8.46</td>
            <td>82.74</td>
            <td>6</td>
            <td>Xbox 360</td>
            <td>Microsoft</td>
            <td>2005</td>
            <td>84.0</td>
            <td>X360</td>
        </tr>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>Wii Sports</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>41.49</td>
            <td>29.02</td>
            <td>3.77</td>
            <td>8.46</td>
            <td>82.74</td>
            <td>7</td>
            <td>PlayStation 3</td>
            <td>Sony</td>
            <td>2006</td>
            <td>83.8</td>
            <td>PS3</td>
        </tr>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>Wii Sports</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>41.49</td>
            <td>29.02</td>
            <td>3.77</td>
            <td>8.46</td>
            <td>82.74</td>
            <td>8</td>
            <td>PlayStation Portable</td>
            <td>Sony</td>
            <td>2004</td>
            <td>82.0</td>
            <td>PSP</td>
        </tr>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>Wii Sports</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>41.49</td>
            <td>29.02</td>
            <td>3.77</td>
            <td>8.46</td>
            <td>82.74</td>
            <td>9</td>
            <td>Game Boy Advance</td>
            <td>Nintendo</td>
            <td>2001</td>
            <td>81.51</td>
            <td>GBA</td>
        </tr>
    </table>



If you look carefully you might notice that the rows are identical for
the first few columns and then start to differ after global sales.
That’s because SQL joins each row in the first table with each row in
the second table. With 16,598 rows in vgsales and 40 rows in
platformsale, we end up with a table of 663,920 row.

This rarely if ever what we want. In most cases, we want to match up
some aspect of the rows in the first table with some aspect of the rows
in the second table. In most cases, we want to match up based on some
column being equal.

In our video game example, the ``platform`` column of ``vgsale`` matches
up with the ``platform_abbreviation`` column of ``platformsale``. To
force this match, we filter out the ones that don’t have the same value
for both of these columns:

.. code:: ipython3

    %%sql 
    SELECT *
    FROM vgsale, platformsale
    WHERE vgsale.platform = platformsale.platform_abbreviation
    LIMIT 10



.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>index</th>
            <th>Rank</th>
            <th>Name</th>
            <th>Platform</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Publisher</th>
            <th>NA_Sales</th>
            <th>EU_Sales</th>
            <th>JP_Sales</th>
            <th>Other_Sales</th>
            <th>Global_Sales</th>
            <th>index_1</th>
            <th>Platform_1</th>
            <th>Firm</th>
            <th>Released_year</th>
            <th>Units_sold</th>
            <th>platform_abbreviation</th>
        </tr>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>Wii Sports</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>41.49</td>
            <td>29.02</td>
            <td>3.77</td>
            <td>8.46</td>
            <td>82.74</td>
            <td>4</td>
            <td>Wii</td>
            <td>Nintendo</td>
            <td>2006</td>
            <td>101.63</td>
            <td>Wii</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>Super Mario Bros.</td>
            <td>NES</td>
            <td>1985.0</td>
            <td>Platform</td>
            <td>Nintendo</td>
            <td>29.08</td>
            <td>3.58</td>
            <td>6.81</td>
            <td>0.77</td>
            <td>40.24</td>
            <td>11</td>
            <td>Nintendo Entertainment System</td>
            <td>Nintendo</td>
            <td>1983</td>
            <td>61.91</td>
            <td>NES</td>
        </tr>
        <tr>
            <td>2</td>
            <td>3</td>
            <td>Mario Kart Wii</td>
            <td>Wii</td>
            <td>2008.0</td>
            <td>Racing</td>
            <td>Nintendo</td>
            <td>15.85</td>
            <td>12.88</td>
            <td>3.79</td>
            <td>3.31</td>
            <td>35.82</td>
            <td>4</td>
            <td>Wii</td>
            <td>Nintendo</td>
            <td>2006</td>
            <td>101.63</td>
            <td>Wii</td>
        </tr>
        <tr>
            <td>3</td>
            <td>4</td>
            <td>Wii Sports Resort</td>
            <td>Wii</td>
            <td>2009.0</td>
            <td>Sports</td>
            <td>Nintendo</td>
            <td>15.75</td>
            <td>11.01</td>
            <td>3.28</td>
            <td>2.96</td>
            <td>33.0</td>
            <td>4</td>
            <td>Wii</td>
            <td>Nintendo</td>
            <td>2006</td>
            <td>101.63</td>
            <td>Wii</td>
        </tr>
        <tr>
            <td>4</td>
            <td>5</td>
            <td>Pokemon Red/Pokemon Blue</td>
            <td>GB</td>
            <td>1996.0</td>
            <td>Role-Playing</td>
            <td>Nintendo</td>
            <td>11.27</td>
            <td>8.89</td>
            <td>10.22</td>
            <td>1.0</td>
            <td>31.37</td>
            <td>2</td>
            <td>Game Boy</td>
            <td>Nintendo</td>
            <td>1989</td>
            <td>118.69</td>
            <td>GB</td>
        </tr>
        <tr>
            <td>5</td>
            <td>6</td>
            <td>Tetris</td>
            <td>GB</td>
            <td>1989.0</td>
            <td>Puzzle</td>
            <td>Nintendo</td>
            <td>23.2</td>
            <td>2.26</td>
            <td>4.22</td>
            <td>0.58</td>
            <td>30.26</td>
            <td>2</td>
            <td>Game Boy</td>
            <td>Nintendo</td>
            <td>1989</td>
            <td>118.69</td>
            <td>GB</td>
        </tr>
        <tr>
            <td>6</td>
            <td>7</td>
            <td>New Super Mario Bros.</td>
            <td>DS</td>
            <td>2006.0</td>
            <td>Platform</td>
            <td>Nintendo</td>
            <td>11.38</td>
            <td>9.23</td>
            <td>6.5</td>
            <td>2.9</td>
            <td>30.01</td>
            <td>1</td>
            <td>Nintendo DS</td>
            <td>Nintendo</td>
            <td>2004</td>
            <td>154.02</td>
            <td>DS</td>
        </tr>
        <tr>
            <td>7</td>
            <td>8</td>
            <td>Wii Play</td>
            <td>Wii</td>
            <td>2006.0</td>
            <td>Misc</td>
            <td>Nintendo</td>
            <td>14.03</td>
            <td>9.2</td>
            <td>2.93</td>
            <td>2.85</td>
            <td>29.02</td>
            <td>4</td>
            <td>Wii</td>
            <td>Nintendo</td>
            <td>2006</td>
            <td>101.63</td>
            <td>Wii</td>
        </tr>
        <tr>
            <td>8</td>
            <td>9</td>
            <td>New Super Mario Bros. Wii</td>
            <td>Wii</td>
            <td>2009.0</td>
            <td>Platform</td>
            <td>Nintendo</td>
            <td>14.59</td>
            <td>7.06</td>
            <td>4.7</td>
            <td>2.26</td>
            <td>28.62</td>
            <td>4</td>
            <td>Wii</td>
            <td>Nintendo</td>
            <td>2006</td>
            <td>101.63</td>
            <td>Wii</td>
        </tr>
        <tr>
            <td>9</td>
            <td>10</td>
            <td>Duck Hunt</td>
            <td>NES</td>
            <td>1984.0</td>
            <td>Shooter</td>
            <td>Nintendo</td>
            <td>26.93</td>
            <td>0.63</td>
            <td>0.28</td>
            <td>0.47</td>
            <td>28.31</td>
            <td>11</td>
            <td>Nintendo Entertainment System</td>
            <td>Nintendo</td>
            <td>1983</td>
            <td>61.91</td>
            <td>NES</td>
        </tr>
    </table>



Notice that the result looks more sensical: we end up with one row from
vgsale and the corresponding row from platformsale (copied multiple
times since there were only 40 rows in platform sale).

We can check the size of the resulting table by running:

.. code:: ipython3

    %%sql 
    SELECT COUNT(*)
    FROM vgsale, platformsale
    WHERE vgsale.platform = platformsale.platform_abbreviation



.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>COUNT(*)</th>
        </tr>
        <tr>
            <td>15616</td>
        </tr>
    </table>



Note that this is slightly smaller than the 16,000+ rows that we started
with in vgsales because games whose platform was not part of the list in
platformsale got removed by the ``WHERE`` clause.

You might also see some cases where the comma between the table names is
replaced with the keyword ``JOIN`` and ``WHERE`` is replaced with
``ON``. This is synonymous but sometimes preferred to make it clear that
you are joining two tables and that your filters are there to specify
how those tables are to be joined:

.. code:: ipython3

    %%sql 
    SELECT name, global_sales, platformsale.platform, units_sold 
    FROM vgsale JOIN platformsale 
    ON vgsale.platform = platformsale.platform_abbreviation
    LIMIT 10


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Name</th>
            <th>Global_Sales</th>
            <th>Platform</th>
            <th>Units_sold</th>
        </tr>
        <tr>
            <td>Wii Sports</td>
            <td>82.74</td>
            <td>Wii</td>
            <td>101.63</td>
        </tr>
        <tr>
            <td>Super Mario Bros.</td>
            <td>40.24</td>
            <td>Nintendo Entertainment System</td>
            <td>61.91</td>
        </tr>
        <tr>
            <td>Mario Kart Wii</td>
            <td>35.82</td>
            <td>Wii</td>
            <td>101.63</td>
        </tr>
        <tr>
            <td>Wii Sports Resort</td>
            <td>33.0</td>
            <td>Wii</td>
            <td>101.63</td>
        </tr>
        <tr>
            <td>Pokemon Red/Pokemon Blue</td>
            <td>31.37</td>
            <td>Game Boy</td>
            <td>118.69</td>
        </tr>
        <tr>
            <td>Tetris</td>
            <td>30.26</td>
            <td>Game Boy</td>
            <td>118.69</td>
        </tr>
        <tr>
            <td>New Super Mario Bros.</td>
            <td>30.01</td>
            <td>Nintendo DS</td>
            <td>154.02</td>
        </tr>
        <tr>
            <td>Wii Play</td>
            <td>29.02</td>
            <td>Wii</td>
            <td>101.63</td>
        </tr>
        <tr>
            <td>New Super Mario Bros. Wii</td>
            <td>28.62</td>
            <td>Wii</td>
            <td>101.63</td>
        </tr>
        <tr>
            <td>Duck Hunt</td>
            <td>28.31</td>
            <td>Nintendo Entertainment System</td>
            <td>61.91</td>
        </tr>
    </table>



We can now use all the SQL tools that we’ve learned on this combined
table. For example, to find out what percentage of possible units had
each game installed, we can run:

.. code:: ipython3

    %%sql 
    SELECT name, global_sales, platformsale.platform, units_sold, global_sales/units_sold AS sale_percentage 
    FROM vgsale JOIN platformsale 
    ON vgsale.platform = platformsale.platform_abbreviation
    WHERE units_sold is not null
    ORDER BY sale_percentage DESC
    LIMIT 10


.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Name</th>
            <th>Global_Sales</th>
            <th>Platform</th>
            <th>Units_sold</th>
            <th>sale_percentage</th>
        </tr>
        <tr>
            <td>Wii Sports</td>
            <td>82.74</td>
            <td>Wii</td>
            <td>101.63</td>
            <td>0.8141296861163042</td>
        </tr>
        <tr>
            <td>Super Mario Bros.</td>
            <td>40.24</td>
            <td>Nintendo Entertainment System</td>
            <td>61.91</td>
            <td>0.6499757712808917</td>
        </tr>
        <tr>
            <td>Mario Kart 8</td>
            <td>6.96</td>
            <td>Wii U</td>
            <td>13.56</td>
            <td>0.5132743362831859</td>
        </tr>
        <tr>
            <td>Duck Hunt</td>
            <td>28.31</td>
            <td>Nintendo Entertainment System</td>
            <td>61.91</td>
            <td>0.45727669197221776</td>
        </tr>
        <tr>
            <td>Super Mario World</td>
            <td>20.61</td>
            <td>Super Nintendo Entertainment System</td>
            <td>49.1</td>
            <td>0.41975560081466395</td>
        </tr>
        <tr>
            <td>New Super Mario Bros. U</td>
            <td>5.19</td>
            <td>Wii U</td>
            <td>13.56</td>
            <td>0.38274336283185845</td>
        </tr>
        <tr>
            <td>Super Smash Bros. for Wii U and 3DS</td>
            <td>5.02</td>
            <td>Wii U</td>
            <td>13.56</td>
            <td>0.37020648967551617</td>
        </tr>
        <tr>
            <td>Super Mario 64</td>
            <td>11.89</td>
            <td>Nintendo 64</td>
            <td>32.93</td>
            <td>0.361068934102642</td>
        </tr>
        <tr>
            <td>Halo 2</td>
            <td>8.49</td>
            <td>Xbox</td>
            <td>24.0</td>
            <td>0.35375</td>
        </tr>
        <tr>
            <td>Mario Kart Wii</td>
            <td>35.82</td>
            <td>Wii</td>
            <td>101.63</td>
            <td>0.35245498376463646</td>
        </tr>
    </table>



From this, we conclude that 81% of Wiis had a copy of Wii Sports and 42%
of Super Nintendos had Super Mario World.

Exercise 4
~~~~~~~~~~

Use ``JOIN`` to find the names of the games that were released in the
same year as their corresponding platform and that sold at least 10
million copies.

.. code:: ipython3

    %%sql 
    SELECT rank, name
    FROM vgsale JOIN platformsale 
    ON vgsale.platform = platformsale.platform_abbreviation
    WHERE year = released_year
    AND global_sales >= 10



.. parsed-literal::

     * sqlite:///vgsales.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>Rank</th>
            <th>Name</th>
        </tr>
        <tr>
            <td>1</td>
            <td>Wii Sports</td>
        </tr>
        <tr>
            <td>6</td>
            <td>Tetris</td>
        </tr>
        <tr>
            <td>8</td>
            <td>Wii Play</td>
        </tr>
        <tr>
            <td>19</td>
            <td>Super Mario World</td>
        </tr>
        <tr>
            <td>22</td>
            <td>Super Mario Land</td>
        </tr>
        <tr>
            <td>43</td>
            <td>Mario Kart 7</td>
        </tr>
        <tr>
            <td>47</td>
            <td>Super Mario 64</td>
        </tr>
        <tr>
            <td>54</td>
            <td>Super Mario 3D Land</td>
        </tr>
        <tr>
            <td>60</td>
            <td>Super Mario 64</td>
        </tr>
    </table>


