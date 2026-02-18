// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  const data = await d3.csv("./dataset/videogames_long.csv");
  return data;
}

fetchData().then(async (data) => {
  const vlSpec = vl
    .markBar()
    .data(data)
    .title("Global Sales by Platform and Genre")
    .encode(
      vl.y().fieldN("platform").sort("-x"),
      vl.x().fieldQ("global_sales").aggregate("sum"),
      vl.color().fieldN("genre")
    )
    .width("container")
    .height(400)
    .toSpec();

  const vlSpec2 = vl
    .markLine()
    .data(data)
    .title("Sales Over Time by Platform and Genre")
    .encode(
      vl.y().fieldQ("global_sales").aggregate("sum"),
      vl.x().fieldT("year"),
      vl.color().fieldN("platform"),
      vl.column().fieldN("genre")
    )
    .width("container")
    .height(400)
    .toSpec();

  const v1spec3 = vl
    .markBar()
    .data(data)
    .title("Regional Sales vs. Platform")
    .encode(
      vl.y().fieldN("platform"),
      vl.x().fieldQ("sales_amount").aggregate("sum"),
      vl.color().fieldN("sales_region"),
    )
    .width("container")
    .height(400)
    .toSpec();

  const v1spec4 = vl
    .markLine()
    .data(data)
    .title("Sales Trends Over Time by Region")
    .encode(
      vl.x().fieldT("year"),
      vl.y().fieldQ("sales_amount").aggregate("sum"),
      vl.color().fieldN("sales_region")
    )
    .width("container")
    .height(400)
    .toSpec();

  render("#view", vlSpec);
  render("#view2", vlSpec2);
  render("#view3", v1spec3);
  render("#view4", v1spec4);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
