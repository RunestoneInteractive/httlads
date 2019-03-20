Filtering
=========

We’ve seen how to look only at certain columns of the table but it is
often useful to only look at certain rows in a table. For example, we
could want to look only at the bike trips which are at least a certain
number of minutes. Let’s say you’re only interested in bike trips of 60
minutes or more:

.. code:: ipython3

    %%sql

    SELECT
      member_type, start_date, duration
    FROM
      trip_data
    WHERE
      duration >= 3600
    LIMIT
      10



.. parsed-literal::

     * sqlite:///bikeshare.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>member_type</th>
            <th>start_date</th>
            <th>duration</th>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 01:48:57.000000</td>
            <td>40181</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 09:47:33.000000</td>
            <td>5009</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 09:53:23.000000</td>
            <td>4642</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 09:53:38.000000</td>
            <td>4645</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 09:54:06.000000</td>
            <td>4628</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 10:16:55.000000</td>
            <td>10474</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 10:20:15.000000</td>
            <td>10279</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 10:20:42.000000</td>
            <td>10250</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 10:34:49.000000</td>
            <td>5744</td>
        </tr>
        <tr>
            <td>Casual</td>
            <td>2011-01-01 10:37:04.000000</td>
            <td>5611</td>
        </tr>
    </table>



It’s also possible to filter by multiple criteria. For example to look
at only bike trips which are 60 minutes or more and only the subscriber
type of Member:

.. code:: ipython3

    %%sql

    SELECT
      member_type, start_date, duration
    FROM
      trip_data
    WHERE
      duration >= 3600
    AND
      member_type = "Member"
    LIMIT
      10



.. parsed-literal::

     * sqlite:///bikeshare.db
    Done.




.. raw:: html

    <table>
        <tr>
            <th>member_type</th>
            <th>start_date</th>
            <th>duration</th>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-02 11:14:50.000000</td>
            <td>4642</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-02 14:45:35.000000</td>
            <td>7173</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-03 13:37:39.000000</td>
            <td>3989</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-03 15:43:35.000000</td>
            <td>10571</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-03 19:50:54.000000</td>
            <td>7412</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-04 11:41:54.000000</td>
            <td>7288</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-04 13:40:25.000000</td>
            <td>29436</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-04 14:59:35.000000</td>
            <td>7053</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-04 17:29:29.000000</td>
            <td>11325</td>
        </tr>
        <tr>
            <td>Member</td>
            <td>2011-01-04 18:21:42.000000</td>
            <td>4341</td>
        </tr>
    </table>



Practice Exercises
------------------

Figure out how to get all the trips on the bike with id of ``W01274``
and only include rides which are shorter than 15 minutes.

.. reveal:: bikes_ex1
    :instructoronly:

    .. code:: ipython3

        %%sql

        select * from trip_data where bike_number = 'W01274' and duration < 450


    .. parsed-literal::

        * sqlite:///bikeshare.db
        Done.


Get the ending station and the duration of all of the bike trips originating at station ``31111`` that lasted 8 hours or more.

.. fillintheblank:: sql_trips_31111

   How many trips match the criteria above?

   - :21: Is the correct answer
     :20|22: Close, but count again
     :x: Incorrect 8 hours is 28,800 seconds


.. fillintheblank:: sql_trips_return

   How many trips longer than 8 hours started and ended and station 31111 by casual riders?

   - :4: Is the correct answer
     :5: Is the total for both members and casual riders
     :x: catchall feedback

.. raw:: html

    <table>
        <tr>
            <th>index</th>
            <th>duration</th>
            <th>start_date</th>
            <th>end_date</th>
            <th>start_station</th>
            <th>end_station</th>
            <th>bike_number</th>
            <th>member_type</th>
        </tr>
        <tr>
            <td>1217513</td>
            <td>387</td>
            <td>2011-12-28 12:23:41.000000</td>
            <td>2011-12-28 12:30:09.000000</td>
            <td>31209</td>
            <td>31108</td>
            <td>W01274</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>1218022</td>
            <td>389</td>
            <td>2011-12-28 16:12:29.000000</td>
            <td>2011-12-28 16:18:58.000000</td>
            <td>31619</td>
            <td>31623</td>
            <td>W01274</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>1218218</td>
            <td>303</td>
            <td>2011-12-28 17:14:02.000000</td>
            <td>2011-12-28 17:19:05.000000</td>
            <td>31623</td>
            <td>31618</td>
            <td>W01274</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>1218755</td>
            <td>287</td>
            <td>2011-12-28 20:19:32.000000</td>
            <td>2011-12-28 20:24:20.000000</td>
            <td>31105</td>
            <td>31202</td>
            <td>W01274</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>1223563</td>
            <td>430</td>
            <td>2011-12-30 17:29:05.000000</td>
            <td>2011-12-30 17:36:15.000000</td>
            <td>31401</td>
            <td>31107</td>
            <td>W01274</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>1224505</td>
            <td>223</td>
            <td>2011-12-31 08:51:24.000000</td>
            <td>2011-12-31 08:55:08.000000</td>
            <td>31107</td>
            <td>31602</td>
            <td>W01274</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>1224651</td>
            <td>422</td>
            <td>2011-12-31 10:25:15.000000</td>
            <td>2011-12-31 10:32:18.000000</td>
            <td>31602</td>
            <td>31104</td>
            <td>W01274</td>
            <td>Member</td>
        </tr>
    </table>


**Lesson Feedback**

.. poll:: LearningZone_10_1
    :option_1: Comfort Zone
    :option_2: Learning Zone
    :option_3: Panic Zone

    During this lesson I was primarily in my...

.. poll:: Time_10_1
    :option_1: Very little time
    :option_2: A reasonable amount of time
    :option_3: More time than is reasonable

    Completing this lesson took...

.. poll:: TaskValue_10_1
    :option_1: Don't seem worth learning
    :option_2: May be worth learning
    :option_3: Are definitely worth learning

    Based on my own interests and needs, the things taught in this lesson...

.. poll:: Expectancy_10_1
    :option_1: Definitely within reach
    :option_2: Within reach if I try my hardest
    :option_3: Out of reach no matter how hard I try

    For me to master the things taught in this lesson feels...

