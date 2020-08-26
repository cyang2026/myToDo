var red = "rgb(244, 94, 89)"
var yellow = "rgb(242, 248, 81)"
var green = "rgb(151, 242, 155)"
var taskList = [];
var todaysDate = new Date();
var dateRegex = new RegExp("1?[0123456789]/[0123]?[0123456789]/202[012]");

const createName = () => {
  var num = Math.floor(Math.random() * 100);
  return "Task" + num;
}

function convertToDate(m, d, y) {
  var newDate = new Date(y, m - 1, d);
  return newDate;
}

function completeTask(elementId) {
  document.getElementById(elementId).style["text-decoration"] = "line-through";
}

function deleteTask(elementId) {
  var toDel = document.getElementById(elementId);
  toDel.remove();
}

function saveTask() {
  //Checks if there are too many tasks
  var warning = document.getElementById("warning");
  if (taskList.length >= 100) {
    warning.style.visibility = "visible";
    return;
  } else {
    warning.style.visibility = "hidden";
  }
  //Checks if the due date is valid
  var dueDate = document.getElementById("due-date").value;
  var dueDateWarning = document.getElementById("date-warning");
  if (!dateRegex.test(dueDate)) {
    dueDateWarning.style.visibility = "visible";
    return;
  } else {
    dueDateWarning.style.visibility = "hidden";
  }
  var parts = dueDate.split("/");
  var newDate = convertToDate(dueDate[0], dueDate[1], dueDate[2]);
  console.log(newDate);
  if (newDate.getTime() < todaysDate.getTime()) {
    dueDateWarning.style.visibility = "visible";
    console.log("This date is from the past")
    return;
  } else {
    dueDateWarning.style.visibility = "hidden";
    console.log("This date is in the future")
  }
  //Creates a new button
  var newButton = document.createElement("button");
  newButton.type = "button";
  var text = document.createTextNode("Check");
  newButton.appendChild(text);
  newButton.addEventListener('click', function() {
    completeTask(paraId);
  });
  displayPriority(newButton);
  var toAppend = document.getElementById("append");
  toAppend.appendChild(newButton);
  //Takes text from the textarea and puts it into a paragraph
  var newPara = document.createElement("p");
  var text = document.createTextNode(document.getElementById("textarea").value);
  taskList.push(text);
  newPara.appendChild(text);
  var paraId = createName();
  newPara.id = paraId;
  toAppend.appendChild(newPara);
  //Adds a delete button
  var newDel = document.createElement("button");
  newDel.type = "button";
  newDel.classList.add("delete-button");
  var delText = document.createTextNode("X");
  newDel.appendChild(delText);
  newDel.addEventListener('click', function() {
    deleteTask(paraId);
    newButton.remove();
    newDel.remove();
    taskList.pop(paraId);
    warning.style.visibility = "hidden";
  })
  toAppend.appendChild(newDel);
  //Creates an info button
  var newInfo = document.createElement("button")
  infoCharacter = document.createTextNode("𝒾");
  newInfo.appendChild(infoCharacter);
  newInfo.addEventListener('click', function() {
    var priority;
    if (document.getElementById("priority-selector").value === "H") {
      priority = "High";
    } else if (document.getElementById("priority-selector").value === "M") {
      priority = "Medium";
    } else if (document.getElementById("priority-selector").value === "L") {
      priority = "Low";
    } else {
      priority = "None";
    }
    alert("Due Date: " + dueDate + "\nPriority: " + priority)
  })
  newInfo.setAttribute("class", "get-info")
  toAppend.appendChild(newInfo);
  //Adds a line break
  var newLineBreak = document.createElement("br");
  toAppend.appendChild(newLineBreak);
  console.log(taskList);
  if (checkOverdue(dueDate) === "Overdue") {

  }
}

function displayPriority(buttonName) {
  var x = document.getElementById("priority-selector").value;
  if (x === "H") {
    buttonName.style["background-color"] = red;
  } else if (x === "M") {
    buttonName.style["background-color"] = yellow;
  } else if (x === "L") {
    buttonName.style["background-color"] = green;
  }
}
//3600000 milliseconds in an hour
function getInfo(taskId) {
  var task = document.getElementById(taskId);
}

function checkOverdue(dueDate) {
  parts = dueDate.split("/")
  setInterval(function() {
    if (todaysDate.getTime() > convertToDate(parts[0], parts[1], parts[2]).getTime()) {
      return "Overdue";
    } else {
      return "On time";
    }
  }, 86400000)
}
