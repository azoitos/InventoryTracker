import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LineChart } from 'react-d3-basic';

import { getAllSales } from '../reducers/salesReport.jsx'

let width = 700,
    height = 300,
    margins = { left: 100, right: 100, top: 50, bottom: 50 },
    title = "Sales Made",
    // chart series,
    // field: is what field your data want to be selected
    // name: the name of the field that display in legend
    // color: what color is the line
    chartSeries = [
        {
            field: 'id',
            name: 'Sales Made',
            color: '#ff7f0e'
        }
    ],
    // your x accessor
    x = function (d) {
        return d.id;
    },
    chartData = [
        {
            name: "Lavon Hilll I",
            BMI: 20.57,
            age: 12,
            birthday: "1994-10-26T00:00:00.000Z",
            city: "Annatown",
            married: true,
            index: 1
        },
        {
            name: "Clovis Pagac",
            BMI: 24.28,
            age: 26,
            birthday: "1995-11-10T00:00:00.000Z",
            city: "South Eldredtown",
            married: false,
            index: 3
        },
        {
            name: "Gaylord Paucek",
            BMI: 24.41,
            age: 30,
            birthday: "1975-06-12T00:00:00.000Z",
            city: "Koeppchester",
            married: true,
            index: 5
        },
        {
            name: "Ashlynn Kuhn MD",
            BMI: 23.77,
            age: 32,
            birthday: "1985-08-09T00:00:00.000Z",
            city: "West Josiemouth",
            married: false,
            index: 6
        }
    ]


class Sales extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllSales();
    }

    render() {
        const { sales } = this.props;
        return (
            <div>
                <LineChart
                    showXGrid={false}
                    showYGrid={false}
                    title={title}
                    margins={margins}
                    data={sales}
                    width={width}
                    height={height}
                    chartSeries={chartSeries}
                    x={x} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        sales: state.sales
    }
}

export default connect(mapStateToProps, { getAllSales })(Sales)
