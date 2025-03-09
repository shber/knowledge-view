/*
 * @Author: Shber
 * @Date: 2025-03-05 08:35:39
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-09 21:51:27
 * @Description: 
 */
import React from 'react';
import { Panel } from '@xyflow/react';
import './index.scss'
import { Button, Divider, Space } from 'antd';
import {
  CloseOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const panelStyle = {
  color: '#777',
  fontSize: 12,
  top: '5vh',
  background: "#fff",
  width: '300px',
  height: 'auto',
  minHeight: '200px',
  padding: '16px',
};

export default ({ node, onClose, onDelete }) => {
  if (!node) return null;

  const handleDelete = () => {
    if (window.confirm('确定要删除这个节点吗？')) {
      onDelete(node.id);
    }
  };

  return (
    <Panel position="top-right" style={panelStyle} className='side_operate'>
      <div>
        <div className='justify-between w-full flex max-w-sm items-center'>
          <h3 className='text-xl'>节点详情</h3>
          <Button icon={<CloseOutlined />} onClick={onClose} />
        </div>
        <Divider />
        <div className="mb-4">
          <p><strong>ID:</strong> {node.id}</p>
          <p><strong>类型:</strong> {node.type}</p>
          <p><strong>标签:</strong> {node.data.label}</p>
          <p><strong>位置:</strong> x: {Math.round(node.position.x)}, y: {Math.round(node.position.y)}</p>
        </div>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button 
            danger 
            type="primary" 
            icon={<DeleteOutlined />} 
            onClick={handleDelete}
            block
            className='mt-6'
          >
            删除节点
          </Button>
  、
        </Space>
      </div>
    </Panel>
  );
};