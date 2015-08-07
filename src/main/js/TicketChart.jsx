import React from 'react';
import d3 from 'd3';


class Chart extends React.Component {

    render() {
        return (
            <svg
                width={this.props.width}
                height={this.props.height}>
                {this.props.children}
            </svg>
        );
    }
}


class Line extends React.Component {

    render() {
        return (
            <path d={this.props.path} stroke={this.props.color} strokeWidth={this.props.width} fill="none"/>
        );
    }
}
Line.defaultProps = {
    path: '',
    color: 'blue',
    width: 2
};


class DataSeries extends React.Component {

    render() {
        var self = this,
            props = this.props,
            yScale = props.yScale,
            xScale = props.xScale;

        var path = d3.svg.line()
            .x(function (d) {
                return xScale(d.x);
            })
            .y(function (d) {
                return yScale(d.y);
            })
            .interpolate(this.props.interpolate);

        return (
            <Line path={path(this.props.data)} color={this.props.color}/>
        )
    }
}
DataSeries.defaultProps = {
    title: '',
    data: [],
    interpolate: 'linear'
};


class LineChart extends React.Component {

    render() {
        var data = this.props.data,
            size = {width: this.props.width, height: this.props.height};

        var max = _.chain(data.series1, data.series2, data.series3)
            .zip()
            .map(function (values) {
                return _.reduce(values, function (memo, value) {
                    return Math.max(memo, value.y);
                }, 0);
            })
            .max()
            .value();

        var xScale = d3.scale.linear()
            .domain([0, 6])
            .range([0, this.props.width]);

        var yScale = d3.scale.linear()
            .domain([0, max])
            .range([this.props.height, 0]);

        return (
            <Chart width={this.props.width} height={this.props.height}>
                <DataSeries data={data.series1} size={size} xScale={xScale} yScale={yScale} ref="series1"
                            color="cornflowerblue"/>
                <DataSeries data={data.series2} size={size} xScale={xScale} yScale={yScale} ref="series2" color="red"/>
                <DataSeries data={data.series3} size={size} xScale={xScale} yScale={yScale} ref="series3"
                            color="green"/>
            </Chart>
        );
    }
}
LineChart.defaultProps = {
    width: 400,
    height: 300
};


export default LineChart;
