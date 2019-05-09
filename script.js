let body = document.getElementById('body');
var xhr = new XMLHttpRequest();
xhr.open("GET", "path.json");
xhr.addEventListener("load", function () {
  if (xhr.status == 200) {

    let jsonData = JSON.parse(xhr.responseText);

    if (jsonData.length > 0) {
      let data = document.createElement("div");
      let ul = retrieveData(jsonData);
      data.appendChild(ul);
      body.appendChild(data);
    }

    function retrieveData(json) {
      let ul = document.createElement("ul");
      for (let j = 0; j < json.length; j++) {
        let li = document.createElement("li");
        if (!json[j].items) {
          let titleurl = document.createElement("p");
          let link = document.createElement("a");
          link.href = json[j].url;
          link.innerText = json[j].title;
          let path = document.createElement("p");
          path.innerText = json[j].path;
          titleurl.appendChild(link);
          li.appendChild(titleurl);
          li.appendChild(path);
        } else if (json[j].items) {
          let data2 = document.createElement("div");
          let title = document.createElement("p");
          title.innerText = json[j].title;
          li.appendChild(title);
          let subUl = retrieveData(json[j].items);
          li.appendChild(subUl);
        }
        ul.appendChild(li);
      }
      return ul;
    }

  }
});

xhr.send();