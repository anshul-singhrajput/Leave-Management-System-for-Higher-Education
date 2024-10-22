

if ($("#message-list").length) {
  $("#message-list")
    .css({
      height: 400,
    })
    .niceScroll();
}

/* chart shadow */
var draw = Chart.controllers.line.prototype.draw;
Chart.controllers.lineShadow = Chart.controllers.line.extend({
  draw: function () {
    draw.apply(this, arguments);
    var ctx = this.chart.chart.ctx;
    var _stroke = ctx.stroke;
    ctx.stroke = function () {
      ctx.save();
      ctx.shadowColor = "#00000075";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 8;
      ctx.shadowOffsetY = 8;
      _stroke.apply(this, arguments);
      ctx.restore();
    };
  },
});

var ctx = document.getElementById("myChart").getContext("2d");
var gradientStroke = ctx.createLinearGradient(500, 0, 0, 0);
gradientStroke.addColorStop(0, "rgba(55, 154, 80, 1)");
gradientStroke.addColorStop(1, "rgba(131, 210, 151, 1)");

var gradientStroke2 = ctx.createLinearGradient(0, 0, 700, 0);
gradientStroke2.addColorStop(0, "rgba(255, 204, 128, 1)");
gradientStroke2.addColorStop(0.5, "rgba(255, 152, 0, 1)");
gradientStroke2.addColorStop(1, "rgba(239, 108, 0, 1)");

var myChart = new Chart(ctx, {
  type: "lineShadow",
  data: {
    labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
    type: "line",
    defaultFontFamily: "Poppins",
    datasets: [
      {
        label: "Income",
        borderColor: gradientStroke2,
        pointBorderColor: gradientStroke2,
        pointHoverBackgroundColor: gradientStroke2,
        pointHoverBorderColor: gradientStroke2,
        borderWidth: "3",
        backgroundColor: "rgba(255,128,0,.4)",
        pointBorderWidth: 10,
        pointHoverRadius: 10,
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        fill: false,
        borderWidth: 4,
        data: [0, 30, 10, 120, 50, 63, 10],
      },
      {
        label: "Expenses",
        borderColor: gradientStroke,
        pointBorderColor: gradientStroke,
        pointHoverBackgroundColor: gradientStroke,
        pointHoverBorderColor: gradientStroke,
        borderWidth: "1",
        backgroundColor: "rgba(67,231,148,.9)",
        pointBorderWidth: 10,
        pointHoverRadius: 10,
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        fill: false,
        borderWidth: 4,
        data: [0, 50, 40, 80, 40, 79, 120],
      },
    ],
  },
  options: {
    legend: {
      position: "top",
      labels: {},
    },
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "#9aa0ac", // Font Color
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "#9aa0ac", // Font Color
          },
        },
      ],
    },
  },
});

var ctx = document.getElementById("chart-1").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales",
        data: [10, 35, 27, 55, 30],
        borderWidth: 2,
        backgroundColor: "rgba(78, 214, 193, .8)",
        borderWidth: "3",
        borderColor: "rgba(78, 214, 193, .8)",
        pointBorderWidth: 5,
        pointRadius: 2,
        pointBackgroundColor: "red",
        pointHoverBackgroundColor: "rgba(63,82,227,.8)",
      },
      {
        label: "Budget",
        data: [35, 20, 45, 35, 45],
        borderWidth: 2,

        backgroundColor: "rgba(226, 226, 226, .9)",
        borderWidth: 0,
        borderColor: "rgba(226, 226, 226, .9)",
        pointBorderWidth: 5,
        pointRadius: 2,
        pointBackgroundColor: "transparent",
        pointHoverBackgroundColor: "rgba(254,86,83,.8)",
      },
    ],
  },
  options: {
    legend: {
      display: true,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            // display: false,
            drawBorder: false,
            color: "#f2f2f2",
          },
          ticks: {
            beginAtZero: true,
            stepSize: 10,
            fontColor: "#9aa0ac", // Font Color
            callback: function (value, index, values) {
              return "$" + value;
            },
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
            tickMarkLength: 15,
          },
          ticks: {
            fontColor: "#9aa0ac", // Font Color
          },
        },
      ],
    },
  },
});

var options = {
  chart: {
    height: 170,
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "40%",
      dataLabels: {
        position: "top", // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + "%";
    },
    offsetY: -20,
    style: {
      fontSize: "12px",
      colors: ["#9aa0ac"],
    },
  },
  series: [
    {
      name: "Income",
      data: [2.3, 3.1, 4.0, 5.1, 4.0, 3.6, 3.2],
    },
  ],
  xaxis: {
    categories: ["S", "M", "T", "W", "T", "F", "S"],
    position: "bottom",
    labels: {
      offsetY: -1,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },

    tooltip: {
      enabled: false,
      offsetY: -35,
    },
  },

  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val) {
        return val + "%";
      },
    },
  },
};

var chart = new ApexCharts(document.querySelector("#chart2"), options);

chart.render();
