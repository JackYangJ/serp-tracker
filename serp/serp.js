const serp = require("serp");

var options = {
  host : "google.com",
  qs : {
    q : "pickled chicken feet"
  },
  num : 100,
  delay : 2000 // in ms
};

async function search() {
  const links = await serp.search(options);
  // console.log(links);
  links.forEach((item, index) => {
    console.log(item.url)
    if (item.url.includes('misschinesefood.com')) {
      console.log('当前排名: ' + (index + 1));
    }
  });
}
search();
