function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

let body = document.getElementById('body');
var xhr = new XMLHttpRequest();
xhr.open("GET", "lists.json");
xhr.addEventListener("load", function () {
  if (xhr.status == 200) {

    let jsonData = JSON.parse(xhr.responseText);
    if (jsonData.length > 0) {
      let data = document.createElement("div");
      var started = [{
        "title": "Active",
        "items": []
      }]
      let ul = retrieveData(jsonData);
      let ulstarted = retrieveData(started);
      let listarted = document.createElement("li");
      listarted.appendChild(ulstarted);
      data.appendChild(ul);
      body.appendChild(data);
      document.getElementById("itemslist").prepend(listarted);
    }

    function retrieveData(json) {
      let ul = document.createElement("ul");
      for (let j = 0; j < json.length; j++) {
        let li = document.createElement("li");
        if (!json[j].items) {
          if (json[j].status == "started") {
            let x = JSON.parse(JSON.stringify(json[j]));
            delete x.status;
            started[0].items.push(x);
          }
          let link = document.createElement("a");
          link.href = json[j].url;
          link.innerText = json[j].title;
          li.appendChild(link);
        } else if (json[j].items) {
          let tab = document.createElement("div");
          tab.classList.add("tab");
          let input = document.createElement("input");
          input.type = "checkbox";
          let uid = uuidv4();
          input.id = uid;
          let title = document.createElement("label");
          title.classList.add("tab-label");
          title.htmlFor = uid;
          title.innerText = json[j].title;
          let content = document.createElement("div");
          content.classList.add("tab-content");
          let itemslist = retrieveData(json[j].items);
          itemslist.id = "itemslist";
          content.appendChild(itemslist);
          tab.appendChild(input);
          tab.appendChild(title);
          tab.appendChild(content);
          li.appendChild(tab);
        }
        ul.appendChild(li);
      }
      return ul;
    }

  }
});

xhr.send();

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