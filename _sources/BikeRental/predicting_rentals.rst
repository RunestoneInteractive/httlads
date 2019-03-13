Predicting Daily Bike Rentals
=============================

Lets say you are a new data scientist working for Bikes-R-Us, and your boss comes to you and asks you to develop a model for predicting bike rentals in the future.  The company is trying to decide whether to invest in more bikes so they can keep stations better stocked.  Its late in 2011 and what you have to work with so far is the databases of rental information with which we began this chapter.

You have many questions:  How do you start?  How will you know if you are even on the right track to building a good model?  What data can I use as features when I build the model?  Should I be trying to predict rentals hour by hour? day by day?  month by month?

With big problems like this its easy to get overwhelmed with the scope of the problem, its also easy to want to make something really complex right away.  A better approach is to try something simple at first `The KISS principle <https://en.wikipedia.org/wiki/KISS_principle>`_ ,  Keep It Simple Stupid,  is a good rule to follow.  If a simple solution works why spend additional time and effort to make something complicated?

Your initial thought is that you can build a model using the date as the main feature, and you know that the database contains the information to calculate the total number of bikes rented each day.  That seems like a simple approach, but how are you going to know, much less convince your boss, that your model is any good?  You don't know what bike rentals are going to be in the future, that is what you are supposed to predict. Showing the boss your mean squared error is not likely to be too convincing as you are just confirming the data that you have used to build the model.

The Train Test Split
--------------------

The way to handle the problem of deciding whether your model is any good is to hold out some of the data that you already know.  Lets take 20% of the days that we have data for, and NOT use them in building the model.  Then we can make predictions for those days and check our work.  Its kind of like covering up the answer to a math problem so you don't cheat and just look at the answer.  We call this a training test split.  We will randomly select some data to include in building the model, and some data to leave out.  Scikit-learn even has a handy utility function that will do this for us!

To be a little more scientific about this we will split our data into a "training set" that we will use to build the model, and a "test set" that we will use to validate the model.  That is we want to test our model on data that is different from the data we used to build the model.  Testing using the data the you trained on would be like cheating as you could just build a model the memorized everything and got 100% but in the real world you need to make predictions for things that you have not seen before.

The first thing we'll do create two simplified DataFrames one that contains a column containing the date and a second column that contains the number of bikes rented on that date.  Next we'll randomly select 80% of the data to use in creating our linear regression model, and 20% of the data to use in testing.  we will use the scikit-learn ``train_test_split`` and we will end up with four data frames:

* train_X, train_y - this is the data we'll use to create our model.  Remember that in linear regression we are trying to come up with a slope and intercept value that minimize the error, so we need to know the answer.

* test_X - we will use this data (without train_y) to make predictions given a rating from test_X we'll use our model to calculate a predicted overall value.

* test_y - we will use this data along with the predicted values to come up with our score.  The score we calculate will be the mean absolute error.

By default the ``train_test_split`` function will

The ``train_test_split`` function contains an optional parameter called ``random_state`` We will use ``random_state=997`` for this parameter to ensure we are all getting the same randomness.  This will allow you to compare your results against mine and your classmates.  It will also make your results reproducible from one day to the next.

Evaluating the Model
--------------------

Now that we have the train test split, we can use the **mean squared error** on the difference between our predicted values for the test data and the known values for the test data.  This is much fairer as we are not using data that the model already "knowns" the answer for.  In addition to the mean squared error we can also compute the **mean absolute error**  This is a little nicer for us because the units of the error are the same as the what we are trying to predict.  In this case we are not trying to predict bike rentals squared, (whatever that means) but simply the number of bike rentals.  We can also compute a measure called :math:`R^2` which is a measure of how close the data are to the regression line.


Feature Engineering
-------------------

But wait, we've been making an assumption that a date is something we can just send into the LinearRegression model and it will all work.  Unfortunately that is not the case, the LinearRegression model needs to have the features represented as numbers.  In the spirit of keeping it simple, lets build our first model by simply numbering each day using 0 as the first day we have data, 1 for the second day and so on up to whatever number represents the last day we have data for.



Version 1.0 Task List
---------------------

Your task list for this project is as follows

* Read in the rental data from the database
* Transform the data into daily rental counts by resampling by day
* Number each day from 0 to N - hint sorting on the index and then resetting the index is a good starting point.
* Make the train test split of the data using the ``train_test_split`` function.
* Create a new LinearRegression model and fit the training data
* Calculate the mean squared error and mean absolute error  between the known rentals from the test data and the predicted values from the model.
* Make a graph to compare the training and test data

.. fillintheblank:: modelv1_len

   How many days of data do you have in the transformed data set (before the train test split)

   - :468: Is the correct answer
     :x: catchall feedback

.. fillintheblank:: modelv1_test_len

   How many days of data do you have in the test set?

   - :94: Is the correct answer
     :117: Looks like you did not set the test_size parameter to .2
     :93.6: Good calculation, but we cannot have a fraction of a row in our data.
     :x: Hint:  The correct size is between 90 and 100.  You can calculate it yourself if you got the previous question correct.  If not, you need to get that one right before doing this one.

.. fillintheblank:: modelv1_mae

   What is the mean absolute error of your predictions?

   - :918.82.*: Is the correct answer
     :1366395.01.*: Is the mean squared error
     :x: Make sure you use the ``mean_absolute_error`` function


Compare your graph to this one after you have made it.

.. reveal:: modelv1_reg_comp
    :modal:
    :modaltitle: Predicted Versus Actual Daily Rentals V1

    .. image:: Figures/regression_compare_1.png

What do you think of the model so far?  You are probably a bit disappointed both with how the graph looks as well as the mean absolute error.  missing your daily predictions by over 900 is not great, especially in the earlier days when rentals were only around 1000.  In fact if the average daily rentals for this time period is about 2750 then you are off by around 77% every day.

We can also look at the :math:`R^2` score for this model which gives us a value of 0.42.  1.0 would be the best score possible, so we are a long way from there. But what is the interpretation of :math:`R^2`.  It tells us how much of the variation of the data is explained by the model.  Reviewing  the graph from above there is a lot of variation and our model is only accounting for 42% of it.

Lets hold off on taking this model to the boss and see if we can't refine our model to do a bit better!

Refining the Model
------------------

Don't get discouraged that our first try wasn't that great.  You might have even guessed that would be the case, textbook authors are mean that way.  Lets look at the time series of daily rentals:

.. figure:: Figures/year_one_ts.png


 The representation of the date we chose is definitely simple, but you know from the time series visualization, that numbering the days that way would leave out a lot of valuable information.  You can see in the graph above that there are seasonal variations in the data as well as variations due to the day of the week.  We also know that as we went from year to year, overall rentals kept growing.  So, instead of encoding our date as a single number lets encode the date as by adding features for year, month, day and even weekday.  Hopefully by adding more features that capture the kinds of variation we know exist will help our model.

This kind of development of the model is

Version 2.0 Task List
---------------------

* Create four new features out of the date, a column for year, month, day, and weekday.  We will keep daynum as a feature as well so that we can use it to build a graph.  Later we can experiment to see if we need it at all.
* Redo the train test split using the same random_state as before
* Fit a new model using the new features.
* Make a new set of predictions for the test days
* calculate mean squared error, mean absolute error, and r2 for this new model against the known values.
* Plot the predictions against daynum to see how they look with more features

