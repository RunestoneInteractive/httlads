Dealing with multiple DataFrames
--------------------------------

Forget about budget or runtimes as criteria for selecting a movie, let’s
take a look at popular opinion. Our dataset has two relevant columns:
vote_average and vote_count.

Let’s create a variable called ``df_high_rated`` that only contains
movies that have received more than 20 votes and whose average score is
greater than 8.

.. code:: ipython3

    df_highly_voted = []
    df_high_rated = []
    df_high_rated[['title', 'vote_average', 'vote_count']]


Here we have some high-quality movies, at least according to some people.
But what about **my** opinion?

Here are my favorite movies and their relative scores, create a
DataFrame called ``compare_votes`` that contains the title as an index
and both the vote_average and my_vote as its columns. Also only keep the
movies that are both my favorites and popular favorites.

HINT: You’ll need to create two Series, one for my ratings and one that
maps titles to vote_average.

.. code:: ipython3

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
    compare_votes

There should be only 6 movies remaining.

Now add a column to ``compare_votes`` that measures the percentage
difference between my rating and the popular rating for each movie.
You’ll need to take the different between the vote_average and my_vote
and divide it by my_vote.

.. code:: ipython3

    compare_votes



.. fillintheblank:: mov_star_wars_difference

   What's the percentage difference between my rating for Star Wars and its popular rating?

   - :-0.10: Is the correct answer
     :x: catchall feedback


