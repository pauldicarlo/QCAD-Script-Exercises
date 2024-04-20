// Paul DiCarlo 
// Use at your own risk

function createSpline(points) {
	var sp = new RSpline();

	sp.setDegree(2)
	sp.setPeriodic(false);

	for (i=0; i<points.length;i++) {
		sp.appendControlPoint(new RVector(points[i][0], points[i][1] + 3));
	}
	return addShape(sp)
}

function rotateEntities(_entityIds ) {
	document = this.getDocument();
	di = this.getDocumentInterface();

	document = getDocument();
	di = getDocumentInterface();

	di.selectAll();

	var ids = document.querySelectedEntities();
	var op = new RModifyObjectsOperation();
	for (var i=0; i<ids.length; i++) {
		var id = ids[i];
		var entity = document.queryEntity(id);
		if (_entityIds.contains(entity.getId())) {
			entity.rotate(3.14, new RVector(0,0));
			op.addObject(entity, false);
		}
	}
	di.applyOperation(op);
}

function moveEntities(_entityIds, xDiff, yDiff) { 
	document = this.getDocument();
	di = this.getDocumentInterface();

	document = getDocument();
	di = getDocumentInterface();

	di.selectAll();

	var ids = document.querySelectedEntities();
	for (var i=0; i<ids.length; i++) {
		var id = ids[i];
		var entity = document.queryEntity(id);
		if (_entityIds.contains(entity.getId())) {
			move(entity, xDiff, yDiff)
		}
	}
}

// =====================================================
function movePoint(point, offset) {
	return [point[0]+offset[0], point[1]+offset[1]]
}

// rawTopCurveProintsFromSpreadsheet =
_sidePanel_topCurve_Pts = [
	[0,			34.925],
	[304.8,		19.05],
	[609.6,		6.35],
	[914.4,		0],
	[1219.2,	0],
	[1524,		3.175],
	[1828.8,	9.525],
	[2133.6,	15.875],
	[2438.4,	20.6375]
]

_sidePanel_bottomCurvePts = [
	[0,			311.15],
	[304.8,		336.55],
	[609.6,		352.425],
	[914.4,		365.125],
	[1219.2,	371.475],
	[1524,		365.125],
	[1828.8,	342.9],
	[2133.6,	301.625],
	[2438.4,	242.8875]
]

// =====================================================
function drawSidePanel(xOffset, yOffset, drawStations) {

	var entityIds=[]

	var sidePanel_topCurve_Pts= [];
	for (i=0; i<_sidePanel_topCurve_Pts.length; i++) {
	 sidePanel_topCurve_Pts.push(movePoint(_sidePanel_topCurve_Pts[i], [xOffset, yOffset]))
	}

	var sidePanel_bottomCurvePts= [];
	for (i=0; i<_sidePanel_topCurve_Pts.length; i++) {
	 sidePanel_bottomCurvePts.push(movePoint(_bottomCurvePts[i], [xOffset, yOffset]))
	}

	// ------------------------------
	// Top spline
	// ------------------------------
	entityIds.push(createSpline(sidePanel_topCurve_Pts).getId())

	// ------------------------------
	// Bottom spline
	// ------------------------------
	entityIds.push(createSpline(sidePanel_bottomCurvePts).getId())

	// ------------------------------
	// bow and stern sides 
	// ------------------------------
	entityIds.push(addLine(sidePanel_topCurve_Pts[8], sidePanel_bottomCurvePts[8]).getId())
	entityIds.push(addLine(sidePanel_topCurve_Pts[0], sidePanel_bottomCurvePts[0]).getId())

	// ------------------------------
	// Draw stations?
	// ------------------------------
	if (drawStations == true) {

		for (i=1; i<(sidePanel_bottomCurvePts.length-1); i++) {
			entityIds.push(addLine(sidePanel_bottomCurvePts[i], sidePanel_topCurve_Pts[i]).getId())
		}
	}
	return entityIds
}

entityIds = drawSidePanel(0,0,true)
rotateEntities(entityIds)
moveEntities(entityIds, 2440.0, 1100.0)
autoZoom()