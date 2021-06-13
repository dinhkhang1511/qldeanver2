#pragma once
#include "Polygon.h"

class Circle
{

private:
	Point I;
	int r;

public:
	Circle();
	~Circle();

	void inputKey();
	void inputClick();
	void draw(int color);

	void remove();

	bool isInside(int x, int y);
	void floodFill(int fillColor);
};

