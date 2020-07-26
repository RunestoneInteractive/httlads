.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.

Case Study 2: Calculating a Correlation Matrix
==============================================

A correlation matrix is a helpful tool to summarize and compare different factors in a data set. 
It can also be used to measure the relationship between these factors.
In a correlation matrix, rows and columns represent different factors and the values in the cells represent 
the correlation between each pair of factors. In the earlier sections, we calculated the correlation between the starting a 
business score and various other factors. Now that we have more data, we can use a correlation matrix to compare other columns that 
are correlated to each other.

The following table is an example of a correlation matrix. Suppose we have three factors A, B, and C.

- A and B have a correlation of 0.7

- A and C have a correlation of -0.5

- B and C have a correlation of 0.9

.. csv-table::
    :header: ,A,B,C
    :stub-columns: 1

    A,1.0,0.7,-.5
    B,0.7,1.0,.9
    C,-.5,.9,1.0

If you recall from the previous case study, all the values of 1.0 means that each factor is perfectly correlated with itself. 

The following steps are for you to build a correlation matrix between the various factors of our starting a business data. 
This will be a challenge as it will test your use of the ``$`` in defining ranges, and your ability to think about having
several cells of a spreadsheet work together. 

(OLD) In the next steps, you will build a correlation matrix between the various factors of our starting a business data. This
will challenge your use of the ``$`` in defining ranges as well as your ability to think about having several cells of a spreadsheet work together.

1. To make our correlation matrix we will again make use of sheets ``INDEX`` and ``CORREL`` functions. We will input two of our columns in the ``CORREL`` 
   function to compute the correlation between them. Remember that for a correlation matrix, we need to compute the correlation between all pairs of columns. 
   Like in the previous case study we can use the column letters. 

(OLD) 1. To calculate a correlation matrix we will make use of sheets ``INDEX`` and ``CORREL`` functions. The ``CORREL`` function expects
   two ranges: in our case, two columns of numbers to compute the correlation between. For example, the starting a business score and
   the income level. However, to make our correlation matrix, we need to compute the correlation between all pairs of columns.
   Using the column letters is more compact so lets write out a few.

   a. DD, DE, DF, DG, DH, DI, DJ, DK, DL, ED, EE, EF, EG, EH, EI, EJ, EK, …

   b. Here is a Python snippet that should give you the full idea.

      .. code-block:: python

         for i in "DEFGHIJKL":
             for j in "DEFGHIJKL":
                 print("correlate column ", i, " with column ", j)

   c. The aptly named ``INDEX`` function is what allows us to do this by writing one clever function and then copying and pasting it to fill out our matrix.

2. You have been successful if you end up with a matrix where the diagonal is 1.

3. You can make a heatmap using conditional formatting once you have the numbers. You can play around with conditional formatting rules. e.g.
Change the background color of the cells.

4. You can add other rules to cover different ranges, but you will immediately see which cells we might want to focus on the most.

.. fillintheblank:: q1_sab_challenge

    What is the correlation between procedure-men and time-men? (round to three decimal places) |blank|

    - :0.619: Is the correct answer
      :0.618: Use the ``ROUND`` function to perform the rounding
      :0.618898227: Round to three decimal places
      :x: Incorrect.

.. fillintheblank:: q2_sab_challenge

   Which two factors have the largest positive correlation (not including the diagonal)? |blank| and |blank|

   - :Cost Men: Is the correct answer
     :x: catchall feedback

   - :Cost Women: Is the correct answer
     :x: Make sure you have capitalization correct.

.. fillintheblank:: q3_sab_challenge

   Which two factors have the largest negative correlation? |blank| |blank|

   - :Starting a Business Score: Is the correct answer
     :Starting a Business Rank: Is the correct answer
     :x: List the column first

   - :Starting a Business Rank: Is the correct answer
     :Starting a Business Score: Is the correct answer
     :x: Maybe your order is wrong?



**Lesson Feedback**

.. poll:: LearningZone_2_4_sab
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_2_4_sab
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_2_4_sab
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_2_4_sab
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...
