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

// =====================================================
function domovePoint(Xpoint, offset) {
	return [Xpoint[0]+offset[0], Xpoint[1]+offset[1]]
}

_bottomPanel_OuterCurve = [
	[0,         397.9377], // station 1 (stern end)
	[12.7,      400.05],
	[238.125,   434.975],
	[544.5125,  469.9],
	[849.3125,  482.6],
	[1154.1125, 469.9],
	[1460.5,	431.8],
	[1770.0625, 368.,3],
	[2084.3875, 282.575], 
	[2214.5625, 241.5975], // station 
	[2252.6625, 230.1875], // furthest bow position  
]

function drawBottomPanel(xOffset, yOffset, drawStations) {
	// Bottom Panel  of Pram

	// Hull layout...
	//            s2---s3---s4---s5---s6---s7---s8--b1
	//    s0-s1--/                                    \---b2
	//      \                                               |
	//      |                                             / 
	//      |                                            |
	//      *-----------------FLAT-SIDE------------------* 

	// Spline along outer lengthwise edge of hull section
	// Other side is perfectlly straight
	var tuples_bottomPanel_OuterCurve = []
	for (i=0; i<_bottomPanel_OuterCurve.length;i++) {
		tuples_bottomPanel_OuterCurve.push(domovePoint( _bottomPanel_OuterCurve[i], [xOffset,yOffset]))
	}
	
	// See above hull layout.  s0, s1, b1, and b2 established here..
	s0 = tuples_bottomPanel_OuterCurve[0]
	s1 = tuples_bottomPanel_OuterCurve[1]
	b1 = tuples_bottomPanel_OuterCurve[tuples_bottomPanel_OuterCurve.length-2]
	b2 = tuples_bottomPanel_OuterCurve[tuples_bottomPanel_OuterCurve.length-1]


	// --------------------------------------------------
	// SIDE 1 of PANEL
	// This creates the curve on the lengthwise outer edge
	//  of the panel
	// --------------------------------------------------
	createSpline(tuples_bottomPanel_OuterCurve)

	// --------------------------------------------------
	// SIDE 2 of PANEL
	// Bottom of panel is completely straight.
	// --------------------------------------------------
	bottomLinePt1 = [s1[0],0]
	bottomLinePt2 = [b1[0], 0] 
	addLine(bottomLinePt1, bottomLinePt2)

	// --------------------------------------------------
	// SIDE 3 of PANEL - Stern SIDE
	// left small bit
	sternY1 = s1[1]*.65 // We need to have multiple points to have the curve work out
	sternY2 = sternY1-10
	sternY3 = sternY2-10
	sternY4 = 0
	createSpline([ [0,s0[1]], [s1[0],sternY1], [s1[0],sternY2], [s1[0],sternY3], [s1[0],sternY4] ])

	// --------------------------------------------------
	// SIDE 4 of PANEL - BOW SIDE
	midpoint = b2[1]/3
	midpoint2 = b2[1]/2
	createSpline([ [b1[0],0], [b1[0],midpoint], [b1[0],midpoint2],  b2])

	// --------------------------------------------------
	if (drawStations == true) {
		// Draw station Lines
		for (t=1; t<tuples_bottomPanel_OuterCurve.length; t++) {
			addCircle(tuples_bottomPanel_OuterCurve[t],5)

			// Bottom is not as far to the right as the top, so we exclude the last one
			if (t < (tuples_bottomPanel_OuterCurve.length -1)) {
				addCircle(tuples_bottomPanel_OuterCurve[t][0], 0, 5)
				addLine( [tuples_bottomPanel_OuterCurve[t][0],0], tuples_bottomPanel_OuterCurve[t] )
			}
			//addSimpleText(t.toString(), tuples_bottomPanel_OuterCurve[t][0], -50, 24, 0, "standard", RS.AlignTop, RS.AlignBottom,false, false)
		}
	}
}

drawBottomPanel(0,0, true)
autoZoom()

