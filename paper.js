var keyData = {
    q: {
        sound: new Howl({
          urls: ['sounds/bubbles.mp3']
        }),
        color: '#1abc9c'
    },
    w: {
        sound: new Howl({
          urls: ['sounds/clay.mp3']
        }),
        color: '#2ecc71'
    },
    e: {
        sound: new Howl({
          urls: ['sounds/confetti.mp3']
        }),
        color: '#3498db'
    },
    r: {
        sound: new Howl({
          urls: ['sounds/corona.mp3']
        }),
        color: '#9b59b6'
    },
        t: {
        sound: new Howl({
          urls: ['sounds/dotted-spiral.mp3']
        }),
        color: '#34495e'
    },
    y: {
        sound: new Howl({
          urls: ['sounds/flash-1.mp3']
        }),
        color: '#16a085'
    },
    u: {
        sound: new Howl({
          urls: ['sounds/flash-2.mp3']
        }),
        color: '#27ae60'
    },
    i: {
        sound: new Howl({
          urls: ['sounds/flash-3.mp3']
        }),
        color: '#2980b9'
    },
    o: {
        sound: new Howl({
            urls: ['sounds/glimmer.mp3']
        }),
        color: '#8e44ad'
    },
    p: {
        sound: new Howl({
          urls: ['sounds/moon.mp3']
        }),
        color: '#2c3e50'
    },
    a: {
        sound: new Howl({
          urls: ['sounds/pinwheel.mp3']
        }),
        color: '#f1c40f'
    },
    s: {
        sound: new Howl({
          urls: ['sounds/piston-1.mp3']
        }),
        color: '#e67e22'
    },
        d: {
        sound: new Howl({
          urls: ['sounds/piston-2.mp3']
        }),
        color: '#e74c3c'
    },
    f: {
        sound: new Howl({
          urls: ['sounds/prism-1.mp3']
        }),
        color: '#95a5a6'
    },
    g: {
        sound: new Howl({
          urls: ['sounds/prism-2.mp3']
        }),
        color: '#f39c12'
    },
    h: {
        sound: new Howl({
          urls: ['sounds/prism-3.mp3']
        }),
        color: '#d35400'
    },
    j: {
        sound: new Howl({
          urls: ['sounds/splits.mp3']
        }),
        color: '#1abc9c'
    },
    k: {
        sound: new Howl({
          urls: ['sounds/squiggle.mp3']
        }),
        color: '#2ecc71'
    },
    l: {
        sound: new Howl({
          urls: ['sounds/strike.mp3']
        }),
        color: '#3498db'
    },
    z: {
        sound: new Howl({
          urls: ['sounds/suspension.mp3']
        }),
        color: '#9b59b6'
    },
    x: {
        sound: new Howl({
          urls: ['sounds/timer.mp3']
        }),
        color: '#34495e'
    },
    c: {
        sound: new Howl({
          urls: ['sounds/ufo.mp3']
        }),
        color: '#16a085'
    },
    v: {
        sound: new Howl({
          urls: ['sounds/veil.mp3']
        }),
        color: '#27ae60'
    },
    b: {
        sound: new Howl({
          urls: ['sounds/wipe.mp3']
        }),
        color: '#2980b9'
    },
    n: {
        sound: new Howl({
            urls: ['sounds/zig-zag.mp3']
        }),
        color: '#8e44ad'
    },
    m: {
        sound: new Howl({
          urls: ['sounds/moon.mp3']
        }),
        color: '#2c3e50'
    }
}

var circles = [];

function onKeyDown(event) {
    if(keyData[event.key]){
        var maxPoint = new Point(view.size.width, view.size.height);
        var randomPoint = Point.random();
        var point = maxPoint * randomPoint;
        var newCircle = new Path.Circle(point, 500)
        newCircle.fillColor = keyData[event.key].color;
        keyData[event.key].sound.play();
        circles.push(newCircle);
    }
}


// The amount of symbol we want to place;
var count = 50;
var color = ["cyan","yellow","magenta"];

// Create a symbol, which we will use to place instances of later:
var path = new Path.Star({
    center: [0,0],
    points: 12,
    radius1: 25,
    radius2: 40,
    fillColor: color[Math.floor(Math.random() * 3)]
});


var symbol = new Symbol(path);

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
	// The center position is a random point in the view:
	var center = Point.random() * view.size;
	var placed = symbol.place(center);
	placed.scale(i / count + 0.001);
	placed.data.vector = new Point({
		angle: Math.random() * 360,
		length : (i / count) * Math.random() / 5
	});
}

var vector = new Point({
	angle: 45,
	length: 0
});

var mouseVector = vector.clone();

function onMouseMove(event) {
	mouseVector = view.center - event.point;
	return false; // Prevent touch scrolling
}

// The onFrame function is called up to 60 times a second:
function onFrame(event) {
	vector = vector + (mouseVector - vector) / 30;
	
	// Run through the active layer's children list and change
	// the position of the placed symbols:
	for (var i = 0; i < count; i++) {
		var item = project.activeLayer.children[i];
		var size = item.bounds.size;
		var length = vector.length / 10 * size.width / 10;
		item.position += vector.normalize(length) + item.data.vector;
		keepInView(item);
    }
    
    for(var i = 0; i < circles.length; i++){
        circles[i].fillColor.hue += 1;
        circles[i].scale(.9);
    }
}

function keepInView(item) {
	var position = item.position;
	var viewBounds = view.bounds;
	if (position.isInside(viewBounds))
		return;
	var itemBounds = item.bounds;
	if (position.x > viewBounds.width + 5) {
		position.x = -item.bounds.width;
	}

	if (position.x < -itemBounds.width - 5) {
		position.x = viewBounds.width;
	}

	if (position.y > viewBounds.height + 5) {
		position.y = -itemBounds.height;
	}

	if (position.y < -itemBounds.height - 5) {
		position.y = viewBounds.height
	}
}