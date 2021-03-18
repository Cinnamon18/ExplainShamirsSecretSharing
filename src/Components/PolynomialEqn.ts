import regression from "regression";
import { Vector2 } from "./Vector2";

export class PolynomialEqn {
	public poly: any;
	public points: Vector2[];

	constructor(yIntercept: Vector2, xAxisIncrement:number, sharesToRecover: number, totalShares: number) {
		if (sharesToRecover > totalShares) {
			throw new RangeError("Shares to recover cannot be greater than total shares");
		}

		this.points = Array(sharesToRecover);

		let i = 0;
		while (i < sharesToRecover) {
			this.points[i] = new Vector2((i + 1) * xAxisIncrement, this.getRandomFloat());
			i++;
		}

		this.points.unshift(yIntercept);
		console.log(this.getPointsList(), sharesToRecover);
		this.poly = regression.polynomial(this.getPointsList(), { order: sharesToRecover + 1, precision: 10 * (sharesToRecover + 1) });
		if (this.poly.r2 != 1) {
			console.error("Something went wrong with computing the polynomial :// r^2=" + this.poly.r2);
		}

		const constants = this.poly.equation;
		constants.reverse();
		// console.log(this.poly);

		while (i < totalShares) {
			this.points.push(new Vector2((i + 1) * xAxisIncrement, this.poly.predict((i + 1) * xAxisIncrement)[1]));
			// console.log(this.poly.predict(i + 1));
			i++;
		}

		console.log(this.points);
	}

	public getIntercept(): number {
		return (this.poly.predict(0));
	}

	public toString(): string {
		return this.poly.string;
	}

	public getPointsList(): number[][] {
		return this.points.map(point => point.toList());
	}

	private getRandomFloat(): number {
		return Math.random(); //TODO upgrade to smth secure because _someone_ will missuse the site
	}
}
