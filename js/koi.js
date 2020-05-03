function get_coordinate(name, coordinate){
    var p = d3.select(`#${name}`);
    var c = parseFloat(p.attr(coordinate)) + (parseFloat(p.attr("width") / 2))
    return c
}

function move_koi(){
    var mid_leaf1 = "rect" + sequences[current_sequence][1]
    var mid_leaf2 = "rect" + sequences[current_sequence][2]
    var new_leaf = "rect" + sequences[current_sequence][3]

    var new_cx1 = get_coordinate(mid_leaf1, "x") 
    var new_cy1 = get_coordinate(mid_leaf1, "y")
    var new_cx2 = get_coordinate(mid_leaf2, "x")
    var new_cy2 = get_coordinate(mid_leaf2, "y")
    var new_cx3 = get_coordinate(new_leaf, "x")
    var new_cy3 = get_coordinate(new_leaf, "y")
    
    d3.select("#koi")
        .transition()
        .duration(500)
        .delay(100)
        .attr("cx",new_cx1)
        .attr("cy",new_cy1)
        .transition()
        .duration(500)
        .delay(100)
        .attr("cx",new_cx2)
        .attr("cy",new_cy2)
        .transition()
        .duration(500)
        .delay(100)
        .attr("cx",new_cx3)
        .attr("cy",new_cy3)
    
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
            var x = d3.event.x + deltaX
            var y = d3.event.y + deltaY
            var w = parseFloat(d3.select(this).attr("width"));
            var width = parseFloat(d3.select("svg").attr("width"))
            if(x < 0){
                x = 0
            }else if(x + w  > width){
                x = width - w
            }

            if(y < 0){
                y = 0
            }else if(y + w  > width){
                y = width - w
            }

            d3.select(this)
                .attr("x", x)
                .attr("y", y);
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
    d3.json("/data/koi.json")
        .then(function(pesce){
            sequences = pesce.koi[0].sequences
            current_sequence = 0
            //Creazione delle foglie trascinabili
            create_leaves(pesce.leaves)
            //Creazione del pesce
            create_koi(pesce.koi)
        })
    
}