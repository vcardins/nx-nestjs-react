import React from 'react';
import styled from 'styled-components';

import { Positioning } from '@xapp/shared/types';
import { Popover } from '../Popover';

const ToolbarWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: inherit;
	padding: 0 0.5em;
`;

const ToolbarSlot = styled.div<{ position?: Positioning }>`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	gap: 1em;
	justify-content: ${({ position }) => {
		switch (position) {
			case Positioning.Left:
				return 'flex-start';
			case Positioning.Right:
				return 'flex-end';
			default:
				return 'center';
		}
	}};
`;

const ToolbarInlineSlot = styled.div``;

interface IToolbarSlot {
	id?: string;
	title?: string;
	inline?: boolean;
	icon?: React.ReactNode;
	children: React.ReactNode;
}

interface IToolbarProps {
	id?: string;
	alignment: {
		left?: IToolbarSlot[];
		center?: IToolbarSlot[];
		right?: IToolbarSlot[];
	}
}

const buildToolbarItem = ({ inline, icon, ...props }: IToolbarSlot, position: Positioning) => {
	if (inline) {
		return (
			<ToolbarInlineSlot id={props.id} key={props.id}>
				{ props.children }
			</ToolbarInlineSlot>
		);
	}

	return (
		<Popover
			key={props.id}
			position={position}
			trigger={icon}
			hideTitle={!props.title}
			{...props}
		/>
	);
};

export const Toolbar = React.memo(function Toolbar(props: IToolbarProps) {
	const { id, alignment = {} } = props;

	const slots = Object.keys(alignment).length ? Object.keys(alignment) : [];

	if (!slots.length) {
		return null;
	}

	return (
		<ToolbarWrapper id={id}>
			{slots.map((position) => (
				<ToolbarSlot key={`${id}-${position}`} position={position as Positioning}>
					{alignment[position]?.filter(Boolean)?.map((item: IToolbarSlot) => buildToolbarItem(item, position as Positioning))}
				</ToolbarSlot>
			))}
		</ToolbarWrapper>
	);
});

Toolbar.displayName = 'Toolbar';
