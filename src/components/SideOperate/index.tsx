/*
 * @Author: Shber
 * @Date: 2025-03-05 08:35:39
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-05 18:20:08
 * @Description: 
 */
import React from 'react';
import { useStoreApi, useReactFlow, Panel, Background } from '@xyflow/react';
import './index.scss'
import { Button } from 'antd';
import {
  CloseOutlined,
} from '@ant-design/icons';

const panelStyle = {
  color: '#777',
  fontSize: 12,
  top: '5vh',
  background: "#fff",
  width: '300px',
  height: '70vh',
};
 
const buttonStyle = {
  fontSize: 12,
  marginRight: 5,
  marginTop: 5,
};
 
export default () => {

 
  return (
    <Panel position="top-right" style={panelStyle} className='side_operate'>
      <div>
        <div className='justify-between w-full flex max-w-sm items-center'>
          <h3 className='text-xl'>这是一个标题</h3>
          <Button icon={<CloseOutlined />} />
        </div>
      </div>
     
    </Panel>
  );
};