document.addEventListener("DOMContentLoaded", function() {
  //calling csv data here then passing though crossfilter function
  const myData = "milestone-2-project-master/data/data.csv";
  d3.csv(myData).then(chartBuilder);

  let colors = [
    "#3F1D1D",
    "#4F272D",
    "#5D323F",
    "#693E53",
    "#724D68",
    "#765D7E",
    "#766E93",
    "#7181A6",
    "#6894B6",
    "#5BA7C3",
    "#4DBBCC",
    "#44CDCF",
    "#47E0CE",
    "#5AF1C9"
  ];
  //overriding dc default colors passing In colors var from above
  dc.config.defaultColors(colors);

  //setting height an width variables that will be passed into width an height functions of graphs  charts below
  let w = 800;
  let h = 400;
  //setting margins variable that will be passed into margins functions in the charts below
  let margins = {
    top: 0,
    right: 0,
    bottom: 70,
    left: 70
  };
  // d3.csv("milestone-2-project-master/data/data.csv").then(function(sportData) {
  //   const ndx = crossfilter(sportData);
  function chartBuilder(data) {
    const ndx = crossfilter(data);
    const allData = ndx.groupAll();

    dc.dataCount("#total") // dc.dataCount | add to div id#total
      .crossfilter(ndx) // apply the crossfilter
      .groupAll(allData); // group allData from the crossfilter

    // d.Age = parseInt(d.Age);
    // d.Transfer_fee = parseFloat(d.Transfer_fee);

    // const fullDateFormat = d3.time.format("%a, %d %b %Y %X %Z");

    byPosition(ndx, "#piechart_players_position", "Position");
    btTransfer(ndx, "#scatterplot_graph");
    totalSpendTransfers(ndx, "#line_graph");
    topTenLeaugesSpending(ndx, "#leagues_spending_rowchart");
    topTenTeansSpending(ndx, "#teams_spending_rowchart");
    dc.renderAll();
  }

  //piechart
  function byPosition(ndx, divName, dimension) {
    let pieChart = dc.pieChart(divName);
    let dim = ndx.dimension(dc.pluck(dimension));
    let group = dim.group();

    pieChart
      .width(w)
      .height(h)
      .dim(dimension)
      .group(group);
  }

  //end of graphs section
  //adding function to target reset data btn to target  button an reset all data when clicked
  let resetBtn = document.getElementsByClassName("reset-data-btn");
  for (let i = 0; i < resetBtn.length; i++) {
    resetBtn[i].addEventListener("click", function() {
      dc.filterAll();
      dc.renderAll();
    });
  }
  //setting all variables for onclick functions here
  let callOutSection = document.getElementById("callout_text");
  let transferHistorySection = document.getElementById(
    "transfer_history_section"
  );
  let footer = document.getElementById("footer");
  let mainSection = document.getElementById("hiding_section_wrapper");
  let transferHistoryBtn = document.getElementById("transfer_history_btn");
  let stat_data_btn = document.getElementsByClassName("stats_data_btn");

  // targeting data an stats button here as we I want them both to do the same thing
  for (let i = 0; i < stat_data_btn.length; i++) {
    stat_data_btn[i].addEventListener("click", function() {
      callOutSection.classList.add("hide-content");
      mainSection.classList.remove("hide-content");
      footer.classList.remove("hide-content");
      transferHistorySection.classList.add("hide-content");
    });
  }

  transferHistoryBtn.addEventListener("click", function() {
    callOutSection.classList.add("hide-content");
    mainSection.classList.add("hide-content");
    transferHistorySection.classList.remove("hide-content");
    footer.classList.remove("hide-content");
  });
});
// class Chart {
//   constructor(chart) {
//     this.chart = chart;

//     chart = this.chart;
//     // function chartBuilder(width, height, resize) {
//     //   this.width = dc.width();
//     //   this.height = dc.height();
//     //   this.resize = dc.useViewBoxResizing(true);
//     // }
//   }
// }

// let pieChart = new Chart(dc.pieChart("#piechart_players_position"));
// let chart2 = new Chart(scatterplot);
// let chart3 = new Chart(leagueRowChart);
// let chart4 = new Chart(teamsRowChart);
// let chart5 = new Chart(pieChart);
