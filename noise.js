'use strict'; 

/*
helper methods
*/


const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));

//gives cartesian product of input lists
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

//dot product of two javascript arrays
const dotProduct = (xs, ys) => {
        const sum = xs => xs ? xs.reduce((a, b) => a + b, 0) : undefined;
 
        return xs.length === ys.length ? (
            sum(zipWith((a, b) => a * b, xs, ys))
        ) : undefined;
    }
 

// zip function as in python zip
const zipWith = (f, xs, ys) => {
    const ny = ys.length;
    return (xs.length <= ny ? xs : xs.slice(0, ny))
        .map((x, i) => f(x, ys[i]));
}

//linear interpolation
const lerp=(t, a, b)=> a+(b-a)*t

//perlin's improved smooth step function
const smoothStep=(t)=> t * t * t * (t * (t * 6 - 15) + 10);



/*
dim:Dimension number of vectors in the grid

This object behaves like a grid consisting of dim dimensional vectors
random vectors generated when needed. 
*/
class Grid{

	constructor(dim){
		this.dim = dim;
		this.grid={}
	}

	/*
	method to get random gradient vector in the location.

	key is a list representing sampling point

	get([1,2]) will give a random gradient vector in the position (1,2)
	*/
	get(key){
		if ( !(key in this.grid) ){
			//if gradient is not calculated for the given key before, generate it and put it to grid
			var point=[]
			Array.from({length: this.dim}, (x,i) => point.push( Math.random()*2-1 ));
			
			var sum=0
			for(var i=0; i<point.length; i++){
				sum+=Math.pow(point[i],2)
			}

			var sqrt=Math.sqrt(sum)
			for(var i=0; i<point.length; i++){
				point[i]/=sqrt
			}

			this.grid[key]=point
		}

		return this.grid[key]
	}
}


/*
perlin noise sampler.

dim: number of dimensions you want to sample from
*/

class Perlin{
	constructor(dim ,octaves=1){
		this.dim = dim;
		this.octaves=octaves
		this.grid= new Grid(this.dim)
		this.scaleFactor=2 * Math.pow(this.dim, -0.5)
	}

	/*
	main perlin function.
	calculates perlin noise for the given point
	dimension number of point must be equal to dimension number you give to constructor
	*/
	sample(point){

		//calculate corners of the grid cell that the point falls into
		var gridCorners=[]
		for (const dim of point){
    		const min_=Math.floor(dim);
    		const max_=min_+1
    		gridCorners.push([min_,max_])
		} 
		//cartesian(...grid_corners) produces each point' coordinates of the grid cell
		var dots=[]
		for(const gridCoords of cartesian(...gridCorners)){
			//get gradient vector from grid
			var gradient=this.grid.get(gridCoords)

			//calculate offset vector by subtracting grid point from the point we sample
			var offset=[]
			for(var i=0; i<point.length; i++){
				offset.push(point[i]-gridCoords[i])
			}
			//console.log(dotProduct(gradient,offset))

			//save results of dot product to an array
			dots.push(dotProduct(gradient,offset))
			
		}

		/*
		cartesian function produces results in a way that şast dimension of the lists fluctuate the most like
		[0,0,0] first element of first four lists is same and first element of last four lists is same
		[0,0,1]  
		[0,1,0]
		[0,1,1] for second element it changes once per two lists
		[1,0,0]	
		[1,0,1] last element changes in each list 0->1->0->1...
		[1,1,0]
		[1,1,1]


		hence we can interpolate wrt to first dimension by splitting list into two and zip them 
		and then linear interpolate each points that corresponds to each other.

		We do this process for each dimension once.Hence we can say that this while loops for dim times.
		*/ 
		var dim=-1
		while (dots.length!=1){
			dim+=1
			const half=(dots.length)/2
			const s=smoothStep(point[dim]-Math.floor(point[dim]) )

			let new_dots=[]
			for(const x of zipWith((x,y)=>[x,y], dots.slice(0,half), dots.slice(half) )){
				new_dots.push(lerp(s, x[0], x[1]))
			}
			dots=new_dots

		}
		//return interpolated result
		return dots[0]*this.scaleFactor
	}

	call(point){

		var ret=0

		//if there are octaves apply them
		for(var i=0; i<this.octaves; i++){
			const frequency = 1 << i
			var scaledPoint=[]
			for(const dim of point){
				scaledPoint.push(dim*frequency)
			}
			ret+=this.sample(scaledPoint) / frequency
		}

		ret /= 2 - Math.pow(2 ,(1 - this.octaves))
		return ret
	}
}
module.exports=Perlin
/*
}
for(var i=0; i<100; i++){
	for(var j=0; j<100; j++){
		//console.log(i/50 +', ' +j/50+ ', '+p.sample([i/50,j/50]))
		arr[i][j]=p.call([i/20,j/20])
	}
}

console.log(JSON.stringify(arr))

*/