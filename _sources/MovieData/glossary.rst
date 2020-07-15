.. Copyright (C)  Google, Runestone Interactive LLC
   This work is licensed under the Creative Commons Attribution-ShareAlike 4.0
   International License. To view a copy of this license, visit
   http://creativecommons.org/licenses/by-sa/4.0/.

Glossary
========

Definitions
-------------------------

**Cell:** Rectangular boxes containing text or code in a notebook.

**Code Cell:** A cell in Juypter lab that you can program in. It uses Python3 as 
its programming language.

**Data Frame:** Data Frames are multidimensional arrays taken from a larger dataset. 
They are used to implement specific data operations that may not need the entire dataset. 

**Index:** An Index is a value that represents a position (address) in the dataframe or series. 

**Markdown:** Markdown is a lightweight markup language that uses a plain text format 
which is used in programming to edit and present HTML, XHTML, pdf and other file types. 
Refer to the relevant appendix for more about Markdown.

**Series:** A series is an array of related data values that share a connecting factor or property.

**Text Cell:** A cell in Juypter lab that you can write text in. The text is written 
in a language called Markdown.


Keywords
---------

``import``: Import lets programmers use packages, libraries or modules that have already been programmed. 

``df[<string>]:`` gets me a column and return the Series corresponding to that column.

``df[<string>]``: returns the series with the <string> named column. **<-------- ASK DR. JAN**

``df[<list of strings>]:``  gets me a bunch of columns and return a DataFrame.

``df[<list of strings>]``:  returns the dataframe from the column named in the <list of strings>. **<-------- ASK DR. JAN**

``df[<series/list of Boolean>]``: accesses the rows for each element in the listlike thing you 
passed me that is True. However, I think this is confusing and whenever you want to select some 
rows of a DataFrame you should use df.loc[].

``df.loc[<string1>:<string2>]``: This takes in the non-numeric row index(or indices) to return a **data frame**.

``df.loc[<string>]``: behaves just like df[<series/list of Boolean>]. uses the non-numeric row index and return 
the row(s) for that index value.

**Definition we are struggling with**

``df.loc[<list/Series of strings>]``: returns a data frame composed of each row from df with an index value that matches a string in the list.

``df.loc[<list/**Series** of strings>]``: returns a data frame composed of each row from df with an 
index value that matches a string in the list.

``df.loc[<list/**Series** of strings>]``: returns a new data frame that contains each row from df that match the index values of df and the strings in <list/Series of strings>. 


**--------------**

``df.loc[<list/**Series** of strings>]``: Returns a data frame composed of each row from df and it sets the <strings> as the indices of the new data frame.

``df.iloc[<index, range of indices>]``: Returns the values in the corresponding index. Works only with integers.

``<data frame>.set_index [<string)>]``: Sets an existing column(s) with the <string> name as the index of the **data frame**. 

``<data frame>.head(<numeric>)``: Returns the first <numeric> elements. If no parameter (<numeric>) is set then it will return the first five elements. 

``<pandas>.DataFrame(<data>)``: sed to create a **data frame** with the given data.

``<pandas>.read_csv()``: Used to read a csv file into a **data frame**.

``<data frame>.set_index(<column>)``: Gets the values of the given column and sets them as indices. The output will be sorted in accending order based on the new indices.

``<pandas>.to_numeric()``: Converts what is inside the parenthesis into a neumeric value. 

``<series>.str.startswith(<string>)``: ``.str.startswith()`` (in pandas) checks if a **series** contains a string(s) that starts with the given prarameter (<string>), 
and returns a boolean value (True or False).
 
``<data frame>.sort_index()``: Sorts the different objects in the **data frame**. By default, the **data frame** is sorted based on the first column in accending order.
