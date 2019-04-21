var topics = [ "elephant", "cat", "dog", "llama", "watermelon", "kanye"];
  
  renderButtons();
  
  $(".btn-warning").on("click", makeButton);
  
  $(document).on("click", ".topics", addImage);
  
  $(document).on("click", "img", toggleImage);
  
  
  function renderButtons() {
    $(".renderBtn").empty();
  
    for (let i = 0; i < topics.length; i++) {
      var btn = $("<button>");
      btn.addClass("topics btn-info");
      btn.text(topics[i]);
  
      $(".renderBtn").append(btn);
    }
  }
  
  function makeButton() {
    topics.push($("#appendForm").val());
    renderButtons();
  }
  
  function toggleImage() {
    $(this)
      .siblings("img")
      .show();
    $(this).hide();
  }
  
  function addImage() {
    var apikey = "&api_key=UHoXi6qtdJnbt2UvM16Mwp2BazGfxOYU&limit=10";
    var topic = $(this)
      .text()
      .trim();
    var api = "https://api.giphy.com/v1/gifs/search?q=";
    var queryURL = api + topic + apikey;
  
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var data = response.data;
  
      for (var i = 0; i < data.length; i++) {
        let TopicDiv = $("<div class = 'topicDiv'>");
        const Topic = $("<p>").text("Topic: " + topic + "---");
        const rating = data[i].rating;
        const pOne = $("<p>").text("Rating: " + rating);
        TopicDiv.append(Topic);
        TopicDiv.append(pOne);
  
        const stillImage = $("<img>");
        stillImage.attr("src", data[i].images.fixed_height_still.url);
        stillImage.addClass("stillGifs");
        TopicDiv.append(stillImage);
  
        const gifImage = $("<img>");
        gifImage.attr("src", data[i].images.fixed_height.url);
        gifImage.addClass("activeGifs");
        TopicDiv.append(gifImage);
        $(".insertGif").prepend(TopicDiv);
      }
      $(".activeGifs").hide();
    });
  }

