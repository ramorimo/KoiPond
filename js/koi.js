function get_coordinate(name, coordinate){
    var p = d3.select(`#${name}`);
    var c = parseInt(p.attr(coordinate)) + (parseInt(p.attr("width") / 2))
    return c
}

function move_koi(){
    var mid_leaf1 = "leaf" + sequences[current_sequence][1]
    var mid_leaf2 = "leaf" + sequences[current_sequence][2]
    var new_leaf = "leaf" + sequences[current_sequence][3]

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
    scale.range([0, svg.attr("width") - dataset[0].w])
    
    svg.selectAll(".leaf")
        .data(dataset)
        .enter()
        .append("svg")
        .attr("x", function() { return parseInt(scale(Math.random()))} )
        .attr("y", function() { return parseInt(scale(Math.random()))} )
        .attr("id", function(d) { return d.id })
        .attr("width", function(d) { return d.w})
        .attr("height", function(d) { return d.w})
        .append("path")
        .attr("class", "leaf")
        .attr("d", "M10.306,52.037C7.191,41.872,3.188,32.782,8.245,20.926,17.655-1.14,41.66,2.046,47.407,2.259S51.53,29.222,51.53,29.222C59.889,13.884,65.958,8.481,65.958,8.481c12.858,4.888,19.7,36.493,8.245,49.778S41.053,73.882,28.857,72.778,0,79,0,79c1.013-.757,3.661-4.761,6.184-8.3C11.359,63.449,10.5,52.673,10.306,52.037ZM48,37c1.839-1.616-6.222,5.853-17,16-5.62,5.29-11.85,11-18,17M40,31s-3.111-7.8-5-13M31,37L23,26M20,53l-2-4M32,62l11,3m1-18,18,4")

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
    
    dragHandler(svg.selectAll("svg"));
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

        d3.selectAll("svg").raise()
}

function prova(){
    d3.select("body").append("svg")
        .attr("width", 700)
        .attr("height", 700)
        .attr("style", "background-color:skyblue")

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