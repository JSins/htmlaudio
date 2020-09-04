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

$("#volup").click(function () {
  javascriptaudio.volume = javascriptaudio.volume + 0.1;
  setvol();
});

$("#voldown").click(function () {
  javascriptaudio.volume = javascriptaudio.volume - 0.1;
  setvol();
});

function settime() {
  console.log("binsoweit");
  $("#timer").text(
    "0:00 / " +
      new Date(javascriptaudio.duration * 1000).toISOString().substr(15, 4)
  );
}

function setvol() {
  $("#vol").text(Math.floor(javascriptaudio.volume * 100) + "%");
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

// jPlayer -------------------------------------------------------------------------------

$(document).ready(function () {
  $("#jplayer").jPlayer({
    supplied: "mp3",
    swfPath: "js/",
    timeupdate: onTimeupdate,
  });
});

var onTimeupdate = function (e) {
  var timeText = $.jPlayer.convertTime(e.jPlayer.status.currentTime);
  $("#jptimer").text(timeText);
};

$("#jpstart").click(function () {
  $("#jplayer")
    .jPlayer("setMedia", {
      mp3: "audio/Jp" + $("#jptracks").find(":selected").val() + ".mp3",
    })
    .jPlayer("play");
});

$("#jpstop").click(function () {
  $("#jplayer").jPlayer("pause");
});

$("#jpnext").click(function () {
  if (
    $("#jptracks").find(":selected").val() ==
    $("#jptracks option").length - 1
  ) {
    $("#jptracks").val(0);
  } else if (
    $("#jptracks").find(":selected").val() ==
    $("#jptracks option").length - 2
  ) {
    $("#jptracks").val(3);
  } else if (
    $("#jptracks").find(":selected").val() ==
    $("#jptracks option").length - 3
  ) {
    $("#jptracks").val(2);
  } else if (
    $("#jptracks").find(":selected").val() ==
    $("#jptracks option").length - 4
  ) {
    $("#jptracks").val(1);
  }
  $("#jplayer")
    .jPlayer("setMedia", {
      mp3: "audio/Jp" + $("#jptracks").find(":selected").val() + ".mp3",
    })
    .jPlayer("play");
});

function jpsettime() {
  console.log("bin auch reddi");
  $("#jptimer").text("00:00");
}

// -----------------------------------------------------------------------------------------

// Howler.js -------------------------------------------------------------------------------

var apisound = new Howl({
  src: ["audio/webaudioapi.mp3"],
  volume: 0.5,
});

$("#apistart").click(function () {
  apisound.play();
});

// Loop --------------------------------------------------

var loop = false;

$("#apiloop").click(function () {
  if (loop == false) {
    apisound.loop(true);
    $(this).css("background", "cornflowerblue");
    loop = true;
  } else if (loop == true) {
    apisound.loop(false);
    $(this).css("background", "rgb(189, 197, 211)");
    loop = false;
  }
});

// -------------------------------------------------------

// Lautstärke --------------------------------------------

var apivol;

$(document).on("input", "#apivolume", function () {
  $("#apivolval").html($(this).val());
  apivol = $(this).val();
  apisound.volume(apivol / 100);
});

// -------------------------------------------------------

// Geschwindigkeit ---------------------------------------

var apispeed;

$(document).on("input", "#apispeed", function () {
  $("#apispeedval").html($(this).val() + "%");
  apispeed = $(this).val();
  apisound.rate(apispeed / 100);
});

// -------------------------------------------------------

// 3D Position -------------------------------------------

var apipos;

$(document).on("input", "#apipos", function () {
  $("#apistereo").val(0);
  $("#apiposval").html($(this).val());
  apipos = $(this).val();
  apisound.pos(apipos / 100);
});

// -------------------------------------------------------

// 2D Position -------------------------------------------

var apistereo;

$(document).on("input", "#apistereo", function () {
  $("#apipos").val(0);
  $("#apistereoval").html($(this).val());
  apistereo = $(this).val();
  apisound.stereo(apistereo / 100);
});

// -------------------------------------------------------

// -----------------------------------------------------------------------------------------
