/*
$('#divRss').FeedEk({
    FeedUrl : 'https://jquery-plugins.net/rss',
    MaxCount : 5,
    ShowDesc : true,
    ShowPubDate:true,
    DescCharacterLimit:100,
    TitleLinkTarget:'_blank'
  });
  https://www.wangmamaread.com/category/the-tutorial-is-too-hard/feed
  https://www.royalroad.com/fiction/syndication/16946
  https://www.royalroad.com/fiction/syndication/26294
*/
var web = ["https://www.wangmamaread.com/category/the-tutorial-is-too-hard/feed",
  "https://www.royalroad.com/fiction/syndication/16946",
  "https://www.royalroad.com/fiction/syndication/26294",
  "https://www.royalroad.com/fiction/syndication/25275",
  "https://www.royalroad.com/fiction/syndication/12024",
  "https://tigertranslations.org/feed",
  "https://jigglypuffsdiary.com/feed"
];

var posts = [];
var shown = false;

function getFeeds() {

  for (let i = 0; i < web.length; i++) {
    $.ajax({
      dataType: "json",
      url: "https://feed.jquery-plugins.net/load?url=" + web[i] + "&maxCount=2&ShowDesc=false",
      success(result) {
        for (let i = 0; i < result.data.length; i++) {
          posts.push({ title: result.data[i].title, date: result.data[i].publishDateFormatted, link: result.data[i].link });
        }
      }
    });
  }


}

function displayNovels() {
  if (shown) {
    $('#divRss').html('');
    shown = false;
  }
  else {

    $('#divRss').html('');
    for (let i = 0; i < posts.length; i++) {
      $("#divRss").append(`
      <article class="itemContent">
        <a href="${posts[i].link}">${posts[i].title}</a>
        <p>${posts[i].date}</p>
      </article>
    `);
    }
    shown = true;
    console.log(shown);
  }

}


$(document).ready(function () {
  getFeeds();
  $('#nov').on('click', function () {
    displayNovels();

  });

});
