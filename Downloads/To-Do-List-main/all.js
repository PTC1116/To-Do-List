let data = [];
let unfinished = 0; //計算待完成項目
const list = document.querySelector(".list");
const listFooter = document.querySelector(".footer");
const btnAdd = document.querySelector(".btn-add");
const txt = document.querySelector(".txt");
const tab = document.querySelector(".tab");

function renderData(data) {
  let str = "";
  let count = 0;
  //建頁面
  data.forEach(function (item, index) {
    if (item.check === "checked") {
      str += `<li class = "listElement">
          <label class="checkbox" for="">
            <input class = "check" type="checkbox" data-index="${index}" checked>
            <span class="deleted">${item.content}</span>
          </label>
          <a href="#" class="material-symbols-outlined"> delete </a>
              </li><hr/>`;
    } else if (item.check === "unchecked") {
      str += `<li class = "listElement">
          <label class="checkbox" for="">
            <input class = "check" type="checkbox" data-index="${index}">
            <span>${item.content}</span>
          </label>
          <a href="#" class="material-symbols-outlined"> delete </a>
          </li><hr/>`;
      count++;
    }
  });
  list.innerHTML = str;
  unfinished = count;
}

//footer
function countUnfinished() {
  listFooter.innerHTML = `<p>${unfinished} 個待完成項目</p> 
<a href="#" class="clearAll">清除已完成項目</a>`;
}

//清除已完成項目
listFooter.addEventListener("click", function (e) {
  if (e.target.matches(".clearAll")) {
    data.forEach(function (item, index, array) {
      if (item.check === "checked") {
        array.splice(index, 1);
      }
    });
  }
  renderData(data);
});

//新增待辦事項
btnAdd.addEventListener("click", function (e) {
  if (txt.value !== "") {
    let obj = {};
    obj.content = txt.value;
    obj.check = "unchecked";
    data.push(obj);
    tabList.forEach((item) => {
      item.classList.remove("active");
    });
    tabList[0].classList.add("active");
    renderData(data);
    countUnfinished();
  }
});
//刪除待辦事項
list.addEventListener("click", function (e) {
  if (e.target.getAttribute("class") === "delete") {
    let index = e.target.getAttribute("data-index");
    data.splice(index, 1);
    alert("代辦事項已刪除");
    renderData(data);
    countUnfinished();
  }
});

//sort：全部/ 待完成/ 已完成
const tabList = document.querySelectorAll(".tab li");
tab.addEventListener("click", function (e) {
  tabList.forEach((item) => {
    item.classList.remove("active");
  });
  if (e.target.matches(".all")) {
    e.target.classList.add("active");
    renderData(data);
  } else if (e.target.matches(".unfinished")) {
    e.target.classList.add("active");
    renderData(data.filter((item) => item.check === "unchecked"));
  } else if (e.target.matches(".finished")) {
    e.target.classList.add("active");
    renderData(data.filter((item) => item.check === "checked"));
  }
});

//監聽check
list.addEventListener("click", function (e) {
  if (e.target.matches(".check")) {
    const index = e.target.getAttribute("data-index");
    const span = e.target.nextSibling.nextSibling;
    if (data[index].check === "unchecked") {
      data[index].check = "checked";
      span.classList.add("deleted");
      unfinished--;
    } else if (data[index].check === "checked") {
      data[index].check = "unchecked";
      span.classList.remove("deleted");
      unfinished++;
    }
  }
  countUnfinished();
});
