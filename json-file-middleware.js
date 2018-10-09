'use strict';
const fs = require('fs');
const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/operator/concatMap');
require('rxjs/add/operator/delay');
require('rxjs/add/observable/bindNodeCallback');
require('rxjs/add/observable/fromPromise');
require('rxjs/add/observable/of');
require('rxjs/add/observable/throw');

const readWebRadioList = () => {
  const readFile = Observable.bindNodeCallback(fs.readFile);
  return readFile('./radioStreams.json', {encoding: 'utf-8'})
  .concatMap(data => {
    return Observable.of(JSON.parse(data));
  });
}

const saveWebRadioList = webRadioList => {
  const writeFile = Observable.bindNodeCallback(fs.writeFile);
  return writeFile('./radioStreams.json', JSON.stringify(webRadioList, null, 1));
}

const getWebRadioWithIndex = (id) => {
  return readWebRadioList()
  .concatMap(wr => {
    const arIndex = wr.findIndex(elm => elm.id === id);
    if (arIndex < 0) return Observable.throw(`L'id ${id} n'existe pas.`);
    return Observable.of({wr: [].concat(wr), arIndex: arIndex});
  });
}

const updateWebRadio = (id, url) => {
  return getWebRadioWithIndex(id)
  .concatMap(data => {
    let tmp = [].concat(data.wr);
    tmp[data.arIndex] = Object.assign({}, tmp[data.arIndex], url, {id: id});
    return saveWebRadioList(tmp);
  }).concatMap(data => {
    return readWebRadioList();
  });
}

const deleteWebRadio = id => {
  return getWebRadioWithIndex(id)
  .concatMap(data => {
    let tmp = [].concat(data.wr);
    tmp.splice(data.arIndex, 1);
    return saveWebRadioList(tmp);
  }).concatMap(data => {
    return readWebRadioList();
  });
}

const addWebRadio = url => {
  return readWebRadioList()
  .concatMap(wr => {
    const tmp = [].concat(wr).sort((a, b) => b.id - a.id);
    wr.push(Object.assign({}, url, {id: tmp[0].id + 1}));
    return saveWebRadioList(wr);
  }).concatMap(data => {
    return readWebRadioList();
  });
}

const checkUrl = url => {
  return (
    url && 
    url.hasOwnProperty('name') && url.name !== "" &&
    url.hasOwnProperty('url') && url.url !== ""
  ) ? true : false;
}

module.exports = {
  get: (req, res, next) => {
    // retrieve the entire web radios list
    readWebRadioList().subscribe(
      data => {
        res.type('json');
        res.status(200).json(data)
      },
      err => res.sendStatus(500),
      () => {}
    );
  },
  post: (req, res, next) => {
    // add a new web radio
    // data validation
    const newWebRadio = Object.assign({}, req.body);
    if (!checkUrl(newWebRadio)) {
      return res.sendStatus(400);
    }
    addWebRadio(newWebRadio).subscribe(
      data => {
        res.type('json');
        res.status(200).json(data)
      },
      err => res.sendStatus(500),
      () => {}
    );
  },
  put: (req, res, next) => {
    // update an existing web radio
    const newWebRadio = Object.assign({}, req.body);
    const id = Number(req.params.id);

    if (!checkUrl(newWebRadio)) return res.sendStatus(400)

    updateWebRadio(id, newWebRadio).subscribe(
      data => {
        res.type('json');
        res.status(200).json(data)
      },
      err => res.sendStatus(404),
      () => {}
    );
  },
  delete: (req, res, next) => {
    // delete an existing web radio
    const id = Number(req.params.id);
    deleteWebRadio(id).subscribe(
      data => {
        res.type('json');
        res.status(200).json(data)
      },
      err => res.sendStatus(404),
      () => {}
    );
  }
}
