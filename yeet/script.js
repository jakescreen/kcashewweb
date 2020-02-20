var twiShown = false;
var loaded = false;
var listed = false;
var andyStyle = [];
var resultsBack = [];
function displayTwitch(objArray) {
  $("main").html('');
  for (var i = 0; i < objArray.length; i++) {
    $('main').append(`
                  <article class="item" data-key="${objArray[i].name}">
                    <div class="details">
                      <h4>${objArray[i].name}</h4>
                      <p>${objArray[i].status}</p>
                    </div>
                  </article>
          `);
  }
}
function bind_trailing_args(fn, ...bound_args) {
  return function (...args) {
    return fn(...args, ...bound_args);
  };
}
let areWeDoneYet = function (i, total) {
  resultsBack.push(i);
  if (resultsBack.length == total) {
    displayTwitch(andyStyle);
  }
}
let idealDataHandler =
  function (data2, txtStatus, someXHRThing, i, data1, total) {
    console.log(i, data1);
    if (data2.data.length > 0) {
      onlineStatus = data2.data[0].type;
    }
    else {
      onlineStatus = "offline";
    }
    console.log(onlineStatus);
    andyStyle.push({ name: data1.data[i].to_name, status: onlineStatus });
    console.log(andyStyle);
    areWeDoneYet(i, total);
  }
$(document).ready(function () {
  $('#twi').on('click', function () {
    //first this
    if (twiShown == false) {
      showTwitch();
    }
    else {
      hideTwitch();
    }
    twiShown = !twiShown;
  });

  function hideTwitch() {
    document.getElementById("twitchView").style.visibility = "hidden";
    document.getElementById("twitch-embed").style.visibility = "hidden";
    shown = "";
  }
  //https://api.twitch.tv/helix/streams?user_login=monstercat
  function showTwitch() {
    if (!loaded) {
      var followsURL = "https://api.twitch.tv/helix/users/follows?from_id=455825055";
      var onlineStatus = "";
      $.ajax({
        type: 'GET',
        url: followsURL,
        headers: {
          'Client-ID': 'rc8uqc4k9iv82b8l339oymibbd3nkb'
        },
        success(data1) {
          let expectedResults = data1.data.length;
          for (let i = 0; i < data1.data.length; i++) {
            var title = data1.data[i].to_name;
            var onStatusURL = "https://api.twitch.tv/helix/streams?user_login=" + title;
            $.ajax({
              type: 'GET',
              url: onStatusURL,
              headers: {
                'Client-ID': 'rc8uqc4k9iv82b8l339oymibbd3nkb'
              },
              success: bind_trailing_args(idealDataHandler, i, data1, expectedResults)
            });
            //streamArr.push(streamers);
          }
          loaded = true;
        }
      });
      
      var embed = new Twitch.Embed("twitch-embed", {
        width: 840,
        height: 480,
        channel: 'kamikazecashew'
      });
      document.getElementById("twitch-embed").hidden = true;
      $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        var player = embed.getPlayer();
        player.setChannel(id);
        document.getElementById("twitch-embed").hidden = false;
      });
    }
    else {
      document.getElementById("twitch-embed").style.visibility = "visible";
      document.getElementById("twitchView").style.visibility = "visible";
    }
  }
});