let body = document.getElementById('body');
var xhr = new XMLHttpRequest();
xhr.open("GET", "path.json");
xhr.addEventListener("load", function () {
  if (xhr.status == 200) {
    let json = JSON.parse(xhr.responseText);
    if (json.length > 0) {
      let ul = document.createElement("ul");
      for (let j = 0; j < json.length; j++) {
        let li = document.createElement("li");
        let titleurl = document.createElement("p");
        let link = document.createElement("a");
        link.href = json[j].url;
        link.innerText = json[j].title;
        let path = document.createElement("p");
        path.innerText = json[j].path;
        titleurl.appendChild(link);
        li.appendChild(titleurl);
        li.appendChild(path);
        ul.appendChild(li);
      }
      body.appendChild(ul);
    }
  }
});
xhr.send();