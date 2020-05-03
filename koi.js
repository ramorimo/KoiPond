function creazione_foglie() {
    var dataset = [
        {"x": 50, "y": 100, "w": 40, "nome": "1"},
        {"x": 300, "y": 110, "w": 40, "nome": "2"},
        {"x": 140, "y": 120, "w": 40, "nome": "3"}
    ]

    var svg = d3.select("svg");

    var scale = d3.scaleLinear()
    scale.domain([0,1])
    scale.range([0, 700 - 40])
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function() { return scale(Math.random())} )
        .attr("y", function(d) { return scale(Math.random())} )
        .attr("width", function(d) { return d.w})
        .attr("height", function(d) { return d.w})
        .attr("fill", "red")
        .attr("stroke-width", 1)
        .attr("stroke", 1)
        .attr("nome", function(d) { return d.nome })

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