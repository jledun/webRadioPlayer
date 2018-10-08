# webRadioPlayer

A small web radio player based on mplayer with a responsive design ui (angular 6 + angular/material)

Mine is running on a Raspberry PI 2a

# Installation

## dependencies

Install the following packages :
* nodejs + npm
* mplayer

and everything to get some sound on your client

## application

```bash
$> git clone https://github.com/jledun/webRadioPlayer.git
$> cd webRadioPlayer
$> npm install
$> node .
```

## reach web ui

Navigate to your client host IP adress, on port 6680.

For example, if your host is at 192.168.1.2, then use your favorite web browser and navigate to :

```
http://192.168.1.2:6680
```

then simply press the play button on the web radio you'd like to play.

## web radio list

With your favorite text editor, edit radioStreams.json and add or remove web radios.

By default, there's a few french web radios (because I'm french).

# TODO

* add or remove web radios from web application
* show mplayer statistics
* hability to listen to web radios in the browser

# Contribute

Please submit an issue before creating a pull request.

# Contributors

* Julien Ledun <j.ledun@iosystems.fr>, package creator

