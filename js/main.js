"use strict";

const allBtn = document.getElementById("allBtn");
const onlineBtn = document.getElementById("onlineBtn");
const offlineBtn = document.getElementById("offlineBtn");
const outputSection = document.getElementById("streamsWrapper");
const fccSection = document.getElementById("fccWrapper");
const streamers = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const baseUrl = "https://wind-bow.glitch.me/twitch-api";


allBtn.addEventListener("click", function () {
  let elements = document.getElementsByClassName("channel");
  for (let elem of elements) {
    elem.style.display = "";
  }
});
onlineBtn.addEventListener("click", function () {
  let elements = document.getElementsByClassName("offline");
  for (let elem of elements) {
    elem.style.display = "none";
  }
  elements = document.getElementsByClassName("online");
  for (let elem of elements) {
    elem.style.display = "";
  }
});

offlineBtn.addEventListener("click", function () {
  let elements = document.getElementsByClassName("online");
  for (let elem of elements) {
    elem.style.display = "none";
  }
  elements = document.getElementsByClassName("offline");
  for (let elem of elements) {
    elem.style.display = "";
  }
});

function main() {

  clearOutput();
  for (let streamer of streamers) {
    getStream(streamer);
  }


}

function getChannel(name) {

  const restUrl = `/channels/${name}`;

  fetch(baseUrl + restUrl)
    .then(response => response.json())
    .then(json => {
      getDataOnChannel(name, json);
    });
}

function getStream(name) {

  const restUrl = `/streams/${name}`;

  fetch(baseUrl + restUrl)
    .then(response => response.json())
    .then(json => {

      getDataOnUser(name, json);
    });
}

function getDataOnUser(name, json) {

  if (json.stream === null) {
    getChannel(name);
  } else {
    let tempStreamer = {
      username: json.stream.channel.display_name,
      logo: json.stream.channel.logo,
      game: json.stream.game,
      streamname: json.stream.channel.status,
      url: json.stream.channel.url
    };

    updateStreamersHtml(name, tempStreamer, "online");

  }
}

function getDataOnChannel(name, json) {

  let tempStreamer = {
    username: json.display_name,
    logo: json.logo,
    game: json.game,
    streamname: "Offline",
    url: json.url
  };

  updateStreamersHtml(name, tempStreamer, "offline");


}

function updateStreamersHtml(name, tempStreamer, status) {

  const article = document.createElement("article");
  if (name != "freecodecamp") {
    article.setAttribute("class", `channel ${status}`);
  }

  let html = `<img src="${tempStreamer.logo}">` +
    `<a href="${tempStreamer.url}">${tempStreamer.username}</a>` +
    "<p>";

  if (status === "online") {
    html += `${tempStreamer.game} - ${tempStreamer.streamname}</p>`;
  } else {
    html += "Offline</p>";
  }

  article.innerHTML = html;

  if (name === "freecodecamp") {
    fccSection.appendChild(article);
  } else {
    outputSection.appendChild(article);
  }



}

function clearOutput() {
  outputSection.innerHTML = "";
}

main();