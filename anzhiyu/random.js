var posts=["2024/12/20/article-template/","2024/12/19/cocktail-and-coding/","2024/12/19/interactive-map-demo/","2024/11/12/post/","2024/12/19/spatial-data-series-01/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };