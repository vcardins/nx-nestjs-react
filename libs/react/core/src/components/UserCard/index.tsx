import React from 'react';
import styled from 'styled-components';

const UserCardWrapper = styled.span`
	/* display: flex; */
`;

const UserCardText = styled.span`
	/* display: flex; */
`;

import { Avatar } from '../Avatar';
import { IUserCardProps } from './IUserCardProps';

function UserCard(props: IUserCardProps) {
	const { id, showAvatar = false, size, user} = props;
	const avatar = showAvatar
		? (
			<Avatar
				id="header-avatar"
				inverse
				avatar={user.avatar || user.displayName}
				size={size}
			/>
		) : null;

	return (
		<UserCardWrapper id={id}>
			{avatar}
			<UserCardText>{user.displayName}</UserCardText>
		</UserCardWrapper>
	);
}

export { UserCard };
