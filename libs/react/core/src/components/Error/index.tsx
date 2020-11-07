import React from 'react';
import { Center } from '../Center';
import { Code, Emoji, Title, Message } from './styles';
import { Link } from 'react-router-dom';

type IProps = {
	code: string;
	title?: string;
	message: string;
};

const Error = ({ code, title = 'Ooooops!', message }: IProps) => (
	<Center width={400} unit="px">
		<Emoji>😭</Emoji>
		<Code>Error {code}</Code>
		<Title>{title}</Title>
		<Message>{message}</Message>
		<Link to="/">Return to Home</Link>
	</Center>
);

export { Error };
