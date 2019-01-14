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
duration. Base yourself on ``df`` rather than ``budget_df``.

While you’re at it, remove any movie that is less than 10 minutes (can’t
get into it if it’s too short) or longer than 3 hours (who’s got time
for that?).

HINT: You’ll have to use ``pd.to_numeric`` to force the runtimes to be
numbers (instead of numbers in a string)

.. code:: ipython3

    time_scheduler = []
    time_scheduler

Now let’s find all those two-hour-and-34-minute movies:

.. code:: ipython3

    time_scheduler[154]


.. fillintheblank:: mov_154_min_movies

   How many movies lasting 154 minutes are there?

   - :31: Is the correct answer
     :x: catchall feedback


But what is the 154th shortest movie in this collection?

.. code:: ipython3

    movie_number_154 = time_scheduler.iloc[154]
    movie_number_154




.. parsed-literal::

    'Presentation, or Charlotte and Her Steak'



