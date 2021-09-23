.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.


.. _PythonReview_old:

Python Review
=============

In this chapter you will get a review or rudimentary introduction to Python for this course. The purpose
of this section is not to teach you all of Python, but rather to arm you with the knowledge required to succeed in this course.
Because of this, we will only be introducing concepts that are necessary for this course.
For those of you who already know some Python it should serve as a quick review, for those of you
who know another language, it should serve as a rudimentary introduction.


Variables
---------

To better understand **variables**, let us first look at a concept from Google Sheets that you are already familiar with, cells.
Each of those cell names refer to a specific place in the spreadsheet and each of those places can contain a value. The name of
the cell such as "B12" is similar to the name of a variable and what you put into it is called the value.


In order to create a variable in Python, you must give it a name. It can have any name that has alphanumeric (A-Z,a-z,0-9) characters including
underscore (_). The name cannot start with a number and it is case sensitive, for example my_var is not the same variable as My_Var.

Each variable has a type such as integer, float, string, etc., but Python variables can seamlessly change from being a numerical value, a string, or
other types. Look at the following:

.. code:: python3

   my_var = 3 # my_var is an integer here
   print(type(my_var))
   my_var = "foo" # my_var is now a string
   print(type(my_var))
   my_var = print  # as you know this is a built-in function that prints!
   print(type(my_var))


.. parsed-literal::

   <class 'int'>
   <class 'str'>
   <class 'function'>

Python can convert a variable from one type to another without having to create a new variable. Sometimes, this is
probably a bad idea, because we typically want our variables to be meaningfully named, rather than something obscure like "foo".
But sometimes it is necessary to change types. For example:

.. code:: python3

   my_var = "123" # The input statement will always bring in information as string.
   my_var = int(my_var) # If we want to work with it as a number, we need to change it to a numerical value.
   almost_pi = float("3.14159")


Numeric Data Types
------------------

There are two main types of numeric data in Python. Integers (``int``) and floating-point values (``float``).
An integer is a zero or a positive or negative whole number.
Floating-point numbers are numbers that have fractional components after the decimal points, even if the fractional component is zero.
As a good rule of thumb, if it has a decimal point, it is a ``float``. If the number does not contain a decimal point, it is an ``int``.
The number 12 is an ``int``, but 12.0 is a ``float``, even if the numbers seem to represent the same value,
they can be of different data types.

You can use both ``int`` and ``float`` values to perform basic mathematical operations such as addition (+), subtraction
(-), multiplication (*), division (/), and exponentiation (**). Python will automatically use the normal order of operations
when calculating a value. You can use parentheses to force Python to evaluate certain expressions first. There are also some
cool other operations like %, which is called the modulus function, and which gives you the remainder of division between two integers.

Booleans
--------

**Boolean** (``bool``) is another data type that is very useful in programming. It is used to check
the truth of an expression in Python. Booleans return ``True`` or ``False``. You can evaluate
multiple Boolean expressions using the following operations: ``and``, ``or``, and ``not``.

::

    >>> True
    True
    >>> False
    False
    >>> False or True
    True
    >>> not (False or True)
    False
    >>> True and True
    True

Boolean values are often used with other operators such as equal (==) or less than (<). It is possible
to combine these relational operators with logical operators (``and``, ``or``, and ``not``) to form
complex logical questions. Below is a table of all of the logical and relational operators that
can be used to create Boolean expressions.

.. _tab_booleanOperations:

.. table:: **Table 1: Relational and Logical Operators**

    =========================== ============== =================================================================
             **Operation Name**   **Operator**                                                   **Explanation**
    =========================== ============== =================================================================
                      less than    :math:`<`                                                Less than operator
                   greater than    :math:`>`                                             Greater than operator
             less than or equal   :math:`<=`                                    Less than or equal to operator
          greater than or equal   :math:`>=`                                 Greater than or equal to operator
                          equal   :math:`==`                                                 Equality operator
                      not equal   :math:`!=`                                                Not equal operator
                    logical and  :math:`and`                          Both operands True for result to be True
                     logical or   :math:`or`        One or the other operand is True for the result to be True
                    logical not  :math:`not`   Negates the truth value, False becomes True, True becomes False
    =========================== ============== =================================================================


.. activecode:: booleanops
   :coach:

   print(13 == 50)
   print(15 > 10)
   print(not(15  > 10))
   print((5 >= 1) and (5 <= 15))


Strings
-------

A **string** is a sequential collection of zero or more **characters**. A character is any single letter, number, or symbol
that can be typed. And sequential means that the characters in the string are in a particular order. Strings' sequential
property will allow you to specify and retrieve specific elements of the string.  Strings can be represented with single or
double-quotes. Triple quotes make it easy to define multi-line strings.

Note that once a string is created and saved in a variable, it cannot be altered: it is **immutable**.


.. code:: python3

   # \n means newline

   lion = 'Simba\nNala'
   print(lion)
   tiger = "Diego\nShira"
   print(tiger)
   ogre = """Shrek
   Princess Fiona"""
   print(ogre)

.. parsed-literal::

   Simba
   Nala
   Diego
   Shira
   Shrek
   Princess Fiona


You can access particular character or segment of a string by using the following sequential indexing
operations. :ref `Table 2 <_tab_sequentialmethods>`_.

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

Aside from the sequential operations, strings also have their own set of methods. Below are some of the most typical string
methods used in this course.

.. _tab_stringmethods:

.. table:: **Table 3: Operations on Any String in Python**

   ============== =======================================================
     **Method**                            **Explanation**
   ============== =======================================================
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
   ============== =======================================================


In the coding section below, you are provided with some examples of sequential operations and string methods.
After running them, try changing the variables and use the methods in different ways to better understand how they work.

.. activecode:: methods_strings_slices
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
   new_string = "-".join(list_of_string)
   print(new_string)


Conditional Statements
----------------------

**Conditional Statements** (also known as selection statements or if statements) are used to ask a question, and depending on the
result, perform different actions. The questions follow this format: If a condition is true then perform the action.

.. code:: python3

   num = 5.0
   if type(num) == float:     # The colon (:) is important
      print("This will only print if num is a float.")
      print("Indeed, num is a float!")   # The action must be indented inside the condition

If the condition is not met then all of the code indented inside of the if statement will be ignored.

.. parsed-literal::

   This will only print if num is a float.
   "Indeed, num is a float!"

If statements can have two additional clauses, ``elif`` and ``else``. The keyword ``elif`` is a shorter way of saying an else followed by an if.
The ``elif`` clause is used after the if statement and provides another conditon to be checked if the first one (the original if statement) is not true.
It is possible to have multiple ``elif`` clauses in one if statement. When the ``else`` clause is used, it is always the last clause in a
conditional statement. In other words, there can only be one ``else`` clause in a conditional statement and it comes last.

Once a condition has been met, all subsequent clauses will be ignored.

.. activecode:: conditionals_if
   :coach:

   num = 5
   if type(num) == float:
      print("num is a float")

   elif type(num) == int:
      print("num is an int")

   elif type(num) == str:
      print("num is a string")

   else:
      print("num is not a float, int, or string")


Try the following exercise:

.. mchoice:: conditional_exercise

    What gets printed if num is 5.2 ?

    - num is a string

      - Incorrect

    - num is not a float, int, or string

      - Incorrect

    - num is a an int

      - Incorrect

    - num is a float

      + That's right!


Lists
-----

**Lists** are a sequential collection of data. They are created by using two square brackets ([ ]). Each element
in the list is differentiated by commas.

A list can also contain objects of any data type.

.. code:: python3

   my_list = [3, 4, 2, 45, 23, 12, 34]
   my_list1 = [3, "list", 4, "this", 5, "is"]
   my_list2 = []                              # An empty list
   my_list3 = ["string", 1, [2.0, 4.5], 5.6]  # Notice that one of the elements in this list is a list!


Because the data in a list is ordered, you can use the index with ``[ ]`` brackets. Indexes start at 0.

.. code:: python3

   my_list = [3, 4, 2, 45, 23, 12, 34]
   my_list[0]

.. parsed-literal::

   3

Lists are **mutable**. Mutable means that arbitrary values can be overwritten and added or deleted after the list is created. You should use their index
to specify which location you would like to overwrite the value of as shown below:

.. code:: python3

   my_list = [3, 4, 2, 45, 23, 12, 34]
   my_list
   my_list[0] = 5
   my_list[2] = 6
   my_list

.. parsed-literal::

   [3, 4, 2, 45, 23, 12, 34]
   [5, 4, 6, 45, 23, 12, 34] # Notice both 0th and 2th indexes have overwritten values.


And you can use negative indexes to refer to values starting from the end of the
list.

.. code:: python3

   my_list[-2]

.. parsed-literal::

   12

You can also perform a variety of operations on lists.

.. _tab_listmethods:

.. table:: **Table 4: Operations on Any List in Python**

   ======================= =======================================================
     **Method/Operations**                            **Explanation**
   ======================= =======================================================
                     min() All items in the list must of of the same data type.
                           For a list of numbers: returns the smallest number.
                           For a list of strings: returns the first string in
                           alphabetical order
                     max() All items in the list must of the same data type.
                           For a list of numbers: returns the largest number.
                           For a list of strings: returns the last string in
                           alphabetical order
                     sum() All items in the list must be numbers.
                           returns the sum all numbers in the list.
                 .append() Adds an item to the end of the list.
   ======================= =======================================================

.. code:: python3

   my_list = [3, 4, 64, 2, 45, 23, 12, 34]

   print(len(my_list))
   print(min(my_list))
   print(max(my_list))
   print(sum(my_list))
   print(my_list * 2)

   # Changes my_list
   my_list.append(146)

   # The following doesn't change my_list, the returned value is stored in a variable.
   other_list = my_list + [1, 2, 3]

   print(other_list)

.. parsed-literal::

   8
   2
   64
   187
   [3, 4, 64, 2, 45, 23, 12, 34, 3, 4, 64, 2, 45, 23, 12, 34]
   [3, 4, 64, 2, 45, 23, 12, 34, 146, 1, 2, 3]

The coding section below uses what you have learned so far, with the exception of ``%``. The ``%`` is the modulo operator and it will return the
remainder of two values. So to add up all the odd numbers in ``my_list``.

.. activecode:: lists_and_forLoops2

   my_list = [3, 4, 64, 2, 45, 23, 12, 34, 146]
   total = 0
   for val in my_list:
       if val % 2 == 1:
           total += val
   print(total)


Range
-----

A **range** represents a sequence of values. When trying to access specific members of a list or a string, ranges
are used as inputs to specify the output needed. Consider the following examples.

.. code:: python3

    print(list(range(5)))
    print(list(range(5, 10)))
    print(list(range(5, 10, 2))) # The third parameter specifies the value each member of the range is incremented by.
    print(list(range(10, 1, -1))) # Here the -1 shows the value each member is decremented by.

.. parsed-literal::

    [0, 1, 2, 3, 4]
    [5, 6, 7, 8, 9]
    [5, 7, 9]
    [10, 9, 8, 7, 6, 5, 4, 3, 2]


You might have noticed that the ``print`` and ``list`` functions are used in the above examples. This is because ``range`` by itself
does not output a value we can see. ``list`` lists out all of the values in the range, this also does not output anything
we can see. ``print`` is the function that allows us to see the output values.

.. mchoice:: Range_exercise

    What would ``print(list(range(-1,13)))`` show?

    - [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12. 13]

      - Think about the boarders of a range. The last input should not be part of the list.

    - [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

      + Correct!

    - [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

      - Think about the boarders or a range. The first input is part of the list.

    - [-1, 1, 3, 5, 7, 9, 11]

      - This is incorrect!


For Loops
---------

A **for loop** is used to repeat an action until a specific condition is met. A common use of the for loop
is to iterate over the elements of a collection as long as the collection is a sequence.

You will often see a for loop used with the ``range`` function to specify the number of times the action should be repeated as shown in the
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


For loops can also be used to visit every item in a list. These do not require the ``range`` function.

.. code:: python3

   for color in ["red", "green", "blue"]:
       print(color)


.. parsed-literal::

   red
   green
   blue


Just like in conditional statements, the contents of the for loop have to be indented at the same level
to differentiate them from code outside the for loop.

.. code:: python3

   for i in range(3):
       print("repeated")
       print("also repeated")
   print("not repeated") # This is not in the for loop!


.. parsed-literal::

   repeated
   also repeated
   repeated
   also repeated
   repeated
   also repeated

   not repeated



Dictionaries
------------

**Dictionaries** are another convenient, built-in data type in Python (they’re hash
tables, if you've used another language that uses that name). Hash tables are
one form of data structure used to store data by generating a key-value pair using hash
functions. For this course, Dictionaries are a way of storing data where each value is stored
under a ``key`` that is used to retrieve the ``value``. You can think of dictionaries much like a lookup table in a spreadsheet. You can also think of them like a foreign language
dictionary that you might use to look up a foreign word.


.. code:: python3

   my_dict = {}   # Empty dict
   my_dict = {'one': 'uno', 'two': 'dos'}
   # This one is handy if you have a list of pairs to turn into a dictionary.
   my_dict = dict([['one', 'uno'], ['two', 'dos']])
   my_dict

.. parsed-literal::

   {'one': 'uno', 'two': 'dos'}

``'one'`` and ``'two'`` are called keys, ``'uno'`` and ``'dos'`` are called
values. You can access values in the dictionary with its key.

.. code:: python3

   my_dict['one']


.. parsed-literal::

   'uno'


And you can add new values (or overwrite old ones) by key as well.


.. code:: python3

   my_dict['three'] = 'trez'
   my_dict['three'] = 'tres' # Oops! Spelling corrected.



Functions
----------

**Functions** are a reusable block of code that are meant to perform a specific task. A parameter is an input that a function
takes. A return value is what a function outputs or passes on after it is run. The return value of a
function is not printed (or displayed) so we have to use a print statement to see it. You can see some python functions
used in this section in the following examples:

.. code:: python3

    print(max([55, 33, -56, 107, 3, 2]))

.. parsed-literal::

    107



Here ``print`` and ``max`` are functions. ``print`` takes the parameter ``max([55, 33, -56, 107, 3, 2])`` and ``max`` takes the
list [55, 33, -56, 107, 3, 2] as a parameter. The output (return value) of the max function is 107 but without the print function you wouldn't be
able to see it. It gets printed because we use the print function with the input that resolves to 107.

You can create your own functions by using the ``def`` keyword. Whether or not a function has parameters
or return values depends on the purpose of the function. A function can have as many parameters as
you the programmer would like; however, it can only have one return value if any. Take a look at the
following example which has neither:

.. code:: python3

   def say_hi():
       print("Just saying 'hello'.")

   say_hi()

.. parsed-literal::

   Just saying 'hello'.

The ``say_hi`` function does not have any inputs or outputs so it is not very flexible. Let's try creating a
function with an input parameter. Try changing the parameter in the following:

.. code:: python3

   def say_it(say_what):
       print("Just saying " + say_what)

   say_it("Python is fun!")

.. parsed-literal::

   Just saying Python is fun!

The way this works is the say_it function has a parameter named say_what. That parameter is sent to the print function which has a different parameter.
The print function gets a concatenation of the string "Just saying " concatenated with say_what as its parameter.

Functions with ``return`` values are called **fruitful functions**.

Here's a simple example:

.. code:: python3

   def is_letter_in_word(letter, word):

      if letter in word:
         return (True)

      else:
         return (False)

   print(is_letter_in_word('i', 'Hippopotamus'))

.. parsed-literal::

   True


Recall that the ``max`` function is a built in function that can be used to fnd the highest value from a list. We would not want to print the ``max``
every time we used it. That is why we need to have ``return`` values as output. The ``min`` function is similar, consider the following scenario:

A professor wishes to drop the lowest score of three exams and compute the remaining two. Here's how they might do that:

.. code:: python3

   def compute_with_drop(grades):

      total = (sum(grades) - min(grades))/2.0
      print (total) # Why print this?

   compute_with_drop([90, 78, 87])


.. parsed-literal::
      88.5

Note that if the professor wanted to use this function as part of further calculations they would need a return value instead of a print!
Try creating your own function in the following:

.. activecode:: your_turn_function
   :coach:

   def your_function(your_input):

      # Put your code here!


   your_function() # Add parameters inside the parentheses!


Map Functions
-------------

The **map function** allows us to use each item in a list as a parameter for a function.


.. code:: python3

   my_list = [3, 4, 64, 2, 45, 23, 12, 34, 146]

   def double_plus_y(x, y=4):
      return 2 * x + y

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

Lambda Functions
----------------

For a simple, one-time-use function, we don't have to define a function, we can
use a **lamda function** to define the operation in-line. A lambda function is an anonymous
function, meaning that it does not need a name. Using them is generally not a good idea, since
most functions are easier to recognize and to read if they have names, but you will see them
widely used on online forums.

You can make a Lambda function with a simple one line expression. You can make a lambda function by writing:

.. parsed-literal::

   lambda parameters : expression

The best way to understand the lambda function is to see it being used.

.. activecode:: lamda_functions
   :coach:

   x = lambda a : a + 7 # Notice that this is a one line expression
   print (x(5))

   y = lambda a, b, c : a * b * c
   print (y(2,3,4))

   z = lambda a : a * 3
   print(z("Happy birthday to you!" + "\n"))


Note that lambda functions do not use the ``return`` keyword, you just specify
the name and value(s) of the parameters of the function, a colon, and the operation to perform on the parameters.

The ``lambda`` function can also be used with other functions.

.. code:: python3

   my_list = [3, 4, 64, 2, 45, 23, 12, 34, 146]

   for value in map(lambda x: 2 * x, my_list): # Don't need a separate function.
       print(value)


.. parsed-literal::

   6
   8
   128
   4
   90
   46
   24
   68
   292


List Comprehensions
-------------------

**List comprehensions** provide a concise way to create a list and will always return a list.
List comprehensions are never necessary because they can always produce the same result as a for loop, possibly
with a nested conditional inside, but again, you will see that they are widely used.

As you will see in the examples below, they consist of brackets that contain a *for clause* and zero or more *if clauses*.
List comprehensions follows the following format:

.. parsed-literal::

   [new_list_element for_clause if_clause(conditional)]

You can use `list comprehension <https://www.pythonforbeginners.com/basics/list-comprehensions-in-python>`_ to
perform an operation on every item in the list. It looks a little bit like a for loop inside of a list.

.. code:: python3

   my_list = [3, 8, 64, 2, 45, 23, 34, 146, 146, 146]

   [x*2 for x in my_list]


.. parsed-literal::

   [6, 8, 128, 4, 90, 46, 24, 68, 292, 292, 292]


You can also use it to filter out values from a list. For example, the below
extracts every odd values from the list. You can even combine filtering and other operations.


.. code:: python3

   my_list = [3, 8, 64, 2, 45, 23, 34, 146, 146, 146]

   [x for x in my_list if x % 2 == 1]

   # Combining the operations. Square every value less than 10.
   [x**2 for x in my_list if x < 10]

.. parsed-literal::

   [3, 45, 23]

   [9, 16, 4]


Let's practice list comprehensions with strings. To do so, we're going to be using a list of
city and state names. Fun fact: these are all
`real cities <https://en.wikipedia.org/wiki/List_of_the_most_common_U.S._place_names>`_
in the US, but with a more famous namesake in a different state.

Let's use list comprehension to produce a list of only the cities whose name
(including the state name) are less than 12 characters long.



.. code:: python3

   cities = [
       'washington,ct',
       'springfield,or',
       'riverside,tx',
       'franklin,vt',
       'lebanon,co',
       'dayton,tx',
       'las vegas,nm',
       'madison,ca',
       'georgetown,ct',
       'los angeles,tx',
   ]

   short_cities = []
   for city in cities:
      if len(city) < 12:
         short_cities.append(city)
   print("Using for loops: " + short_cities)

   short_cities = [city for city in cities if len(city) < 12]
   short_cities

.. parsed-literal::

   Using for loops: ['franklin,vt', 'lebanon,co', 'dayton,tx', 'madison,ca']
   ['franklin,vt', 'lebanon,co', 'dayton,tx', 'madison,ca']

As you can see in the above example, both the list comprehension and the for loop in the code do the same thing.
The for loop is there to help you better understand how the list comprehension works.


Next, create a list of abbreviations that are just the first 3 letters of each
city name.


.. code:: python3

   abbreviations = [city[:3] for city in cities]
   abbreviations


.. parsed-literal::

   ['was', 'spr', 'riv', 'fra', 'leb', 'day', 'las', 'mad', 'geo', 'los']


You can also use list comprehension to create a dictionary that maps city names to the states
that they are located in. Because we are creating a dictionary, we will be using braces ({ }) instead
of brackets ([ ]).


.. code:: python3

   city_dict = {city[:-3]:city[-2:] for city in cities}
   city_dict


.. parsed-literal::

   {'washington': 'ct',
    'springfield': 'or',
    'riverside': 'tx',
    'franklin': 'vt',
    'lebanon': 'co',
    'dayton': 'tx',
    'las vegas': 'nm',
    'madison': 'ca',
    'georgetown': 'ct',
    'los angeles': 'tx'}


For a more challenging list comprehension, write a single list comprehension
that produces the
`title-cased <https://en.wikipedia.org/wiki/Letter_case#Title_Case>`_ version of
just the city names of the cities in Texas (that means that the states should
not be inside of the resulting list).


.. activecode:: your_list_comprehension

   cities = [
       'washington,ct',
       'springfield,or',
       'riverside,tx',
       'franklin,vt',
       'lebanon,co',
       'dayton,tx',
       'las vegas,nm',
       'madison,ca',
       'georgetown,ct',
       'los angeles,tx',
   ]

   texas = [] # Add code here
   print(texas)


Some Additional Important Python Knowledge
------------------------------------------

Opening Files
~~~~~~~~~~~~~

You can open files selectively by using the following code:

.. code:: python3

   with open('mydata.txt', 'r') as md:
       for line in md:
           pass # Change this to what you want done with each line

The name of the file in the above code is 'mydata.txt'. The 'r' means the file is opened in a
read-only mode. If you would like to write in the file, you can use 'w' instead of 'r'. It is
not recommended to use 'w' if your file already has something in it since it will write over it.
The ``as md`` tells python to recognize that md refers to the opened file where md is an arbitrary name so
you can change it to any name you'd like.

Random Number Generators
~~~~~~~~~~~~~~~~~~~~~~~~

You don't always have to reinvent the wheel! Python has built in functions you can use for a more efficient
programming. A good example of a built-in function is ``randrange``. It requires you to import a module called ``random`` as
you can see in the following code:

.. code:: python3

   import random
   random.randrange(20, 30)

.. parsed-literal::

   26

You may also this kind of thing done as the following:

.. code:: python3

   import random as rand
   rand.randrange(20, 30)

.. parsed-literal::

   26

The ``as rand`` in the above code allows you to use rand instead of ``random`` to use all the functions that come with
random (such as ``randrange``). rand is not a preset value so you can use any name you would like instead of it.

Practice using the random module below:

.. activecode:: random_generator

   import random as rand
   rand.randrange() # Add two numbers between which you want a random value generated.
