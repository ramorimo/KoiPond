function creazione_foglie() {
    var dataset = [
        {"x": 50, "y": 100, "w": 40},
        {"x": 300, "y": 110, "w": 40},
        {"x": 140, "y": 120, "w": 40}
    ]

    var svg = d3.select("svg");

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d) { return d.x} )
        .attr("y", function(d) { return d.y} )
        .attr("width", function(d) { return d.w})
        .attr("height", function(d) { return d.w})
        .attr("fill", "red")
        .attr("stroke-width", 1)
        .attr("stroke", 1)

    var dragHandler = d3.drag()
        .on("start", function () {
            var current = d3.select(this);
            deltaX = current.attr("x") - d3.event.x;
            deltaY = current.attr("y") - d3.event.y;
        })
        .on("drag", function () {
            d3.select(this)
                .attr("x", d3.event.x + deltaX)
                .attr("y", d3.event.y + deltaY);
        });
    
    dragHandler(svg.selectAll("rect"));
}

function creazione_pesce(){
    
}

function prova(){
        

    //Creazione delle foglie trascinabili
    creazione_foglie()

    //Creazione del pesce
    creazione_pesce()
    
}