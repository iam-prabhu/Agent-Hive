'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../_components/Header'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, MiniMap, Controls, Panel, useOnSelectionChange, OnSelectionChangeParams, Node, Edge } from '@xyflow/react';
{/* @ts-ignore  */ }
import '@xyflow/react/dist/style.css';

import StartNode from '../_components/_customNodes/StartNode';
import AgentNode from '../_components/_customNodes/AgentNode';
import AgentToolsPanel from '../_components/AgentToolsPanel';
import { WorkflowContext } from '@/context/WorkflowContext';
import { useConvex, useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { Agent } from '@/types/AgentType';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import EndNode from '../_components/_customNodes/EndNode';
import IfElseNode from '../_components/_customNodes/IfElseNode';
import WhileNode from '../_components/_customNodes/WhileNode';
import UserApprovalNode from '../_components/_customNodes/UserApprovalNode';
import ApiNode from '../_components/_customNodes/ApiNode';
import SettingPanel from '../_components/SettingPanel';

// const initialNodes = [
//     { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' }, type: 'StartNode' },
//     { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' },type:'AgentNode' },
// ];
// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
export const nodeTypes = {
    StartNode: StartNode,
    AgentNode: AgentNode,
    EndNode: EndNode,
    IfElseNode: IfElseNode,
    WhileNode: WhileNode,
    UserApprovalNode: UserApprovalNode,
    ApiNode: ApiNode
};

function AgentBuilder() {

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const { agentId } = useParams();
    const { addedNodes, setAddedNodes, nodeEdges, setNodeEdges, setSelectedNode } = useContext(WorkflowContext)

    const convex = useConvex();
    const UpdateAgentDetail = useMutation(api.agent.UpdateAgentDetail)
    const [agentDetail, setAgentDetail] = useState<Agent>()
    useEffect(() => {
        GetAgentDetail();
    }, [])

    const GetAgentDetail = async () => {
        const result = await convex.query(api.agent.GetAgentById, {
            agentId: agentId as string
        })
        setAgentDetail(result)
    }

    useEffect(() => {
        if (agentDetail) {
            setNodes(agentDetail.nodes || [])
            setEdges(agentDetail.edges || [])
            setAddedNodes(agentDetail.nodes || [])
            setNodeEdges(agentDetail.edges || [])
        }

    }, [agentDetail, setAddedNodes, setNodeEdges])

    useEffect(() => {
        addedNodes && setNodes(addedNodes)
    }, [addedNodes])

    useEffect(() => {
        edges && setNodeEdges(edges);
        edges && console.log(edges)
    }, [edges])

    // useEffect(() => {
    //     (nodes || edges) && SaveNodesAndEdges();
    // }, [nodes, edges])

    const SaveNodesAndEdges = async () => {
        const result = await UpdateAgentDetail({
            //@ts-ignore
            id: agentDetail?._id,
            edges: nodeEdges,
            nodes: addedNodes,
        })
        console.log(result)
        toast.success("Saved!")
    }

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => {
            const updated = applyNodeChanges(changes, nodesSnapshot)
            queueMicrotask(() => setAddedNodes(updated))
            return updated

        }),
        [setAddedNodes],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        //@ts-ignore
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    const onNodeSelect = useCallback(({ nodes, edges }: OnSelectionChangeParams) => {
        setSelectedNode(nodes[0]);
        console.log(nodes)
    }, [])


    useOnSelectionChange({
        onChange: onNodeSelect
    })

    return (
        <div>
            <Header agentDetail={agentDetail} onPublish={SaveNodesAndEdges} />
            <div style={{ width: '100vw', height: '90vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    nodeTypes={nodeTypes}
                >
                    <MiniMap />
                    <Controls />
                    {/* @ts-ignore  */}
                    <Background variant='dots' gap={12} size={1} />
                    <Panel position='top-left'>
                        <AgentToolsPanel />
                    </Panel>
                    <Panel position='top-right'>
                        <SettingPanel />
                    </Panel>
                    <Panel position='bottom-center'>
                        <Button onClick={SaveNodesAndEdges}><Save />Save</Button>
                    </Panel>
                </ReactFlow>
            </div>
        </div>
    )
}

export default AgentBuilder