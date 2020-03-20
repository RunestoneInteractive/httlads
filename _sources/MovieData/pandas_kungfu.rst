.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Pandas Exercises
================

Before attempting this exercise, make sure you've read through the first four
pages of
`Chapter 3 <https://jakevdp.github.io/PythonDataScienceHandbook/03.00-introduction-to-pandas.html>`_
of the Python Data Science Handbook.

We're going to be using a dataset about movies to try out processing some data
with Pandas.

We start with some standard imports.

.. jupyter-execute::

   import pandas as pd
   import numpy as np


We are providing you with data for this exercise that comes from the
`Movie Database <https://www.themoviedb.org/documentation/api>`_. To create this
lesson we used the TMDB API, but our book is not endorsed or certified by TMDB.
Their API also provides access to data on many additional movies, actors and
actresses, crew members, and TV shows.

Then we load the data from a local file and checkout the data.


.. jupyter-execute::

   df = pd.read_csv('./Data/movies_metadata.csv').dropna(axis=1, how='all')
   df.head()




Exploring the Data
------------------

This dataset was obtained from
`Kaggle <https://www.kaggle.com/rounakbanik/the-movies-dataset>`_ who
downloaded it through the TMDB API.

The movies available in this dataset are in correspondence with the movies that
are listed in the MovieLens Latest Full Dataset.

Let's see what data we have.


.. jupyter-execute::

   df.shape


Twenty-three columns of data for over 45,000 movies is going be a lot to look
at, but let's start by looking at what the columns represent.

.. jupyter-execute::

   df.columns




Here's an explanation of each column.

- **belongs_to_collection:** A stringified dictionary that identifies the
  collection that a movie belongs to (if any).
- **budget:** The budget of the movie in dollars.
- **genres:** A stringified list of dictionaries that list out all the genres
  associated with the movie.
- **homepage:** The Official Homepage of the movie.
- **id:** An arbitrary ID for the movie.
- **imdb_id:** The IMDB ID of the movie.
- **original_language:** The language in which the movie was filmed.
- **original_title:** The title of the movie in its original language.
- **overview:** A blurb of the movie.
- **popularity:** The Popularity Score assigned by TMDB.
- **poster_path:** The URL of the poster image (relative to
  http://image.TMDB.org/t/p/w185/).
- **production_companies:** A stringified list of production companies involved
  with the making of the movie.
- **production_countries:** A stringified list of countries where the movie was
  filmed or produced.
- **release_date:** Theatrical release date of the movie.
- **revenue:** World-wide revenue of the movie in dollars.
- **runtime:** Duration of the movie in minutes.
- **spoken_languages:** A stringified list of spoken languages in the film.
- **status:** Released, To Be Released, Announced, etc.
- **tagline:** The tagline of the movie.
- **title:** The official title of the movie.
- **video:** Indicates if there is a video present of the movie with TMDB.
- **vote_average:** The average rating of the movie on TMDB.
- **vote_count:** The number of votes by users, as counted by TMDB.