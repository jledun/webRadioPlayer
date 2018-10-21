# webRadioPlayer

A small web radio player based on mplayer with a responsive design ui (angular 6 + angular/material)

Mine is running on a Raspberry PI 2a

# Installation

## dependencies

Install the following packages :
* nodejs + npm
* mplayer

and everything to get some sound on your client

## run application

```bash
> git clone https://github.com/jledun/webRadioPlayer.git
> cd webRadioPlayer
> npm install
> node .
```

## reach web ui

Navigate to your client host IP adress, on port 6680.

For example, if your host is at 192.168.1.2, then use your favorite web browser and navigate to :

```
http://192.168.1.2:6680
```

then simply press the play button on the web radio you'd like to play.

# Features

## web radio list

With your favorite text editor, edit radioStreams.json and add or remove web radios.

By default, there's a few french web radios (because I'm french).

You can add, duplicate, update or delete web radio in radioStreams.json directly from the UI.

You can play the web radio on the server (raspberry pi or other, any equipment running Linux OS and node.js V6 or upper.

You can also stream web radio directly in your web browser.

Because I don't know about mplayer on Windows, this project don't support Windows OS for the server.

## Soundcloud API

Display recent sounds from soundcloud.com.

Search in soundcloud library.

More informations on Soundcloud [here](https://soundcloud.com/ "Soundcloud.com") and Soundcloud API [here](https://developers.soundcloud.com/ "Soundcloud API").

## Community Radio Browser

Browse Community Radio Browser and search by name, tags, country and region.

More information on Community Radio Browser [here](http://www.radio-browser.info/gui/#/ "Community Radio Browser") and Community Radio Browser API [here](http://www.radio-browser.info/webservice "Community Radio Browser API").

# Develop and test

You need to install nodemon and angular/cli :

```
> sudo npm install -g nodemon @angular/cli
```

Prepare the project folder :

```
> git clone https://github.com/jledun/webRadioPlayer.git
> cd webRadioPlayer
> npm install # install server dependencies
> cd ngFront
> npm install # install angular project dependencies
> cd ..
```

## run the server

From the project root :

```
> npm run start
```

## Web UI development

The web UI is developed with @angular v6, @angular/material

```
> cd ngFront
> ng serve # option : --host x.x.x.x
```

## Update web UI on the server

```
> cd ngFront
> npm run build
```

# TODO

* show mplayer statistics
* improve search in soundcloud library (by artist, sort, ...)
* create and manage playlist for soundcloud : a local playlist system while browsing soundcloud :
 * create a local playlist system
 * server should play each title of the playlist
 * add title to playlist from soundcloud interface
* improve image loading in Community Radio Browser and performances
* add User-Agent headers for Community Radio Browser API.
* check broken url in library

# Contribute

## Question, issues

Please, submit an issue.

## Bugfix or new feature

Please create a pull request.

# Contributors

* Julien Ledun <j.ledun@iosystems.fr>, package creator

