const koi1 = "M28.958,17.3c-1.453-.248-2.28.269-2.313-2.075a1.772,1.772,0,0,0-1.222-1.684l-0.1.216C24.839,15.88,23.994,21.8,23.994,21.8l-0.062.131a9.738,9.738,0,0,1,.131,5.052c-0.778,2.4-1.257-1.352-1.184-2.144a13.812,13.812,0,0,1,.49-1.973c0.222-.737-0.381.569-0.462,0.7,0,0-2.2,4.052-1.21,6.482s2.942,6.707,1.574,9.258-2.749-2.962-4.909-3.186c-2.09-.6-5.362,4.019-5.716,1.135s3-6.137,4.8-8.028,1.21-6.482,1.21-6.482c-0.029-.149-0.119-1.589-0.179-0.821a13.83,13.83,0,0,1-.255,2.018c-0.218.764-2.015,4.077-1.874,1.554a9.663,9.663,0,0,1,1.942-4.652l-0.01-.145s-2.817-4.817-3.3-6.939l-0.1-.216s-2.941,2.788-4.23,2.51c-2.255-.486-1.6-1.211-1.555-2.709s2.5-2.29,3.833-.957c0.723,0.724.9-.092,1.721-0.156a4.589,4.589,0,0,0-.087-0.788C12.436-.738,20.152,0,20.152,0s7.716-.738,5.589,11.442a4.575,4.575,0,0,0-.087.788c0.822,0.063,4.409.571,4.968,1.432C31.651,15.247,30.41,17.55,28.958,17.3Z"
const koi2 = "M30.789,14.971c-0.759,1.287-.581,2.257-2.764,1.444-1.248-.465-3.2-2.885-3.2-2.885l-0.1.216c-0.487,2.12-3.458,6.893-3.458,6.893l-0.007.145a9.6,9.6,0,0,1,2.061,4.6c0.2,2.517-1.689-.752-1.926-1.511a13.685,13.685,0,0,1-.3-2.01c-0.076-.767-0.137.674-0.163,0.824,0,0-.5,4.6,1.361,6.448s5.315,5.025,5.02,7.913-3.7-1.649-5.794-1.008c-2.175.272-3.451,5.809-4.887,3.291s0.438-6.833,1.389-9.283S16.655,23.6,16.655,23.6c-0.084-.126-0.721-1.418-0.481-0.686a13.659,13.659,0,0,1,.537,1.96c0.09,0.79-.312,4.549-1.149,2.168A9.631,9.631,0,0,1,15.585,22l-0.065-.13s-0.752-6-1.239-8.12l-0.1-.216s-1.955,2.42-3.2,2.885c-2.183.813-2.005-.157-2.764-1.444s0.922-3.292,2.764-2.888a10.751,10.751,0,0,0,2.969.137,4.534,4.534,0,0,0-.088-0.788C11.708-.738,19.5,0,19.5,0s7.792-.738,5.643,11.432a4.534,4.534,0,0,0-.088.788,10.751,10.751,0,0,0,2.969-.137C29.867,11.679,31.548,13.684,30.789,14.971Z"

const canvas_width = window.innerWidth
const canvas_height = window.innerHeight

function get_center_coordinate(name, coordinate){
    var p = d3.select(`#${name}`);
    var c = parseInt(p.attr(coordinate)) + (parseInt(p.attr("width") / 2))

    if(coordinate == "x")
        return c - 20
    if(coordinate == "y")
        return c - 25
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
    koi_x = parseInt(koi.attr("x")) + koi_w
    koi_y = parseInt(koi.attr("y"))

    angle1 = get_angle(koi_x, koi_y, new_x1, new_y1);
    angle2 = get_angle(new_x1, new_y1, new_x2, new_y2);
    angle3 = get_angle(new_x2,new_y2,new_x3,new_y3);

    rotation1 = d3.transform().rotate(angle1,20,20);
    rotation2 = d3.transform().rotate(angle2,20,20);
    rotation3 = d3.transform().rotate(angle3,20,20);

    koi.select("path")
        .transition()
        .duration(300)
        .delay(100)
        .attr("transform", rotation1)
    koi
        .transition()
        .duration(750)
        .delay(400)
        .attr("x",new_x1)
        .attr("y",new_y1)
        .on("end", function(){
            koi.select("path")
                .transition()
                .duration(300)
                .delay(100)
                .attr("transform", rotation2)
                koi
                .transition()
                .duration(750)
                .delay(400)
                .attr("x",new_x2)
                .attr("y",new_y2)
                .on("end", function(){
                    koi.select("path")
                        .transition()
                        .duration(300)
                        .delay(100)
                        .attr("transform", rotation3)
                        koi
                        .transition()
                        .duration(750)
                        .delay(400)
                        .attr("x",new_x3)
                        .attr("y",new_y3)
                        .attr("transform", "")
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
    x_scale.range([0, svg.attr("width") - dataset[0].w])

    var y_scale = d3.scaleLinear()
    y_scale.domain([0,1])
    y_scale.range([0, svg.attr("height") - dataset[0].w])
    
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
    var x = 100
    var y = 100
    console.log("x = " + x)
    console.log("y = " + y)
    svg.selectAll("koi")
        .data(pesce)
        .enter()
        .append("svg")
        .attr("width", function(d) { return d.w})
        .attr("height", function(d) { return d.w})
        .attr("x", function(d) { 
            return get_center_coordinate(d.start, "x")
        })
        .attr("y", function(d) { 
            return get_center_coordinate(d.start, "y")
        })
        .attr("fill", "blue")
        .attr("id", "koi")
        .append("path")
        .attr("class", "koi")
        .attr("fill", "black")
        .attr("d", koi1)

        d3.selectAll(".leaf").raise()
}

function animateKoi(){
    var svg = d3.select("svg");
    if(svg.select("#koi").select("path").attr("d") == koi1){
        svg.select("#koi").select("path").attr("d", koi2)
    }
    else {
        svg.select("#koi").select("path").attr("d", koi1)
    }
}

function play(){
    d3.select("body").append("svg")
        .attr("width", canvas_width)
        .attr("height", canvas_height)
        .attr("style", "background-color:skyblue")

    d3.json("/data/koi.json")
        .then(function(pesce){
            sequences = pesce.koi[0].sequences
            current_sequence = 0
            //Creazione delle foglie trascinabili
            create_leaves(pesce.leaves)
            //Creazione del pesce
            create_koi(pesce.koi)

            setInterval(function () {
                animateKoi()
            }, 150);
        })
    
}