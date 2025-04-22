// src/components/CareerGraph.tsx
import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { RecommendationDetails } from '../types';

interface Props {
  data: RecommendationDetails[];
  onSelectCareer: (careerName: string) => void;
}

const CareerGraph: React.FC<Props> = ({ data, onSelectCareer }) => {
  const rootId = 'root';
  const rootNode: Node = {
    id: rootId,
    data: { label: 'Career Paths' },
    position: { x: 0, y: 0 },
    type: 'default',
    style: {
      background: '#4F46E5',
      color: '#fff',
      borderRadius: 12,
      padding: 10,
      fontWeight: 600,
    },
  };

  const childNodes: Node[] = data.map((item, index) => ({
    id: item.career,
    data: { label: item.career },
    position: { x: 300, y: index * 100 },
    style: {
      background: '#10B981',
      color: '#fff',
      borderRadius: 10,
      padding: 10,
      cursor: 'pointer',
      boxShadow: '0 0 10px rgba(16,185,129,0.6)',
      fontWeight: 600,
    },
  }));

  const edges: Edge[] = data.map((item) => ({
    id: `edge-${item.career}`,
    source: rootId,
    target: item.career,
    animated: true,
    type: 'default',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: {
      stroke: '#a855f7',
      strokeWidth: 2,
    },
  }));

  const [nodes, , onNodesChange] = useNodesState([rootNode, ...childNodes]);
  const [edgesState, , onEdgesChange] = useEdgesState(edges);

  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.id !== rootId) {
      onSelectCareer(node.id);
    }
  }, [onSelectCareer]);

  return (
    <div className="w-full h-[500px] bg-gradient-to-b from-indigo-100 to-purple-100 rounded-2xl border shadow-xl p-2">
      <ReactFlow
        nodes={nodes}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
      >
        <Background gap={16} color="#d9d9d9" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default CareerGraph;
