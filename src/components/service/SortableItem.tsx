import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import { Item } from './Item';

interface IProps {
    id: string,
    index: number,
    onDelete: (index: number) => void
}

export function SortableItem(props: IProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        //@ts-ignore
        <Item ref={setNodeRef} style={style} {...attributes} {...listeners} id={props.id} index={props.index} onDelete={(i: number) => props.onDelete(i)} />
    );
}