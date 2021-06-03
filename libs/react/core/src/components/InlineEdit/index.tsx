import React, { useState, useEffect, useRef, useCallback } from 'react';
import DOMPurify from 'dompurify';
import styled, { css } from 'styled-components';

import { useKeyPress } from '../../hooks/useKeyPress';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const textStyle = css`
	text-align: left;
	font: inherit;
	color: inherit;
	text-align: inherit;
	padding: 0;
	background: none;
	border: none;
`;

const InputTextField = styled.input<{isActive: boolean}>`
	outline: none;
	${({ isActive }) => isActive
		? textStyle
		: css`
			display: none;
			cursor: pointer;
		`
}
`;

const InputTextCopy = styled.span<{isActive: boolean}>`
	cursor: pointer;
	:hover {
		border-bottom: 1px dashed #666666;
	}
	${({ isActive }) => !isActive
		? textStyle
		: css`
			display: none;
		`
}
`;

interface IInlineEditProps {
	text: string;
	onSetText: (value: string) => void;
}

export function InlineEdit(props: IInlineEditProps) {
	const { text, onSetText } = props;
	const [isInputActive, setIsInputActive] = useState(false);
	const [inputValue, setInputValue] = useState(text);

	const wrapperRef = useRef(null);
	const textRef = useRef(null);
	const inputRef = useRef(null);

	const enter = useKeyPress('Enter');
	const esc = useKeyPress('Escape');


	// check to see if the user clicked outside of this component
	useOnClickOutside(wrapperRef, () => {
		if (isInputActive) {
			onSetText(inputValue);
			setIsInputActive(false);
		}
	});

	const onEnter = useCallback(() => {
		if (enter) {
			onSetText(inputValue);
			setIsInputActive(false);
		}
	}, [enter, inputValue, onSetText]);

	const onEsc = useCallback(() => {
		if (esc) {
			setInputValue(text);
			setIsInputActive(false);
		}
	}, [esc, text]);

	// focus the cursor in the input field on edit start
	useEffect(() => {
		if (isInputActive) {
			inputRef.current.focus();
		}
	}, [isInputActive]);

	useEffect(() => {
		if (isInputActive) {
			// if Enter is pressed, save the text and close the editor
			onEnter();
			// if Escape is pressed, revert the text and close the editor
			onEsc();
		}
	}, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

	const handleInputChange = useCallback(
		(event) => {
			// sanitize the input a little
			setInputValue(DOMPurify.sanitize(event.target.value));
		},
		[setInputValue],
	);

	const handleSpanClick = useCallback(() => setIsInputActive(true), [setIsInputActive]);

	return (
		<span ref={wrapperRef}>
			<InputTextCopy
				ref={textRef}
				onClick={handleSpanClick}
				isActive={isInputActive}
			>
				{text}
			</InputTextCopy>
			<InputTextField
				ref={inputRef}
				// set the width to the input length multiplied by the x height
				// it's not quite right but gets it close
				style={{ minWidth: `${Math.ceil(inputValue.length)}ch` }}
				value={inputValue}
				onChange={handleInputChange}
				isActive={isInputActive}
			/>
		</span>
	);
}
