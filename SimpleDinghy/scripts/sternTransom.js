// Paul DiCarlo 
// Use at your own risk
// Only to be used as a study case based on panel dimensions from a publically available 1940 design
// Buy real plans from a qualified naval architect.


                            . . . . . . . . .                       
                        .                   |                      
                       \------ D1 ----------|
                        \                |  |
                         \              D4  D5
                          \              |  |
                           \--- D2 ------|--| 
                            .       D3   |  |
                              ..............



D1=504.825
D2=400.05
D3=34.925 // Distance from D2 position  to bottom of stern
D4=285.75
D5=323.85

function drawSternTransom(xOffset, yOffset) {
	// Top line of stern transome
	v1=[xOffset + D1, yOffset + D4]
	v2=[xOffset - D1, yOffset + D4]
	//addSpline([v1,v2],false)
	v1a=[xOffset + 0, yOffset + D4 + D3]
	addSpline([v1, v1a, v2], false)

	v3=[xOffset + D2, yOffset + D3]
	v4=[xOffset - D2, yOffset + D3]
	// addSpline([v3,v4],false)

	// Vertical lines of Rear Trsnsom
	addSpline([v1,v3],false)
	addSpline([v2,v4],false)

	x1 = D2*.90 +xOffset
	x2 = D2*.75 + xOffset
	x3 = 0 + xOffset 
	x4 = -D2*.75 + xOffset
	x5 = -D2*.90 + xOffset

	y1 = 0 + yOffset 

	// Bottom line of transom
	//addSpline([v3, [x1,y1], [x2,y1], [x3,y1], [x4,y1], [x5,y1],  v4], false)
	addSpline([v3,  [x3,y1],  v4], false)
}

drawSternTransom(D1, 490)
