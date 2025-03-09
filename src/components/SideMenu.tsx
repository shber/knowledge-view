/*
 * @Author: Shber
 * @Date: 2025-03-05 08:35:39
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-09 21:27:49
 * @Description: 
 */
import React from 'react';
import { Button, Space } from 'antd';

const nodeTypes = [
  { label: '默认节点', type: 'default' },
  { label: '输入节点', type: 'input' },
  { label: '输出节点', type: 'output' },
  { label: '工具栏节点', type: 'tools' },
  { label: '可调节节点', type: 'resizer' },
  { label: '圆形节点', type: 'circle' },
  { label: '文本节点', type: 'textinput' },
];

export default ({ onCreateNode }) => {
  return (
    <div className='side_menu_body shadow-sm'>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">添加节点</h3>
        <Space direction="vertical" style={{ width: '100%' }}>
          {nodeTypes.map((node) => (
            <Button
              key={node.type}
              onClick={() => onCreateNode(node)}
              style={{ width: '100%' }}
            >
              {node.label}
            </Button>
          ))}
        </Space>
      </div>
    </div>
  );
};