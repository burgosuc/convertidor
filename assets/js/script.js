const options = {
  series: [
    {
      name: "CLP",
      data: [],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    zoom: {
      autoScaleYaxis: true,
    },
  },
  title: {
    text: "Historial últimos 10 días",
    align: "center",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },

  xaxis: {
    categories: [],
  },
};

const getData = async (indicador) => {
  try {
    const response = await fetch(`https://mindicador.cl/api/${indicador}`);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
};

function renderChart(serie) {
  const ultimos10 = serie.slice(0, 10); // se crea una variable con los últimos 10 elementos
  ultimos10.reverse(); //invierte el orden de los elementos para asegurar el orden correcto

  options.series[0].data = [];
  options.xaxis.categories = [];

  ultimos10.forEach((dia) => {
    options.series[0].data.push(dia.valor);
    options.xaxis.categories.push(dia.fecha.split("T")[0]);
  });

  const chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

const btn = document.getElementById("btn");
btn.addEventListener("click", async () => {
  const clp = document.getElementById("clp").value;
  const moneda = document.getElementById("moneda").value;

  const data = await getData(moneda);

  let conversion = clp / data.serie[0].valor;

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `Resultado: $ ${conversion.toFixed(3)}`;

  renderChart(data.serie);
});
