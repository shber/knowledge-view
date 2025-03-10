/*
 * @Author: Shber
 * @Date: 2025-03-05 08:22:07
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-10 15:53:03
 * @Description: 
 */
import React, { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';

function ResizerNode({ data }) {
  return (
    <>
      <NodeResizer minWidth={50} minHeight={50} 
       handleStyle={{ 
        width: 8, 
        height: 8, 
        borderRadius: '50%',
        backgroundColor: '#fff',
        border: '1px solid #1a192b'
      }}
      
      />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'space-evenly',
          left: 0,
        }}
      >
        <Handle
          style={{ position: 'relative', left: 0, transform: 'none' }}
          id="a"
          type="source"
          position={Position.Bottom}
        />
        <Handle
          style={{ position: 'relative', left: 0, transform: 'none' }}
          id="b"
          type="source"
          position={Position.Bottom}
        />
      </div>
    </>
  );
}

export default memo(ResizerNode);