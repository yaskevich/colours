ce = require('colour-extractor')
gm = require('gm')


var fs=require('fs');

// var dir='./old/';
var dir='./png/';
var data={};

fs.readdir(dir,function(err,files){
    if (err) throw err;
    
	files.forEach(function(file){
		 ce.topColours(dir+file, true, function (colors) {
		// ce.colourKey('112.svg.png', function (colors) {
			var a = 0;
			var b = 0;
			var qty = 3;
			var good = [];
			
			if (colors.length < qty) qty = colors.length;
			
			var pal = colors.splice(0,qty);
			
			var first_arr = pal[0][1];
			
			
			// 239,247,239
			
			if (first_arr[0] > 235 && first_arr[1] > 235 && first_arr[2] > 235){
				first_arr = pal[1][1];
			}
			var first = ce.rgb2hex(first_arr);
			console.log(file + "\t" + first + "\t" + pal[0][1]);
			
			// var newfile = file.slice(0, - 4) + '_PLT.png';
			var newfile = file;
			
			gm(64, 64, first).write('./gen/'+ newfile, function(err){
				if (err) return console.dir(arguments)
					
			});
			
			pal.forEach(function(element) {
				var cur = ce.rgb2hex(element[1]).slice(0, - 2);
				// if (element[0] > 0.01) 
					good.push(cur);					
			});
			
			if (good.length < qty){ qty = good.length; }
			
			
			var img = gm(64*qty, 64, "#FEFEFE");
			good.forEach(function(element, key) {
				// console.log(element);
				b = b + 64;
				// console.log(key);
				img
					.fill(element)
					.drawRectangle(a, 0,  b, 64); // "rectangle startpoint in x,startpoint in y endpoint in x,endpoint in y"
					a = a + 64;
			});

			img
			// .drawRectangle(0, 0,  64, 64) // "rectangle startpoint in x,startpoint in y endpoint in x,endpoint in y"
			// .fill("pink")
			.write('./pal/'+ newfile, function(err){
				if (err) return console.dir(arguments)
				// console.log(this.outname + ' created  :: ' + arguments[3])
			});
		});
    });
});


 
 
 
