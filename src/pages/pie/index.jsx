
import React from "react";

import { Space, Card, Table, Button, Pagination, Modal, notification, message } from 'antd';
import ReactECharts from 'echarts-for-react';

import './pie.styl'



class Pie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                grid: { top: 8, right: 8, bottom: 24, left: 36 },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        name: '销量数据'
                    },
                ],
            }
        }
    }


    render() {
        const { options } = this.state
        return (
            <div className="P-viewContent">
                <div className="top">
                    <Card title="数据总览" className="mycard datacount">
                        <div className="userCount">
                            <p>10</p>
                            <span>当前用户总数</span>
                        </div>
                    </Card>
                    <Card title="数据总览" className="mycard datacount">
                        <div className="userCount">
                            <p>10</p>
                            <span>当前用户总数</span>
                        </div>
                    </Card>
                    <Card title="数据总览" className="mycard datacount">
                        <div className="userCount">
                            <p>10</p>
                            <span>当前用户总数</span>
                        </div>
                    </Card>
                    <Card title="数据总览" className="mycard datacount">
                        <marquee direction="up" scrolldelay="300">
                            <div><a href="">1</a></div>
                            <div><a href="">2</a></div>
                            <div><a href="">3</a></div>
                            <div><a href="">4</a></div>

                        </marquee>
                    </Card>


            
                </div>
                <div className="buttom">
                    <Card title="t1" className="mycard">
                        <ReactECharts
                            option={options}
                            title={"销量数据"}

                        />

                    </Card>

                    <Card title="t1" className="mycard">
                        <ReactECharts
                            option={options}
                            title={"销量数据"}

                        />

                    </Card>

                </div>




            </div>
        );
    }
}

export default Pie