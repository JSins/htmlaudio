//Javascript Audio -----------------------------------------------------------------------

// Player ---------------------------------------------

var javascriptaudio = document.getElementById("javascriptaudio");

var javstart = false;

$("#start").click(function () {
  if (javstart == false) {
    javascriptaudio.play();
    javstart = true;
    $(this).html("<i class='fas fa-pause'></i>");
  } else if (javstart == true) {
    javascriptaudio.pause();
    javstart = false;
    $(this).html("<i class='fas fa-play'></i>");
  }
});

$("#stop").click(function () {
  javascriptaudio.pause();
  javascriptaudio.currentTime = 0;
  javstart = false;
  $("#start").html("<i class='fas fa-play'></i>");
});

// ------------------------------------------------------

// Lautstärke -------------------------------------------

function setvol() {
  javascriptaudio.volume = 0.5;
}

var javvol;

$(document).on("input", "#javvol", function () {
  $("#javvolval").html($(this).val());
  javvol = $(this).val();
  javascriptaudio.volume = javvol / 100;
});

// -------------------------------------------------------

// Timer -------------------------------------------------

function settime() {
  $("#timer").text(
    "0:00/" +
      new Date(javascriptaudio.duration * 1000).toISOString().substr(15, 4)
  );
}

function jstimer() {
  $("#timer").text(
    new Date(javascriptaudio.currentTime * 1000).toISOString().substr(15, 4) +
      "/" +
      new Date(javascriptaudio.duration * 1000).toISOString().substr(15, 4)
  );
  var balkenanteil =
    (javascriptaudio.currentTime / javascriptaudio.duration) * 100;
  $("#balken").css("width", balkenanteil + "%");
  if (balkenanteil >= 100) {
    javascriptaudio.pause();
    javstart = false;
    $("#start").html("<i class='fas fa-play'></i>");
  }
}

// --------------------------------------------------------

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

var apistart = false;

$("#apistart").click(function () {
  if (apistart == false) {
    apisound.play();
    apistart = true;
    $(this).html("<i class='fas fa-pause'></i>");
  } else if (apistart == true) {
    apisound.pause();
    apistart = false;
    $(this).html("<i class='fas fa-play'></i>");
  }
});

$("#apistop").click(function () {
  apisound.stop();
  apistart = false;
  $("#apistart").html("<i class='fas fa-play'></i>");
  $("#apirange").val(0);
  $("#apitimer").text("0:00");
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

// Dauer -------------------------------------------------

$(document).on("input", "#apirange", function () {
  apisound.seek(($("#apirange").val() * apisound.duration()) / 100);
});

function apisettime() {
  $("#apidur").text(
    new Date(apisound.duration() * 1000).toISOString().substr(15, 4)
  );

  $("#apitimer").text("0:00");
}

setInterval(() => {
  if (apisound.playing()) {
    $("#apitimer").text(
      new Date(apisound.seek() * 1000).toISOString().substr(15, 4)
    );
    let range = Math.ceil((apisound.seek() / apisound.duration()) * 100);
    $("#apirange").val(range);
    if (range >= 100) {
      apistart = false;
      if (loop == false) {
        $("#apistart").html("<i class='fas fa-play'></i>");
      }
      $("#apirange").val(0);
      $("#apitimer").text("0:00");
    }
  }
}, 30);

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
