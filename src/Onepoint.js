import React from "react";
import { compile, derivative } from "mathjs";
import { Table, Button } from "antd";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration"
  },
  {
    title: "X",
    dataIndex: "x"
  },
  {
    title: "Error",
    dataIndex: "error"
  }
];
var data = [];
class Onepoint extends React.Component {
  constructor() {
    super();
    this.state = {
      fx: "",
      X: 0,
      err: 0.000001,
      tables: false
    };
    this.handleChage = this.handleChage.bind(this);
    this.ClickChage = this.ClickChage.bind(this);
    this.N_funtion = this.N_funtion.bind(this);
  }

  handleChage(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  ClickChage() {
    this.N_funtion(parseFloat(this.state.X));
  }

  N_funtion(x) {
    let sum = parseFloat(0.0);
    let X = [];
    let Er = [];
    let i = 0;
    sum = 10.0;
    while (sum > this.state.err) {
      X[i] = x;
      let x_new = x - this.changfuntion(x) / this.difffuntion(x);
      sum = this.DoError(x_new, x);
      sum = Math.abs(sum).toFixed(6);
      Er[i] = sum;
      i++;
      x = x_new;
    }
    this.settable(X, Er);
    this.setState({
      tables: true
    });
  }

  changfuntion(X) {
    var expr = compile(this.state.fx);
    let scope = { x: parseFloat(X) };
    return expr.eval(scope);
  }

  difffuntion(X) {
    var expr = derivative(this.state.fx, "x");
    let scope = { x: parseFloat(X) };
    return expr.eval(scope);
  }

  DoError(n, m) {
    return (n - m) / n;
  }

  settable(X, Er) {
    data = [];
    for (let i = 0; i < X.length; i++) {
      data.push({
        iteration: i + 1,
        x: X[i],
        error: Er[i]
      });
    }
  }

  render() {
    return (
      <div align="left">
        {" "}
        {/*style={{ margin: 1 + "em",backgroundColor:"#FF0000" }}*/}
        <div>
          <label>Fx:&nbsp;</label>
          <input
            name="fx"
            onChange={this.handleChage}
            value={this.state.value}
          />
          &emsp;<label>X:&nbsp;</label>
          <input
            name="X"
            onChange={this.handleChage}
            value={this.state.value}
          />
          &emsp;
          <Button
            onClick={() => this.N_funtion(parseFloat(this.state.X))}
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
            <XAxis dataKey="x" />
            <YAxis />
          </LineChart>
        </div>
      </div>
    );
  }
}
export default Onepoint;
