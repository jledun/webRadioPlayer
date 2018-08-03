const socket = io();
const columnNber = 4;

const name2id = name => {
  return name.split(' ').join('').split("\'").join('').toLowerCase();
}

const createButtons = (url) => {
  return `
  <div class="card-body">
    <button
      id="btn-${name2id(url.name)}"
      type="button" 
      class="btn btn-light" 
      onclick="play('${url.url}')">
      <i class="material-icons">play_arrow</i>
    </button>
  </div>
  `;
};

const play = (url) => {
  alert(url);
}

socket.emit('getUrl');
socket.on('url', url => {
  console.log(url);
  const displayedWR = ['<div class="row myRow">'].concat(url.map((u, i) => {
    return `
    ${(i % columnNber <= 0 && i !== 0) ? '</div><div class="row myRow">' : ""}
    <div class="col-sm">
      <div id="card-${name2id(u.name)}" class="card">
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

window.addEventListener('beforeunload', event => {
  socket.close();
});
