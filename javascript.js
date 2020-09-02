//Javascript Audio -----------------------------------------------------------------------

var javascriptaudio = document.getElementById("javascriptaudio");

$("#start").click(function () {
  javascriptaudio.play();
});

$("#pause").click(function () {
  javascriptaudio.pause();
});

$("#stop").click(function () {
  javascriptaudio.pause();
  javascriptaudio.currentTime = 0;
});

function settime() {
  console.log("binsoweit");
  $("#timer").text(
    "0:00 / " +
      new Date(javascriptaudio.duration * 1000).toISOString().substr(15, 4)
  );
}

function jstimer() {
  $("#timer").text(
    new Date(javascriptaudio.currentTime * 1000).toISOString().substr(15, 4) +
      " / " +
      new Date(javascriptaudio.duration * 1000).toISOString().substr(15, 4)
  );
  var balkenanteil =
    (javascriptaudio.currentTime / javascriptaudio.duration) * 100;
  $("#balken").css("width", balkenanteil + "%");
}

// ---------------------------------------------------------------------------------------

$(document).ready(function () {
  $("#jplayer").jPlayer({
    supplied: "mp3",
    swfPath: "/js",
  });
});

$(".start").on("click", setAudioMedia);

var setAudioMedia = function () {
  $("##jplayer")
    .jPlayer("setMedia", {
      mp3: "audio/html5native.mp3",
    })
    .jPlayer("play");
};
