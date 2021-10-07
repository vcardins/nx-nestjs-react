import React from 'react';
import styled, { css } from 'styled-components';

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

const ToolbarSlot = styled.div<{ isLeft?: boolean }>`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	gap: 1em;
	${({ isLeft }) => isLeft ? css`justify-content: flex-start;` :  css`justify-content: flex-end;` };
`;

const ToolbarInlineSlot = styled.div``;

interface IToolbarSlot {
	id?: string;
	title?: string;
	inline?: boolean;
	icon: React.ReactNode;
	children: React.ReactNode;
}

interface IToolbarProps {
	id?: string;
	slots: {
		left?: IToolbarSlot[];
		right?: IToolbarSlot[];
	}
}

const buildToolbarItem = ({ inline, icon, ...props }: IToolbarSlot, position: Positioning) => {
	if (inline) {
		return (
			<ToolbarInlineSlot id={props.id}>
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
	const { id, slots } = props;

	if (!slots.left?.length && !slots.right?.length) {
		return null;
	}

	return (
		<ToolbarWrapper id={id}>
			{slots.left?.length && (
				<ToolbarSlot isLeft={true}>
					{slots.left.map((item) => buildToolbarItem(item, Positioning.Left))}
				</ToolbarSlot>
			)}
			{slots.right?.length && (
				<ToolbarSlot>
					{slots.right.map((item) => buildToolbarItem(item, Positioning.Right))}
				</ToolbarSlot>
			)}
		</ToolbarWrapper>
	);
});
