import styled from 'styled-components';

import React, { memo, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable camelcase */
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_save } from 'react-icons-kit/md/ic_save';
import { ic_refresh } from 'react-icons-kit/md/ic_refresh';
import { ic_close } from 'react-icons-kit/md/ic_close';
import { ic_edit } from 'react-icons-kit/md/ic_edit';
import { ic_home } from 'react-icons-kit/md/ic_home';
import { ic_mail } from 'react-icons-kit/md/ic_mail';
import { ic_check } from 'react-icons-kit/md/ic_check';
/* eslint-enable camelcase */

import { Panel, Form, TextInput, FieldGroup, Submit, useForm, Button, Icon, InlineEdit, Popover, Drawer } from '@xapp/react';
import { HouseholdInput, HouseholdMemberOutput, HouseholdOutput, HouseholdRoomOutput } from '@xapp/shared/types';

import { useAppStore } from '@xapp/state';

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
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const formRef = useRef({ valid: false });
	const {
		isApiReady,
		items,
		read,
		save,
		remove,
		removeRoom,
		error,
		clearError,
	} = useAppStore((state) => state.household);
	const lookupStore = useAppStore((state) => state.lookup);

	const form = useForm<HouseholdInput>({
		initialValues,
		onSubmit: save,
		onSuccess: handleClosePanel,
	});

	useEffect(() => {
		if (isApiReady && lookupStore.isApiReady) {
			read();
		}
	}, [isApiReady, lookupStore.isApiReady, read]);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			clearError();
		}
	}, [error, clearError]);

	function handleSave(name: string, data: HouseholdOutput) {
		save({ name }, data.id);
	}

	function handleClosePanel() {
		setIsDrawerOpen(false);
	}

	function handleSubmitForm() {
		form.onSubmit();
	}

	return (
		<Panel tag="household-page" title="Household" padded>
			<HouseholdList>{items?.map(renderItem)}</HouseholdList>
			<FieldGroup sided padded>
				<Button onClick={() => read()}>
					<Icon icon={ic_refresh} />
				</Button>
				<Button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
					<Icon icon={ic_edit} />
				</Button>
			</FieldGroup>
			<Drawer
				id="household-form"
				isOpen={isDrawerOpen}
				size="300px"
				onClose={handleClosePanel}
				position="right"
				overflow="hidden"
			>
				<Form
					ref={formRef}
					data={form.data}
					onChange={form.onFieldChange}
					onSubmit={handleSubmitForm}
					schema={validationSchema}
				>
					<Panel
						tag="household-form"
						title="Create Household"
						padded
						footer={
							<FieldGroup sided>
								<Submit loading={form.submitting} success={form.success}>
									<Icon icon={ic_save} /> Save
								</Submit>
								<Button onClick={handleClosePanel}>
									<Icon icon={ic_close} /> Close
								</Button>
							</FieldGroup>
						}
					>
						<TextInput
							type="text"
							label="Name"
							name="name"
							autoComplete="true"
							value={form.data.name}
							error={form.errors?.name}
						/>
					</Panel>
				</Form>
			</Drawer>
		</Panel>
	);

	function renderItem(household: HouseholdOutput) {
		return (
			<HouseholdItem key={household.id}>
				<HouseholdItemInfo>
					<InlineEdit
						text={household.name}
						onSetText={(name) => (name !== household.name ? handleSave(name, household) : undefined)}
					/>
					<Popover trigger={<HouseholdIcon icon={ic_home} />}>
						{(onClose) => (
							<HouseholdRoom onClose={onClose} householdId={household.id} items={household.rooms} />
						)}
					</Popover>
					<Popover trigger={<HouseholdIcon icon={ic_mail} />}>
						{(onClose) => (
							<HouseholdInvitation onClose={onClose} householdId={household.id} />
						)}
					</Popover>
					<Popover trigger={<HouseholdIcon icon={ic_delete} />}>
						{(onClose) => (
							<ActionConfirm>
								<div>Confirm item deletion?</div>
								<FieldGroup sided>
									<Button onClick={() => remove(household.id)}>Delete</Button>
									<Button onClick={onClose}>Cancel</Button>
								</FieldGroup>
							</ActionConfirm>
						)}
					</Popover>
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
				<Popover trigger={<HouseholdIcon icon={ic_delete} />}>
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
				</Popover>
				<Popover trigger={<HouseholdIcon icon={ic_check} />}>
					{(onClose) => <HouseholdTask onClose={onClose} householdId={householdId} roomId={id} roomTypeId={roomTypeId} />}
				</Popover>
			</HouseholdItemInfo>
		);
	}
});

export default HouseholdPage;
