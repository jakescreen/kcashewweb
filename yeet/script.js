$(document).ready(function () {
  /*
      function grabNovel(link){
          $('#divRss').FeedEk({
              FeedUrl : link,
              MaxCount : 10,
              ShowPubDate:true,
              DescCharacterLimit:10,
              TitleLinkTarget:'_blank'
            });
      }
      https://www.wangmamaread.com/category/the-tutorial-is-too-hard/feed
        grabNovel('https://www.royalroad.com/fiction/syndication/16946');
        grabNovel('https://www.royalroad.com/fiction/syndication/26294');
  */
  /*
        new Twitch.Embed("twitch-embed", {
          width: 854,
          height: 480,
          channel: "monstercat"
        });
        */
  var twiShown = false;
  var loaded = false;
  var listed = false;
  var follows = [];
  var onlineArr = [];


  $('#twi').on('click', function () {

    if (twiShown == false) {
      showTwitch();
      
      
      
    }
    else {
      hideTwitch();
    }
    twiShown = !twiShown;

    
  });
  $('#appendTwitch').on('click', function(){
    displayTwitch();
  });

  function hideTwitch() {
    document.getElementById("twitchView").style.visibility = "hidden";
    document.getElementById("twitch-embed").style.visibility = "hidden";
    shown = "";
    console.log(onlineArr);
    console.log(follows);
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
          
          
          for (var i = 0; i < data1.data.length; i++) {
            
            follows.push(data1.data[i].to_name);
            
            var title = data1.data[i].to_name;
            var key = data1.data[i].to_name;

            var onStatusURL = "https://api.twitch.tv/helix/streams?user_login=" + title;
            
            $.ajax({
              type: 'GET',
              url: onStatusURL,
              headers: {
                'Client-ID': 'rc8uqc4k9iv82b8l339oymibbd3nkb'
              },
              success(data2) {
                
                
                if(data2.data.length > 0){
                  onlineStatus = data2.data[0].type;
                  
                  
                }
                else{
                  onlineStatus = "offline";
                  
                }
                onlineArr.push(onlineStatus);
                
                /*
                
            */
            
                
                
              }
              
              
            });
            
            
            


          }
          loaded = true;
          


        }
        
      });
      

      var embed = new Twitch.Embed("twitch-embed", {
        width: 854,
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
    
    else{
      document.getElementById("twitch-embed").style.visibility = "visible";
      document.getElementById("twitchView").style.visibility = "visible";
    }
    
  }
  

  function displayTwitch(){
    console.log("here");
    if(!listed){
      console.log(follows);
      for(var i = 0; i < follows.length; i++){
        var title = follows[i];
        
        var status = onlineArr[i];
        $('main').append(`
							      <article class="item" data-key="${title}">
								      <div class="details">
                        <h4>${title}</h4>
                        <p>${status}</p>
							      	</div>
						      	</article>
            `);
      }
      listed = true;
    }
  }


});
