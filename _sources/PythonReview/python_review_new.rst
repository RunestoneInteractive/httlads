.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


.. _PythonReview:

Python Review
=============
In the following section you will get a rudimentary introduction to python for this course. The purpose
of this section is not to teach you all of Python but ranther to arm you with the konwledge required to
succeed in this course. Because of this, we will only be introducing concepts that are necessary for this course.


Variables
---------

To better understand **Variables**, let us first look at a concept from Google Sheets that you are already familiar with, cells.
As you learned from Chapter 2, each cell has a spicific name (A1, A2, B5, C40, etc.). Each of those cell names refer to a 
specific place in the spreadsheet and each of those places can contain a value. In Python, the cell names are called variables,
and the value is whatever you assign to the variable. 

In order to use a variable, you must give it a name. It can have any name that has alphanumeric (A-Z,a-z,0-9) characters including 
underscore (_). The name cannot start with a number and it is case sensitive.

All information is stored as data and all data are of certain types. Data can be integers, floats, strings, etc. It is important 
to differentiate data based on its type so that we can use them properly.

Python variables are special in that they don't have a type, they can seamlessly change from being a numerical value, a string, or other things. 
Look at the following:

.. code:: python3

   my_var = 3
   print(type(my_var))
   my_var = "foo"
   print(type(my_var))
   my_var = len  # this is a function to find the length of a value (visit lists and Strings for more)
   print(type(my_var))


.. parsed-literal::

   <class 'int'>
   <class 'str'>
   <class 'builtin_function_or_method'>

Python can convert a variable from one type to another without having to create a new variable.

.. code:: python3

   my_string = str(123)
   my_int = int(my_string)
   almost_pi = float("3.14159")


Numeric Data Types
------------------

There are two main types of numeric data in Python. Integers (``int``) and floating-point values (``float``).
Integers are positive or negative numbers that do not have fractional components to the right of the decimal point. 
Floating-point numbers are numbers that have fractional components after the decimal points. As a good rule of thumb, 
if it has a decimal point, it is a ``float``. If the number does not contain a decimal point, it is an ``int``. 
The number 12 is an ``int``, but 12.0 is a ``float``, even if the numbers seem to represent the same value, 
they can be of different data types.

You can use both ``int`` and ``float`` values to perform basic mathematical operations such as addition (+), subtraction 
(-), multiplication (*), division (/), and exponentiation (**). Python will automatically use the normal order of operations 
when calculating a value. You can use parentheses to force Python to evaluate certain expressions first.

Strings
-------
A **string** is a sequential collection of zero or more **characters**. A character is any single letter, number, or symbol 
that can be typed. And sequential means that the characters in the string are in a particular order. Strings' sequential 
property will allow you to specify and retrieve spicific elements of the string. Once a string is 
created and saved in a variable, it cannot be altered: it is **immutable**. Strings can be represented with single or 
double-quotes. Triple quotes make it easy to define multi-line strings. 

.. code:: python3

   # \n means newline

   my_var = 'foo\nbar'
   print("1: ", my_var)
   my_var = "foo\nbar"
   print("2: ", my_var)
   my_var = """foo
   bar"""
   print("3: ", my_var)

.. parsed-literal::

   1: foo
   bar
   2: foo
   bar
   3: foo
   bar

You can slice or access particular elements of a string by using the following sequential indexing 
operations. `Table 2 <_tab_sequentialmethods>`.

.. _tab_sequentialmethods:

.. table:: **Table 2: Operations on Any Sequence in Python**

    =========================== ============== ========================================
             **Operation Name**   **Operator**                          **Explanation**
    =========================== ============== ========================================
                       indexing            [ ]          Access an element of a sequence
                  concatenation             \+          Combine sequences together
                     repetition             \*   Concatenate a repeated number of times
                     membership             in     Ask whether an item is in a sequence
                         length            len  Ask the number of items in the sequence
                        slicing          [ : ]             Extract a part of a sequence
    =========================== ============== ========================================

Aside from the sequential operations, strings also have their own set of methods. Below are some of the most prevelant string 
methods used in this course.

.. _tab_stringmethods:

.. table:: **Table 2: Operations on Any String in Python**

   ============== ======================================================
     **Method**                            **Explanation**
   ============== ======================================================
         .lower()  returns a string with all characters in lower case 
         .upper()  returns a string with all characters in upper case
    .startswith()  returns True or False depending on if the string 
                   starts with the specified characters
      .endswith()  returns True or False depending on if the string 
                   ends with the specified characters
         .split()  splits the string at specified characters. The
                   split strings with be returned in a list.
         .title()  returns a string where the first letter of each world
                   is upper cased.
          .join()  takes all elements from an iterable and seperates them
                   using a string. (a string is an iterable)
   ============== ======================================================


In the coding section below, you are provided with some examples of sequential operations and string methods. 
After running them, try changing the variables and use the methods in different ways to better understand how they work.

.. activecode:: sequence_methods_string

   :coach:

   my_var = "Abc defg hij"
   print(len(my_var))
   print(my_var[2:6])
   print(my_var * 2)

   print(my_var.lower())
   print(my_var.upper())
   print(my_var.startswith("Abc"))
   print(my_var.endswith("xyz"))
   print(my_var.title())
   list_of_string = my_var.split(" ")
   new_string = "#$#".join(list_of_string)
   print(new_string)

---------------------------------------------------------------------------------------------
Remember that you can import useful modules that add functionality to Python, as
below.


.. code:: python3

   import random
   random.randrange(20, 30)


.. parsed-literal::

   26


Re-run the above cell to see that it produces different outputs.

---------------------------------------------------------------------------------------------

Range
-----

A range represents a sequence of values. When trying to access specific members of a list or a string, ranges 
are used as inputs to specify the output needed. Range function can also be used as a standalone function as shone 
in the following examples.

.. code:: python3
    print(range(5))
    print(range(0, 5))
    print(range(5, 10))
    print(list(range(5)))
    print(list(range(5, 10)))
    print(list(range(5, 10, 2))) #The third parameter specifies the value each member of the range is incremented by.
    print(list(range(10, 1, -1))) #Here the -1 shows the value each member is decremented by.
    
.. parsed-literal::
    (0,5)
    (0,5)
    (5,10)
    [0, 1, 2, 3, 4]
    [5, 6, 7, 8, 9]
    [5, 7, 9]
    [10, 9, 8, 7, 6, 5, 4, 3, 2]
   

You might have noticed that the ``print`` and ``list`` functions are used in the above examples. This is because ``range`` by itself 
does not output a value we can see. ``list`` lists out all of the values in the range, this also does not output anything 
we can see. ``print`` is necessary for us to visualize the output of both ``list`` and ``range``.


For loops
---------

``for`` loops are used to repeat an action until a specific condition is met. A common use of the``for`` statement 
is to iterate over the elements of a collection as long as the collection is a sequence. 

You will see them used with the ``range`` function to specify the number of times the action is repeated as shown in the 
following example:

.. code:: python3

   for i in range(0, 10):
       print(i)


.. parsed-literal::

   0
   1
   2
   3
   4
   5
   6
   7
   8
   9


For loops can also be used to visit every item in a list. These do not require the ``range function``.

.. code:: python3

   for color in ["red", "green", "blue"]:
       print(color)


.. parsed-literal::

   red
   green
   blue


Remember that the contents of the for loop have to be indented at the same level
to differentiate them from code outside the for loop.


.. code:: python3

   for i in range(3):
       print("repeated")
       print("also repeated")
   print("not repeated")


.. parsed-literal::

   repeated
   also repeated
   repeated
   also repeated
   repeated
   also repeated

   not repeated

Lists
-----

Lists are a sequential collection of data. They are created by using two square brackets ([ ]). Each element
in the list is differentiated by commas. Lists are **mutable** so you can overwrite arbitrary values. Mutable means 
that they can be changed after being created. A list can also contain objects of any data type.  

.. code:: python3

   my_list = ["string", 1, [2.0, 4.5], 5.6]  # Don't do that
   my_list = []                              # An empty list
   my_list = [3, 4, 6, 2, 45, 23, 12, 34]    # That's better
   my_list = [3, "list", 4, "this", 5, "is"] # This will work too

Because the data in a list is ordered, you can use the :ref:`sequential operations<tab_sequentialmethods>` 
(discussed in the strings section) to retrive items from lists.

.. code:: python3

   my_list[2] = 64
   my_list

.. parsed-literal::

   [3, 4, 64, 2, 45, 23, 12, 34]

Remember that indexes start at 0.

.. code:: python3

   my_list[0]

.. parsed-literal::

   3

And you can use negative indexes to refer to values starting from the end of the
list.

.. code:: python3

   my_list[-2]

.. parsed-literal::

   12

You can also perform a variety of operations on lists.

.. _tab_listmethods:

.. table:: **Table 2: Operations on Any List in Python**

   ======================= ======================================================
    **Method/Operations**                    **Explanation**
   ======================= ======================================================
                     min() All items in the list must of of the same data type.
                           For a list of numbers: returns the smallest number.
                           For a list of strings: returns the first string in 
                           aphabatical order
                     max() All items in the list must of the same data type.
                           For a list of numbers: returns the largest number.
                           For a list of strings: returns the last string in 
                           aphabatical order
                     sum() All items in the list must be numbers.
                           returns the sum all numbers in the list.
                 .append() Adds an item to the end of the list.

   ====================== =======================================================

.. code:: python3

   my_list = [3, 4, 64, 2, 45, 23, 12, 34]

   print(len(my_list))
   print(min(my_list))
   print(max(my_list))
   print(sum(my_list))
   print(my_list * 2)

   # Changes my_list
   my_list.append(146)

   # Doesn't change my_list, need to store returned value
   other_list = my_list + [1, 2, 3]

   print(other_list)

.. parsed-literal::

   10
   2
   146
   479
   [3, 4, 64, 2, 45, 23, 12, 34, 3, 4, 64, 2, 45, 23, 12, 34]
   [3, 4, 64, 2, 45, 23, 12, 34, 146, 1, 2, 3]

The coding section below uses what you have learned so far, with the exception of ``%``. The ``%`` is the modulo operator and it will return the 
remainder of two values. So to add up all the odd numbers in ``my_list``.

.. activecode:: lists_and_forLoops

   my_list = [3, 4, 64, 2, 45, 23, 12, 34, 146] 
   total = 0
   for val in my_list:
       if val % 2 == 1:
           total += val
   print(total)


----------------------------------------------

   with open('mydata.txt', 'r') as md:
       for line in md:
           pass # Do something with each line
----------------------------------------------


Dictionaries
------------

Dictionaries are another very handy, built-in data type in Python (they’re hash
tables, if you've used another language that uses that name). Hashtables are 
one form of data structures used to store data by generating a key value pair using hash 
functions. For this course, Dictionaries are a way of storing data where each value is stored 
under a ``key`` that is used to retrive the ``value``.

Dictionaries can be created in a variety of ways.

.. code:: python3

   my_dict = {}   # Empty dict
   my_dict = {'foo': 'bar', 'baz': 'bak'}
   # This one is handy if you have a list of pairs to turn into a dictionary.
   my_dict = dict([['foo', 'bar'], ['baz', 'bak']])


``'foo'`` and ``'baz'`` are called keys, ``'bar'`` and ``'bak'`` are called
values. You can access values in the dictionary with its key.


.. code:: python3

   my_dict['foo']


.. parsed-literal::

   'bar'


And you can add new values (or overwrite old ones) by key as well.


.. code:: python3

   my_dict['hello'] = 'world'
   my_dict['hello'] = 'goodbye'


You can iterate over a dictionary using a for loop.


.. code:: python3

   for key in my_dict:
       print("The key", key, "maps to the value", my_dict[key])


.. parsed-literal::

   The key foo maps to the value bar
   The key baz maps to the value bak
   The key hello maps to the value goodbye


Functions
----------

Functions are a resuable block of code that are meant to perform a specific task. A parameter is the input that functions 
take. A return value is what a function outputs or passes on after it is run. The follwoing example shows you python functions 
used in this section:

.. code:: python3
    print(range(2,6))

.. parsed-literal::
    (2,6)


Here ``print`` and ``range`` are functions. The function ``print`` takes the parameter ``range(2,6)`` and the function ``range`` takes 
in 2 and 6. You can create your own functions by using the ``def`` keyword. You can chose to have or not to have parameters and return values 
based on the purpose of the function. Take a look at the following example:
.. code:: python3

   def say_hi():
       print("Just saying 'hello'.")

   say_hi()


.. parsed-literal::

   Just saying 'hello'.
.. activecode



Mapping and Lambda Functions
----------------------------

Mapping 
-------

The map function allows us to call a function on each item in a list.


.. code:: python3

   for value in map(double_plus_y, my_list):
       print(value)


.. parsed-literal::

   10
   12
   132
   8
   94
   50
   28
   72
   296
   296
   296




List Comprehension
------------------
