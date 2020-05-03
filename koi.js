function creazione_foglie() {
    var dataset = [
        {"x": 50, "y": 100, "w": 40, "id": 1},
        {"x": 300, "y": 110, "w": 40, "id": 2},
        {"x": 140, "y": 120, "w": 40, "id": 3}
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
        .attr("id", function(d) { return "rect" +  d.id })

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
    var pesce = [
        {
            nome: 1,
            r: 20,
            x: 50,
            y: 50
        }
    ]

    var svg = d3.select("svg");
    
    svg.selectAll("circle")
        .data(pesce)
        .enter()
        .append("circle")
        .attr("cx", function(d) { 
            var p = d3.select('#rect' + d.nome);
            var cx = parseFloat(p.attr("x")) + parseFloat(p.attr("width") / 2)
            return  cx
        })
        .attr("cy", function(d) { 
            var p = d3.select('#rect' + d.nome);
            var cy = parseFloat(p.attr("y")) + parseFloat(p.attr("width") / 2)
            return cy
        })
        .attr("r", function(d) { return d.r})
        .attr("fill", "blue")
        .attr("stroke-width", 1)
        .attr("stroke", 1)

        d3.selectAll("rect").raise()
}

function prova(){
        

    //Creazione delle foglie trascinabili
    creazione_foglie()

    //Creazione del pesce
    creazione_pesce()
    
}