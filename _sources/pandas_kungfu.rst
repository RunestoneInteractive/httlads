
Pandas exercises
================

Before attempting this exercise, make sure you’ve read through the first
four pages of `Chapter
3 <https://jakevdp.github.io/PythonDataScienceHandbook/03.00-introduction-to-pandas.html>`__
of the Python Data Science Handbook.

We’re going to be using a dataset about movies to try out processing
some data with Pandas.

We start with some standard imports:

.. code:: ipython3

    import ast
    import pandas as pd
    import numpy as np

Then we load the data from a local file and checkout the data:

.. code:: ipython3

    df = pd.read_csv('movies_metadata.csv').dropna(axis=1, how='all')
    df.head()




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
          <th>belongs_to_collection</th>
          <th>budget</th>
          <th>genres</th>
          <th>homepage</th>
          <th>id</th>
          <th>imdb_id</th>
          <th>original_language</th>
          <th>original_title</th>
          <th>overview</th>
          <th>popularity</th>
          <th>...</th>
          <th>release_date</th>
          <th>revenue</th>
          <th>runtime</th>
          <th>spoken_languages</th>
          <th>status</th>
          <th>tagline</th>
          <th>title</th>
          <th>video</th>
          <th>vote_average</th>
          <th>vote_count</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>{'id': 10194, 'name': 'Toy Story Collection', ...</td>
          <td>30000000</td>
          <td>[{'id': 16, 'name': 'Animation'}, {'id': 35, '...</td>
          <td>http://toystory.disney.com/toy-story</td>
          <td>862.0</td>
          <td>tt0114709</td>
          <td>en</td>
          <td>Toy Story</td>
          <td>Led by Woody, Andy's toys live happily in his ...</td>
          <td>21.946943</td>
          <td>...</td>
          <td>1995-10-30</td>
          <td>373554033.0</td>
          <td>81.0</td>
          <td>[{'iso_639_1': 'en', 'name': 'English'}]</td>
          <td>Released</td>
          <td>NaN</td>
          <td>Toy Story</td>
          <td>False</td>
          <td>7.7</td>
          <td>5415.0</td>
        </tr>
        <tr>
          <th>1</th>
          <td>NaN</td>
          <td>65000000</td>
          <td>[{'id': 12, 'name': 'Adventure'}, {'id': 14, '...</td>
          <td>NaN</td>
          <td>8844.0</td>
          <td>tt0113497</td>
          <td>en</td>
          <td>Jumanji</td>
          <td>When siblings Judy and Peter discover an encha...</td>
          <td>17.015539</td>
          <td>...</td>
          <td>1995-12-15</td>
          <td>262797249.0</td>
          <td>104.0</td>
          <td>[{'iso_639_1': 'en', 'name': 'English'}, {'iso...</td>
          <td>Released</td>
          <td>Roll the dice and unleash the excitement!</td>
          <td>Jumanji</td>
          <td>False</td>
          <td>6.9</td>
          <td>2413.0</td>
        </tr>
        <tr>
          <th>2</th>
          <td>{'id': 119050, 'name': 'Grumpy Old Men Collect...</td>
          <td>0</td>
          <td>[{'id': 10749, 'name': 'Romance'}, {'id': 35, ...</td>
          <td>NaN</td>
          <td>15602.0</td>
          <td>tt0113228</td>
          <td>en</td>
          <td>Grumpier Old Men</td>
          <td>A family wedding reignites the ancient feud be...</td>
          <td>11.712900</td>
          <td>...</td>
          <td>1995-12-22</td>
          <td>0.0</td>
          <td>101.0</td>
          <td>[{'iso_639_1': 'en', 'name': 'English'}]</td>
          <td>Released</td>
          <td>Still Yelling. Still Fighting. Still Ready for...</td>
          <td>Grumpier Old Men</td>
          <td>False</td>
          <td>6.5</td>
          <td>92.0</td>
        </tr>
        <tr>
          <th>3</th>
          <td>NaN</td>
          <td>16000000</td>
          <td>[{'id': 35, 'name': 'Comedy'}, {'id': 18, 'nam...</td>
          <td>NaN</td>
          <td>31357.0</td>
          <td>tt0114885</td>
          <td>en</td>
          <td>Waiting to Exhale</td>
          <td>Cheated on, mistreated and stepped on, the wom...</td>
          <td>3.859495</td>
          <td>...</td>
          <td>1995-12-22</td>
          <td>81452156.0</td>
          <td>127.0</td>
          <td>[{'iso_639_1': 'en', 'name': 'English'}]</td>
          <td>Released</td>
          <td>Friends are the people who let you be yourself...</td>
          <td>Waiting to Exhale</td>
          <td>False</td>
          <td>6.1</td>
          <td>34.0</td>
        </tr>
        <tr>
          <th>4</th>
          <td>{'id': 96871, 'name': 'Father of the Bride Col...</td>
          <td>0</td>
          <td>[{'id': 35, 'name': 'Comedy'}]</td>
          <td>NaN</td>
          <td>11862.0</td>
          <td>tt0113041</td>
          <td>en</td>
          <td>Father of the Bride Part II</td>
          <td>Just when George Banks has recovered from his ...</td>
          <td>8.387519</td>
          <td>...</td>
          <td>1995-02-10</td>
          <td>76578911.0</td>
          <td>106.0</td>
          <td>[{'iso_639_1': 'en', 'name': 'English'}]</td>
          <td>Released</td>
          <td>Just When His World Is Back To Normal... He's ...</td>
          <td>Father of the Bride Part II</td>
          <td>False</td>
          <td>5.7</td>
          <td>173.0</td>
        </tr>
      </tbody>
    </table>
    <p>5 rows × 23 columns</p>
    </div>



Exploring the data
------------------

This dataset was obtained from
`Kaggle <https://www.kaggle.com/rounakbanik/the-movies-dataset/home>`__
who downloaded it through the TMDB API.

The movies available in this dataset are in correspondence with the
movies that are listed in the MovieLens Latest Full Dataset.

Let’s see what data we have:

.. code:: ipython3

    df.shape




.. parsed-literal::

    (45453, 23)



Twenty-three columns of data for over 45,000 movies is going be a lot to
look at but let’s start by looking at what the columns represent:

.. code:: ipython3

    df.columns




.. parsed-literal::

    Index(['belongs_to_collection', 'budget', 'genres', 'homepage', 'id',
           'imdb_id', 'original_language', 'original_title', 'overview',
           'popularity', 'poster_path', 'production_companies',
           'production_countries', 'release_date', 'revenue', 'runtime',
           'spoken_languages', 'status', 'tagline', 'title', 'video',
           'vote_average', 'vote_count'],
          dtype='object')



Here’s an explanation of each column: - **belongs_to_collection**: A
stringified dictionary that identifies the collection that a movie
belongs to (if any). - **budget**: The budget of the movie in dollars. -
**genres**: A stringified list of dictionaries that list out all the
genres associated with the movie. - **homepage**: The Official Homepage
of the movie. - **id**: An arbitrary ID for the movie. - **imdb_id**:
The IMDB ID of the movie. - **original_language**: The language in which
the movie was filmed. - **original_title**: The title of the movie in
its original language. - **overview**: A blurb of the movie. -
**popularity**: The Popularity Score assigned by TMDB. -
**poster_path**: The URL of the poster image (relative to
http://image.tmdb.org/t/p/w185/). - **production_companies**: A
stringified list of production companies involved with the making of the
movie. - **production_countries**: A stringified list of countries where
the movie was filmed or produced. - **release_date**: Theatrical release
date of the movie. - **revenue**: World-wide revenue of the movie in
dollars. - **runtime**: Duration of the movie in minutes. -
**spoken_languages**: A stringified list of spoken languages in the
film. - **status**: Released, To Be Released, Announced, etc. -
**tagline**: The tagline of the movie. - **title**: The official title
of the movie. - **video**: Indicates if there is a video present of the
movie with TMDB. - **vote_average**: The average rating of the movie on
TMDB. - **vote_count**: The number of votes by users, as counted by
TMDB.

Filtering the data
------------------

Let’s start by only looking at films that cost over a million dollars to
make.

Create a variable called ``budget_df`` that contains all columns for the
movies whose budget was over a million dollars.

.. code:: ipython3

    budget_df = df[df.budget>1000000]    ### SOLUTION
    budget_df.shape




.. parsed-literal::

    (7208, 23)



With this more manageable list of 7000+ movies, I’d like to have a way
to look up the budget of a particular movie.

Create a Series object called ``budget_lookup`` such that you are able
to use a call to ``budget_lookup['Dead Presidents']`` to find the budget
of that movie.

.. code:: ipython3

    budget_lookup = pd.Series(budget_df['budget'].values, index=budget_df['title'])    ### SOLUTION
    budget_lookup['Dead Presidents']




.. parsed-literal::

    10000000



I have figured out that the first (alphabetically) movie whose title
starts with an ‘A’ is ‘A Bag of Hammers’ and the last movie that starts
with a ‘B’ is ‘Byzantium’.

.. code:: ipython3

    budget_lookup[budget_lookup.index.str.startswith('A')].sort_index()[[0]]




.. parsed-literal::

    title
    A Bag of Hammers    2000000
    dtype: int64



.. code:: ipython3

    budget_lookup[budget_lookup.index.str.startswith('B')].sort_index()[[-1]]




.. parsed-literal::

    title
    Byzantium    10000000
    dtype: int64



Use that knowledge to create a series that contains budget informations
for all the movies that start with an ‘A’ or a ‘B’.

HINT: No need to use startswith like I did above, just use the movie
titles to do a slice.

.. code:: ipython3

    budget_lookup_as_and_bs = budget_lookup.sort_index()["A Bag of Hammers":"Byzantium"]   ### SOLUTION
    budget_lookup_as_and_bs.shape




.. parsed-literal::

    (933,)



Numbers as indices
------------------

Enough about movie budgets, it’s time to budget my time instead. Because
I schedule my day to the minute, I like to be able to look up movies by
their runtime. So that when I have a spare two hours and 34 minutes, I
can find all the movies that would fit precisely in that time slot
(popcorn-making time is budgeted separately).

Create a Series called ``time_scheduler`` that is indexed by runtime and
has the movie’s title as its values. Note that you will need to use
``sort_index()`` in order to be able to look up movies by their
duration.

While you’re at it, remove any movie that is less than 10 minutes (can’t
get into it if it’s too short) or longer than 3 hours (who’s got time
for that).

HINT: You’ll have to use ``pd.to_numeric`` to force the runtimes to be
numbers (instead of numbers in a string)

.. code:: ipython3

    time_scheduler = pd.Series(df['title'].values, index=pd.to_numeric(df['runtime'])).sort_index()    ### SOLUTION
    time_scheduler = time_scheduler[(time_scheduler.index >= 10) & (time_scheduler.index < 180)]   ### SOLUTION
    time_scheduler




.. parsed-literal::

    runtime
    10.0                                            10 Minutes
    10.0                             The Story of Menstruation
    10.0                                                Hunger
    10.0                                        Hotel Magnezit
    10.0                                  There Once Was a Dog
    10.0                                       Head Over Heels
    10.0                                         Runaway Brain
    10.0                                            Time Freak
    10.0       Forklift Driver Klaus: The First Day on the Job
    10.0                                  The Bear That Wasn't
    10.0                                            The Mitten
    10.0                                                  True
    10.0                                            Kick-heart
    10.0              Music for One Apartment and Six Drummers
    10.0                                     The Ventriloquist
    10.0                                               The Cow
    10.0                                            Dream Work
    10.0                                         The Smile Man
    10.0                                         Darkened Room
    10.0                                                 Canon
    10.0     The Dot and the Line: A Romance in Lower Mathe...
    10.0                                         Paths of Hate
    10.0                                     Travels of an Ant
    10.0                         Winnie-the-Pooh Goes Visiting
    10.0                                        What on Earth!
    10.0                                         Palmipedarium
    10.0                                            Rhinoceros
    10.0                                        Internet Story
    10.0                                                Spider
    10.0                                            Mount Head
                                   ...                        
    178.0     Les Misérables in Concert - The 25th Anniversary
    178.0                                              Fashion
    178.0                                Sense and Sensibility
    178.0                                               Casino
    178.0                               Rocco and His Brothers
    178.0                         Don : The Chase Begins Again
    178.0                                           Riverworld
    178.0    A Lamp In The Dark: The Untold History of the ...
    178.0                                               Hamlet
    178.0                                Kaho Naa... Pyaar Hai
    178.0                                      The Longest Day
    178.0                                          Aalavandhan
    178.0                                 Mutiny on the Bounty
    178.0                                           Betty Blue
    178.0                                               Indian
    178.0                                             Dogville
    178.0                              The Day of the Triffids
    178.0                                       Meet Joe Black
    179.0                           A Bride for Rip Van Winkle
    179.0                   Shaka Zulu: The Last Great Warrior
    179.0                                           China Gate
    179.0                                              Camelot
    179.0                            Blue Is the Warmest Color
    179.0                                            Mr. India
    179.0                The Lord of the Rings: The Two Towers
    179.0                                               Phoonk
    179.0                                    The Promised Land
    179.0                                     Dil To Pagal Hai
    179.0                      Jaani Dushman: Ek Anokhi Kahani
    179.0                                          Come and Go
    Length: 42435, dtype: object



Now let’s find all those two-hour-and-34-minute movies:

.. code:: ipython3

    time_scheduler[154]




.. parsed-literal::

    154                                             The Firm
    154                                            Magicians
    154                                             Lord Jim
    154                                Yamla Pagla Deewana 2
    154                                         Pulp Fiction
    154                                    55 Days at Peking
    154                                     Sanam Teri Kasam
    154                                        Beloved Enemy
    154                                               Singam
    154                                         Jackie Brown
    154                                     The Color Purple
    154                                     The Love of Siam
    154                                          Sweet Bunch
    154                         Christmas Time In South Park
    154                                     The Last Samurai
    154                                            The Tuner
    154                                      Cheyenne Autumn
    154                                        Amores perros
    154                                        Cold Mountain
    154                                     Superman Returns
    154                                   Sodom and Gomorrah
    154                                    Little White Lies
    154    The Adventures of Sherlock Holmes and Dr. Wats...
    154                               Va Savoir (Who Knows?)
    154                                     The Ruling Class
    154                       Transformers: Dark of the Moon
    154                                     Twenty-Four Eyes
    154                                               Krrish
    154                                               Zameen
    154                           1492: Conquest of Paradise
    154                                               Wilson
    dtype: object



But what is the 154th shortest movie in this collection?

.. code:: ipython3

    movie_number_154 = time_scheduler.iloc[154]
    movie_number_154




.. parsed-literal::

    'Presentation, or Charlotte and Her Steak'



Dealing with multiple DataFrames
--------------------------------

Forget about budget or runtimes as criteria for selecting a movie, let’s
take a look at popular opinion. Our dataset has two relevant columns:
vote_average and vote_count.

Let’s create a variable called ``df_high_rated`` that only contains
movies that have received more than 20 votes and whose average score is
greater than 8.

.. code:: ipython3

    df_highly_voted = df[df['vote_count'] > 20]     ### SOLUTION
    df_high_rated = df_highly_voted[df_highly_voted['vote_average'] > 8]     ### SOLUTION
    df_high_rated[['title', 'vote_average', 'vote_count']]





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
          <th>title</th>
          <th>vote_average</th>
          <th>vote_count</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>46</th>
          <td>Se7en</td>
          <td>8.1</td>
          <td>5915.0</td>
        </tr>
        <tr>
          <th>49</th>
          <td>The Usual Suspects</td>
          <td>8.1</td>
          <td>3334.0</td>
        </tr>
        <tr>
          <th>109</th>
          <td>Taxi Driver</td>
          <td>8.1</td>
          <td>2632.0</td>
        </tr>
        <tr>
          <th>256</th>
          <td>Star Wars</td>
          <td>8.1</td>
          <td>6778.0</td>
        </tr>
        <tr>
          <th>289</th>
          <td>Leon: The Professional</td>
          <td>8.2</td>
          <td>4293.0</td>
        </tr>
        <tr>
          <th>292</th>
          <td>Pulp Fiction</td>
          <td>8.3</td>
          <td>8670.0</td>
        </tr>
        <tr>
          <th>314</th>
          <td>The Shawshank Redemption</td>
          <td>8.5</td>
          <td>8358.0</td>
        </tr>
        <tr>
          <th>351</th>
          <td>Forrest Gump</td>
          <td>8.2</td>
          <td>8147.0</td>
        </tr>
        <tr>
          <th>522</th>
          <td>Schindler's List</td>
          <td>8.3</td>
          <td>4436.0</td>
        </tr>
        <tr>
          <th>586</th>
          <td>The Silence of the Lambs</td>
          <td>8.1</td>
          <td>4549.0</td>
        </tr>
        <tr>
          <th>659</th>
          <td>The World of Apu</td>
          <td>8.2</td>
          <td>40.0</td>
        </tr>
        <tr>
          <th>834</th>
          <td>The Godfather</td>
          <td>8.5</td>
          <td>6024.0</td>
        </tr>
        <tr>
          <th>877</th>
          <td>Rear Window</td>
          <td>8.2</td>
          <td>1531.0</td>
        </tr>
        <tr>
          <th>882</th>
          <td>The Apartment</td>
          <td>8.1</td>
          <td>498.0</td>
        </tr>
        <tr>
          <th>895</th>
          <td>Sunset Boulevard</td>
          <td>8.2</td>
          <td>533.0</td>
        </tr>
        <tr>
          <th>1057</th>
          <td>Reservoir Dogs</td>
          <td>8.1</td>
          <td>3821.0</td>
        </tr>
        <tr>
          <th>1132</th>
          <td>Cinema Paradiso</td>
          <td>8.2</td>
          <td>834.0</td>
        </tr>
        <tr>
          <th>1138</th>
          <td>Paths of Glory</td>
          <td>8.2</td>
          <td>565.0</td>
        </tr>
        <tr>
          <th>1151</th>
          <td>Paris is Burning</td>
          <td>8.2</td>
          <td>67.0</td>
        </tr>
        <tr>
          <th>1152</th>
          <td>One Flew Over the Cuckoo's Nest</td>
          <td>8.3</td>
          <td>3001.0</td>
        </tr>
        <tr>
          <th>1154</th>
          <td>The Empire Strikes Back</td>
          <td>8.2</td>
          <td>5998.0</td>
        </tr>
        <tr>
          <th>1159</th>
          <td>The Good, the Bad and the Ugly</td>
          <td>8.1</td>
          <td>2371.0</td>
        </tr>
        <tr>
          <th>1161</th>
          <td>12 Angry Men</td>
          <td>8.2</td>
          <td>2130.0</td>
        </tr>
        <tr>
          <th>1166</th>
          <td>Once Upon a Time in the West</td>
          <td>8.1</td>
          <td>1160.0</td>
        </tr>
        <tr>
          <th>1170</th>
          <td>GoodFellas</td>
          <td>8.2</td>
          <td>3211.0</td>
        </tr>
        <tr>
          <th>1176</th>
          <td>Psycho</td>
          <td>8.3</td>
          <td>2405.0</td>
        </tr>
        <tr>
          <th>1178</th>
          <td>The Godfather: Part II</td>
          <td>8.3</td>
          <td>3418.0</td>
        </tr>
        <tr>
          <th>1184</th>
          <td>Once Upon a Time in America</td>
          <td>8.3</td>
          <td>1104.0</td>
        </tr>
        <tr>
          <th>1201</th>
          <td>Dead Poets Society</td>
          <td>8.1</td>
          <td>2786.0</td>
        </tr>
        <tr>
          <th>1213</th>
          <td>The Shining</td>
          <td>8.1</td>
          <td>3890.0</td>
        </tr>
        <tr>
          <th>...</th>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>
        <tr>
          <th>38711</th>
          <td>The Handmaiden</td>
          <td>8.1</td>
          <td>453.0</td>
        </tr>
        <tr>
          <th>39078</th>
          <td>Planet Earth</td>
          <td>8.8</td>
          <td>176.0</td>
        </tr>
        <tr>
          <th>39079</th>
          <td>Life</td>
          <td>8.5</td>
          <td>65.0</td>
        </tr>
        <tr>
          <th>39087</th>
          <td>Bo Burnham: Make Happy</td>
          <td>8.4</td>
          <td>56.0</td>
        </tr>
        <tr>
          <th>39226</th>
          <td>O.J.: Made in America</td>
          <td>8.5</td>
          <td>73.0</td>
        </tr>
        <tr>
          <th>39379</th>
          <td>Piper</td>
          <td>8.2</td>
          <td>487.0</td>
        </tr>
        <tr>
          <th>40242</th>
          <td>Your Name.</td>
          <td>8.5</td>
          <td>1030.0</td>
        </tr>
        <tr>
          <th>40463</th>
          <td>Over the Garden Wall</td>
          <td>8.2</td>
          <td>52.0</td>
        </tr>
        <tr>
          <th>40476</th>
          <td>Divines</td>
          <td>8.1</td>
          <td>161.0</td>
        </tr>
        <tr>
          <th>40559</th>
          <td>Tower</td>
          <td>8.1</td>
          <td>50.0</td>
        </tr>
        <tr>
          <th>40886</th>
          <td>The Present</td>
          <td>8.3</td>
          <td>52.0</td>
        </tr>
        <tr>
          <th>41219</th>
          <td>Under the Sun</td>
          <td>8.1</td>
          <td>31.0</td>
        </tr>
        <tr>
          <th>41282</th>
          <td>HyperNormalisation</td>
          <td>8.1</td>
          <td>26.0</td>
        </tr>
        <tr>
          <th>41388</th>
          <td>A Silent Voice</td>
          <td>8.1</td>
          <td>157.0</td>
        </tr>
        <tr>
          <th>41591</th>
          <td>Inner Workings</td>
          <td>8.2</td>
          <td>46.0</td>
        </tr>
        <tr>
          <th>42003</th>
          <td>The Invisible Guest</td>
          <td>8.1</td>
          <td>395.0</td>
        </tr>
        <tr>
          <th>42137</th>
          <td>Eu Fico Loko</td>
          <td>8.3</td>
          <td>22.0</td>
        </tr>
        <tr>
          <th>42366</th>
          <td>Cosy Dens</td>
          <td>8.6</td>
          <td>23.0</td>
        </tr>
        <tr>
          <th>42381</th>
          <td>Hope</td>
          <td>8.1</td>
          <td>36.0</td>
        </tr>
        <tr>
          <th>42479</th>
          <td>Lemonade</td>
          <td>8.8</td>
          <td>45.0</td>
        </tr>
        <tr>
          <th>42677</th>
          <td>Parched</td>
          <td>8.5</td>
          <td>23.0</td>
        </tr>
        <tr>
          <th>42850</th>
          <td>Kaabil</td>
          <td>8.1</td>
          <td>23.0</td>
        </tr>
        <tr>
          <th>43177</th>
          <td>Band of Brothers</td>
          <td>8.2</td>
          <td>725.0</td>
        </tr>
        <tr>
          <th>43307</th>
          <td>Planet Earth II</td>
          <td>9.5</td>
          <td>50.0</td>
        </tr>
        <tr>
          <th>43510</th>
          <td>Cosmos</td>
          <td>9.1</td>
          <td>41.0</td>
        </tr>
        <tr>
          <th>43576</th>
          <td>Pink Floyd: Live at Pompeii</td>
          <td>8.3</td>
          <td>35.0</td>
        </tr>
        <tr>
          <th>43962</th>
          <td>Life Cycles</td>
          <td>8.8</td>
          <td>27.0</td>
        </tr>
        <tr>
          <th>44377</th>
          <td>Hasan Minhaj: Homecoming King</td>
          <td>8.1</td>
          <td>22.0</td>
        </tr>
        <tr>
          <th>44664</th>
          <td>Black Mirror: White Christmas</td>
          <td>8.3</td>
          <td>211.0</td>
        </tr>
        <tr>
          <th>45424</th>
          <td>In a Heartbeat</td>
          <td>8.3</td>
          <td>146.0</td>
        </tr>
      </tbody>
    </table>
    <p>178 rows × 3 columns</p>
    </div>



Here we have 178 high-quality movies, at least according to some people.
But what about **my** opinion?

Here are my favorite movies and their relative scores, create a
DataFrame called ``compare_votes`` that contains the title as an index
and both the vote_average and my_vote as its columns. Also only keep the
movies that are both my favorites and popular favorites.

HINT: You’ll need to create two Series, one for my ratings and one that
maps titles to vote_average.

.. code:: ipython3

    my_favorites_with_ratings = pd.Series(       ### SOLUTION
        {
        "Star Wars": 9,
        "Paris is Burning": 8,
        "Dead Poets Society": 7,
        "The Empire Strikes Back": 9.5,
        "The Shining": 8,
        "Return of the Jedi": 8,
        "1941": 8,
        "Forrest Gump": 7.5,
    }
    )       ### SOLUTION
    overall_favorites = pd.Series(df_high_rated['vote_average'].values, index=df_high_rated['title'].values)       ### SOLUTION
    compare_votes = pd.DataFrame({'vote_average': overall_favorites, 'my_vote': my_favorites_with_ratings}).dropna()       ### SOLUTION
    compare_votes




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
          <th>vote_average</th>
          <th>my_vote</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Dead Poets Society</th>
          <td>8.1</td>
          <td>7.0</td>
        </tr>
        <tr>
          <th>Forrest Gump</th>
          <td>8.2</td>
          <td>7.5</td>
        </tr>
        <tr>
          <th>Paris is Burning</th>
          <td>8.2</td>
          <td>8.0</td>
        </tr>
        <tr>
          <th>Star Wars</th>
          <td>8.1</td>
          <td>9.0</td>
        </tr>
        <tr>
          <th>The Empire Strikes Back</th>
          <td>8.2</td>
          <td>9.5</td>
        </tr>
        <tr>
          <th>The Shining</th>
          <td>8.1</td>
          <td>8.0</td>
        </tr>
      </tbody>
    </table>
    </div>



There should be only 6 movies remaining.

Now add a column to ``compare_votes`` that measures the percentage
difference between my rating and the popular rating for each movie.
You’ll need to take the different between the vote_average and my_vote
and divide it by my_vote.

.. code:: ipython3

    
    compare_votes["vote_percentage_difference"] = (compare_votes["vote_average"] - compare_votes["my_vote"])/compare_votes["my_vote"]       ### SOLUTION
    compare_votes




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
          <th>vote_average</th>
          <th>my_vote</th>
          <th>vote_percentage_difference</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Dead Poets Society</th>
          <td>8.1</td>
          <td>7.0</td>
          <td>0.157143</td>
        </tr>
        <tr>
          <th>Forrest Gump</th>
          <td>8.2</td>
          <td>7.5</td>
          <td>0.093333</td>
        </tr>
        <tr>
          <th>Paris is Burning</th>
          <td>8.2</td>
          <td>8.0</td>
          <td>0.025000</td>
        </tr>
        <tr>
          <th>Star Wars</th>
          <td>8.1</td>
          <td>9.0</td>
          <td>-0.100000</td>
        </tr>
        <tr>
          <th>The Empire Strikes Back</th>
          <td>8.2</td>
          <td>9.5</td>
          <td>-0.136842</td>
        </tr>
        <tr>
          <th>The Shining</th>
          <td>8.1</td>
          <td>8.0</td>
          <td>0.012500</td>
        </tr>
      </tbody>
    </table>
    </div>


