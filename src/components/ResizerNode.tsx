/*
 * @Author: Shber
 * @Date: 2025-03-05 08:21:48
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-10 17:12:07
 * @Description: 
 */
import React, { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';

function ResizerNode({ data }) {
  return (
    <div>
      <NodeResizer 
        minWidth={160} 
        minHeight={80}
        lineStyle={{ borderWidth: 1, borderColor: '#f60' }}
        handleStyle={{ 
          width: 8, 
          height: 8, 
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: '1px solid #1a192b'
        }}
      />
      <Handle 
        type="target" 
        position={Position.Left}
        className="handle"
      />
      <div className="node-content">
        <div className="node-header">
          {data.label}
        </div>
        <div className="node-body">
          {data.description || 'Resizable Node'}
        </div>
      </div>
      <Handle type="target" className="handle" position={Position.Right} />
    </div>
  );
}

export default memo(ResizerNode);