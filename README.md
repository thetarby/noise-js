# noise-js

> n-dimensional perlin noise generator implementation with JavaScript

## Install

```bash
npm i n-dimensional-noise
```

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
		arr[i][j]=p.call([i/20,j/20])
	}
}
console.log(JSON.stringify(arr))

```

If you want to generate worley noise;
```jsx
//dim is the number of dimensions numberOfSeedPoints is the number of sampled points in worley noise. Its default is 100.
let w=new noise.Worley({dim:3, numberOfSeedPoints:1000})


let arr=Array(100).fill().map(() => Array(100).fill().map(() => Array(100).fill(0)));
for(var i=0; i<100; i++){
	for(var j=0; j<100; j++){
		for(var k=0; k<100; k++){
			arr[i][j][k]=w.call(i/100,j/100,k/100)
		}
	}
}
console.log(JSON.stringify(arr))

```

## Demo
A sampled noise of 500x500 with octave count 5.

![img](https://i.ibb.co/CMY5GTR/noise.jpg)

A sampled 3d worley noise as gif. Third dimension is used as time.

![gif](https://i.ibb.co/3NLpDrM/ezgif-com-optimize.gif)

## License

MIT © [thetarby](https://github.com/thetarby)
