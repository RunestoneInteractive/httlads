Challenge:  Calculating a Correlation matrix
============================================

#. To calculate a correlation matrix we will make use of sheets INDEX and CORREL functions.  The correl function expects two ranges -- in our case two columns of numbers to compute the correlation between.  For example the happiness score and the Economy.  But to make our correlation matrix we need to compute the correlation between all pairs of columns.  Using the column letters is more compact so lets write out a few:

        #. EE, EF, EG, EH, EI, EJ, EK, EL, FE, FF, FG, FH, FI, FJ, FK, FL, …

        #. Here is a Python snippet that should give you the full idea:

    For i in "EFGHIJKL":

        For j in "EFGHIJKL":

           print("correlate column ", i, " with column ", j)

        #. The aptly named INDEX function is wwhat allows us to do this by writing one clever function and then copying and pasting it to fill out our matrix.

#. It may take a bit of experimentation to get the indexes and the $ correct but you will eventually end up with a matrix where the diagonal is 1.  This is a good indicator that you have things right.  This \ |LINK2|\  may also be useful for getting this right.

#. Once you have the numbers we can make a rough heat map by using conditional formatting.  Using some conditional formatting rules we can change the foreground and background color of the cells.  Lets start by adding  a rule that says if the correlation is between 0.75 and 1.0 then color the background green.  

#. You can add other rules to cover different ranges, but you will immediately see which cells we might want to focus on the most.



.. |LINK2| raw:: html

    <a href="https://www.youtube.com/watch?v=uc55cnr8A14" target="_blank">video</a>
