.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Numbers As Indices
==================

Enough about movie budgets, it's time to budget my time instead. Because I
schedule my day to the minute, I like to be able to look up movies by their
runtime, so that when I have a spare two hours and 34 minutes, I can find all
the movies that would fit precisely in that time slot. (Popcorn-making time is
budgeted separately).

Before you start, here is a refresher on the index operator in Pandas.

**Selecting Columns of a DataFrame**

* ``df[<string>]`` gets me a column and returns the Series corresponding to that
  column.
* ``df[<list of strings>]`` gets me a bunch of columns and returns a DataFrame.

**Selecting Rows of a DataFrame**

* ``df[<series/list of Boolean>]`` gets me the rows for each element in the
  list like thing you passed me that is ``True``.  However, I think this is
  confusing and whenever you want to select some rows of a DataFrame you should
  use ``df.loc[]``.
* ``df.loc[<series/list of Boolean>]`` behaves just like
  ``df[<series/list of Boolean>]``.
* ``df.loc[<string>]`` uses the non-numeric row index and returns the row(s) for
  that index value.
* ``df.loc[<string1>:<string2>]`` uses the non-numeric index and returns a data
  frame composed of the rows starting with string1 and ending with each string2.
* ``df.loc[<list/Series of strings>]`` returns a data frame composed of each row
  from df with an index value that matches a string in the list.

If you use an integer in any of the last four examples, it works just like the
string, but the index values are numeric instead. What is important (and
confusing) about this is that they use the index, not the position. So, if you
create a data frame with 4 rows of some data, it will have an index that is
created by default where the first row starts with 0, the next row is 1 and so
on. However, if you sort the data frame such that the last row becomes the first
and the first row becomes the last, using ``df.loc[0]`` on the sorted data frame
will return the last row.

If you want to be strictly positional, you should use ``df.iloc[0]``, which will
return the first row regardless of the index value. ``df.iloc[0:5]`` is the same
as doing ``df.head()``, and ``df.iloc[[1, 3, 5, 7]]`` will return four rows: the
2nd, 4th, 6th and 8th.

.. jupyter-execute::

    import pandas as pd
    df = pd.DataFrame({'a':list("pythonrocks"), 'b':[1,2,3,4,5,6,7,8,9,10,11]})
    df = df.set_index('a')
    df.loc['p':'n']

OK, but what if we do this:

.. jupyter-execute::
    :raises:

    df.loc['p':'o']

Pandas raises an error because there are two 'o's in the index.  It doesn't know which one you mean, first? last? If you argue it should use the last then consider the performance implications if this was a really large index? In that case it would be very time consuming to search the index for the last occurance.

On the other hand, if we sort the index then the last instance can be found quite quickly, and with a sorted index loc will work for this example.

.. jupyter-execute::

    df = df.sort_index()
    df.loc['c':'o']

Practice Questions
------------------

Create a Series called ``time_scheduler`` that is indexed by runtime and has the
movie's title as its values. Note that you will need to use ``sort_index()`` in
order to be able to look up movies by their duration. Base yourself on ``df``
rather than ``budget_df``.

While you’re at it, remove any movie that is less than 10 minutes (you can’t get
into it if it's too short) or longer than 3 hours (who's got time for that?).

**Hint:** You may have to use ``pd.to_numeric`` to force the runtimes to be
numbers (instead of numbers in a string).

Here is a simpler example that shows the movies that are 7 minutes long

.. jupyter-execute::

   import pandas as pd
   df = pd.read_csv("https://media.githubusercontent.com/media/bnmnetp/httlads/master/Data/movies_metadata.csv").dropna(axis=1, how='all')
  time_scheduler = df.set_index('runtime')
  time_scheduler = time_scheduler[['title', 'release_date']]
  time_scheduler.loc[7].head()



Now let's find all those two-hour-and-34-minute movies.



.. fillintheblank:: mov_154_min_movies

   How many movies lasting 154 minutes are there? |blank|

   - :31: Is the correct answer
     :x: catchall feedback


But what is the 155th shortest movie in this collection?


.. fillintheblank:: mov_154_shortest

   Copy and paste the name of the 155th shortest movie in this collection,
   without quotes. |blank|

   - :(Tears of Steel|Presentation, or Charlotte and Her Steak|The Fox and the Hare): Correct
     :Casper: Close, but make sure you have your DataFrame sorted properly
     :x: Make sure you are using `iloc` and not `loc`

.. reveal:: sol_movie_times
    :instructoronly:

    .. jupyter-execute::

        df = df[(df.runtime >= 10) & (df.runtime <= 180)]
        ts = df.set_index('runtime')
        ts = ts[['title','release_date']]

        print(len(ts.loc[154]))

        ts = ts.sort_index()
        ts.iloc[154]



**Lesson Feedback**

.. poll:: LearningZone_5_3
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_5_3
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_5_3
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_5_3
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
