  $(document).ready(function(){
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
    var follows = [];
    var followsURL = "https://api.twitch.tv/helix/users/follows?from_id=455825055";
    $.ajax({
        type: 'GET',
        url: followsURL,
        headers: {
            'Client-ID': 'rc8uqc4k9iv82b8l339oymibbd3nkb'
        },
        success(data1){
            
            for(var i = 0; i < data1.data.length; i++){
                follows.push(data1.data[i].to_name);
                
            }
            
          
        }
      });
      console.log(follows);
      
      

  });