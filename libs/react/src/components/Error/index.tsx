import React from 'react';
import { Center } from '../Center';
import { Code, Emoji, Title, Message } from './styles';
import { Link } from 'react-router-dom';

type IErrorProps = {
	code: string;
	title?: string;
	message: string;
};

export const Error = ({ code, title = 'Ooooops!', message }: IErrorProps) => (
	<Center width={400} unit="px">
		<Emoji>😭</Emoji>
		<Code>Error {code}</Code>
		<Title>{title}</Title>
		<Message>{message}</Message>
		<Link to="/">Return to Home</Link>
	</Center>
);
