'use client'
import React from 'react';
import {Select} from "@radix-ui/themes";

const AssigneeSelect = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..."/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="1">John Doe</Select.Item>
                    <Select.Item value="2">Jane Doe</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;