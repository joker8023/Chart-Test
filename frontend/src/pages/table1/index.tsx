import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { StoreState } from 'umi';
import { Table1Model } from '@/interfaces/type';
import { useDispatch, useSelector } from '@/hooks';
import { Button } from 'antd';
import './index.less';

const Index: React.FC<StoreState> = () => {

const table1: Table1Model = useSelector(state => state.table1);
const {data} = table1;
const [genData, SetGenData] = useState<NodeJS.Timeout>();
const xList:string[] = [];
const yList:string[] = [];
data.forEach(i=>{
    xList.push(i.x);
    yList.push(i.y);
});
const dispatch = useDispatch();



useEffect(() => {
        if (data.length < 1) {
          dispatch.table1.GetData();
        }
        if (!genData){
            SetGenData(setInterval(dispatch.table1.GenData,10000));
        }
      }, []);
const option = {
    title: {
        text: 'table1',
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
    <div >
    <Button type="primary" onClick={()=>dispatch.table1.InsertData()}>save</Button>
    </div>
    </div>
  );
};
export default Index;
