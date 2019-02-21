
Instacart Market Basket Analysis
================================

Instacart is a shopping and delivery service that works with stores in
your city such as whole foods or Costco or stores that are more local to
your city or region. They will pick up your order and deliver it to your
door. Consequently they have a lot of data on a lot of different
shopping behavior that we can use to make predictions about future
purchases or suggest items that a person may want to add to their
shopping cart based on their past behavior. Sound familiar? This is the
kind of thing that Amazon has been doing successfully for years.

.. code:: ipython3

    %matplotlib inline

    import pandas as pd
    import matplotlib
    import matplotlib.pyplot as plt
    import numpy as np
    import seaborn as sbn
    import altair as alt
    import requests
    matplotlib.style.use('ggplot')
    sbn.set_style("whitegrid")
    import json
    import pickle
    import scipy
    alt.data_transformers.enable('json')





.. parsed-literal::

    DataTransformerRegistry.enable('json')



Reading List
------------

-  `Market Basket
   Analysis <http://pbpython.com/market-basket-analysis.html>`__
-  Item Item Recommender Systems

The Data
--------

| This is a BIG data set. The largest file has over 32 million rows.
| We don’t want to start there as that is crazy big. So we have a
  smaller file, still with 1.3 million rows that we can use to start
  with.

aisles.csv
~~~~~~~~~~

::

    aisle_id,aisle
    1,prepared soups salads
    2,specialty cheeses
    3,energy granola bars
    ...

departments.csv
~~~~~~~~~~~~~~~

::

    department_id,department
    1,frozen
    2,other
    3,bakery
    ...

order_products__prio.csv
~~~~~~~~~~~~~~~~~~~~~~~~

These files specify which products were purchased in each order.
``order_products__prior.csv`` contains previous order contents for all
customers. ‘reordered’ indicates that the customer has a previous order
that contains the product. Note that some orders will have no reordered
items. ``order_products_train.csv`` is much smaller (even though it has
1.3 million records) and is a better place to start.

::

    order_id,product_id,add_to_cart_order,reordered
    1,49302,1,1
    1,11109,2,1
    1,10246,3,0
    ...

orders.csv
~~~~~~~~~~

This file tells to which set (prior, train, test) an order belongs. You
are predicting reordered items only for the test set orders. ‘order_dow’
is the day of week.

::

    order_id,user_id,eval_set,order_number,order_dow,order_hour_of_day,days_since_prior_order
    2539329,1,prior,1,2,08,
    2398795,1,prior,2,3,07,15.0
    473747,1,prior,3,3,12,21.0
    ...

products.csv
~~~~~~~~~~~~

::

    product_id,product_name,aisle_id,department_id
    1,Chocolate Sandwich Cookies,61,19
    2,All-Seasons Salt,104,13
    3,Robust Golden Unsweetened Oolong Tea,94,7
    ...

Some exploratory data analysis questions we might do
----------------------------------------------------

-  How many unique orders do we have?
-  what is the most popular first item to add to the cart? Does that
   change by day of the week?
-  What is the distribution of the number of items in the shopping cart
   just before checkout?
-  what is the most popular second item?
-  What department or aisle do users most frequently shop first?
-  What department or aisle do users most frequently shop last?
-  Create a bar chart of the number of itesm sold by day of the week
-  What department gets the most sales?
-  Create a chart that shows the number of items bought from each
   department.
-  Do most people shop linearly? Is there a visualization that would
   show the path that most people take through the store? By Aisle? By
   Department? – using the order placed in shopping basket.






Getting down to real market basket analysis
-------------------------------------------

The key question in market basket analysis is what products are most
frequently purchased together.

To answer this question we will want to build a table where each row is
a product, each column is a product and the cell where two products
intersect is the count of the number of times they ended up in the same
shopping cart.

.. code:: ipython3

    mb = pd.DataFrame({'doritos': {'oreos': 2, 'snickers':6}, 'oreos': {'doritos':2, 'snickers':3}, 'snickers': {'doritos': 6, 'oreos':3}})
    mb




.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>doritos</th>
          <th>oreos</th>
          <th>snickers</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>doritos</th>
          <td>NaN</td>
          <td>2.0</td>
          <td>6.0</td>
        </tr>
        <tr>
          <th>oreos</th>
          <td>2.0</td>
          <td>NaN</td>
          <td>3.0</td>
        </tr>
        <tr>
          <th>snickers</th>
          <td>6.0</td>
          <td>3.0</td>
          <td>NaN</td>
        </tr>
      </tbody>
    </table>
    </div>



Looking at the table it is clear that doritos and snickers are most
often purchased together because the total is 6. The next most common
pair is snickers and oreos that just beat out doritos and oreos.

Looking at the table that is not too hard. We have the shopping cart
data so we know what products have ended up in the same cart for
thousands of carts.

The challenge is that we have a table with 49,688 columns and 49,688
rows. That means we have 2,468,897,344 (thats 2+ billion!) cells in our
table. How many of those cells do you think are empty? *Hint* Lots of
them!

.. code:: ipython3

    products = pd.read_csv('ecomm/products.csv')
    products.head()




.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>product_id</th>
          <th>product_name</th>
          <th>aisle_id</th>
          <th>department_id</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>1</td>
          <td>Chocolate Sandwich Cookies</td>
          <td>61</td>
          <td>19</td>
        </tr>
        <tr>
          <th>1</th>
          <td>2</td>
          <td>All-Seasons Salt</td>
          <td>104</td>
          <td>13</td>
        </tr>
        <tr>
          <th>2</th>
          <td>3</td>
          <td>Robust Golden Unsweetened Oolong Tea</td>
          <td>94</td>
          <td>7</td>
        </tr>
        <tr>
          <th>3</th>
          <td>4</td>
          <td>Smart Ones Classic Favorites Mini Rigatoni Wit...</td>
          <td>38</td>
          <td>1</td>
        </tr>
        <tr>
          <th>4</th>
          <td>5</td>
          <td>Green Chile Anytime Sauce</td>
          <td>5</td>
          <td>13</td>
        </tr>
      </tbody>
    </table>
    </div>



The most common operation we are going to want to use with this table is
to look up a product id to get more information about the product. So,
lets make the product_id the index of the DataFrame to make things
faster.

.. code:: ipython3

    products.set_index('product_id', inplace=True)

.. code:: ipython3

    products.head()




.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>product_name</th>
          <th>aisle_id</th>
          <th>department_id</th>
        </tr>
        <tr>
          <th>product_id</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <td>Chocolate Sandwich Cookies</td>
          <td>61</td>
          <td>19</td>
        </tr>
        <tr>
          <th>2</th>
          <td>All-Seasons Salt</td>
          <td>104</td>
          <td>13</td>
        </tr>
        <tr>
          <th>3</th>
          <td>Robust Golden Unsweetened Oolong Tea</td>
          <td>94</td>
          <td>7</td>
        </tr>
        <tr>
          <th>4</th>
          <td>Smart Ones Classic Favorites Mini Rigatoni Wit...</td>
          <td>38</td>
          <td>1</td>
        </tr>
        <tr>
          <th>5</th>
          <td>Green Chile Anytime Sauce</td>
          <td>5</td>
          <td>13</td>
        </tr>
      </tbody>
    </table>
    </div>




.. code:: ipython3

    len(products)**2




.. parsed-literal::

    2468897344



Constructing an item-item matrix
--------------------------------

To construct a matrix of the kind we showed above will take a bit of
thought (and time!) So lets do some design first.

1. Its a very good assumption that this data is sparse, so lets start by
   using a data structure that supports sparsity. – A dictionary of
   dictionaries is the key to this. In fact scroll back just a bit and
   look carefully at how our DataFrame was constructed. You will notice
   a dictionary like this:

   ::

       {'doritos': {'oreos': 2, 'snickers':6},
        'oreos': {'doritos':2, 'snickers':3},
        'snickers': {'doritos': 6, 'oreos':3}
        }

   If you think about it you will realise that we are storing twice as
   much data as we need to. This matrix we are building is symmetric.
   the value at i,j will always match the value at j,i because the order
   of the products is not important.

2. The primary source of our data will be the ``order_products__train``
   data. There the data is sorted by the order number and the order in
   which products were added to the cart. We want to take each order as
   a group and add **all pairs** of items in a cart to the matrix.

3. We can take advantage of the symmetry by ordering the products in the
   same cart by their product id and always using the lower number as
   the first index.

Lets make a simple data file that matches our example and see how we can
build a sparse version of it.

1 = doritos 2 = oreos 3 = snickers

ordernum,product
1, 1
1, 2
1, 3
2, 1
2, 3
3, 1
4, 1
4, 2
5, 1
5, 3
6, 1
6, 3
7, 1
7, 3
7, 3
8, 2
8, 3


.. code:: ipython3

    small_o = pd.read_csv('small_orders.csv')
    groups = small_o.groupby('ordernum')
    groups.get_group(6)




.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>ordernum</th>
          <th>product</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>10</th>
          <td>6</td>
          <td>1</td>
        </tr>
        <tr>
          <th>11</th>
          <td>6</td>
          <td>3</td>
        </tr>
      </tbody>
    </table>
    </div>



The ``get_group`` function is awesome! This allows us to. get a mini
data frame containing only the items in one particular order. Now if we
are smart and process the items from smallest to largest we can build
our dictionary based matrix no problem.

.. code:: ipython3

    groups.get_group(1)['product'].sort_values()




.. parsed-literal::

    0    1
    1    2
    2    3
    Name: product, dtype: int64



.. code:: ipython3

    cart = groups.get_group(1)['product'].sort_values()
    cart.loc[1:]




.. parsed-literal::

    1    2
    2    3
    Name: product, dtype: int64



.. code:: ipython3

    for g in range(1,9):
        cart = groups.get_group(g)['product'].sort_values()
        for i in cart.index:
            for j in cart.loc[i+1:]:
                print(f"products {cart[i]} and {j} in cart")
        print("--")




.. parsed-literal::

    products 1 and 2 in cart
    products 1 and 3 in cart
    products 2 and 3 in cart
    --
    products 1 and 3 in cart
    --
    --
    products 1 and 3 in cart
    --
    products 1 and 3 in cart
    --
    products 1 and 3 in cart
    --
    products 1 and 2 in cart
    products 1 and 3 in cart
    products 2 and 3 in cart
    --
    products 2 and 3 in cart
    --


.. code:: ipython3

    mat = {}
    for g in range(1,9):
        cart = groups.get_group(g)['product'].sort_values().tolist()
        for i in range(len(cart)):
            print(mat)
            if cart[i] not in mat:
                mat[cart[i]] = {}
            for j in cart[i+1:]:
                print(cart[i],j)
                mat[cart[i]][j] = mat[cart[i]].get(j,0) + 1
        print("--")
    pd.DataFrame(mat)


.. parsed-literal::

    {}
    1 2
    1 3
    {1: {2: 1, 3: 1}}
    2 3
    {1: {2: 1, 3: 1}, 2: {3: 1}}
    --
    {1: {2: 1, 3: 1}, 2: {3: 1}, 3: {}}
    1 3
    {1: {2: 1, 3: 2}, 2: {3: 1}, 3: {}}
    --
    {1: {2: 1, 3: 2}, 2: {3: 1}, 3: {}}
    --
    {1: {2: 1, 3: 2}, 2: {3: 1}, 3: {}}
    1 3
    {1: {2: 1, 3: 3}, 2: {3: 1}, 3: {}}
    --
    {1: {2: 1, 3: 3}, 2: {3: 1}, 3: {}}
    1 3
    {1: {2: 1, 3: 4}, 2: {3: 1}, 3: {}}
    --
    {1: {2: 1, 3: 4}, 2: {3: 1}, 3: {}}
    1 3
    {1: {2: 1, 3: 5}, 2: {3: 1}, 3: {}}
    --
    {1: {2: 1, 3: 5}, 2: {3: 1}, 3: {}}
    1 2
    1 3
    {1: {2: 2, 3: 6}, 2: {3: 1}, 3: {}}
    2 3
    {1: {2: 2, 3: 6}, 2: {3: 2}, 3: {}}
    --
    {1: {2: 2, 3: 6}, 2: {3: 2}, 3: {}}
    2 3
    {1: {2: 2, 3: 6}, 2: {3: 3}, 3: {}}
    --




.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>2</th>
          <td>2</td>
          <td>NaN</td>
          <td>NaN</td>
        </tr>
        <tr>
          <th>3</th>
          <td>6</td>
          <td>3.0</td>
          <td>NaN</td>
        </tr>
      </tbody>
    </table>
    </div>



.. code:: ipython3

    mat




.. parsed-literal::

    {1: {2: 2, 3: 6}, 2: {3: 3}, 3: {}}



Ok, now we have a “cooccurence matrix” . given one product we an tell
how often that product is in the same shopping cart as many others. The
matrix we have built turns out to be a “lower triangular” matrix because
we are only storing the lower left. The upper right is symmetric so we
can save half the storage!

**Important** Saving storage often comes with an additional cost in
complexity. In this case, becuase we are building a “lower triangular”
matrix we have to be careful if we want to get all of the products that
are purchased together. We cannot just look at the column corresponding
to the product and we cannot just look at the row corresponding to the
product. If we wanted to know everything purchased with product 2 we
have to look at the row for 2 as well as the column for two. The row for
2 tells us that 2 was purchased with 1 (2 times) and the column for 2
tells us that 2 was purchased with 3 (3 times). If we kept both
triangles we could look at either the row or the column.

Let’s build the item item matrix for the instacart data and see what we
can learn!

The first thing we’ll need is a list of unique order ids. In the toy
example above we were able to just use a range of numbers, because we
knew that the order numbers started at 1 and went sequentailly.

.. code:: ipython3

    order_products = pd.read_csv("ecomm/order_products__prior.csv")
    order_products.head()




.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>order_id</th>
          <th>product_id</th>
          <th>add_to_cart_order</th>
          <th>reordered</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>2</td>
          <td>33120</td>
          <td>1</td>
          <td>1</td>
        </tr>
        <tr>
          <th>1</th>
          <td>2</td>
          <td>28985</td>
          <td>2</td>
          <td>1</td>
        </tr>
        <tr>
          <th>2</th>
          <td>2</td>
          <td>9327</td>
          <td>3</td>
          <td>0</td>
        </tr>
        <tr>
          <th>3</th>
          <td>2</td>
          <td>45918</td>
          <td>4</td>
          <td>1</td>
        </tr>
        <tr>
          <th>4</th>
          <td>2</td>
          <td>30035</td>
          <td>5</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
    </div>



.. code:: ipython3

    import ipywidgets
    def log_progress(sequence, every=None, size=None, name='Items'):
        from ipywidgets import IntProgress, HTML, VBox
        from IPython.display import display

        is_iterator = False
        if size is None:
            try:
                size = len(sequence)
            except TypeError:
                is_iterator = True
        if size is not None:
            if every is None:
                if size <= 200:
                    every = 1
                else:
                    every = int(size / 200)     # every 0.5%
        else:
            assert every is not None, 'sequence is iterator, set every'

        if is_iterator:
            progress = IntProgress(min=0, max=1, value=1)
            progress.bar_style = 'info'
        else:
            progress = IntProgress(min=0, max=size, value=0)
        label = HTML()
        box = VBox(children=[label, progress])
        display(box)

        index = 0
        try:
            for index, record in enumerate(sequence, 1):
                if index == 1 or index % every == 0:
                    if is_iterator:
                        label.value = '{name}: {index} / ?'.format(
                            name=name,
                            index=index
                        )
                    else:
                        progress.value = index
                        label.value = u'{name}: {index} / {size}'.format(
                            name=name,
                            index=index,
                            size=size
                        )
                yield record
        except:
            progress.bar_style = 'danger'
            raise
        else:
            progress.bar_style = 'success'
            progress.value = index
            label.value = "{name}: {index}".format(
                name=name,
                index=str(index or '?')
            )

.. code:: ipython3

    %%time

    groups = order_products.groupby('order_id')
    unique_orderids = order_products.order_id.unique()
    mat = {}
    for g in log_progress(unique_orderids, size=len(unique_orderids)):
        cart = groups.get_group(g)['product_id'].sort_values().tolist()
        for i in range(len(cart)):
            if cart[i] not in mat:
                mat[cart[i]] = {}
            for j in cart[i+1:]:
                mat[cart[i]][j] = mat[cart[i]].get(j,0) + 1




.. parsed-literal::

    VBox(children=(HTML(value=''), IntProgress(value=0, max=3214874)))


.. parsed-literal::

    CPU times: user 39min 39s, sys: 21.5 s, total: 40min
    Wall time: 40min 15s


A bit of analysis revealed that there are are HUGE number of entries in
the matrix that are a count of 1. These 1 time “co-purchases” don’t give
us much useful information for recommending products, so lets save some
memory and remove them.

You can’t remove things from a dictionary while you are iterating over a
dictionary. So we will need to make a list of keys to remove in one pass
and then delete them later.

.. code:: ipython3

    delkeys = []
    for i in mat.keys():
        for k,v in mat[i].items():
            if v == 1:
                delkeys.append((i,k))

    len(delkeys)




.. parsed-literal::

    21944168



Yep, 21.9 million entries in our matrix are 1’s

.. code:: ipython3

    for i,j in delkeys:
        del mat[i][j]

.. code:: ipython3

    %%time

    smat = pd.SparseDataFrame(mat)
    smat.head()


.. parsed-literal::

    CPU times: user 10min 55s, sys: 33.8 s, total: 11min 29s
    Wall time: 11min 41s


We can check on the density of our sparse data structure by looking at
its density attribute.

.. code:: ipython3

    smat.density




.. parsed-literal::

    0.008275774966857377



And we see that it is only 0.8% full!

We can use idxmax to give us a series that for each column tells us the
row with the maximum value for that column.

.. code:: ipython3

    maxcols = smat.idxmax()
    maxcols = maxcols.dropna()

.. code:: ipython3

    %%time

    maxcc = 0
    maxrow = None
    maxcol = None
    for col, row in maxcols.astype(int).iteritems():
        if smat.loc[row, col] > maxcc:
            maxrow = row
            maxcol = col
            maxcc = smat.loc[row,col]



.. parsed-literal::

    CPU times: user 1.46 s, sys: 1.86 s, total: 3.32 s
    Wall time: 5.95 s


.. code:: ipython3

    maxcc




.. parsed-literal::

    62341.0



.. code:: ipython3

    maxrow




.. parsed-literal::

    47209



.. code:: ipython3

    maxcol




.. parsed-literal::

    13176



Testing our item-item matrix
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Let’s test the matrix by doing some exploring. What are the two products
most commonly purchased together?

.. code:: ipython3

    print(f"product {maxrow} was purchased with {maxcol} {maxcc} times")




.. parsed-literal::

    product 47209 was purchased with 13176 62341.0 times


Because we were smart before and made the product_id the index of the
products table we can use this nice lookup syntax to get the product
name!

.. code:: ipython3

    products.loc[maxrow, 'product_name']




.. parsed-literal::

    'Organic Hass Avocado'



.. code:: ipython3

    products.loc[maxcol, 'product_name']




.. parsed-literal::

    'Bag of Organic Bananas'



.. code:: ipython3

    def get_product_byid(df, idx):
        return df.loc[idx].product_name

OK, so now lets see what our real data has to say about the products
that are bought with Doritos.

.. code:: ipython3

    products[products.product_name.str.contains('Dorito')]




.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>product_name</th>
          <th>aisle_id</th>
          <th>department_id</th>
        </tr>
        <tr>
          <th>product_id</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>2144</th>
          <td>Doritos</td>
          <td>107</td>
          <td>19</td>
        </tr>
        <tr>
          <th>12540</th>
          <td>Doritos Nacho Cheese Sandwich Crackers</td>
          <td>78</td>
          <td>19</td>
        </tr>
        <tr>
          <th>42541</th>
          <td>Cheetos Flamin' Hot &amp; Doritos Dinamita Chile L...</td>
          <td>107</td>
          <td>19</td>
        </tr>
      </tbody>
    </table>
    </div>



.. code:: ipython3

    def get_product_count(sp_mat, ix1, ix2):
        if ix1 > ix2:
            return sp_mat.loc[ix1, ix2]
        else:
            return sp_mat.loc[ix2, ix1]

.. code:: ipython3

    get_product_count(smat, 47209, 13176)




.. parsed-literal::

    62341.0



.. code:: ipython3

    def get_all_cocart(sp_mat, pid):
        """
        Return a Pandas series where the index is the product id of products that were in
        the same shopping cart.  The value indicates the count of those times.
        remove the NA's
        """
        return pd.concat((sp_mat[pid], sp_mat.loc[pid])).dropna()

.. code:: ipython3

    get_all_cocart(smat, 2144).nlargest(10)




.. parsed-literal::

    24852    68.0
    16797    41.0
    19734    34.0
    16696    25.0
    23909    25.0
    45064    24.0
    28199    23.0
    10673    21.0
    17122    21.0
    13249    17.0
    Name: 2144, dtype: float64



.. code:: ipython3

    for idx, val in get_all_cocart(smat, 2144).nlargest(10).iteritems():
        print(get_product_byid(products,idx), val)



.. parsed-literal::

    Banana 68.0
    Strawberries 41.0
    Classic Mix Variety 34.0
    Coke Classic 25.0
    2% Reduced Fat Milk 25.0
    Honey Wheat Bread 24.0
    Clementines, Bag 23.0
    Original Nooks & Crannies English Muffins 21.0
    Honeycrisp Apples 21.0
    Skim Milk 17.0


.. code:: ipython3

    get_product_byid(products, 2144)




.. parsed-literal::

    'Doritos'



.. code:: ipython3

    def product_search(df, name):
        prods = df.product_name.str.lower()
        return df[prods.str.contains(name)].product_name


.. code:: ipython3

    product_search(products, 'diapers')




.. parsed-literal::

    product_id
    15                                Overnight Diapers Size 6
    682                   Cruisers Diapers Jumbo Pack - Size 5
    765              Swaddlers Diapers Jumbo Pack Size Newborn
    879                                Baby Dry Diapers Size 4
    1304              Little Movers Comfort Fit Size 3 Diapers
    1716     Baby Dry Pampers Baby Dry Diapers Size 5 78 Co...
    3087              Baby Dry Pampers Baby Dry Diapers Size 2
    3277                 Overnight Diapers Sleepy Sheep Size 4
    4630     Baby Dry Pampers Baby Dry Newborn Diapers Size...
    5444     Little Snugglers Jumbo Pack Size 2 Disney Diap...
    5657                              Baby Dry Diapers  Size 5
    5897                               Baby Dry Diapers Size 3
    6401               Tender Care Diapers Jumbo Pack - Size 4
    6986     Diapers, Overnight, Free & Clear, Size 6 (35+ ...
    7487                              Swaddlers Diapers Size 1
    7489                   Swaddlers Size 4 Giant Pack Diapers
    8102                         Naty Diapers Size 1, 8-14 lbs
    9121                    Diapers Cruisers Size 4 Super Pack
    9356                              Swaddlers Size 2 Diapers
    9482                                        Diapers Size 1
    9927                             Size 4 Snug & Dry Diapers
    10011                                  Baby Diapers Size 2
    10420                                Honest Diapers Size 4
    11660                         Tribal Pastel Size 3 Diapers
    11745    Swaddlers Sensitive Diapers Jumbo Pack Size Ne...
    11922    Pants Pampers Easy Ups Training Pants Boys Siz...
    12340                     Free & Clear Size 4 Baby Diapers
    13377                    Swaddlers Diapers Jumbo Pack Size
    13801                Free & Clear Overnight Diapers Size 5
    14009                      Snug & Dry Diapers Step 1 Jumbo
                                   ...
    35954           Little Movers Diapers, Giant Pack - Size 5
    36200                      Baby Dry Diapers Size 6 Diapers
    36453                             Size 3 M  Skulls Diapers
    36831                  Cruisers Diapers Giant Pack, Size 6
    37172                                       Size 4 Diapers
    37872     Free & Clear Size 4 22-37 Lbs Disposable Diapers
    37949                  Diapers Swaddlers Size 2 (12-18 lb)
    38365                   Size 5 Cruisers Diapers Super Pack
    38899                         Little Movers Size 3 Diapers
    40110                            Giraffes Diapers Size 4 L
    40343                 Baby Dry Diapers Giant Pack - Size 6
    40355                   Baby Dry Size 4 Disposable Diapers
    40537          Free & Clear Stage 1 8-14 Lbs. Baby Diapers
    40916                                       Size 2 Diapers
    41393                              Baby Dry Size 4 Diapers
    41475                   Baby Dry Diapers Jumbo Pack Size 4
    41595                            Snug & Dry Size 2 Diapers
    41705                                Honest Diapers Size 3
    42923           Baby Free & Clear Size 3 16-28 Lbs Diapers
    43217    Honest Diapers Eco-Friendly & Premium Diapers ...
    43481                  Cruisers Diapers Jumbo Pack  Size 3
    43989                            Cruisers Diapers - Size 6
    44950                 Swaddlers Diapers Super Pack, Size 3
    45786            Little Movers Diapers Giant Pack - Size 3
    46583                       Tribal Pastel Size 4/L Diapers
    46599    Ultra Leakguards Value Pack Diapers Size 3 (16...
    46608       Free & Clear Newborn Up To 10 lbs Baby Diapers
    47578                                              Diapers
    47632                                       Honest Diapers
    48263                                Honest Diapers Size 5
    Name: product_name, Length: 93, dtype: object



.. code:: ipython3

    # snickers - 14261

    for idx, val in get_all_cocart(smat, 682).nlargest(10).iteritems():
        print(get_product_byid(products,idx), val)


.. parsed-literal::

    Strawberries 13.0
    Banana 13.0
    Zero Rise Orange 7.0
    Organic Fuji Apple 7.0
    Baby Fresh Pampers Baby Wipes Baby Fresh 1X 64 count  Baby Wipes 6.0
    Black Beans 6.0
    Honey Nut Cheerios 6.0
    Baby Wipes Sensitive 6.0
    Select-A-Size Paper Towels, White, 2 Huge Rolls = 5 Regular Rolls  Towels/Napkins 5.0
    Peach Yoghurt 5.0


Cleaning up and saving
----------------------

Since building the item-item matrix takes some time we should save it in
a format that is convenient for us to reload so we don’t need to remake
it every time.

We can probably reduce the size of our sparse matrix by eliminating all
of the cells with a count of 1. That doesn’t really tell us anything
that we would want to use in making a recommendation.

We can also eliminate our original dictionary

.. code:: ipython3

    smat.to_pickle('item_item.pkl')


Understanding the item-item matrix
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This kind of shopping cart analysis is useful in many areas. Whether it
is news articles, stocks, search terms, or products this kind of
recommender is widely used

-  Create a histogram that shows the distribution of the shopping cart
   co-occurence counts.

-  How many items in this item-item matrix contain a count of 1. That is
   probably not good information and you could save a lot more memory by
   deleting all of the items with a count of 1 from smat.

-  Can you make a visualization of this item-item matrix?

.. code:: ipython3

    forhist = pd.DataFrame({'allvals': smat.values.flatten()})


.. code:: ipython3

    forhist = forhist.dropna()


.. code:: ipython3

    alt.Chart(forhist).mark_bar().encode(x=alt.X('allvals', bin=True),y='count()')




.. image:: Instacart_files/Instacart_69_0.png



Experimenting with item-item recommendations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  The histogram above shows that the vast majority of the items are in
   the 0-200 co-occurence range. But the items purchased together
   outside that big bar are interesting. Write a function to print out
   the item pairs that have been in the same shopping cart more than 200
   times.

-  Re-do the histogram so that it focuses in on the products that have
   between 0 and 200 co-occurrences.

-  Write a function called top_n that takes a product name to search
   for, allows the user to select the best match and then returns the
   topn recommendatons for products that have been purchased with the
   selected item.

-  Write a function that takes a product id as its parameter and then
   recommends the top10 products to go with the given product but from
   the same department or same aisle.

-  One of the problems with a recommender like this one is that it tends
   to recommend a lot of popular items. We might call this the bananna
   problem in this dataset! Can you devise a strategy to recommend
   things that are not just the popular things?

-  Design an experiment whereby you can train an item-item model like we
   have done above and then test it. Perhaps in the training set you
   withold that last item added to the shopping cart to see how
   frequently you can predict the last item based on the first items.

-  Challenge - The original collaborative filtering recommender system
   was not item-item like this was. It was user-user where the
   recommendations came from finding a group of users similar to the
   subject user based on their ratings or purchase behavior. The system
   would then recommend items to the subject user based on items that
   their similar users had purchased but the subject had not. Can you
   write such a recommender and devise an experiment to compare it to
   the item-item recommender?





Visualizing Grocery Data
------------------------

-  How can we show top combinations of two things?

-  Visualize the flow from department to department or from aisle to
   aisle.

-  You can get some inspiration from https://python-graph-gallery.com/

To accomplish this you will have to dig into some new packages that we
have not used in class. But this is all part of the process.

We need to create square adjacency matrix – Aisle to Aisle. We’ll use
this to build our chord diagram and other graph like visualizations.

0. Merge the order_product data frame with the aisle data frame so we
   have the aisle number for each product. (we can drop the aisle name
   to save memory)
1. Iterate over each order
2. Order the order by add_to_cart_order
3. Increase the count in from aisle (row) to to aisle (column) - this is
   a directed graph.

.. code:: ipython3

    aisle_mat = pd.DataFrame(0, index=range(1,135),columns=range(1,135))

.. code:: ipython3

    flowdf = op.merge(products, on='product_id').merge(adf, on='aisle_id')


.. code:: ipython3

    %%time

    tco = flowdf.groupby('order_id')
    for order in tco.groups.keys():
        contents = tco.get_group(order).sort_values('add_to_cart_order')
        rowit = contents.iterrows()
        start_aisle = next(rowit)[1]['aisle_id']
        for ix, row in rowit:
            #print(start_aisle, row['aisle_id'])
            try:
                aisle_mat.loc[start_aisle][row['aisle_id']] += 1
            except:
                print("bad index", start_aisle, row['aisle_id'], type(start_aisle), type(row['aisle_id']))
            start_aisle = row['aisle_id']





.. parsed-literal::

    CPU times: user 3h 4min 26s, sys: 2min 7s, total: 3h 6min 34s
    Wall time: 3h 11min 18s


.. code:: ipython3

    aisle_mat.to_csv('aisle_mat.csv')

.. code:: ipython3

    for ix, row in contents.iterrows():
        print(row['product_id'], row['aisle_id'])

.. code:: ipython3

    x = contents.iterrows()
    next(x)[1]['aisle_id']

.. code:: ipython3

    for i, j in x:
        print(j['product_id'])

.. code:: ipython3

    sbn.heatmap(aisle_mat)




.. parsed-literal::

    <matplotlib.axes._subplots.AxesSubplot at 0x22a687e48>




.. image:: Instacart_files/Instacart_84_1.png


Looks like a lot of small values! Lets make a histogram of the whole
thing and see.

.. code:: ipython3

    #plt.hist(aisle_mat.values.flatten(),bins=100)

.. code:: ipython3

    for i in range(1,135):
        aisle_mat.loc[i][i] = 0

.. code:: ipython3

    x = aisle_mat.values.flatten()


.. code:: ipython3

    sall = aisle_mat.values.sum()

.. code:: ipython3

    y = aisle_mat.applymap(lambda x: x/sall)

.. code:: ipython3

    z = y.applymap(lambda x: x if x > 0.001 else np.nan)

.. code:: ipython3

    sbn.heatmap(z)




.. parsed-literal::

    <matplotlib.axes._subplots.AxesSubplot at 0x386ea27f0>




.. image:: Instacart_files/Instacart_92_1.png


.. code:: ipython3

    aisle_mat = pd.read_csv('aisle_mat.csv',index_col='aid')

.. code:: ipython3

    aisle_mat.head()




.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
          <th>7</th>
          <th>8</th>
          <th>9</th>
          <th>10</th>
          <th>...</th>
          <th>125</th>
          <th>126</th>
          <th>127</th>
          <th>128</th>
          <th>129</th>
          <th>130</th>
          <th>131</th>
          <th>132</th>
          <th>133</th>
          <th>134</th>
        </tr>
        <tr>
          <th>aid</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <td>5151</td>
          <td>177</td>
          <td>621</td>
          <td>362</td>
          <td>83</td>
          <td>74</td>
          <td>56</td>
          <td>152</td>
          <td>336</td>
          <td>8</td>
          <td>...</td>
          <td>54</td>
          <td>20</td>
          <td>30</td>
          <td>401</td>
          <td>388</td>
          <td>205</td>
          <td>344</td>
          <td>8</td>
          <td>19</td>
          <td>12</td>
        </tr>
        <tr>
          <th>2</th>
          <td>216</td>
          <td>2692</td>
          <td>464</td>
          <td>387</td>
          <td>168</td>
          <td>62</td>
          <td>152</td>
          <td>88</td>
          <td>882</td>
          <td>20</td>
          <td>...</td>
          <td>34</td>
          <td>30</td>
          <td>52</td>
          <td>602</td>
          <td>322</td>
          <td>218</td>
          <td>933</td>
          <td>8</td>
          <td>21</td>
          <td>19</td>
        </tr>
        <tr>
          <th>3</th>
          <td>632</td>
          <td>417</td>
          <td>126287</td>
          <td>1871</td>
          <td>311</td>
          <td>322</td>
          <td>247</td>
          <td>380</td>
          <td>1455</td>
          <td>47</td>
          <td>...</td>
          <td>1152</td>
          <td>128</td>
          <td>299</td>
          <td>1509</td>
          <td>1849</td>
          <td>2106</td>
          <td>1800</td>
          <td>48</td>
          <td>158</td>
          <td>33</td>
        </tr>
        <tr>
          <th>4</th>
          <td>356</td>
          <td>405</td>
          <td>1844</td>
          <td>20762</td>
          <td>717</td>
          <td>192</td>
          <td>186</td>
          <td>165</td>
          <td>2519</td>
          <td>49</td>
          <td>...</td>
          <td>255</td>
          <td>122</td>
          <td>268</td>
          <td>1234</td>
          <td>2176</td>
          <td>1176</td>
          <td>3130</td>
          <td>32</td>
          <td>110</td>
          <td>27</td>
        </tr>
        <tr>
          <th>5</th>
          <td>90</td>
          <td>169</td>
          <td>266</td>
          <td>681</td>
          <td>2325</td>
          <td>57</td>
          <td>110</td>
          <td>47</td>
          <td>673</td>
          <td>44</td>
          <td>...</td>
          <td>31</td>
          <td>42</td>
          <td>104</td>
          <td>639</td>
          <td>539</td>
          <td>245</td>
          <td>744</td>
          <td>5</td>
          <td>27</td>
          <td>8</td>
        </tr>
      </tbody>
    </table>
    <p>5 rows × 134 columns</p>
    </div>



.. code:: ipython3

    aisle_mat['total'] = aisle_mat.apply(lambda x : x.sum(), axis=1)

.. code:: ipython3

    aisle_mat.sort_values('total', ascending=False, inplace=True)
    aisle_mat.head()






.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
          <th>7</th>
          <th>8</th>
          <th>9</th>
          <th>10</th>
          <th>...</th>
          <th>126</th>
          <th>127</th>
          <th>128</th>
          <th>129</th>
          <th>130</th>
          <th>131</th>
          <th>132</th>
          <th>133</th>
          <th>134</th>
          <th>total</th>
        </tr>
        <tr>
          <th>aid</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>24</th>
          <td>6545</td>
          <td>6616</td>
          <td>33754</td>
          <td>12545</td>
          <td>3020</td>
          <td>2600</td>
          <td>2829</td>
          <td>2646</td>
          <td>13162</td>
          <td>443</td>
          <td>...</td>
          <td>709</td>
          <td>1248</td>
          <td>16043</td>
          <td>13076</td>
          <td>13474</td>
          <td>16945</td>
          <td>228</td>
          <td>910</td>
          <td>372</td>
          <td>3324654</td>
        </tr>
        <tr>
          <th>83</th>
          <td>4473</td>
          <td>8381</td>
          <td>17158</td>
          <td>11751</td>
          <td>6362</td>
          <td>2133</td>
          <td>3818</td>
          <td>1698</td>
          <td>20901</td>
          <td>615</td>
          <td>...</td>
          <td>693</td>
          <td>981</td>
          <td>17890</td>
          <td>12322</td>
          <td>10233</td>
          <td>25437</td>
          <td>219</td>
          <td>676</td>
          <td>294</td>
          <td>3143603</td>
        </tr>
        <tr>
          <th>123</th>
          <td>4134</td>
          <td>4197</td>
          <td>13228</td>
          <td>6850</td>
          <td>2397</td>
          <td>1204</td>
          <td>1747</td>
          <td>1198</td>
          <td>9405</td>
          <td>292</td>
          <td>...</td>
          <td>454</td>
          <td>764</td>
          <td>8630</td>
          <td>7515</td>
          <td>6414</td>
          <td>11072</td>
          <td>173</td>
          <td>461</td>
          <td>163</td>
          <td>1600584</td>
        </tr>
        <tr>
          <th>120</th>
          <td>2354</td>
          <td>2498</td>
          <td>16219</td>
          <td>5950</td>
          <td>1080</td>
          <td>1072</td>
          <td>801</td>
          <td>937</td>
          <td>5231</td>
          <td>99</td>
          <td>...</td>
          <td>306</td>
          <td>668</td>
          <td>5669</td>
          <td>5561</td>
          <td>5921</td>
          <td>6478</td>
          <td>106</td>
          <td>307</td>
          <td>78</td>
          <td>1354392</td>
        </tr>
        <tr>
          <th>21</th>
          <td>1760</td>
          <td>6626</td>
          <td>8445</td>
          <td>6728</td>
          <td>2257</td>
          <td>640</td>
          <td>1038</td>
          <td>700</td>
          <td>10388</td>
          <td>268</td>
          <td>...</td>
          <td>296</td>
          <td>659</td>
          <td>9307</td>
          <td>6071</td>
          <td>3891</td>
          <td>10790</td>
          <td>100</td>
          <td>312</td>
          <td>153</td>
          <td>888985</td>
        </tr>
      </tbody>
    </table>
    <p>5 rows × 135 columns</p>
    </div>



.. code:: ipython3

    row_order = aisle_mat.index
    row_order = row_order.tolist()
    aisle_mat.index




.. parsed-literal::

    Int64Index([ 24,  83, 123, 120,  21,  84, 115, 107,  91, 112,
                ...
                118, 134,  55, 109,  10,  44, 102,  82, 132, 113],
               dtype='int64', name='aid', length=134)











.. code:: ipython3

    aisle_map = pd.merge(aisle_mat, adf, left_index=True, right_on='aisle_id')['aisle']
    aisle_map.values.tolist()[:10]




.. parsed-literal::

    ['fresh fruits',
     'fresh vegetables',
     'packaged vegetables fruits',
     'yogurt',
     'packaged cheese',
     'milk',
     'water seltzer sparkling water',
     'chips pretzels',
     'soy lactosefree',
     'bread']



.. code:: ipython3

    am = aisle_mat.values.tolist()[:20][:20]
    for i in range(len(am)):
        am[i][i] = 0.0

.. code:: ipython3

    pickle.dump(am,file=open('am.pkl', 'wb'))

.. code:: ipython3

    import pprint

.. code:: ipython3

    depts = pd.read_csv('ecomm/departments.csv')
    depts




.. raw:: html

    <div>
    <style scoped>
        .dataframe tbody tr th:only-of-type {
            vertical-align: middle;
        }

        .dataframe tbody tr th {
            vertical-align: top;
        }

        .dataframe thead th {
            text-align: right;
        }
    </style>
    <table border="1" class="dataframe">
      <thead>
        <tr style="text-align: right;">
          <th></th>
          <th>department_id</th>
          <th>department</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>0</th>
          <td>1</td>
          <td>frozen</td>
        </tr>
        <tr>
          <th>1</th>
          <td>2</td>
          <td>other</td>
        </tr>
        <tr>
          <th>2</th>
          <td>3</td>
          <td>bakery</td>
        </tr>
        <tr>
          <th>3</th>
          <td>4</td>
          <td>produce</td>
        </tr>
        <tr>
          <th>4</th>
          <td>5</td>
          <td>alcohol</td>
        </tr>
        <tr>
          <th>5</th>
          <td>6</td>
          <td>international</td>
        </tr>
        <tr>
          <th>6</th>
          <td>7</td>
          <td>beverages</td>
        </tr>
        <tr>
          <th>7</th>
          <td>8</td>
          <td>pets</td>
        </tr>
        <tr>
          <th>8</th>
          <td>9</td>
          <td>dry goods pasta</td>
        </tr>
        <tr>
          <th>9</th>
          <td>10</td>
          <td>bulk</td>
        </tr>
        <tr>
          <th>10</th>
          <td>11</td>
          <td>personal care</td>
        </tr>
        <tr>
          <th>11</th>
          <td>12</td>
          <td>meat seafood</td>
        </tr>
        <tr>
          <th>12</th>
          <td>13</td>
          <td>pantry</td>
        </tr>
        <tr>
          <th>13</th>
          <td>14</td>
          <td>breakfast</td>
        </tr>
        <tr>
          <th>14</th>
          <td>15</td>
          <td>canned goods</td>
        </tr>
        <tr>
          <th>15</th>
          <td>16</td>
          <td>dairy eggs</td>
        </tr>
        <tr>
          <th>16</th>
          <td>17</td>
          <td>household</td>
        </tr>
        <tr>
          <th>17</th>
          <td>18</td>
          <td>babies</td>
        </tr>
        <tr>
          <th>18</th>
          <td>19</td>
          <td>snacks</td>
        </tr>
        <tr>
          <th>19</th>
          <td>20</td>
          <td>deli</td>
        </tr>
        <tr>
          <th>20</th>
          <td>21</td>
          <td>missing</td>
        </tr>
      </tbody>
    </table>
    </div>



