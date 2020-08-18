import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { StoreState } from 'umi';
import { table2Model } from '@/interfaces/type';
import { useDispatch, useSelector } from '@/hooks';
import { Button } from 'antd';
import './index.less';

const Index: React.FC<StoreState> = () => {

const table2: table2Model = useSelector(state => state.table2);
const {data} = table2;
const xList:string[] = [];
const yList:string[] = [];
data.forEach(i=>{
    xList.push(i.x);
    yList.push(i.y);
});
const dispatch = useDispatch();



useEffect(() => {
    dispatch.table2.GetData();
      }, []);
const option = {
    title: {
        text: 'table2',
        left:"100"

    },
    legend: {
        data: ['data']
    },
    toolbox: {
     
    },
    tooltip: {},
    xAxis: {
        data: xList,
        splitLine: {
            show: false
        }
    },
    yAxis: {
    },
    series: [{
        name: 'bar',
        type: 'bar',
        data: yList,
        animationDelay: function (idx: number) {
            return idx * 1;
        }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx: number) {
        return idx * 1;
    }
};
  return (
      <div className="center">
    <ReactEcharts
    option={option}
    notMerge
    style={{
      width: '85%',
      height: '50vh',
      marginTop: '10%',
    }}
    />
    </div>
  );
};
export default Index;
