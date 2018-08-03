const socket = io();
const columnNber = 4;
let myUrls = [];

const name2id = name => {
  return name.split(' ').join('').split("\'").join('').toLowerCase();
}

const createButtons = (url) => {
  return `
  <div class="card-body">
    <button
      id="btn-${url.id}"
      type="button" 
      class="btn btn-light" 
      onclick="play('${url.name}')">
      <i class="material-icons">play_arrow</i>
    </button>
  </div>
  `;
};

const play = (url) => {
  socket.emit('playStream', myUrls.find(u => u.name === url));
}
const volumeUp = () => {
  socket.emit('volumeUp');
}
const volumeDown = () => {
  socket.emit('volumeDown');
}

socket.emit('getUrl');
socket.on('url', url => {
  myUrls = url.map(u => Object.assign({}, u, {id: name2id(u.name)} ));
  const displayedWR = ['<div class="row myRow">'].concat(myUrls.map((u, i) => {
    return `
    ${(i % columnNber <= 0 && i !== 0) ? '</div><div class="row myRow">' : ""}
    <div class="col-sm">
      <div id="card-${u.id}" class="card">
        <div class="card-body">
          <h5 class="card-title">${u.name}</h5>
        </div>
        ${createButtons(u)}
      </div>
    </div>
    `;
  })
  ).concat(['</div>']).reduce((final, wr) => final.concat(wr), "");
  document.getElementById('content').innerHTML = displayedWR;
});

let intervalData = setInterval(() => {
  socket.emit('getStatus');
}, 1000);
socket.on('status', (status) => {
  console.log(status);
});

window.addEventListener('beforeunload', event => {
  if (intervalData) clearInterval (intervalData);
  socket.close();
});
