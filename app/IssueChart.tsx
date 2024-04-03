'use client'
import React from 'react';
import {Card, Flex} from "@radix-ui/themes";
import {Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis} from "recharts";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueChart = ({open, inProgress, closed}: Props) => {
    const data = [
        {name: 'Open', value: open, color: 'var(--red-a9)'},
        {name: 'In Progress', value: inProgress, color: 'var(--violet-a9)'},
        {name: 'Closed', value: closed, color: 'var(--green-a9)'}

    ];

    return (
        <Card>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Bar dataKey="value" barSize={80}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color}  />
                        ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
        </Card>
    );
};

export default IssueChart;