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
          let title = document.createElement("button");
          title.classList.add("accordion");
          title.innerText = json[j].title;
          li.appendChild(title);
          let items = document.createElement("div");
          items.classList.add("panel");
          let itemslist = retrieveData(json[j].items);
          items.appendChild(itemslist);
          li.appendChild(items);
        }
        ul.appendChild(li);
      }
      return ul;
    }

  }
});

xhr.send();

let accordion = document.getElementsByClassName("accordion");
for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

// {
//   "id": "uuid4",
//   "title": "Folder",
//   "items": [
//   ]
// }

// {
//   "id": "uuid4",
//   "title": "Course",
//   "description": "Description",
//   "url": "#",
//   "status": "✔️",
//   "type": "💻",
//   "tutor": "Tutor",
//   "time": "Time",
//   "price": "💲"
// }