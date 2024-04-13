// Paul DiCarlo 
// Use at your own risk

function drawSide(xOffset, yOffset, drawStations) {

	// Points on top of panel
	s0 = [xOffset + 0,        yOffset + 133.35]
	s1 = [xOffset + 254,      yOffset + 150.8125]
	s2 = [xOffset + 561.975,  yOffset + 165.1]
	s3 = [xOffset + 866.775,  yOffset + 174.625]
	s4 = [xOffset + 1171.575, yOffset + 177.8]
	s5 = [xOffset + 1479.55,  yOffset + 176.2125]
	s6 = [xOffset + 1799.375, yOffset + 168.275]
	s7 = [xOffset + 2117.725, yOffset + 158.75]
	s8 = [xOffset + 2390.775, yOffset + 152.4] 

	// Polints on bottom of panel
	bs0=[xOffset + 31.75,    yOffset - 133.5]
	bs1=[xOffset + s1[0],    yOffset - 187.325]
	bs2=[xOffset + s2[0],    yOffset - 200.025]
	bs3=[xOffset + s3[0],    yOffset - 198.4375]
	bs4=[xOffset + s4[0],    yOffset - 190.5]
	bs5=[xOffset + s5[0],    yOffset - 168.275]
	bs6=[xOffset + s6[0],    yOffset - 130.175]
	bs7=[xOffset + s7[0],    yOffset - 114.3]
	bs8=[xOffset + 2282.825, yOffset - 114.3]

	// ------------------------------
	// Top spline
	// ------------------------------
	topCurvePoints=[s0,s1,s2,s3,s4,s5,s6,s7,s8]
	addSpline(topCurvePoints, false)

	// ------------------------------
	// Bottom spline
	// ------------------------------
	// TODO: Fix this up so that it's a single spline with control points:
	addSpline([bs0,bs1], false)
	addSpline([bs1,bs2,bs3,bs4,bs5,bs6,bs7,bs8],false)

	// ------------------------------
	// bow spline
	// ------------------------------
	addSpline([s8, bs8], false)
	addSpline([s0, bs0], false)

	// ------------------------------
	// Draw stations?
	// ------------------------------
	if (drawStations == true) {
		// ------------------------------
		// Draw center reference line
		// ------------------------------
		addSpline( [ [xOffset + 19.05,yOffset + 0] , [xOffset + 2330.45, yOffset + 0]   ], false)
		// Drive Stations
		addSpline([s1,bs1],false)
		station=1

		bottomCurvePoints=[bs0,bs1,bs2,bs3,bs4,bs5,bs6,bs7,bs8]
		for (i=0; i<8; i++) {
			tuple = bottomCurvePoints[i] 
			j=i+1
			addSimpleText(j.toString(), tuple[0], tuple[1]-50, 24, 0, "standard", RS.AlignTop, RS.AlignBottom,false, false)
		}

		addSpline([s2,bs2],false)
		addSpline([s3,bs3],false)
		addSpline([s4,bs4],false)
		addSpline([s5,bs5],false)
		addSpline([s6,bs6],false)
		addSpline([s7,bs7],false)

		// add stations
		addSpline([bs1,s1], false)
	}
}

drawSide(0,1030,true)
