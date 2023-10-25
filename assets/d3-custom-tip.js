d3.helper = {};

d3.helper.d3tooltip = function(accessor){
    return function(selection){
        var d3tooltipDiv;
        var bodyNode = d3.select('body').node();
        selection.on("mouseover", function(d, i){
            // Clean up lost d3tooltips
            d3.select('body').selectAll('div.d3tooltip').remove();
            // Append d3tooltip
			// console.log("meme");
            d3tooltipDiv = d3.select('body').append('div').attr('class', 'd3tooltip');
            var absoluteMousePos = d3.mouse(bodyNode);
            d3tooltipDiv.style('left', (absoluteMousePos[0] + 10)+'px')
                .style('top', (absoluteMousePos[1] - 15)+'px')
                .style('position', 'absolute') 
                .style('z-index', 1001);
            // Add text using the accessor function
            var d3tooltipText = accessor(d, i) || '';
            // Crop text arbitrarily
            //d3tooltipDiv.style('width', function(d, i){return (d3tooltipText.length > 80) ? '300px' : null;})
            //    .html(d3tooltipText);
        })
        .on('mousemove', function(d, i) {
            // Move d3tooltip
            var absoluteMousePos = d3.mouse(bodyNode);
            d3tooltipDiv.style('left', (absoluteMousePos[0] + 10)+'px')
                .style('top', (absoluteMousePos[1] - 15)+'px');
            var d3tooltipText = accessor(d, i) || '';
            if (d3tooltipText.length) {
				// console.log("[" + d3tooltipText + "]");
				d3tooltipDiv.html(d3tooltipText);
			}
        })
        .on("mouseout", function(d, i){
            // Remove d3tooltip
            d3tooltipDiv.remove();
        });

    };
};