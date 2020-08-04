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

**Data Frame:** Data frames are multidimensional arrays taken from a larger dataset. 
They are used to implement specific data operations that may not need the entire dataset.
(In pandas it is called ``DataFrame``)

**Explicit Index:** Uses the values (numeric or non-numeric) set as the index.  For example, if we 
set a column or row as the index then we can use values in the row or column as indices in different 
panda methods. 

**Implicit Index:** Uses the location (numeric) of the indices, similar to the python style of indexing. 

**Index:** An Index is a value that represents a position (address) in the ``DataFrame`` or series. 

**Markdown:** Markdown is a lightweight markup language that uses a plain text format 
which is used in programming to edit and present HTML, XHTML, pdf and other file types. 
Refer to the relevant appendix for more about Markdown.

**Series:** A series is an array of related data values that share a connecting factor or property.

**Text Cell:** A cell in Juypter lab that you can write text in. The text is written 
in a language called Markdown.


Keywords
---------

``import``: Import lets programmers use packages, libraries or modules that have already been programmed. 

``<DataFrame>[<string>]``: return the series corresponding to the given column (<string>).

``<DataFrame>[<list of strings>]``: returns a given set of columns as a ``DataFrame``.

``<DataFrame>[<series/list of Boolean>]``: If the index in the given list is ``True`` then it returns the row from that same index in the ``DataFrame``.

``<DataFrame>.loc[ ]``: Uses explicit indexing to return a ``DataFrame`` containing those indicies and the values associated with them. 

``<DataFrame>.loc[<string1>:<string2>]``: This takes in a range of explicit indices and returns a ``DataFrame`` containing those indicies and the values associated with them.

``<DataFrame>.loc[<string>]``: Uses an explicit index and return the row(s) for that index value.

``<DataFrame>.loc[<list/series of strings>]``: Returns a new ``DataFrame`` containing the labels given in the list of strings.

``<DataFrame>.iloc[ ]``: Uses implicit indexing to return a ``DataFrame`` containing those indicies and the values associated with them.

``<DataFrame>.iloc[<index, range of indices>]``: This takes in an implicit index (or a range of implicit indices) and returns a ``DataFrame`` containing those 
indicies and the values associated with them.

``<DataFrame>.set_index [<string)>]``: Sets an existing column(s) with the <string> name as the index of the ``DataFrame``. 

``<DataFrame>.head(<numeric>)``: Returns the first <numeric> element(s). If no parameter (<numeric>) is set then it will return the first five elements. 

``<pandas>.DataFrame(<data>)``: Used to create a ``DataFrame`` with the given data.

``<pandas>.read_csv()``: Used to read a csv file into a ``DataFrame``.

``<DataFrame>.set_index(<column>)``: Gets the values of the given column and sets them as indices. The output will be sorted in accending order based on the new indices.

``<pandas>.to_numeric()``: Converts what is inside the parenthesis into neumeric values. 

``<series>.str.startswith(<string>)``: ``.str.startswith()`` (in pandas) checks if a series contains a string(s) that starts with the given prarameter (<string>), 
and returns a boolean value (True or False).
 
``<data frame>.sort_index()``: Sorts the different objects in the ``DataFrame``. By default, the ``DataFrame`` is sorted based on the first column in accending order.


