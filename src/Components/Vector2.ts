export class Vector2 {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public toList() {
		return [this.x, this.y];
	}

	public toString() {
		return "(" + this.x + ", " + this.y + ")";
	}
}