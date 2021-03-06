const canvas_width  = window.innerWidth
const canvas_height = window.innerHeight

function get_center_coordinate(name, coordinate){
    var p = d3.select(`#${name}`);
    var c = parseInt(p.attr(coordinate)) + (parseInt(p.attr("width") / 2))

    if(coordinate == "x")
        return c - 20
    if(coordinate == "y")
        return c - 35
    return c
}

function get_coordinate(name, coordinate){
    var p = d3.select(`#${name}`);
    var c = parseInt(p.attr(coordinate))
    return c
}
function move_koi(){
    var mid_leaf1 = "leaf" + sequences[current_sequence][1]
    var mid_leaf2 = "leaf" + sequences[current_sequence][2]
    var new_leaf = "leaf" + sequences[current_sequence][3]

    new_x1 = get_center_coordinate(mid_leaf1, "x") 
    new_y1 = get_center_coordinate(mid_leaf1, "y")
    new_x2 = get_center_coordinate(mid_leaf2, "x")
    new_y2 = get_center_coordinate(mid_leaf2, "y")
    new_x3 = get_center_coordinate(new_leaf, "x")
    new_y3 = get_center_coordinate(new_leaf, "y")
    
    koi = d3.select("#koi")
    koi_w = parseInt(koi.attr("width"))/2
    koi_h = parseInt(koi.attr("height"))/2
    koi_x = parseInt(koi.attr("x")) + koi_w
    koi_y = parseInt(koi.attr("y"))

    angle1 = get_angle(koi_x, koi_y, new_x1, new_y1);
    angle2 = get_angle(new_x1, new_y1, new_x2, new_y2);
    angle3 = get_angle(new_x2,new_y2,new_x3,new_y3);

    rotation1 = d3.transform().rotate(angle1,20,20);
    rotation2 = d3.transform().rotate(angle2,20,20);
    rotation3 = d3.transform().rotate(angle3,20,20);

    koi.selectAll("path")
    .transition()
        .duration(500)
        .delay(200)
        .attr("transform", rotation1)
        .on("end", function(){
            koi.transition()
                .duration(750)
                .attr("x",new_x1)
                .attr("y",new_y1)
                .on("end", function(){
                    koi.selectAll("path")
                        .transition()
                        .duration(300)
                        .attr("transform", rotation2)
                        .on("end", function(){
                            koi.transition()
                        .duration(750)
                        .attr("x",new_x2)
                        .attr("y",new_y2)
                        .on("end", function(){
                            koi.selectAll("path")
                                .transition()
                                .duration(300)
                                .attr("transform", rotation3)
                                .on("end", function(){
                                    koi.transition()
                                    .duration(750)
                                    .attr("x",new_x3)
                                    .attr("y",new_y3)
                                    .on("end", function(){
                                        koi.selectAll("path")
                                        .transition()
                                        .duration(300)
                                        .attr("transform", "")
                                    })
                                })
                        })
                    })
                })
        })
    

    
    if(current_sequence == sequences.length-1){
        current_sequence=0;
    }else{
        current_sequence++;
    }
}

function get_angle(x, y, x1, y1) {
    var dy = y1 - y;
    var dx = x - x1;
    var angle = Math.atan2(dy, dx);
    if (angle < 0) {
        res = Math.abs(angle);
    }
    else {
        res = 2 * Math.PI - angle;
    }
    return res * 180 / Math.PI - 90;
}

function create_leaves(dataset) {
    var svg = d3.select("svg");

    var x_scale = d3.scaleLinear()
    x_scale.domain([0,1])
    x_scale.range([0, canvas_width - dataset[0].w ])

    var y_scale = d3.scaleLinear()
    y_scale.domain([0,1])
    y_scale.range([0, svg.attr("height") - dataset[0].w ])
    
    svg.selectAll(".leaf")
        .data(dataset)
        .enter()
        .append("g")
        .attr("class", "leaf")
        .append("svg")
        .attr("id", function(d) { return d.id })
        .attr("x", function() { return parseInt(x_scale(Math.random()))} )
        .attr("y", function() { return parseInt(y_scale(Math.random()))} )
        .attr("width", function(d) { return d.w})
        .attr("height", function(d) { return d.w})

        d3.xml('data/svg/leaf.svg')
        .then(data => {
            svg.selectAll(".leaf").select("svg").nodes().forEach(n => {
                n.append(data.documentElement.cloneNode(true))
            })

        })

    var dragHandler = d3.drag()
        .on("start", function () {
            var current = d3.select(this);
            deltaX = current.attr("x") - d3.event.x;
            deltaY = current.attr("y") - d3.event.y;

            var current_leaf = "leaf" + sequences[current_sequence][0]

            if(d3.select(this).attr("id") == current_leaf){
                move_koi()
            }
        })
        .on("drag", function () {
            var x = d3.event.x + deltaX
            var y = d3.event.y + deltaY
            var w = parseFloat(d3.select(this).attr("width"));
            var width = canvas_width
            var height = canvas_height

            //Constraint the leaves to the canvas
            if(x < 0){
                x = 0
            }else if(x + w > width){
                x = width - w + leaf_padding_x
            }

            if(y < 0){
                y = 0
            }else if(y + w > height){
                y = height - w + leaf_padding_y
            }

            d3.select(this)
                .attr("x", x)
                .attr("y", y);
        });
    
    //Add the drag and drop handler to all leaves
    dragHandler(svg.selectAll("svg"));
}

function create_koi(pesce){
    var svg = d3.select("svg");
    
    svg.selectAll("koi")
        .data(pesce)
        .enter()
        .append("svg")
        .attr("id", "koi")
        .attr("x", function(d) { 
            return get_center_coordinate(d.start, "x")
        })
        .attr("y", function(d) { 
            return get_center_coordinate(d.start, "y")
        })
        .attr("frame", "koi1")
        .attr("width", function(d) { return d.w})
        .attr("height", function(d) { return d.h})
        .attr("class", "koi")

        //Load both the SVGs needed to animate the koi
        Promise.all([
            d3.xml('data/svg/koi 1.svg'),
            d3.xml('data/svg/koi 2.svg')
          ])
        .then(([koi1, koi2]) => {
            var koi = d3.select(".koi")
            koi.node().append(koi1.documentElement)
            koi.node().append(koi2.documentElement)

            d3.select("#koi1").attr("visibility", "visible")
            d3.select("#koi2").attr("visibility", "hidden")
        })

        d3.selectAll(".leaf").raise()
}

function animateKoi(){
    var koi1 = d3.select("#koi1")
    var koi2 = d3.select("#koi2")

    if(koi1.attr("visibility") == "visible"){
        koi1.attr("visibility","hidden")
        koi2.attr("visibility", "visible")
    }
    else {
        koi2.attr("visibility","hidden")
        koi1.attr("visibility", "visible")
    }
}

function play(){
    //Create an svg canvas
    d3.select("body").append("svg")
        .attr("width", canvas_width)
        .attr("height", canvas_height)
        .attr("style", "background-color:skyblue")

    d3.json("data/koi.json")
        .then(function(pesce){
            sequences = pesce.koi[0].sequences
            current_sequence = 0
            //Create and draw the leaves
            create_leaves(pesce.leaves)
            //Create and draw the koi
            create_koi(pesce.koi)

            //Change koi's sprite to animate It
            setInterval(function () {
                animateKoi()
            }, 150);
        })
}