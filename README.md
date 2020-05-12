# noise-js

> n-dimensional perlin noise generator implementation with JavaScript


## Usage
You can generate noise with any number of dimensions. Initialize Perlin object with the number of dimensions 
you want to sample and octave count. Octave count is one as default. Then call 'call' method of the object
with the coordinates. Coordinates dimension number must be same with the one you gave to constructor.
```jsx
var noise=require('n-dimensional-noise')
let p=new noise.Perlin(2,5)

console.log(p.call([0.5,0.5]))
console.log(p.call([0.5,0.81]))

let arr=Array(100).fill().map(() => Array(100).fill(0));
for(var i=0; i<100; i++){
	for(var j=0; j<100; j++){
		//console.log(i/50 +', ' +j/50+ ', '+p.sample([i/50,j/50]))
		arr[i][j]=p.call([i/20,j/20])
	}
}
console.log(JSON.stringify(arr))

```
## Demo
A sampled noise of 500x500 with octave count 5.

![img](https://i.ibb.co/CMY5GTR/noise.jpg)
## License

MIT © [thetarby](https://github.com/thetarby)
