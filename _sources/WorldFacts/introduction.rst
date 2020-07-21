.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


Introduction
=============

This chapter will explore the concept of analyzing data sets to 
summarize their main characteristics and information. We will start by exploring
the dataset in more depth and use Pandas and Altair to explore and visualize the
data in different formats, such as histograms and maps. As we go further in
the chapter, you will realize that we do not have access to every database. Often
we need to find other means to obtain the data. We will learn how to extract data from websites
using web scraping methods. Finally, you will be able to use the Pandas pivot table to summarize the data.


Learning Goals
----------------

* Visualize, analyze, and describe data in various formats
* Extract data from different sources
* Summarizes the data of a large data set


Learning Objectives
--------------------

* Use Pandas to analyze and describe data
* Visualize data with histograms and scatter plots
* Graph data on a map using web API
* Extract, clean, and save data from web documents


Reading List
------------

-  `One Dataset Visualized 25 Different Ways <https://flowingdata.com/2017/01/24/one-dataset-visualized-25-ways/>`_:
   This is a great article to help you think about visualization.
- `What is Exploratory Data Analysis <https://towardsdatascience.com/exploratory-data-analysis-8fc1cb20fd15>`_
-  `Getting Started with Altair <https://altair-viz.github.io/getting_started/starting.html>`_:
   Read the overview and then move to the
   `User Guide <https://altair-viz.github.io/user_guide/data.html>`_. Read this
   up to and including the section on data transformations.
-  `A Comprehensive Guide to the Grammar of Graphics <https://towardsdatascience.com/a-comprehensive-guide-to-the-grammar-of-graphics-for-effective-visualization-of-multi-dimensional-1f92b4ed4149>`_
-  `Introduction to Pandas Part I <http://www.gregreda.com/2013/10/26/intro-to-pandas-data-structures/>`_
-  `Screen Scraping 101 <https://hackernoon.com/web-scraping-tutorial-with-python-tips-and-tricks-db070e70e071>`_
-  `Web Scraping Weather Forecasts <https://www.dataquest.io/blog/web-scraping-tutorial-python/>`_
-  `Beautiful Soup Docs <https://www.crummy.com/software/BeautifulSoup/bs4/doc/>`_

In this first part of the module, we will continue with some data that should be familiar to you, but we
will use it in Pandas instead of a spreadsheet. In the second part, we will
focus on several different kinds of textual analysis using data. Download The `World Countries csv file <../_static/world_countries.csv>`_,
`Protecting Minority Investors csv file <../_static/protecting_minority_investors.csv>`_, and
`Starting a Business csv file <../_static/starting_a_business.csv>`_ to get started. We
will be working with these files in this chapter.



**Lesson Feedback**

.. poll:: LearningZone_measure_6_1
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_measure_6_1
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_measure_6_1
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_measure_6_1
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...