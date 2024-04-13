// Paul DiCarlo 
// Use at your own risk
// Bottom Panel


function drawBottomPanel(xOffset, yOffset, drawStations) {
	// Bottom Panel  of Pram

	// Hull layout...
	//            s2---s3---s4---s5---s6---s7---s8--b1
	//    s0-s1--/                                    \---b2
	//      \                                               |
	//      |                                             / 
	//      |                                            |
	//      *--------------------------------------------* 

	// Spline along outer lengthwise edge of hull section
	// Other side is perfectlyl straight
	s0 = [xOffset + 0,         yOffset + 397.9377]		// station 0
	s1 = [xOffset + 12.7,      yOffset + 400.05] 
	s2 = [xOffset + 238.125,   yOffset + 434.975]
	s3 = [xOffset + 544.5125,  yOffset + 469.9]
	s4 = [xOffset + 849.3125,  yOffset + 482.6]
	s5 = [xOffset + 1154.1125, yOffset + 469.9]
	s6 = [xOffset + 1460.5,	   yOffset + 431.8]
	s7 = [xOffset + 1770.0625, yOffset + 368.3] 
	s8 = [xOffset + 2084.3875, yOffset + 282.575] 
	b1 = [xOffset + 2214.5625, yOffset + 241.5975]
	b2 = [xOffset + 2252.6625, yOffset + 230.1875] // furtherst bow position

	// --------------------------------------------------
	// SIDE 1 of PANEL
	// This creats the curve on the top of the panel
	// --------------------------------------------------
	splineTuples = [s0,s1,s2,s3,s4,s5,s6,s7,s8,b1,b2]
	addSpline(splineTuples, false)

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
	sternY1= s1[1]*.65 // We need to have multiple points to have the curve work out
	sternY2= sternY1-10
	sternY3= sternY2-10
	sternY4=0
	addSpline([ [0,s0[1]], [s1[0],sternY1], [s1[0],sternY2], [s1[0],sternY3], [s1[0],sternY4] ], false)

	// --------------------------------------------------
	// SIDE 4 of PANEL - BOW SIDE
	// curve of bow bottom panel
	midpoint=b2[1]/3
	midpoint2=b2[1]/2
	addSpline([ [b1[0],0], [b1[0],midpoint], [b1[0],midpoint2],  b2], false ) 



	// --------------------------------------------------
	if (drawStations == true) {
		// Draw station Lines
		for (t=1; t<splineTuples.length; t+=1) {
			addCircle(splineTuples[t],5)

			// Bottom is not as far to the right as the top, so we exclude the last one
			if (t < (splineTuples.length -1)) {
				addCircle(splineTuples[t][0], 0, 5)
				addSpline([ [splineTuples[t][0],0], splineTuples[t] ], false)
			}
			addSimpleText(t.toString(), splineTuples[t][0], -50, 24, 0, "standard", RS.AlignTop, RS.AlignBottom,false, false)
		}
	}
}

drawBottomPanel(0,0, false)

