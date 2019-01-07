#!/bin/bash

if [ $# -eq 0 ]; then
    for i in WorldFactbook UNGeneralDebates BeerPredictions Instacart; do
        pipenv run jupyter nbconvert --to=rst $i.ipynb
        mv $i.rst book/_sources
        mkdir -p book/_sources/$i_files
        mv $i_files/* book/_sources/$i_files
    done
else
    pipenv run jupyter nbconvert --to=rst $1.ipynb
    mv $1.rst book/_sources
    mkdir -p book/_sources/$1_files
    mv $1_files/* book/_sources/$1_files
fi

