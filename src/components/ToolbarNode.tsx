/*
 * @Author: Shber
 * @Date: 2025-03-05 08:21:39
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-10 15:46:00
 * @Description: 
 */
import React, { memo, useState } from 'react';
import { Handle, Position, NodeToolbar } from '@xyflow/react';

function ToolbarNode({ data }) {
  const [emoji, setEmoji] = useState(() => '🚀');

  return (
    <>
      <NodeToolbar isVisible>
        <button onClick={() => setEmoji('🚀')}>🚀</button>
        <button onClick={() => setEmoji('🔥')}>🔥</button>
        <button onClick={() => setEmoji('✨')}>✨</button>
      </NodeToolbar>
      <div style={{ padding: '10px 20px' }}>
        <div>{emoji}</div>
      </div>
      <Handle type="target" className="handle" position={Position.Left} />
      <Handle type="source" className="handle" position={Position.Right} />

      <div
        style={{
          position: 'absolute',
          color: '#555555',
          bottom: -15,
          fontSize: 8,
        }}
      >{data.label}</div>
    </>
  );
}

export default memo(ToolbarNode);