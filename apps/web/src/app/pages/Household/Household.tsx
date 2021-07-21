import styled from 'styled-components';

import React, { memo, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable camelcase */
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_send } from 'react-icons-kit/md/ic_send';
import { ic_refresh } from 'react-icons-kit/md/ic_refresh';
import { ic_home } from 'react-icons-kit/md/ic_home';
import { ic_mail } from 'react-icons-kit/md/ic_mail';
import { ic_check } from 'react-icons-kit/md/ic_check';
/* eslint-enable camelcase */

import { Page, Form, TextInput, FieldGroup, Submit, useForm, Button, Icon, InlineEdit, Dropdown } from '@xapp/react';
import { HouseholdInput, HouseholdMemberOutput, HouseholdOutput, HouseholdRoomOutput } from '@xapp/shared/types';

import { useStore } from '@xapp/state';

import { validationSchema } from './schema';
import {
	HouseholdList,
	HouseholdItem,
	HouseholdIcon,
	HouseholdItemInfo,
	HouseholdRoom,
	HouseholdInvitation,
	HouseholdTask,
} from './components';

const initialValues: HouseholdInput = { name: '' };

const ActionConfirm = styled.div`
	padding: 0.5em;
`;

const ActionConfirmButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;

const HouseholdPage = memo(() => {
	const formRef = useRef({ valid: false });
	const {
		items = [],
		isApiReady,
		read,
		save,
		remove,
		removeRoom,
		error,
		clearError,
	} = useStore((state) => state.household);
	const lookupStore = useStore((state) => state.lookup);

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<HouseholdInput>({
		initialValues,
		onSubmit: save,
	});

	useEffect(() => {
		if (isApiReady) {
			read();
		}
	}, [isApiReady, read]);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			clearError();
		}
	}, [error, clearError]);

	function handleSave(name: string, data: HouseholdOutput) {
		save({ name }, data.id);
	}

	return (
		<Page title="Household" padded>
			<Form
				ref={formRef}
				data={formData}
				onChange={handleChange}
				onSubmit={handleSubmit}
				schema={validationSchema}
			>
				<TextInput
					type="text"
					label="Name"
					name="name"
					autoComplete="true"
					value={formData.name}
					error={errors?.['name']}
				/>
				<FieldGroup sided>
					<Submit loading={submitting} success={success}>
						<Icon icon={ic_send} />
					</Submit>
					<Button onClick={() => read()}>
						<Icon icon={ic_refresh} />
					</Button>
				</FieldGroup>
			</Form>
			<HouseholdList>{items?.map(renderItem)}</HouseholdList>
		</Page>
	);

	function renderItem(household: HouseholdOutput) {
		return (
			<HouseholdItem key={household.id}>
				<HouseholdItemInfo>
					<InlineEdit
						text={household.name}
						onSetText={(name) => (name !== household.name ? handleSave(name, household) : undefined)}
					/>
					<Dropdown hideChevron={true} trigger={<HouseholdIcon icon={ic_home} />}>
						{(onClose) => (
							<HouseholdRoom onClose={onClose} householdId={household.id} items={household.rooms} />
						)}
					</Dropdown>
					<Dropdown hideChevron={true} trigger={<HouseholdIcon icon={ic_mail} />}>
						{(onClose) => (
							<HouseholdInvitation onClose={onClose} householdId={household.id} />
						)}
					</Dropdown>
					<Dropdown hideChevron={true} trigger={<HouseholdIcon icon={ic_delete} />}>
						{(onClose) => (
							<ActionConfirm>
								<div>Confirm item deletion?</div>
								<FieldGroup sided>
									<Button onClick={() => remove(household.id)}>Delete</Button>
									<Button onClick={onClose}>Cancel</Button>
								</FieldGroup>
							</ActionConfirm>
						)}
					</Dropdown>
				</HouseholdItemInfo>
				<div>
					<b>Members</b>
					<div>{household?.members?.map(renderMembersList)}</div>
				</div>
				<div>
					<b>Rooms</b>
					<div>{lookupStore.roomTypes && household?.rooms?.map(renderRoomsList)}</div>
				</div>
			</HouseholdItem>
		);
	}

	function renderMembersList({ id, userId }: HouseholdMemberOutput) {
		return <p key={id}>{userId}</p>;
	}

	function renderRoomsList({ id, householdId, roomTypeId, customName }: HouseholdRoomOutput) {
		return (
			<HouseholdItemInfo key={id}>
				<span>{customName || lookupStore.roomTypes?.[roomTypeId].name}</span>
				<Dropdown hideChevron={true} trigger={<HouseholdIcon icon={ic_delete} />}>
					{(onClose) => (
						<ActionConfirm>
							<div>
								Are you sure you want
								<br />
								to remove this room?
							</div>
							<br />
							<ActionConfirmButtonWrapper>
								<Button onClick={() => removeRoom(householdId, id)}>Delete</Button>
								<Button onClick={onClose}>Cancel</Button>
							</ActionConfirmButtonWrapper>
						</ActionConfirm>
					)}
				</Dropdown>
				<Dropdown hideChevron={true} trigger={<HouseholdIcon icon={ic_check} />}>
					{(onClose) => <HouseholdTask onClose={onClose} roomId={id} roomTypeId={roomTypeId} />}
				</Dropdown>
			</HouseholdItemInfo>
		);
	}
});

export default HouseholdPage;
