function mode() {
  let mode = {}
  mode.values = [];
  document.querySelectorAll('input[name="mode"]').forEach(element => {
    mode.values.push(element.value);
  });
  mode.selected = document.querySelector('input[name="mode"]:checked').value;
  if (mode.values.length == 2) {
    if (mode.values[0] != mode.selected) {
      mode.notSelected = mode.values[0];
    } else {
      mode.notSelected = mode.values[1];
    }
  }
  mode.education = document.querySelectorAll('[education]');
  mode.library = document.querySelectorAll('[library]');
  return mode;
}

function changeMode(list) {
  let mode = this.mode();
  let myTable = document.getElementById("myTable");
  let myTableHeader = myTable.firstElementChild;
  let body = [...document.getElementsByTagName('body')][0];
  let newTable = document.createElement("TABLE");
  newTable.id = "myTable";
  newTable.appendChild(myTableHeader)
  // newTable.addEventListener('dblclick', function(ev) {
  //   if (ev.target.tagName === 'TD' && ev.target.className != 'close') {
  //     ev.target.parentNode.classList.toggle('checked');
  //   }
  // }, false);
  mode[mode.selected].forEach(element => {
    let hasCheckbox = false;
    [...element.children].forEach(element => {
      if (element.type == 'checkbox') {
        hasCheckbox = true;
      }
    });
    if (hasCheckbox) {
      element.style.display = "flex";
    } else {
      element.style.display = "table-cell";
    }
  });
  mode[mode.notSelected].forEach(element => {
    element.style.display = "none";
  });
  this.list.forEach(element => {
    if (element.title == capitalize(mode.selected)) {
      listSelected = retrieveData(element.items);
    }
  });
  myTable.parentNode.removeChild(myTable);
  body.appendChild(newTable)
  createTable(listSelected);
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

function capitalize(s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
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

function newEntry(item) {
  let mode = this.mode();
  let tr = document.createElement("TR");
  let title = document.createElement("TD");
  title.setAttribute("title", "");
  let titlelink = document.createElement('a');
  titlelink.appendChild(document.createTextNode(item.title || ""));
  titlelink.title = item.title || "";
  titlelink.href = item.url || "#";
  title.appendChild(titlelink);
  tr.appendChild(title);
  if (mode.selected == "library") {
    let description = document.createElement("TD");
    description.setAttribute("description", "");
    if (item.description) {
      description.innerHTML = `<span>`+item.description+`</span>`;
    }
    tr.appendChild(description);
  } else {
    let tutor = document.createElement("TD");
    tutor.setAttribute("tutor", "");
    if (item.tutor) {
      let tutorlink = document.createElement('a');
      tutorlink.appendChild(document.createTextNode(item.tutor || ""));
      tutorlink.title = item.tutor || "";
      tutorlink.href = item.tutorUrl || "#";
      tutor.appendChild(tutorlink);
    }
    tr.appendChild(tutor);
  }
  let category = document.createElement("TD");
  category.setAttribute("category", "");
  if (item.category) {
    let categories = item.category.split('>');
    // for (let i = 0; i < categories.length; i++) {
    //   category.innerHTML += `<span>`+categories[i]+`</span>`;
    //   if (i != categories.length - 1) {
    //     category.innerHTML += `<b> > </b>`;
    //   }
    // }
    category.innerHTML = `<span>`+categories.join(' > ')+`</span>`;
  }
  tr.appendChild(category);
  if (mode.selected == "education") {
    let type = document.createElement("TD");
    type.setAttribute("type", "");
    if (item.type) {
      type.innerHTML = `<span>`+item.type+`</span>`;
      // if (item.type == "course") {
      //   price.innerHTML = `<span>💻</span>`;
      // } else if (item.type == "audio") {
      //   type.innerHTML = `<span>📻</span>`;
      // } else if (item.type == "book") {
      //   type.innerHTML = `<span>📘</span>`;
      // } else if (item.type == "video") {
      //   type.innerHTML = `<span>🎞</span>`;
      // }
    }
    tr.appendChild(type);
    let price = document.createElement("TD");
    price.setAttribute("price", "");
    if (item.price) {
      price.innerHTML = `<span>`+item.price+`</span>`;
      // if (item.price == "free") {
      //   price.innerHTML = `<span>🆓</span>`;
      // } else if (item.price == "paid") {
      //   price.innerHTML = `<span>💲</span>`;
      // }
    }
    tr.appendChild(price);
    let status = document.createElement("TD");
    status.setAttribute("status", "");
    if (item.status) {
      status.innerHTML = `<span>`+item.status+`</span>`;
    } else {
      status.innerHTML = `<span>❌</span>`;
    }
    // if (item.status == "completed") {
    //   status.innerHTML = `<span>✔️</span>`;
    // } else if (item.status == "active") {
    //   status.innerHTML = `<span>🔵</span>`;
    // } else {
    //   status.innerHTML = `<span>❌</span>`;
    // }
    tr.appendChild(status);
  }
  let close = document.createElement("TD");
  close.setAttribute("close", "");
  close.className = "close";
  close.innerHTML = `<i class="fas fa-times-circle"></i>`
  close.onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
  }
  tr.appendChild(close);
  return tr
}

function createTable(lists) {
  let myTable = document.getElementById("myTable");
  for (let i = 0; i < lists.length; i++) {
    let tr = newEntry(lists[i]);
    myTable.appendChild(tr);
  }
}

function filtering() {
  let mode, table, items, filterTitle, filterUrl, filterDescription, filterTutor, filterTutorUrl, filterCategory, filterType, filterPrice, filterStatus, title, url, description, tutor, tutorUrl, category, type, price, status, itPass;

  mode = this.mode();
  table = document.getElementById("myTable");
  items = table.getElementsByTagName("tr");
  filterTitle = document.getElementById("Title").value.toUpperCase();
  filterUrl= document.getElementById("Url").value.toUpperCase();
  filterDescription= document.getElementById("Description").value.toUpperCase();
  filterTutor= document.getElementById("Tutor").value.toUpperCase();
  filterTutorUrl= document.getElementById("TutorUrl").value.toUpperCase();
  filterCategory = document.getElementById("Category").value.toUpperCase();
  filterType= this.onSelect("Type");
  filterPrice= this.onSelect("Price");
  filterStatus= this.onSelect("Status");

  for (let i = 1; i < items.length; i++) {

    title = items[i].querySelector('[title]').firstChild;
    url = title.href;
    if (items[i].querySelector('[description]')) {
      description = items[i].querySelector('[description]').firstChild || items[i].querySelector('[description]');
    }
    if (items[i].querySelector('[tutor]')) {
      if (items[i].querySelector('[tutor]').firstChild) {
        tutor = items[i].querySelector('[tutor]').firstChild;
        tutorUrl = tutor.href;
      } else {
        tutor = items[i].querySelector('[tutor]');
      }
    }
    category = items[i].querySelector('[category]').firstChild;
    if (items[i].querySelector('[type]')) {
      type = items[i].querySelector('[type]').firstChild || items[i].querySelector('[type]');
    }
    if (items[i].querySelector('[price]')) {
      price = items[i].querySelector('[price]').firstChild || items[i].querySelector('[price]');
    }
    if (items[i].querySelector('[status]')) {
      status = items[i].querySelector('[status]').firstChild || items[i].querySelector('[status]');
    }

    itPass = true;

    if (itPass && title.textContent.toUpperCase().indexOf(filterTitle) == -1) {
      itPass = false;
    }
    if (itPass && url.toUpperCase().indexOf(filterUrl) == -1) {
      itPass = false;
    }
    if (itPass && description && description.textContent.toUpperCase().indexOf(filterDescription) == -1) {
      itPass = false;
    }
    if (itPass && tutor && tutor.textContent.toUpperCase().indexOf(filterTutor) == -1) {
      itPass = false;
    }
    if (itPass && tutorUrl && tutorUrl.toUpperCase().indexOf(filterTutorUrl) == -1) {
      itPass = false;
    }
    if (itPass && category.textContent.toUpperCase().indexOf(filterCategory) == -1) {
      itPass = false;
    }
    if (itPass && type && filterType) {
      itPass = false;
      if (!Array.isArray(filterType)) {
        if (type && (type.textContent == filterType)) {
          itPass = true;
        }
      } else {
        filterType.forEach(element => {
          if (type && (type.textContent == element)) {
            itPass = true;
          }
        });
      }
    }
    if (itPass && price && filterPrice) {
      itPass = false;
      if (!Array.isArray(filterPrice)) {
        if (price && (stapricetus.textContent == filterPrice)) {
          itPass = true;
        }
      } else {
        filterPrice.forEach(element => {
          if (price && (price.textContent == element)) {
            itPass = true;
          }
        });
      }
    }
    if (itPass && status && filterStatus) {
      itPass = false;
      if (!Array.isArray(filterStatus)) {
        if (status && (status.textContent == filterStatus)) {
          itPass = true;
        }
      } else {
        filterStatus.forEach(element => {
          if (status && (status.textContent == element)) {
            itPass = true;
          }
        });
      }
    }

    if (itPass) {
      items[i].style.display = "";
    } else {
      items[i].style.display = "none";
    }

    this.clearInsert();
  }
}

function clearInsert() {
  document.getElementById("Title").value = "";
  document.getElementById("Url").value = "";
  document.getElementById("Description").value = "";
  document.getElementById("Tutor").value = "";
  document.getElementById("TutorUrl").value = "";
  document.getElementById("Category").value = "";
  let allType = document.getElementsByName('type');
  for(var i = 0; i < allType.length; i++) {
    allType[i].checked = false;
  }
  let allPrice = document.getElementsByName('price');
  for(var i = 0; i < allPrice.length; i++) {
    allPrice[i].checked = false;
  }
  let allStatus = document.getElementsByName('status');
  for(var i = 0; i < allStatus.length; i++) {
    allStatus[i].checked = false;
  }
}

function newElement() {
  let mode = this.mode();
  let item = {title:document.getElementById('Title').value,url:document.getElementById('Url').value,description:document.getElementById('Description').value,tutor:document.getElementById('Tutor').value,tutorUrl:document.getElementById('TutorUrl').value,category:document.getElementById('Category').value,type:this.onSelect('Type'),price:this.onSelect('Price'),status:this.onSelect('Status')};
  let tr = newEntry(item);
  if (document.getElementById("Title").value == '' || document.getElementById("Url").value == '' || document.getElementById("Category").value == '' || (document.getElementById("TutorUrl").value != '' && document.getElementById("Tutor").value == '') || Array.isArray(this.onSelect('Type')) || Array.isArray(this.onSelect('Price')) || Array.isArray(this.onSelect('Status'))) {
    let errorMsg = "You have the following errors: "
    let missingFields = [];
    if (document.getElementById("Title").value == '') {missingFields.push("\nMissing Title field.")}
    if (document.getElementById("Url").value == '') {missingFields.push("\nMising Title URL field.")}
    if (document.getElementById("Category").value == '') {missingFields.push("\nMissing Category field.")}
    if (document.getElementById("TutorUrl").value != '' && document.getElementById("Tutor").value == '') {missingFields.push("\nMissing Tutor field for Tutor Url.")}
    if (Array.isArray(this.onSelect('Type'))) {missingFields.push("\nYou can select only one Type.")}
    if (Array.isArray(this.onSelect('Price'))) {missingFields.push("\nYou can select only one Price.")}
    if (Array.isArray(this.onSelect('Status'))) {missingFields.push("\nYou can select only one Status.")}
    alert(errorMsg+missingFields.join(" "));
  } else {
    this.clearInsert();
    document.getElementById("myTable").insertBefore(tr, document.getElementById("myTable").childNodes[1]);
    console.log(tr)
  }
}

function onSelect(id) {
  let element = document.getElementById(id);
  let values = []
  for(var i = 0; i < element.children.length; i++) {
    if (element.children[i].checked) {
      values.push(element.children[i].value);
    }
  }
  if (values.length == 0) {
    return null;
  } else if (values.length == 1) {
    return values[0];
  } else {
    return values;
  }
}

let listSelected;

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    window.list = JSON.parse(xhttp.responseText);
    window.list.forEach(element => {
      let modeSelected = mode();
      if (element.title == capitalize(modeSelected.selected)) {
        listSelected = retrieveData(element.items);
      }
    });
    createTable(listSelected);
    changeMode(listSelected);
  }
};
xhttp.open("GET", "lists.json");
xhttp.send();