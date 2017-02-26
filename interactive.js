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




        
        var width = window.innerWidth,
            height = window.innerHeight; 

console.log(window.innerWidth)


        if(width > 800) width = 800 ;


        
//        var x = d3.scale.linear()
//            .range([0,width])
//        
//        var x2 = d3.scale.linear()
//            .range([0,100])
//        
//        var xPos = 0, 
//            yPos = 80;
//        
//        var dropSize = 0;

        d3.select("#contribution")
            .style("width", width + "px")
        
       
        
        var svg = d3.select("#contribution")
            .append("svg")
            .attr("width",width - 20)
            .attr("height", 200)
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
            
            
          
               
//            d3.select("#contribution")
//                .style("height", "270px")
//            
//            x.domain([0,damsTotal[0].FSC]);
            
            
            var rain = [
                {   country: "South Africa", 
                    rain: 495,
                    worldAverage: 1157
                }
              
            ]
                
//            x2.domain([0,rain[0].worldAverage]);
            
            
            
            
            // ADD INITIAL DROPLETS
            var worldRain = svg.append("g")
                .attr("class", "drop")
                .attr("transform", "translate(" + (width/2 - 150) + ",40) scale (0.3)")
                .append("path")
                .attr("class","bigdroplet")
                .attr({d: drop})
                .style("fill","#9698D1")
                .style("opacity", 0.5)
//            
            var saRain = svg.append("g")
                .attr("class", "drop")
                .attr("transform", "translate(" + (width/2 - 150) + ",40) scale (0.3)")
                .append("path")
                .attr("class","bigdroplet")
                .attr({d: drop})
                .style("fill","cornflowerblue")
                .style("opacity", 0.5)
//                
            saRain.transition()
                    .duration(1000)
                    .attr("transform", "translate(" + (width/2 -60) + ",-30) scale (0.3)") 
                    .style("stroke-width",2)
                    .style("stroke", "#fff")
            
//            var saAvText = svg.append("foreignObject")
//                    .style("visibility","hidden")
//                    .attr("x", width/2 + 160)
//                    .attr("y", height/5 - 40)
//                    .html("<div class='worldav sa head'>In comparison South Africa receives an average of " + rain[0].rain + "mm of rain per year. This is just 43% the typical rainfall of most other countries. </div>")
//                    .transition()
//                    .duration(1000)
//                    .delay(1000)
//                    .style("visibility", "visible")
            
            // END ADD INITIAL DROPLETS
            
//            var format = d3.format(',');
//            var average = format(rain[0].worldAverage);
//            
//            
//            var worldAvText = svg.append("foreignObject")
//                .attr("x", width/2 - 280)
//                .attr("y", height/5)
//                .html("<div class='worldav head'>The average rainfall per year globally is " + format(rain[0].worldAverage) + "mm</div>")
            
            
//            var restart = svg.append("foreignObject")
//                .html("<div class='back'><div class='restart'>Restart</div> <i class='fa fa-refresh' aria-hidden='true'></i></div>")
//                
//                .attr("x", 0)
//                .attr("y",270 + yPos/2 + 20)
//                .on("click", restartint)
//                .style("visibility","hidden")
            }
     
        
     queue()
            .defer(d3.csv, 'data/all_dams.csv')
            .defer(d3.csv, 'data/provinces.csv')
//            .defer(d3.csv, 'provincial_contribution.csv')
            .defer(d3.csv, 'data/all_dams_size.csv')
            .defer(d3.csv, 'data/all_dams_alpha.csv')
            
            .await(main);
        
    

//function restartint() { 
//    
//        console.log("restart");
//    
//        d3.select(".main-svg g")
//        .remove();
//    
////    d3.select(".main-svg")
////        .style("display","none")
//    
//    svg = d3.select(".main-svg")
//            .append("g")
//    
//    queue()
//            .defer(d3.csv, 'data/all_dams.csv')
//            .defer(d3.csv, 'data/provinces.csv')
////            .defer(d3.csv, 'provincial_contribution.csv')
//            .defer(d3.csv, 'data/all_dams_size.csv')
//            .defer(d3.csv, 'data/all_dams_alpha.csv')
//            
//            .await(main);
//    }


  