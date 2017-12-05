import React from 'react'

function Landing() {
    return (
        <div>
            <div className="jumbotron">
                <h1>Welcome to MyInventoryTracker</h1>
            </div>
            <div className="container">
                <a href="/products" className="btn btn-primary btn-lg active">Products</a>
                <a href="/sales" className="btn btn-success btn-lg active">Sales Report</a>
                <a href="/expenses" className="btn btn-danger btn-lg active">Expenses</a>
            </div>
        </div>
    )
}

export default Landing;
