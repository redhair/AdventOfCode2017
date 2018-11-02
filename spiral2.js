/*
--- Part Two ---

As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.

So, the first few squares' values are chosen as follows:

Square 1 starts with the value 1.
Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.
Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:

147  142  133  122   59
304    5    4    2   57
330   10    1    1   54
351   11   23   25   26
362  747  806--->   ...
What is the first value written that is larger than your puzzle input?
*/

(function(){
	'use strict';

	var context={};

	_init();
	function _init(){
		context.input=325489;
		context.spiral=createArray(10, 10);
		generateSpiral(context);
	}

	function generateSpiral(context){
		var direction=1;
		var directionChange=0;
		var layer=0;
		var moves=0;
		var i=0;
		var j=0;
		while(i<9){
			console.log("in the while -- i: "+i+" | j: "+j);
			handlePosition(i, j);
			//direction determines which counter iterates
			if(direction===1){
				console.log("moving one space right")
				j++;
			}
			if(direction===2){
				console.log("moving one space up")
				i++;
			}
			if(direction===3){
				console.log("moving one space left")
				j--;
			}
			if(direction===4){
				console.log("moving one space down")
				i--;
			}
			//moves determines when the direction switches
			//the moves variable should double every 2*layer moves
			if(moves===2*layer){
				if(direction===4){
					direction=1;
				}else{
					console.log("switching direction");
					direction++;
				}
			}
			//layer++ every 2 direction moves
			if(direction===2 || direction===4){
				console.log("increasing layer")
				layer++;
			}
			console.log("increasing moves")
			moves++;
			console.log("current spiral: "+context.spiral)
		}
		//console.log(spiral);
	}

	function getAdjacentSum(i, j){
		var sum=0;
		if(i===0 && j===0){
			return 1;
		}
		if(i+1<=context.spiral.length-1){
			sum+=context.spiral[i+1][j];
		}
		if(i+1<=context.spiral.length-1&&j+1<=context.spiral[i+1].length-1){
			sum+=context.spiral[i+1][j+1];
		}
		if(i+1<=context.spiral.length-1&&j-1>=context.spiral[i].length-1){
			sum+=context.spiral[i+1][j-1];
		}
		if(j+1<=context.spiral[i].length-1){
			sum+=context.spiral[i][j+1];
		}
		if(j-1>=context.spiral[i].length-1){
			sum+=context.spiral[i][j-1];
		}
		if(i-1>=context.spiral.length-1){
			sum+=context.spiral[i-1][j];
		}
		if(i-1>=context.spiral.length-1&&j-1>=context.spiral[i].length-1){
			sum+=context.spiral[i-1][j-1];
		}
		if(i-1>=context.spiral.length-1&&j+1<=context.spiral[i].length-1){
			sum+=context.spiral[i-1][j+1];
		}
		console.log("returning " + sum +" as the adjacent sum");
		return sum;
	}

	function handlePosition(i, j){
		if(i>=context.spiral.length-1){
			console.log("putting sum at start of spiral");
			context.spiral.unshift([getAdjacentSum(i, j)]);
			return;
		}
		if(i<=context.spiral.length-1){
			console.log("putting sum at end of spiral");
			context.spiral.push([getAdjacentSum(i, j)]);
			return;
		}
		if(j>=context.spiral[i].length-1){
			console.log("putting sum at start of spiral[i]");
			context.spiral[i].unshift(getAdjacentSum(i, j));
			return;
		}
		if(j<=context.spiral[i].length-1){
			console.log("putting sum at end of spiral[i]");
			context.spiral.push(getAdjacentSum(i, j));
			return;
		}
	}

	function createArray(length) {
	    var arr = new Array(length || 0),
	        i = length;

	    if (arguments.length > 1) {
	        var args = Array.prototype.slice.call(arguments, 1);
	        while(i--) arr[length-1 - i] = createArray.apply(this, args);
	    }

	    return arr;
	}

})();