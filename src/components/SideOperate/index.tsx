/*
 * @Author: Shber
 * @Date: 2025-03-05 08:35:39
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-10 18:12:49
 * @Description: 
 */
import React, { useState, useCallback } from 'react';
import { Panel, useReactFlow } from '@xyflow/react';
import './index.scss'
import { Button, Divider, Space, Input } from 'antd';
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined
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
  const [isEditing, setIsEditing] = useState(false);
  const [labelText, setLabelText] = useState(node?.data?.label || '');
  const { setNodes } = useReactFlow();

  if (!node) return null;

  const handleDelete = () => {
    if (window.confirm('确定要删除这个节点吗？')) {
      onDelete(node.id);
    }
  };

  const handleLabelEdit = () => {
    setIsEditing(true);
  };

  const handleLabelChange = (e) => {
    setLabelText(e.target.value);
  };

  const handleLabelSave = () => {
    setIsEditing(false);
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === node.id
          ? { ...n, data: { ...n.data, label: labelText } }
          : n
      )
    );
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
          <p className="flex items-center gap-2">
            <strong>标签（可编辑）:</strong>
            {isEditing ? (
              <Input
                value={labelText}
                onChange={handleLabelChange}
                onPressEnter={handleLabelSave}
                onBlur={handleLabelSave}
                autoFocus
                size="small"
                style={{ width: '160px' }}
              />
            ) : (
              <span className="flex items-center gap-2 cursor-text" onClick={handleLabelEdit}>
                {labelText}
              </span>
            )}
          </p>
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
        </Space>
      </div>
    </Panel>
  );
};