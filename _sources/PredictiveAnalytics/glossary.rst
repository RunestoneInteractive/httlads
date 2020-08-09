.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.

Glossary
========

Definitions
-----------

**Closed-Form Solution:** Closed-Form Solution is a mathematical expression that can be evaluated 
using a limited number of operations. 

**Concatenate:**  In Computer Science, concatenate is a term usually used to refer to joining string resources end to end. Here, 
the term means to join two DataFrames. 

**Linear Regression:** Linear regression allows us to use observations and measurements of things we 
know to make predictions about new things. 

**Supervised Learning:** Using a sample data along with an algorithm to find
the values for the slope and intercept.

**Model:** Model is the data we use to train the algorithm.

**Mean Squared Error (MSE):**  MSE is a technique used to measure how far the predicted values are from the actual values. 
It is used to calculate the error between a model for a set of data and the actual data. MSE can be calculated by squaring 
the differences of the predicted values and actual values then averaging them. The predicted values and actual values are 
squared so that there are no negative numbers in the average. MSE gives more weight to outliers when calculating the error 
because the differences get exponentially bigger or smaller when squaring them.

**Mean Absolute Error:** Mean Absolute Error is another technique used to calculate the accuracy of the predicted value 
against the actual value. It is calculated by finding the absolute values of the differences between the predicted values 
and the actual values then averaging them. MAE does not give more weight to outliers as MSE does, but it is important to 
keep in mind that, when averaging, all outliers (squared or otherwise) shift the average significantly.

**One-Hot Encoding:** One-Hot Encoding is a way to represent nominal data by creating columns for each 
type of data and assigning them boolean values rather than assigning them numerical values.

**Query:** In SQL, a query is a request to retrieve or manipulate data in a database.

:math:`R^2`: It measures how well the regression line represents variations in the actual data. In other words, 
it is a measure of how closely the variance of the independent variable predicts the variance of the dependent variable. 
For example, a :math:`R^2` score of .75 means that 75% of the variation of the data is explained by the regression line.

**Re-Scaling:** The output of our algorithm will highly depend on the scale in which the input data is measured. As such, re-Scaling is 
preparing the data so that our algorithms can use it to make predictions. 

**SQL:** Structured Query Language is a programming language that is used to manipulate databases.

**Train-Test Split:** It is the process of splitting the data into a training set and a testing set, building 
a model using the training set, and validating it using the testing set. 


Keywords
--------

``AS``: (SQL) Renames a column with an alternate name. The new name will only last for the duration of the query. 

``COUNT``: (SQL) Returns the number of rows in a given column. It can be used in conjunction with ``WHERE`` to only return the number of rows that match specific conditions.

``DESC``: (SQL) Used with ``ORDER BY`` to sort data in descending order. Sintax: ``ORDER BY`` column_name ``DESC``

``FROM``: (SQL) Used to specify a database we want to access.

``GROUP BY``: (SQL) Combines rows that have the same value in a given column and returns a row for each value.

``JOIN``: (SQL) Is preceded and succeeded by the names of the tables we want to concatenate. Syntax: table1 ``JOIN`` table2

``LIMIT``: (SQL) Specifies the number of rows that should be retrieved.

``ON``: (SQL) Used with ``JOIN`` to set conditions for which columns should be joined. Works similar to ``WHERE``. Syntax: table1 ``JOIN`` table2 ``ON`` <condition>

``ORDER BY``: (SQL) Will sort the retrieved data, in ascending order, based on a given column. 

``parse_date``: (Pandas) Is a parameter of the ``<pandas>.read_csv()`` method. Syntax: ``<pandas>.read_csv('file_name', parse_date = 'column_name')``.
``parse_date`` tells pandas that when reading the CSV file, it should treat the given column values as dates.

``<DataFrame>.read_sql``:  (Pandas) Allows us to pass in a SQL query as a string, along with a URL to connect to the database and will return a DataFrame

``resample()``: (Pandas) After we tell pandas to treat a series of data as dates (this chapter uses ``parse_date`` to do this). 
We can use resample to pick which aspect of the data (month, year, day, etc.) we would like to use. 

``SELECT``: (SQL) Retrieves specified columns from a database. We can use ``SELECT *`` to retrieve all columns from a database.

``train_test_split``: (Scikit-Learn) A function in the scikit-learn library that uses the train-test split method to train and test a set of data. 
Syntax: ``train_test_split(features_df, answer_df, test_size, random_state)``

``WHERE``: (SQL) Specifies a condition that is used to filter the data. Only the rows that meet the condition will be used.