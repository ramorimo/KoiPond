function get_coordinate(name, coordinate){
    var p = d3.select(`#${name}`);
    var c = parseFloat(p.attr(coordinate)) + (parseFloat(p.attr("width") / 2))
    return c
}

function move_koi(){
    var current_leaf = "rect" + sequences[current_sequence][0]
    var mid_leaf = "rect" + sequences[current_sequence][1]
    var new_leaf = "rect" + sequences[current_sequence][2]
    var new_cx = get_coordinate(mid_leaf, "x") - get_coordinate(current_leaf, "x")
    var new_cy = get_coordinate(mid_leaf, "y") - get_coordinate(current_leaf, "y")
    var new_cx2 = get_coordinate(new_leaf, "x") - get_coordinate(current_leaf, "x")
    var new_cy2 = get_coordinate(new_leaf, "y") - get_coordinate(current_leaf, "y")
    d3.selectAll("#koi")
        .transition()
        .duration(500)
        .delay(100)
        .attr("transform", `translate(${new_cx},${new_cy})`)
        .transition()
        .duration(500)
        .delay(100)
        .attr("transform", `translate(${new_cx2},${new_cy2})`)
    
    if(current_sequence == sequences.length-1){
        current_sequence=0;
    }else{
        current_sequence++;
    }
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
            var current_leaf = "rect" + sequences[current_sequence][0]
            if(d3.select(this).attr("id") == current_leaf){
                console.log(sequences[current_sequence])
                move_koi()
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
            sequences = pesce.koi[0].sequences
            current_sequence = 0
            //Creazione delle foglie trascinabili
            create_leaves(pesce.leaves)
            //Creazione del pesce
            create_koi(pesce.koi)
        })
    
}