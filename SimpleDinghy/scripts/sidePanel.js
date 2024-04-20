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
		print("hugo")
	}
	addShape(sp);
	
}

function domovePoint(Xpoint, offset) {
	return [Xpoint[0]+offset[0], Xpoint[1]+offset[1]]
}

_sidePanel_TopCurve = [
	[0,        133.35],
	[254,      150.8125],
	[561.975,  165.1],
	[866.775,  174.625],
	[1171.575, 177.8],
	[1479.55,  176.2125],
	[1799.375, 168.275],
	[2117.725, 158.75],
	[2390.775, 152.4] 
]


function drawSide(xOffset, yOffset, drawStations) {

	// Points on top of panel curve
	var tuples_sidePanel_TopCurve = []
	for (i=0; i<_sidePanel_TopCurve.length;i++) {
		tuples_sidePanel_TopCurve.push(domovePoint( _sidePanel_TopCurve[i], [xOffset,yOffset]))
	}

	//  Points on bottom of panel curve
	bs0 = domovePoint([31.75,    - 133.5], [xOffset,yOffset])
	bs1 = domovePoint( [tuples_sidePanel_TopCurve[1][0], - 187.325], [xOffset,yOffset])
	bs2 = domovePoint( [tuples_sidePanel_TopCurve[2][0], - 200.025], [xOffset,yOffset])
	bs3 = domovePoint( [tuples_sidePanel_TopCurve[3][0], - 198.4375], [xOffset,yOffset])
	bs4 = domovePoint( [tuples_sidePanel_TopCurve[4][0], - 190.5], [xOffset,yOffset])
	bs5 = domovePoint( [tuples_sidePanel_TopCurve[5][0], - 168.275], [xOffset,yOffset])
	bs6 = domovePoint( [tuples_sidePanel_TopCurve[6][0], - 130.175], [xOffset,yOffset])
	bs7 = domovePoint( [tuples_sidePanel_TopCurve[7][0], - 114.3], [xOffset,yOffset])
	bs8 = domovePoint([2282.825, - 114.3], [xOffset,yOffset])
	tuples_sidePanel_BottomCurve=[bs0,bs1,bs2,bs3,bs4,bs5,bs6,bs7,bs8]
	
	// ------------------------------
	// Top spline
	// ------------------------------
	createSpline(tuples_sidePanel_TopCurve)

	// ------------------------------
	// Bottom spline
	// ------------------------------
	createSpline(tuples_sidePanel_BottomCurve)

	// ------------------------------
	// add bow and stern lines
	// ------------------------------
	addLine(tuples_sidePanel_TopCurve[tuples_sidePanel_TopCurve.length-1], bs8)
	addLine(tuples_sidePanel_TopCurve[0], bs0)

	// ------------------------------
	// Draw stations?
	// ------------------------------
	if (drawStations == true) {
		// ------------------------------
		// Draw center reference line
		// ------------------------------
		addLine(  [xOffset + 19.05,yOffset + 0] , [xOffset + 2330.45, yOffset + 0] )

		// Drive Stations enumerated
		for (i=0; i<8; i++) {
			tuple = tuples_sidePanel_BottomCurve[i] 
			j=i+1
			addSimpleText(j.toString(), tuple[0], tuple[1]-50, 24, 0, "standard", RS.AlignTop, RS.AlignBottom,false, false)
		}

		// add station lines
		for (i=1; i< tuples_sidePanel_TopCurve.length-1; i++ ) {
			addLine(tuples_sidePanel_TopCurve[i], tuples_sidePanel_BottomCurve[i])
		}
	}
}

drawSide(0,1030,true)
autoZoom()
