//JS Script

window.addEventListener("load", run, false);
window.addEventListener("load", trackSidebar, false);
window.addEventListener("resize", trackSidebar, false);

function run() {
  
  loadBarChart();
  loadLineChart();
  loadPieChart();
  
  let list = document.querySelectorAll(".chart-toggle > ul > li > a");
  
  addEventListenerToList(list, "click", function(){changeChart(event)});

  function loadBarChart() {
    let ctx = document.querySelector("#bar-chart-canvas").getContext("2d");
    let chart = new Chart (ctx,{
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
        datasets: [{
          label: "Months",
          data: getData(),
          backgroundColor: "rgb(9, 122, 157)",
          borderColor: "rgb(9, 122, 157)",
          borderWidth: 0
        }]
      },
      options: {
        legend: {
          display: true,
          position: "bottom"
        },
        plugins:{
          labels: {
            render: "value"
          }
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "KiloWatt/Hour"
            },
            ticks: {
              min: 0,
              begitAtZero: true
            }
          }]
        }
      }
    });    
  }
  
  
  function loadLineChart() {
    let ctx = document.querySelector("#line-chart-canvas").getContext("2d");
    let chart = new Chart (ctx,{
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
        datasets: [{
          label: "Months",
          data: getData(),          
          borderColor: "rgb(9, 122, 157)",
          borderWidth: 0
        }]
      },
      options: {
        legend: {
          display: true,
          position: "bottom"
        },
        plugins:{
          labels: {
            render: "value"
          }
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "KiloWatt/Hour"
            },
            ticks: {
              min: 0,
              begitAtZero: true
            }
          }]
        }
      }
    });    
  }
  
  function loadPieChart() {
    let ctx = document.querySelector("#pie-chart-canvas").getContext("2d");
    let chart = new Chart (ctx,{
      type: "pie",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
        datasets: [{          
          data: getData(),
          backgroundColor: [
           "rgb(120, 182, 201)",
           "rgb(83, 162, 186)",
           "rgb(46, 142, 172)",
           "rgb(21, 129, 162)",
           "rgb(4, 55, 71)",
           "rgb(3, 43, 55)"
          ],
          borderColor: "rgb(9, 122, 157)",
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          labels: [
          {
            render: "label",
            position: "outside",
            padding: "5px"
          },
          {
            render: "percentage",
            fontColor: "#fff"
          }
          ]
        }
      }
    });
    
  }
  
  function getData() {
    let arr = [];
    arr = [55, 85, 15, 25, 10, 15];
    return arr;
  }
}

function trackSidebar() {
      
  let headerHeight = document.querySelector("header").offsetHeight;
  let sidebarHeight = document.querySelector("#navbar-sidebar").offsetHeight;
  
  let docBottMargin = document.body.clientHeight - headerHeight - sidebarHeight;
  let winBottMargin = window.innerHeight - headerHeight - sidebarHeight;
  
  let sidebar = document.querySelector("#navbar-sidebar .sidebar-nav");
  
  if (window.innerWidth < 768) {
    return;
  }
  else if (window.innerWidth < 992) {    
    let center = document.querySelector(".center-column");
    let docBottMargin = center.offsetHeight - sidebarHeight;
    
    sidebar.style.marginBottom = docBottMargin + "px";
  }
  else if (document.body.clientHeight > window.innerHeight) {
    sidebar.style.marginBottom = docBottMargin + "px";
  }
  else {
    sidebar.style.marginBottom = winBottMargin + "px";
  }
  
}

function changeChart(event) {
  let id = event.currentTarget.getAttribute("href");
  let elem = document.querySelector(id);
  
  let canvasList = document.querySelectorAll(".chart-wrapper > canvas");
  removeClassFromList(canvasList, "active");
      
  addClass(elem, "active");  
}

function removeClassFromList(list, myClass) {
  for (let i = 0; i < list.length; i++) {
    removeClass(list[i], myClass);
  }
}

function addClass (elem, myClass) {
  if (elem.classList) {
    elem.classList.add(myClass);
  }
  else {
    var arr = elem.className.split(" ");
    var i = arr.indexOf(myClass);
    if (i == -1) {
      arr.push(myClass);
      elem.className = arr.join(" ");
    }
  }
}

function removeClass (elem, myClass) {
  if (elem.classList) {
    elem.classList.remove(myClass);
  }
  else {
    var arr = elem.className.split(" ");
    var i = arr.indexOf(myClass);
    if (i >= 0) {
      arr.splice(i, 1);
      elem.className = arr.join(" ");
    }
  }
}

function addEventListenerToList(list, evt, func) {
  var arr = list;
  if (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].addEventListener(evt, func, false);
    }
  }
}
