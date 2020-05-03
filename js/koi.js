function get_coordinate(name, coordinate){
    var p = d3.select(`#${name}`);
    var c = parseFloat(p.attr(coordinate)) + parseFloat(p.attr("width") / 2)
    return c
}

function new_leaf_center(new_leaf, old_leaf){
    new_cx = get_coordinate(new_leaf, "x") - get_coordinate(old_leaf, "x")
    new_cy = get_coordinate(new_leaf, "y") - get_coordinate(old_leaf, "y")
    d3.selectAll("#koi")
        .transition()
        .duration(500)
        .delay(100)
        .attr("transform", `translate(${new_cx},${new_cy})`)
}

function create_leaves(dataset) {

    var svg = d3.select("svg");

    var scale = d3.scaleLinear()
    scale.domain([0,1])
    scale.range([0, 700 - 40])
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function() { return scale(Math.random())} )
        .attr("y", function() { return scale(Math.random())} )
        .attr("width", function(d) { return d.w})
        .attr("height", function(d) { return d.w})
        .attr("fill", "red")
        .attr("stroke-width", 1)
        .attr("stroke", 1)
        .attr("id", function(d) { return d.id })

    var dragHandler = d3.drag()
        .on("start", function () {
            var current = d3.select(this);
            deltaX = current.attr("x") - d3.event.x;
            deltaY = current.attr("y") - d3.event.y;

            if(d3.select(this).attr("id") == "rect1"){
                new_leaf_center("rect2", "rect1")
                correct_leaf = "rect2"
            }
        })
        .on("drag", function () {
            d3.select(this)
                .attr("x", d3.event.x + deltaX)
                .attr("y", d3.event.y + deltaY);
        });
    
    dragHandler(svg.selectAll("rect"));
}

function create_koi(pesce){
    var svg = d3.select("svg");
    
    svg.selectAll("circle")
        .data(pesce)
        .enter()
        .append("circle")
        .attr("cx", function(d) { 
            return get_coordinate(d.start, "x")
        })
        .attr("cy", function(d) { 
            return get_coordinate(d.start, "y")
        })
        .attr("r", function(d) { return d.r})
        .attr("fill", "blue")
        .attr("stroke-width", 1)
        .attr("stroke", 1)
        .attr("id", "koi")

        d3.selectAll("rect").raise()
        d3.selectAll("#rect1").attr("fill", "blue")
}

function prova(){
        

    
    d3.json("data/koi.json")
        .then(function(pesce){
            console.log(pesce.koi)
            //Creazione delle foglie trascinabili
            create_leaves(pesce.leaves)
            //Creazione del pesce
            create_koi(pesce.koi)
        })
    
}