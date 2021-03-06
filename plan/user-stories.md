# WikiMap User Stories

* Guest = unauthenticated users

* Users = authenticated/logged in users

## Must Haves
* As a guest, I want to see a list of available maps, because I want to know what my options are

* As a guest I want a map to be capable of having many points because I want to be able to plan routes

* As a guest, I want to be able to view an individual map, because I want to plan my routes for my objectives

* As a user, I want to be able to create and modify maps to have my own customized maps for different projects. 

* As a user, I want to be able to be able to edit other users maps because collaboration lends the best experience for all users

* As a user, I want to have a profile because I want to keep track of my favourite maps and my own projects

* As a user, I want only authenticated users to be able to collaborate on my maps because I want to keep track of all the  changes to my projects and I am afraid of security leaks

* As a user, I want to be able to modify my maps, because my opinions change and I make mistakes

* Given that I am an authenticated user, when I create a map, I want it to be successfully added to the database of maps

* As a guest, I want to be able to click on a map point and view the title, description and image because I want to see the map point details

* As a user, I want to be able to favourite a map because I want to add it to my profile

* As a user, I don't want other users to delete map or pins that I created, because they belong to me

## Nice to Haves

* As a user, I want to be able to view an individual map which tells me where things are in proximity to me, because I want to see what is nearby

* As a user, I want to be able to share individual maps or lists of maps because I want to share locations with my friends

* Given that I am an authenticated user, when I favourite a map, I want an icon or message that notifies me that I have successfully added the map to my profile.

* As a user, I want to be able to list maps by the amount of times they've been favourited, because I want to know what other people think is good.

* As a user, I want to be able to filter results by my preferences because I want my user experience to be tailored to my needs

* As a user, I want to be able to tap on a location pin and have it open up on Google Maps, because I want to know how to get to the location pin to share my location with other interested parties. 

<!-- 
Andy's Notes:
User Scenarios

A user scenario is a syntactic alternative to user stories
They have the form: Given _____, when ______, then ______.
eg. Given that I am logged in, when I click favourite on a post, then it is added to my favourites.
You can also chain on an and to user stories/scenarios
eg. Given that I am logged in, when I click favourite on a post, then it is added to my favourites and the save icon will change to indicate success. -->



# Project Overview

A web app that allows users to collaboratively create maps which list multiple "points". For example: "Best Places to Eat Around Town" or "Locations of Movie Scenes".

Requirements:
[x] users can see a list of the available maps
[x] users can view a map
[x] a map can contain many points
[x] each point can have: a title, description, and image
[x] authenticated users can create maps
[x] authenticated users can modify maps (add, edit, remove points)
[x] users can favourite a map
[x] users have profiles, indicating their favourite maps and maps they've contributed to
[ ] use http://leafletjs.com/ or https://developers.google.com/maps/
