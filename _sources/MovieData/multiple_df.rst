Dealing with multiple DataFrames
--------------------------------

Forget about budget or runtimes as criteria for selecting a movie, let’s
take a look at popular opinion. Our dataset has two relevant columns:
vote_average and vote_count.

Let’s create a variable called ``df_high_rated`` that only contains
movies that have received more than 20 votes and whose average score is
greater than 8.

.. code:: ipython3

    df_highly_voted = df[df['vote_count'] > 20]     ### SOLUTION
    df_high_rated = df_highly_voted[df_highly_voted['vote_average'] > 8]     ### SOLUTION
    df_high_rated[['title', 'vote_average', 'vote_count']]





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
          <th>title</th>
          <th>vote_average</th>
          <th>vote_count</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>46</th>
          <td>Se7en</td>
          <td>8.1</td>
          <td>5915.0</td>
        </tr>
        <tr>
          <th>49</th>
          <td>The Usual Suspects</td>
          <td>8.1</td>
          <td>3334.0</td>
        </tr>
        <tr>
          <th>109</th>
          <td>Taxi Driver</td>
          <td>8.1</td>
          <td>2632.0</td>
        </tr>
        <tr>
          <th>256</th>
          <td>Star Wars</td>
          <td>8.1</td>
          <td>6778.0</td>
        </tr>
        <tr>
          <th>289</th>
          <td>Leon: The Professional</td>
          <td>8.2</td>
          <td>4293.0</td>
        </tr>
        <tr>
          <th>292</th>
          <td>Pulp Fiction</td>
          <td>8.3</td>
          <td>8670.0</td>
        </tr>
        <tr>
          <th>314</th>
          <td>The Shawshank Redemption</td>
          <td>8.5</td>
          <td>8358.0</td>
        </tr>
        <tr>
          <th>351</th>
          <td>Forrest Gump</td>
          <td>8.2</td>
          <td>8147.0</td>
        </tr>
        <tr>
          <th>522</th>
          <td>Schindler's List</td>
          <td>8.3</td>
          <td>4436.0</td>
        </tr>
        <tr>
          <th>586</th>
          <td>The Silence of the Lambs</td>
          <td>8.1</td>
          <td>4549.0</td>
        </tr>
        <tr>
          <th>659</th>
          <td>The World of Apu</td>
          <td>8.2</td>
          <td>40.0</td>
        </tr>
        <tr>
          <th>834</th>
          <td>The Godfather</td>
          <td>8.5</td>
          <td>6024.0</td>
        </tr>
        <tr>
          <th>877</th>
          <td>Rear Window</td>
          <td>8.2</td>
          <td>1531.0</td>
        </tr>
        <tr>
          <th>882</th>
          <td>The Apartment</td>
          <td>8.1</td>
          <td>498.0</td>
        </tr>
        <tr>
          <th>895</th>
          <td>Sunset Boulevard</td>
          <td>8.2</td>
          <td>533.0</td>
        </tr>
        <tr>
          <th>1057</th>
          <td>Reservoir Dogs</td>
          <td>8.1</td>
          <td>3821.0</td>
        </tr>
        <tr>
          <th>1132</th>
          <td>Cinema Paradiso</td>
          <td>8.2</td>
          <td>834.0</td>
        </tr>
        <tr>
          <th>1138</th>
          <td>Paths of Glory</td>
          <td>8.2</td>
          <td>565.0</td>
        </tr>
        <tr>
          <th>1151</th>
          <td>Paris is Burning</td>
          <td>8.2</td>
          <td>67.0</td>
        </tr>
        <tr>
          <th>1152</th>
          <td>One Flew Over the Cuckoo's Nest</td>
          <td>8.3</td>
          <td>3001.0</td>
        </tr>
        <tr>
          <th>1154</th>
          <td>The Empire Strikes Back</td>
          <td>8.2</td>
          <td>5998.0</td>
        </tr>
        <tr>
          <th>1159</th>
          <td>The Good, the Bad and the Ugly</td>
          <td>8.1</td>
          <td>2371.0</td>
        </tr>
        <tr>
          <th>1161</th>
          <td>12 Angry Men</td>
          <td>8.2</td>
          <td>2130.0</td>
        </tr>
        <tr>
          <th>1166</th>
          <td>Once Upon a Time in the West</td>
          <td>8.1</td>
          <td>1160.0</td>
        </tr>
        <tr>
          <th>1170</th>
          <td>GoodFellas</td>
          <td>8.2</td>
          <td>3211.0</td>
        </tr>
        <tr>
          <th>1176</th>
          <td>Psycho</td>
          <td>8.3</td>
          <td>2405.0</td>
        </tr>
        <tr>
          <th>1178</th>
          <td>The Godfather: Part II</td>
          <td>8.3</td>
          <td>3418.0</td>
        </tr>
        <tr>
          <th>1184</th>
          <td>Once Upon a Time in America</td>
          <td>8.3</td>
          <td>1104.0</td>
        </tr>
        <tr>
          <th>1201</th>
          <td>Dead Poets Society</td>
          <td>8.1</td>
          <td>2786.0</td>
        </tr>
        <tr>
          <th>1213</th>
          <td>The Shining</td>
          <td>8.1</td>
          <td>3890.0</td>
        </tr>
        <tr>
          <th>...</th>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>
        <tr>
          <th>38711</th>
          <td>The Handmaiden</td>
          <td>8.1</td>
          <td>453.0</td>
        </tr>
        <tr>
          <th>39078</th>
          <td>Planet Earth</td>
          <td>8.8</td>
          <td>176.0</td>
        </tr>
        <tr>
          <th>39079</th>
          <td>Life</td>
          <td>8.5</td>
          <td>65.0</td>
        </tr>
        <tr>
          <th>39087</th>
          <td>Bo Burnham: Make Happy</td>
          <td>8.4</td>
          <td>56.0</td>
        </tr>
        <tr>
          <th>39226</th>
          <td>O.J.: Made in America</td>
          <td>8.5</td>
          <td>73.0</td>
        </tr>
        <tr>
          <th>39379</th>
          <td>Piper</td>
          <td>8.2</td>
          <td>487.0</td>
        </tr>
        <tr>
          <th>40242</th>
          <td>Your Name.</td>
          <td>8.5</td>
          <td>1030.0</td>
        </tr>
        <tr>
          <th>40463</th>
          <td>Over the Garden Wall</td>
          <td>8.2</td>
          <td>52.0</td>
        </tr>
        <tr>
          <th>40476</th>
          <td>Divines</td>
          <td>8.1</td>
          <td>161.0</td>
        </tr>
        <tr>
          <th>40559</th>
          <td>Tower</td>
          <td>8.1</td>
          <td>50.0</td>
        </tr>
        <tr>
          <th>40886</th>
          <td>The Present</td>
          <td>8.3</td>
          <td>52.0</td>
        </tr>
        <tr>
          <th>41219</th>
          <td>Under the Sun</td>
          <td>8.1</td>
          <td>31.0</td>
        </tr>
        <tr>
          <th>41282</th>
          <td>HyperNormalisation</td>
          <td>8.1</td>
          <td>26.0</td>
        </tr>
        <tr>
          <th>41388</th>
          <td>A Silent Voice</td>
          <td>8.1</td>
          <td>157.0</td>
        </tr>
        <tr>
          <th>41591</th>
          <td>Inner Workings</td>
          <td>8.2</td>
          <td>46.0</td>
        </tr>
        <tr>
          <th>42003</th>
          <td>The Invisible Guest</td>
          <td>8.1</td>
          <td>395.0</td>
        </tr>
        <tr>
          <th>42137</th>
          <td>Eu Fico Loko</td>
          <td>8.3</td>
          <td>22.0</td>
        </tr>
        <tr>
          <th>42366</th>
          <td>Cosy Dens</td>
          <td>8.6</td>
          <td>23.0</td>
        </tr>
        <tr>
          <th>42381</th>
          <td>Hope</td>
          <td>8.1</td>
          <td>36.0</td>
        </tr>
        <tr>
          <th>42479</th>
          <td>Lemonade</td>
          <td>8.8</td>
          <td>45.0</td>
        </tr>
        <tr>
          <th>42677</th>
          <td>Parched</td>
          <td>8.5</td>
          <td>23.0</td>
        </tr>
        <tr>
          <th>42850</th>
          <td>Kaabil</td>
          <td>8.1</td>
          <td>23.0</td>
        </tr>
        <tr>
          <th>43177</th>
          <td>Band of Brothers</td>
          <td>8.2</td>
          <td>725.0</td>
        </tr>
        <tr>
          <th>43307</th>
          <td>Planet Earth II</td>
          <td>9.5</td>
          <td>50.0</td>
        </tr>
        <tr>
          <th>43510</th>
          <td>Cosmos</td>
          <td>9.1</td>
          <td>41.0</td>
        </tr>
        <tr>
          <th>43576</th>
          <td>Pink Floyd: Live at Pompeii</td>
          <td>8.3</td>
          <td>35.0</td>
        </tr>
        <tr>
          <th>43962</th>
          <td>Life Cycles</td>
          <td>8.8</td>
          <td>27.0</td>
        </tr>
        <tr>
          <th>44377</th>
          <td>Hasan Minhaj: Homecoming King</td>
          <td>8.1</td>
          <td>22.0</td>
        </tr>
        <tr>
          <th>44664</th>
          <td>Black Mirror: White Christmas</td>
          <td>8.3</td>
          <td>211.0</td>
        </tr>
        <tr>
          <th>45424</th>
          <td>In a Heartbeat</td>
          <td>8.3</td>
          <td>146.0</td>
        </tr>
      </tbody>
    </table>
    <p>178 rows × 3 columns</p>
    </div>



Here we have 178 high-quality movies, at least according to some people.
But what about **my** opinion?

Here are my favorite movies and their relative scores, create a
DataFrame called ``compare_votes`` that contains the title as an index
and both the vote_average and my_vote as its columns. Also only keep the
movies that are both my favorites and popular favorites.

HINT: You’ll need to create two Series, one for my ratings and one that
maps titles to vote_average.

.. code:: ipython3

    my_favorites_with_ratings = pd.Series(       ### SOLUTION
        {
        "Star Wars": 9,
        "Paris is Burning": 8,
        "Dead Poets Society": 7,
        "The Empire Strikes Back": 9.5,
        "The Shining": 8,
        "Return of the Jedi": 8,
        "1941": 8,
        "Forrest Gump": 7.5,
    }
    )       ### SOLUTION
    overall_favorites = pd.Series(df_high_rated['vote_average'].values, index=df_high_rated['title'].values)       ### SOLUTION
    compare_votes = pd.DataFrame({'vote_average': overall_favorites, 'my_vote': my_favorites_with_ratings}).dropna()       ### SOLUTION
    compare_votes




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
          <th>vote_average</th>
          <th>my_vote</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Dead Poets Society</th>
          <td>8.1</td>
          <td>7.0</td>
        </tr>
        <tr>
          <th>Forrest Gump</th>
          <td>8.2</td>
          <td>7.5</td>
        </tr>
        <tr>
          <th>Paris is Burning</th>
          <td>8.2</td>
          <td>8.0</td>
        </tr>
        <tr>
          <th>Star Wars</th>
          <td>8.1</td>
          <td>9.0</td>
        </tr>
        <tr>
          <th>The Empire Strikes Back</th>
          <td>8.2</td>
          <td>9.5</td>
        </tr>
        <tr>
          <th>The Shining</th>
          <td>8.1</td>
          <td>8.0</td>
        </tr>
      </tbody>
    </table>
    </div>



There should be only 6 movies remaining.

Now add a column to ``compare_votes`` that measures the percentage
difference between my rating and the popular rating for each movie.
You’ll need to take the different between the vote_average and my_vote
and divide it by my_vote.

.. code:: ipython3


    compare_votes["vote_percentage_difference"] = (compare_votes["vote_average"] - compare_votes["my_vote"])/compare_votes["my_vote"]       ### SOLUTION
    compare_votes




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
          <th>vote_average</th>
          <th>my_vote</th>
          <th>vote_percentage_difference</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Dead Poets Society</th>
          <td>8.1</td>
          <td>7.0</td>
          <td>0.157143</td>
        </tr>
        <tr>
          <th>Forrest Gump</th>
          <td>8.2</td>
          <td>7.5</td>
          <td>0.093333</td>
        </tr>
        <tr>
          <th>Paris is Burning</th>
          <td>8.2</td>
          <td>8.0</td>
          <td>0.025000</td>
        </tr>
        <tr>
          <th>Star Wars</th>
          <td>8.1</td>
          <td>9.0</td>
          <td>-0.100000</td>
        </tr>
        <tr>
          <th>The Empire Strikes Back</th>
          <td>8.2</td>
          <td>9.5</td>
          <td>-0.136842</td>
        </tr>
        <tr>
          <th>The Shining</th>
          <td>8.1</td>
          <td>8.0</td>
          <td>0.012500</td>
        </tr>
      </tbody>
    </table>
    </div>
