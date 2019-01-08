Numbers as indices
------------------

Enough about movie budgets, it’s time to budget my time instead. Because
I schedule my day to the minute, I like to be able to look up movies by
their runtime. So that when I have a spare two hours and 34 minutes, I
can find all the movies that would fit precisely in that time slot
(popcorn-making time is budgeted separately).

Create a Series called ``time_scheduler`` that is indexed by runtime and
has the movie’s title as its values. Note that you will need to use
``sort_index()`` in order to be able to look up movies by their
duration.

While you’re at it, remove any movie that is less than 10 minutes (can’t
get into it if it’s too short) or longer than 3 hours (who’s got time
for that).

HINT: You’ll have to use ``pd.to_numeric`` to force the runtimes to be
numbers (instead of numbers in a string)

.. code:: ipython3

    time_scheduler = pd.Series(df['title'].values, index=pd.to_numeric(df['runtime'])).sort_index()    ### SOLUTION
    time_scheduler = time_scheduler[(time_scheduler.index >= 10) & (time_scheduler.index < 180)]   ### SOLUTION
    time_scheduler




.. parsed-literal::

    runtime
    10.0                                            10 Minutes
    10.0                             The Story of Menstruation
    10.0                                                Hunger
    10.0                                        Hotel Magnezit
    10.0                                  There Once Was a Dog
    10.0                                       Head Over Heels
    10.0                                         Runaway Brain
    10.0                                            Time Freak
    10.0       Forklift Driver Klaus: The First Day on the Job
    10.0                                  The Bear That Wasn't
    10.0                                            The Mitten
    10.0                                                  True
    10.0                                            Kick-heart
    10.0              Music for One Apartment and Six Drummers
    10.0                                     The Ventriloquist
    10.0                                               The Cow
    10.0                                            Dream Work
    10.0                                         The Smile Man
    10.0                                         Darkened Room
    10.0                                                 Canon
    10.0     The Dot and the Line: A Romance in Lower Mathe...
    10.0                                         Paths of Hate
    10.0                                     Travels of an Ant
    10.0                         Winnie-the-Pooh Goes Visiting
    10.0                                        What on Earth!
    10.0                                         Palmipedarium
    10.0                                            Rhinoceros
    10.0                                        Internet Story
    10.0                                                Spider
    10.0                                            Mount Head
                                   ...
    178.0     Les Misérables in Concert - The 25th Anniversary
    178.0                                              Fashion
    178.0                                Sense and Sensibility
    178.0                                               Casino
    178.0                               Rocco and His Brothers
    178.0                         Don : The Chase Begins Again
    178.0                                           Riverworld
    178.0    A Lamp In The Dark: The Untold History of the ...
    178.0                                               Hamlet
    178.0                                Kaho Naa... Pyaar Hai
    178.0                                      The Longest Day
    178.0                                          Aalavandhan
    178.0                                 Mutiny on the Bounty
    178.0                                           Betty Blue
    178.0                                               Indian
    178.0                                             Dogville
    178.0                              The Day of the Triffids
    178.0                                       Meet Joe Black
    179.0                           A Bride for Rip Van Winkle
    179.0                   Shaka Zulu: The Last Great Warrior
    179.0                                           China Gate
    179.0                                              Camelot
    179.0                            Blue Is the Warmest Color
    179.0                                            Mr. India
    179.0                The Lord of the Rings: The Two Towers
    179.0                                               Phoonk
    179.0                                    The Promised Land
    179.0                                     Dil To Pagal Hai
    179.0                      Jaani Dushman: Ek Anokhi Kahani
    179.0                                          Come and Go
    Length: 42435, dtype: object



Now let’s find all those two-hour-and-34-minute movies:

.. code:: ipython3

    time_scheduler[154]




.. parsed-literal::

    154                                             The Firm
    154                                            Magicians
    154                                             Lord Jim
    154                                Yamla Pagla Deewana 2
    154                                         Pulp Fiction
    154                                    55 Days at Peking
    154                                     Sanam Teri Kasam
    154                                        Beloved Enemy
    154                                               Singam
    154                                         Jackie Brown
    154                                     The Color Purple
    154                                     The Love of Siam
    154                                          Sweet Bunch
    154                         Christmas Time In South Park
    154                                     The Last Samurai
    154                                            The Tuner
    154                                      Cheyenne Autumn
    154                                        Amores perros
    154                                        Cold Mountain
    154                                     Superman Returns
    154                                   Sodom and Gomorrah
    154                                    Little White Lies
    154    The Adventures of Sherlock Holmes and Dr. Wats...
    154                               Va Savoir (Who Knows?)
    154                                     The Ruling Class
    154                       Transformers: Dark of the Moon
    154                                     Twenty-Four Eyes
    154                                               Krrish
    154                                               Zameen
    154                           1492: Conquest of Paradise
    154                                               Wilson
    dtype: object



But what is the 154th shortest movie in this collection?

.. code:: ipython3

    movie_number_154 = time_scheduler.iloc[154]
    movie_number_154




.. parsed-literal::

    'Presentation, or Charlotte and Her Steak'



