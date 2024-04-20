// Paul DiCarlo 
// Use at your own risk
// Only to be used as a study case based on panel dimensions from a publically available 1940 design
// Buy real plans from a qualified naval architect.


function createSpline(points) {
	var sp = new RSpline();

	sp.setDegree(2)
	sp.setPeriodic(false);

	for (i=0; i<points.length;i++) {
		sp.appendControlPoint(new RVector(points[i][0], points[i][1] + 3));
	}
	return addShape(sp)
}



/*
                            . . . . . . . . .                       
                        .                   |                      
                       \------ D1 ----------|
                        \                |  |
                         \              D4  D5
                          \              |  |
                           \--- D2 ------|--| 
                            .       D3   |  |
                              ..............
*/



D1=504.825
D2=400.05
D3=34.925 // Distance from D2 position  to bottom of stern
D4=285.75
D5=323.85

function drawSternTransom(xOffset, yOffset) {
	// Top line of stern transome
	v1=[xOffset + D1, yOffset + D4]
	v2=[xOffset - D1, yOffset + D4]
	v1a=[xOffset + 0, yOffset + D4 + D3]
	createSpline([v1, v1a, v2])

	v3=[xOffset + D2, yOffset + D3]
	v4=[xOffset - D2, yOffset + D3]

	// Vertical lines of Rear Trsnsom
	addLine(v1,v3)
	addLine(v2,v4)

	x1 = D2*.90 +xOffset
	x2 = D2*.75 + xOffset
	x3 = 0 + xOffset 
	x4 = -D2*.75 + xOffset
	x5 = -D2*.90 + xOffset

	y1 = 0 + yOffset 

	// Bottom line of transom
	createSpline([v3,  [x3,y1],  v4])
}

drawSternTransom(D1, 490)
autoZoom()