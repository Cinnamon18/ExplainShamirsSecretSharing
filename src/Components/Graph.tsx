import './Graph.css';
import React from "react";
import { PolynomialEqn } from "./PolynomialEqn";
import { Vector2 } from "./Vector2";
import functionPlot from "function-plot";
import ReactDOM from "react-dom";


interface GraphProps {

}

export class Graph extends React.Component {

	private polySolver;
	private graphRef;

	constructor(props: GraphProps) {
		super(props);
		this.polySolver = new PolynomialEqn(new Vector2(0, 1), 1, 2, 4);
		this.graphRef = React.createRef();
	}

	componentDidMount() {
		let contents = this.graphRef.current;
		if (contents != null && contents instanceof Element) {
			let contentsBounds = contents.getBoundingClientRect();
			let width = 800;
			let height = 500;
			let ratio = contentsBounds.width / width;
			width *= ratio;
			height *= ratio;

			functionPlot({
				target: ".graph",
				width,
				height,
				xAxis: {
					label: 'x - axis',
					// domain: [-4, 4]
				},
				yAxis: {
					label: 'y - axis',
					// domain: [-1, 2]
				},
				grid: true,
				data: [
					{
						fn: this.polySolver.toString(),
					},
					{
						points: this.polySolver.getPointsList(),
						fnType: 'points',
						graphType: 'scatter'
					}
				]
			});
		}
	}

	public render(): JSX.Element {

		// this.renderChart();

		return (
			<div>
				<p>
					Graph here!
				</p>
				<div className="graph" ref={this.graphRef} />
				<p>
					{this.polySolver.toString()}
				</p>
				<p>
					{this.polySolver.points.map(point => point.toString())}
				</p>
			</div>
		);
	}
}












// import React from "react";
// import { PolynomialEqn } from "./PolynomialEqn";
// import { Vector2 } from "./Vector2";

// import {
// 	XYPlot,
// 	XAxis,
// 	YAxis,
// 	VerticalGridLines,
// 	HorizontalGridLines,
// 	LineMarkSeries
// } from 'react-vis';

// interface GraphProps {

// }

// export class Graph extends React.Component {

// 	private polySolver;

// 	constructor(props: GraphProps) {
// 		super(props);
// 		this.polySolver = new PolynomialEqn(new Vector2(0, 50), 1, 2);
// 	}

// 	public render(): JSX.Element {

// 		return (
// 			<div>
// 				<p>
// 					Graph here!
// 			</p>
// 				<p>
// 					{this.polySolver.toString()}
// 				</p>
// 				<p>
// 					{this.polySolver.points.map(point => point.toString())}
// 				</p>

// 				<XYPlot width={300} height={300}>
// 					<VerticalGridLines />
// 					<HorizontalGridLines />
// 					<XAxis />
// 					<YAxis />
// 					<LineMarkSeries
// 						className="linemark-series-example"
// 						style={{
// 							strokeWidth: '3px'
// 						}}
// 						lineStyle={{ stroke: 'red' }}
// 						markStyle={{ stroke: 'blue' }}
// 						data={[{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }]}
// 					/>
// 					<LineMarkSeries
// 						className="linemark-series-example-2"
// 						curve={'curveMonotoneX'}
// 						data={[{ x: 1, y: 11 }, { x: 1.5, y: 29 }, { x: 3, y: 7 }]}
// 					/>
// 				</XYPlot>
// 			</div>
// 		);
// 	}
// }