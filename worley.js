'use strict'; 

module.exports=class Worley{
	constructor(options){
		this.numberOfSeedPoints =  options.numberOfSeedPoints || 100;
		this.points=[]
		this.dim=options.dim || 2;
		this.generateRandomPoints()
	} 

	generateRandomPoints(){
		//generate 'dim' dimensional point and normalize it  
		for (var i = this.numberOfSeedPoints - 1; i >= 0; i--) {

			var point=[]
			Array.from({length: this.dim}, (x,i) => point.push( Math.random() ));

			this.points.push(point)			
		}

	}

	call(...args){
		var dists=[]
		for(const p of this.points){
			dists.push(Math.hypot(...(args.map((d,i)=>p[i]-d))))
		}
		return Math.min(...dists)
	}
}