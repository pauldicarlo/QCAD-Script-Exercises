function createSpline(points) {
	var sp = new RSpline();

	sp.setDegree(2)
	sp.setPeriodic(false);

	for (i=0; i<points.length;i++) {
		sp.appendControlPoint(new RVector(points[i][0], points[i][1] + 3));
	}

	addShape(sp);
}
