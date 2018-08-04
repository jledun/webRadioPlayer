const socket = io();
const columnNber = 4;
let myUrls = [];

// GLOBAL FUNCTIONS
const name2id = name => {
  return name.split(' ').join('').split("\'").join('').toLowerCase();
}

const createButtons = (url, status = 'default') => {
  return `
  <div class="card-body">
    <button
      id="btn-${url.id}"
      type="button" 
      class="${(status === 'stopped') ? 'btn btn-light' :
        (status === 'loading') ? 'btn btn-danger' :
        (status === 'playing') ? 'btn btn-info' :
        'btn btn-light'}" 
      onclick="${(status === 'playing') ? 'stop' : 'play'}('${url.name}')">
      <i class="material-icons">
        ${(status === 'loading') ? 'loop' :
        (status === 'playing') ? 'stop' : 
        'play_arrow'}
      </i>
    </button>
  </div>
  `;
};

const createCards = (url, status = 'default') => {
  return `
      <div
        class="${(status === 'stopped') ? 'card' :
          (status === 'loading') ? 'card bg-danger text-white' :
          (status === 'playing') ? 'card bg-light' :
          'card'}">
        <div class="card-body">
          <h5 class="card-title">${url.name}</h5>
        </div>
        ${createButtons(url, status)}
      </div>
    `;
}

const updateUrls = () => {
  document.getElementById('content').innerHTML = ['<div class="row myRow">']
    .concat(myUrls.map((u, i) => {
      return `
        ${(i % columnNber <= 0 && i !== 0) ? '</div><div class="row myRow">' : ""}
        <div id="card-${u.id}" class="col-sm">
          ${createCards(u)}
        </div>`;
    }))
    .concat(['</div>'])
    .reduce((final, wr) => final.concat(wr), "");
};

const setStoppedCard = (url) => {
  if (!url.id) url.id = name2id(url.name);
  document.getElementById('card-'.concat(url.id)).innerHTML = createCards(url, 'stopped');
};
const setLoadingCard = (url) => {
  if (!url.id) url.id = name2id(url.name);
  document.getElementById('card-'.concat(url.id)).innerHTML = createCards(url, 'loading');
};
const setPlayingCard = (url) => {
  if (!url.id) url.id = name2id(url.name);
  document.getElementById('card-'.concat(url.id)).innerHTML = createCards(url, 'playing');
};

// SOCKET RECEPTIONS
socket.on('url', url => {
  myUrls = url.map(u => Object.assign({}, u, {id: name2id(u.name)} ));
  updateUrls();
});

socket.on('status', (nowPlaying) => {
  switch (nowPlaying.status) {
    case nowPlaying.statusList.STOPPED: 
    default:
      if (nowPlaying.url && nowPlaying.url.id) {
        setStoppedCard(nowPlaying.url);
      }else{
        updateUrls();
      }
      break;

    case nowPlaying.statusList.LOADING:
      setLoadingCard(nowPlaying.url);
      break;

    case nowPlaying.statusList.PLAYING:
      setPlayingCard(nowPlaying.url);
      break;
  }
});

// SOCKET COMMANDS
socket.emit('getUrl');
const play = (url) => {
  socket.emit('playStream', myUrls.find(u => u.name === url));
  updateUrls();
}
const stop = (url) => {
  socket.emit('stopStream', myUrls.find(u => u.name === url));
  updateUrls();
}
const volumeUp = () => {
  socket.emit('volumeUp');
}
const volumeDown = () => {
  socket.emit('volumeDown');
}

window.addEventListener('beforeunload', event => {
  socket.close();
});
