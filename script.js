function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

let lists;
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let jsonData = JSON.parse(xhttp.responseText);

      if (jsonData.length > 0) {
        lists = retrieveData(jsonData);
      }

      function retrieveData(json, stringCategory = "") {
        let tempArray = [];
        for (let j = 0; j < json.length; j++) {
          if (json[j].items) {
            let tempFolderArray = retrieveData(json[j].items, stringCategory+">"+json[j].title);
            tempArray.push(...tempFolderArray);
          } else if (!json[j].items) {
            json[j].id = uuidv4();
            json[j].category = stringCategory.substring(1);
            tempArray.push(json[j])
          }
        }
        return tempArray;
      }

      let myNodelist = document.getElementById("myTable");
      for (let i = 0; i < lists.length; i++) {
        let tr = document.createElement("TR");
        let status = document.createElement("TD");
        if (lists[i].status == "completed") {
          status.innerText = "✔️"
        } else if (lists[i].status == "active") {
          status.innerText = "🔵"
        } else {
          status.innerText = "❌"
        }
        tr.appendChild(status);
        let type = document.createElement("TD");
        type.innerText = lists[i].type || "";
        tr.appendChild(type);
        let title = document.createElement("TD");
        title.innerText = lists[i].title;
        tr.appendChild(title);
        let tutor = document.createElement("TD");
        tutor.innerText = lists[i].tutor || "";
        tr.appendChild(tutor);
        let category = document.createElement("TD");
        category.innerText = lists[i].category;
        tr.appendChild(category);
        let price = document.createElement("TD");
        price.innerText = lists[i].price || "";
        tr.appendChild(price);
        let close = document.createElement("TD");
        close.className = "close";
        close.innerHTML = `<i class="fas fa-times-circle"></i>`
        tr.appendChild(close);
        myNodelist.appendChild(tr);
      }
      let closes = document.getElementsByClassName("close");
      for (let i = 0; i < closes.length; i++) {
        closes[i].onclick = function() {
          let div = this.parentElement;
          div.style.display = "none";
        }
      }
    }
};
xhttp.open("GET", "lists.json");
xhttp.send();

function myFunction() {
  let filterTitle, filterCategory, table, tr, title, i, txtValue, category, txtValue2;
  filterTitle = document.getElementById("myInputTitle").value.toUpperCase();
  filterCategory = document.getElementById("myInputCategory").value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    title = tr[i].getElementsByTagName("td")[2];
    category = tr[i].getElementsByTagName("td")[4];
    if (title && category) {
      txtValue = title.textContent || title.innerText;
      txtValue2 = category.textContent || category.innerText;
      if (txtValue.toUpperCase().indexOf(filterTitle) > -1 && txtValue2.toUpperCase().indexOf(filterCategory) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

let list = document.getElementById('myTable');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'TD' && ev.target.className != 'close') {
    ev.target.parentNode.classList.toggle('checked');
  }
}, false);

function newElement() {
  let tr = document.createElement("tr");
  let status = document.createElement("td");
  status.innerText = document.getElementById("myInputAddStatus").value;
  tr.appendChild(status);
  let type = document.createElement("td");
  type.innerText = document.getElementById("myInputAddType").value;
  tr.appendChild(type);
  let title = document.createElement("td");
  title.innerText = document.getElementById("myInputAddTitle").value;
  tr.appendChild(title);
  let tutor = document.createElement("td");
  tutor.innerText = document.getElementById("myInputAddTutor").value;
  tr.appendChild(tutor);
  let category = document.createElement("td");
  category.innerText = document.getElementById("myInputAddCategory").value;
  tr.appendChild(category);
  let close = document.createElement("td");
  close.innerText = "\u00D7"
  close.className = "close";
  close.onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
  }
  tr.appendChild(close);

  if (status.innerText === '' || type.innerText === '' || title.innerText === '' || tutor.innerText === '' || category.innerText === '') {
    alert("You must fill every field!");
  } else {
    console.log(tr)
    document.getElementById("myTable").appendChild(tr);
  }

  document.getElementById("myInputAddStatus").value = "";
  document.getElementById("myInputAddType").value = "";
  document.getElementById("myInputAddTitle").value = "";
  document.getElementById("myInputAddTutor").value = "";
  document.getElementById("myInputAddCategory").value = "";
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