import React from "react";
import { compile } from "mathjs";
import { Table, Button } from "antd";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    width: 100
  },
  {
    title: "XL",
    dataIndex: "xl",
    width: 180
  },
  {
    title: "XR",
    dataIndex: "xr",
    width: 180
  },
  {
    title: "Error",
    dataIndex: "error"
  }
];

var data = [];

class FalsePosition extends React.Component {
  constructor() {
    super();
    this.state = {
      XL: 0,
      XR: 0,
      fx: "",
      er: 0.000001,
      tables: false
    };
    this.handleChage = this.handleChage.bind(this);
    this.fxbisection = this.fxbisection.bind(this);
  }

  handleChage(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  fxbisection(xl, xr) {
    var sum = parseFloat(0.0);
    var xm = 0;
    var Xl = [];
    var Xr = [];
    var Er = [];
    var ii = 0;
    sum = 10.0;
    while (sum > this.state.er) {
      Xl[ii] = xl;
      Xr[ii] = xr;
      var fxr = this.fun(xr);
      var fxl = this.fun(xl);
      xm =
        ((xl * fxr) - (xr * fxl)) / (fxr - fxl);
      var xmn = fxr * this.fun(xm);

      if (xmn > 0) {
        sum = this.error(xm, xr);
        if (xl < xr) {
          xr = xm;
        } else {
          xl = xm;
        }
      } else {
        sum = this.error(xm, xl);
        if (xl < xr) {
          xl = xm;
        } else {
          xr = xm;
        }
      }

      sum = Math.abs(sum).toFixed(8);
      Er[ii] = sum;
      ii++;
    }
    this.setdata(Xl, Xr, Er);
    this.setState({
      tables: true
    });
  }

  fun(X) {
    var expr = compile(this.state.fx);
    let scope = { x: parseFloat(X) };
    return expr.eval(scope);
  }

  error(n, m) {
    return (n - m) / n;
  }

  setdata(Xl, Xr, Er) {
    data = [];
    for (let i = 0; i < Xl.length; i++) {
      data.push({
        iteration: i + 1,
        xl: Xl[i],
        xr: Xr[i],
        error: Er[i]
      });
    }
  }

  render() {
    return (
      <div align="left">
        <div>
          <div>
            <label>Fx:</label>
            &nbsp;
            <input
              name="fx"
              onChange={this.handleChage}
              value={this.state.value}
            />
            &emsp;<label>XL:</label>
            &nbsp;
            <input
              name="XL"
              onChange={this.handleChage}
              value={this.state.value}
            />
            &emsp;<label>XR:</label>
            &nbsp;
            <input
              name="XR"
              value={this.state.value}
              onChange={this.handleChage}
            />
            &emsp;
            <Button
              onClick={() =>
                this.fxbisection(
                  parseFloat(this.state.XL),
                  parseFloat(this.state.XR)
                )
              }
              type="primary"
            >
              Enter
            </Button>
          </div>
          <br />

          <div align="center">
            <Table columns={columns} dataSource={data} />
          </div>

          <div>
            <LineChart width={500} height={250} data={data}>
              <Line type="monotone" dataKey="error" stroke="red" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="error" />
              <YAxis />
            </LineChart>
          </div>
        </div>
      </div>
    );
  }
}
export default FalsePosition;
