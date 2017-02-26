//
//        var colors = ["#b9b6cb","#abd8bc","#e5a2af","#9dd0dc",
//"#e6b8a6",
//"#aebce5",
//"#cac4a1",
//"#dbb7e0",
//"#e1e8d0",
//"#ebb9c7",
//"#e1daec",
//"#d9c0c7"];

var drop = "m 497.87826,293.90363 c 0,105.89487 -88.34119,191.83854 -197.19031,191.83854 -108.84913,0 -199.2041,-85.9628 -197.19019,-191.83854 2.67579,-142.01919 111.08619,-199.86616 197.19019,-363.09457 91.45593,157.87668 197.19031,257.19971 197.19031,363.09457 z";

var colors = ["#93d8a5",
"#e9acd3",
"#64dcd8",
"#eead84",
"#8ad1e9",
"#c4c381",
"#b6bde5",
"#e0ebaa",
"#dfc3b3",
"#b2d5c3"];




        
        var width = 800,
            height = 300; 
        
        var x = d3.scale.linear()
            .range([0,800])
        
        var x2 = d3.scale.linear()
            .range([0,100])
        
        var xPos = 0, 
            yPos = 80;
        
        var dropSize = 0;
        
        var svg = d3.select("#contribution")
            .append("svg")
            .attr("width",800)
            .attr("height", 400)
            .attr("class","main-svg")
            .append("g")

        

        function main(error, dams, provinces, dams_by_size, dams_by_alpha) { 
            
            
            
            provinces.forEach( function (d) { 
                d.fsc = +d.fsc;
            })
            
            var provincesNoTotal = provinces.filter( function (d) { return d.province !== "Total"; })
            
            
            
            dams.forEach( function (d) { 
                d.FSC = +d.FSC;
            })
           
            var damsTotal = dams.filter( function (d) { return d.Dam == "Total"; })
            
            var damsNoTotal = dams.filter( function (d) { return d.Dam !== "Total"; })
            
            
          
               
            d3.select("#contribution")
                .style("height", "270px")
            
            x.domain([0,damsTotal[0].FSC]);
            
            
            var rain = [
                {   country: "South Africa", 
                    rain: 495,
                    worldAverage: 1157
                }
              
            ]
                
            x2.domain([0,rain[0].worldAverage]);
            
            
            
            // ADD SOUTH AFRICA RAIN AVERAGE 
            
            
//            
//            var rainfall = svg.append("circle")
//                .attr("r", x2(rain[0].worldAverage)) 
//                .attr("cx", width/2 - 5)
//                .attr("cy", 110)
//                .style("fill", "cornflowerblue")
//            
//            var rainfallSa = svg.append("circle")
//                .attr("r", 110) 
//                .attr("cx", width/2 - 5)
//                .attr("cy", 110)
//                .style("fill", "cornflowerblue")
//                .style("stroke","#fff")
//                .style("stroke-width",2)
            
            // DROPLETS
            var worldRain = svg.append("g")
                .attr("class", "drop")
                .attr("transform", "translate(" + (width/2 - 150) + ",40) scale (0.5)")
                .append("path")
                .attr("class","bigdroplet")
                .attr({d: drop})
                .style("fill","#9698D1")
                .style("opacity", 0.5)
            
            var saRain = svg.append("g")
                .attr("class", "drop")
                .attr("transform", "translate(" + (width/2 - 150) + ",40) scale (0.5)")
                .append("path")
                .attr("class","bigdroplet")
                .attr({d: drop})
                .style("fill","cornflowerblue")
                .style("opacity", 0.5)
            
//            .attr("transform", "translate(" + (width/2 + 30) + ",40) scale (0.25)")
                
//            svg.append("line")
//                .attr("x1", width/2 + 90)
//                .attr("x2", width/2 + 150)
//                .attr("y1", height/3 - 50)
//                .attr("y2", height/3 - 80)
//                .style("stroke", "gray")
//                .style("stroke-width", 1)
            
            var format = d3.format(',');
            var average = format(rain[0].worldAverage);
            
            
//            var worldAvText = svg.append("foreignObject")
//                .attr("x", width/2 - 280)
//                .attr("y", height/5)
//                .html("<div class='worldav head'>The average rainfall per year globally is " + format(rain[0].worldAverage) + "mm</div>")
            
            
            var restart = svg.append("foreignObject")
                .html("<div class='back'><div class='restart'>Restart</div> <i class='fa fa-refresh' aria-hidden='true'></i></div>")
                
                .attr("x", 0)
                .attr("y",270 + yPos/2 + 20)
                .on("click", restartint)
                .style("visibility","hidden")
            
            var forward = svg.append("foreignObject")
                .html("<div class='forward'><div class='next'>Next</div> <i class='fa fa-arrow-circle-right' aria-hidden='true'></i></div>")
                .style("text-anchor", "middle")
                .attr("x", 670)
                .attr("y",190 + yPos/2)
            
            
            
            var forward2 = svg.append("foreignObject")
                .html("<div class='forward2'><div class='next'>Next</div><i class='fa fa-arrow-circle-right' aria-hidden='true'></i></div>")
                .style("text-anchor", "middle")
                .attr("x", 670)
                .attr("y",190 + yPos/2)
            
            var forward3 = svg.append("foreignObject")
                .html("<div class='forward3'><div class='next'>Next</div><i class='fa fa-arrow-circle-right' aria-hidden='true'></i></div>")
                .style("text-anchor", "middle")
                .attr("x", 670)
                .attr("y",270 + yPos/2 + 20)
            
            var forward4 = svg.append("foreignObject")
                .html("<div class='forward4'><div class='next'>Next</div><i class='fa fa-arrow-circle-right' aria-hidden='true'></i></div>")
                .style("text-anchor", "middle")
                .attr("x", 670)
                .attr("y",270 + yPos/2 + 20)
               
            
            var horizBlocks = 35,
                    blockHeight = blockWidth = width/horizBlocks;
            
            function next0() {  // SHOW SA RAINFALL COMPARISON
                
            
                
                saRain  
                    .transition()
                    .duration(1000)
                    .attr("transform", "translate(" + (width/2 -60) + ",-30) scale (0.50)") 
                    .style("stroke-width",2)
                    .style("stroke", "#fff")
                
                var saAvText = svg.append("foreignObject")
                    .style("visibility","hidden")
                    .attr("x", width/2 + 160)
                    .attr("y", height/5 - 40)
                    .html("<div class='worldav sa head'>In comparison South Africa receives an average of " + rain[0].rain + "mm of rain per year. This is just 43% the typical rainfall of most other countries. </div>")
                    .transition()
                    .duration(1000)
                    .delay(1000)
                    .style("visibility", "visible")
                    
                
                d3.select(".forward")
                    .style("visibility","hidden")
                
                d3.select(".forward2")
                    .transition()
                    .delay(500)
                    .duration(500)
                    .style("visibility","visible")
                 
                    
                    
            }
            
            function next1 () {  // show all dams as uniform sizes
                
                d3.select("#contribution")
                    .transition()
                    .duration(1000)
                    .style("height", "340px")
                
                worldAvText.remove()
                d3.select(".worldav.sa").remove()
                
                worldRain.remove()
                
                saRain.transition()
                    .duration(0)
                    .remove().each("end", addDams)
                
                d3.select(".forward2")
                    .style("visibility","hidden")
                
                d3.select(".forward3")
                    .transition()
                    .delay(500)
                    .duration(500)
                    .style("visibility","visible")
                    

                
                dams_alpha_no_total = dams_by_alpha.filter( function (d) { return d.Dam !== "Total"; })
                
                
                dams_alpha_no_total.forEach( function (d) { 
                    d.rowc = + d.rowc;
                   
                    d.Dam = (d.Dam).replace("Dam","");
                    
                    
                })
                
                damsNoTotal.forEach(function (d,i) { 
                    d.rowc = +d.rowc;
                    d.Dam = (d.Dam).replace("Dam","");
                                    
                    })
                
            
                
                function addDams() { 
                
                
                var text1 = svg.append("foreignObject")
                    .attr("x", 0)
                    .attr("y",0)
                    .html("<div class='worldav dams'><div class='head'>SA's 210 Storage Dams</div>Capturing and storing what little rain South Africa does receive is key in the country's water management strategy. To this end there are 210 listed storage dams that make up a total potential storage of " + format(damsTotal[0].FSC) + " million cubic meters.</div>")
                    
               
                
                    
                var selection = svg.selectAll(".droplet")
                
                
                
                var dropSize = 21,
                    yPos = 100,
                    xCount = -1;

//                console.log(dams_alpha_no_total);        
            
                svg.selectAll("g.droplet") 
                    .data(dams_alpha_no_total)
                    .enter()
                    .append("g")
                    .attr("class", "drops")
                    .attr("transform", function(d, i){
            //            return 'translate('+[Math.random()*300, Math.random()*300]+') scale(0.12)';
//                        xCount += 1;
//                        if(xCount == 35) { xCount = 0; yPos += 30; }
                        return "translate(" + [d.xpos * dropSize, d.rowc*30 + yPos] + ") scale (0.05)"
                      })
                    .on("mouseover", function (d) { 

                        
                        var position = d3.select(this).attr("transform");
                        var split = position.split(",");
                        var toolx = ~~split [0].split("(")[1];
                        var tooly = ~~split [1].split(")")[0];
                        

                            var tip = "<div style='font-weight: 700; text-transform:uppercase;'>" + d.Dam + "</div>";

                            tip += format(d.FSC) + " million m<sup>3</sup>";

                            tooltip.style("visibility","visible")
                                .style("x", toolx + 30)
                                .style("y", tooly)
    //                            .attr("x", 100)
    //                            .attr("y", yPos)
    //                    .style("background",contColors[i])
                           

                        d3.select(".tip")
                            .html(tip)
                        })
                        .on("mouseout", function () { 
                            return tooltip.style("visibility","hidden")
                        })
                        .on("mousemove", function (d,i) { 

    //                        tooltip.style("x", d3.mouse(this)[0] + ttoffsetx)
    //                            .style("y", d3.mouse(this)[1] + ttoffsety)
//                           tooltip.style("x", d3.mouse(this)[0] + ttoffsetx)
//                                .style("y", d3.mouse(this)[1] + ttoffsety)

                        })
                    
                    .append("path")
                    .attr("class","droplet")
                    .attr({d: drop})
                    .style("fill","dodgerblue")
                    .style("opacity", 0)
                    .transition()
                    .duration(2000)
                    .style("opacity", 1)
                    
                    
    
                
                }
                
                
                        
                
            }
            
            var nexttwo = function ()  {  // DAMS BY PROVINCE
                
                
                
                
                svg.selectAll(".droplet")
                    .data(damsNoTotal)
                    .on("mouseover", function (d) { 
                        var tip = "<div class='tooltip' style='font-weight: 700; text-transform:uppercase;'>" + d.Province + "<br/><span style='text-transform:none;'>" + d.Dam + "</span></div>";
                        
                        tip += format(d.FSC) + " million m<sup>3</sup>";
                
                        
                        
                        tooltip.style("visibility","visible")
                            .html(tip)
//                    .style("background",contColors[i])
               
                    
                    
                    })
                    .on("mouseout", function () { 
                        return tooltip.style("visibility","hidden")
                    })
                    .on("mousemove", function (d,i) { 
               
//                        tooltip.style("x", d3.mouse(this)[0] + ttoffsetx)
//                            .style("y", d3.mouse(this)[1] + ttoffsety)
                    
                    })
                    .transition()
                    .duration( function (d,i) { 
                        return i * 10; 
                    })
                    .style("fill", function (d)  { 
                        return colors[d.Province_Index];
                    })
                    
                    
                    
                
                svg.select(".forward3")
                    .style("visibility","hidden")
                
                svg.select(".forward4")
                    .style("visibility","visible")
                
                
                
                d3.selectAll(".worldav")
                    .html("<div class='worldav dams'><div class='head'>Provinces and Dams</div>The majority of South Africa's dams are located in the Eastern and Western Cape (86 of the 210 dams). North West, Limpopo and Mpumalanga each have more than 20 dams. </div>")
                
                svg.selectAll(".legend")
                    .data(provinces)
                    .enter()
                    .append("rect") 
                    .attr("x", function (d,i) { 
                        return i * 50;
                    })
                    .attr("y",250 + yPos/2 )
                    .style("fill", function (d) { 
                        return colors[d.index];
                    })
                    .attr("width", 10)
                    .attr("height", 10)
                    .append("text")
                    
                svg.selectAll(".textlegend") 
                    .data(provinces)
                    .enter()
                    .append("text")
                    .attr("x", function (d,i) { 
                        return i * 50 + 15;
                    })
                    .attr("y",250 + yPos/2 + 8 )
                    .text( function (d) { 
                        return d.province_code;
                    })
                    .style("stroke", "none")
                    .style("fill","gray")
                    .attr("class","legendtext")
                    
                    
            
                
            }
            
            var nextthree = function () {  // Dams by size
                
                svg.select(".back")
                    .style("visibility","visible")
                
                svg.select(".forward4")
                    .style("visibility","hidden")
                
                dams_by_size.forEach( function (d) { 
                    d.rowc = +d.rowc; 
                    d.xpos = +d.xpos;
                })
//                console.log(dams_by_size);
                
                d3.selectAll(".worldav.dams")
                    .html("<div class='worldav dams'><div class='head'>Major Contribution</div>Five of SA's largest ten dams are in the Free State</div>")
                
                svg.selectAll(".droplet")
                    .data(dams_by_size)
                    .transition()
                    .duration( function (d,i) { 
                        return i * 10; 
                    })
                    .style("opacity", 0)
                    .transition()
                    .delay( function (d,i) { 
                        return i * 10;
                    })
                    .duration(1000)
                    .attr("x", function (d) {
                        
                        return d.xpos * blockWidth;
                    })
                    .attr("y", function (d) { 
                        return d.rowc*blockHeight + yPos;
                    })
                    .style("fill", function (d)  { 
                        return colors[d.Province_Index];
                    })
                    .style("opacity",1)
                
                
                var dropSize = 21,
                    yPos = 100,
                    xCount = -1;
//                function lines() { 
                    
                    svg.append("line")
                    .attr("x1", 0)
                    .attr("x2", function () { 
                        return 10 * dropSize;
                    })
                    .attr("y1", 75)
                    .attr("y2", 75)
                    .style("stroke", "gray")
                    .style("stroke-width", 1)   
                    .style("shape-rendering", "crispEdges")
                
                    
                    svg.append("line")
                    .attr("x1", 0)
                    .attr("x2", 0)
                    .attr("y1", 75)
                    .attr("y2", 85)
                    .style("stroke", "gray")
                    .style("stroke-width", 1)   
                    .style("shape-rendering", "crispEdges")
                    
                    svg.append("line")
                    .attr("x1", function () { 
                        return 10 * dropSize;
                    })
                    .attr("x2", function () { 
                        return 10 * dropSize;
                    })
                    .attr("y1", 75)
                    .attr("y2", 85)
                    .style("stroke", "gray")
                    .style("stroke-width", 1)   
                    .style("shape-rendering", "crispEdges")
                    
                    svg.append("line")
                    .attr("x1", function () { 
                        return 5 * dropSize + (dropSize/2);
                    })
                    .attr("x2", function () { 
                        return 5 * dropSize + (dropSize/2);
                    })
                    .attr("y1", 65)
                    .attr("y2", 75)
                    .style("stroke", "gray")
                    .style("stroke-width", 1)   
                    .style("shape-rendering", "crispEdges")
                    
                    svg.append("text")
                        .attr("x", function (d) { 
                            return 3 * dropSize;
                        })
                        .attr("y", 60)
                        .text("These ten dams account for 64% of South Africa's total water storage capacity")
                        .attr("class", "legendtext")
                        .style("stroke","none")
                        .style("fill", "gray")
                    .style("shape-rendering", "crispEdges")
                    
                    
//                }
                
            }
            

            
            var tooltip = svg.append("foreignObject")
            .html("<div class='tooltip'><div class='tip'></div></div>")
        
            tooltip.style("visibility","hidden")
                
        
            var ttoffsety = 10,
                ttoffsetx = 10;
            
//            initial(); 
            
            
            forward.on("click", next0)
            
            forward2.on("click", next1)
            
            forward3.on("click", nexttwo)
            
            forward4.on("click", nextthree)
                
            
        
    
                
                
        }
        

     
        
     queue()
            .defer(d3.csv, 'data/all_dams.csv')
            .defer(d3.csv, 'data/provinces.csv')
//            .defer(d3.csv, 'provincial_contribution.csv')
            .defer(d3.csv, 'data/all_dams_size.csv')
            .defer(d3.csv, 'data/all_dams_alpha.csv')
            
            .await(main);
        
    

function restartint() { 
    
        console.log("restart");
    
        d3.select(".main-svg g")
        .remove();
    
//    d3.select(".main-svg")
//        .style("display","none")
    
    svg = d3.select(".main-svg")
            .append("g")
    
    queue()
            .defer(d3.csv, 'data/all_dams.csv')
            .defer(d3.csv, 'data/provinces.csv')
//            .defer(d3.csv, 'provincial_contribution.csv')
            .defer(d3.csv, 'data/all_dams_size.csv')
            .defer(d3.csv, 'data/all_dams_alpha.csv')
            
            .await(main);
    }


  