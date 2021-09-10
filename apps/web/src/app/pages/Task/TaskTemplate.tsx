import React, { memo, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable camelcase */
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_save } from 'react-icons-kit/md/ic_save';
import { ic_refresh } from 'react-icons-kit/md/ic_refresh';
/* eslint-enable camelcase */

import {
	Panel,
	Form,
	TextInput,
	FieldGroup,
	Submit,
	useForm,
	Button,
	Icon,
	DataTable, ITableColumn, TableCellFormats, RenderProps,
	Drawer,
	InlineEdit,
} from '@xapp/react';
import { TaskTemplateInput, TaskTemplateOutput, Frequencies, TextAlignment } from '@xapp/shared/types';

import { useAppStore } from '@xapp/state';

import { validationSchema } from './schema';
import { TaskTemplateList, TaskTemplateItem, TaskTemplateItemInfo, TaskTemplateIcon } from './components/TaskTemplate';

const initialValues: TaskTemplateInput = {
	name: '',
	description: '',
	isActive: true,
	estimatedCompletionTime: 30,
	daysOfWeek: 0,
	rewardPoints: 1,
	frequencyId: Frequencies.Weekly,
};

const columns: ITableColumn[] = [
	{ key: 'roomTypeId', label: 'Room Type', width: 80 },
	{ key: 'name', label: 'Name', width: 250 },
	{ key: 'description', label: 'Description' },
	{ key: 'estimatedCompletionTime', label: 'ECT', width: 35, align: TextAlignment.Center, fixedRight: true, format: TableCellFormats.Integer },
	{ key: 'rewardPoints', label: 'Reward Points', width: 80, align: TextAlignment.Center, format: TableCellFormats.Integer },
	{ key: 'frequencyId', label: 'Frequency', width: 80 },
	{ key: 'daysOfWeek', label: 'Days', width: 35, align: TextAlignment.Center },
	{ key: 'isActive', label: 'Active', width: 40, align: TextAlignment.Center, fixedRight: true, format: TableCellFormats.Boolean },
]

const TaskTemplatePage = memo(() => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const formRef = useRef({ valid: false });
	const {
		mappedItems,
		items,
		isApiReady,
		read,
		save,
		remove,
		status,
		error,
		checkedItems,
		setCheckedItems,
		expandedItems,
		setExpandedItems,
		clearError,
	} = useAppStore((state) => state.taskTemplate);
	const lookupStore = useAppStore((state) => state.lookup);

	const { formData, handleSubmit, handleFieldChange, errors, submitting, success } = useForm<TaskTemplateInput>({
		initialValues,
		onSubmit: save,
	});

	useEffect(() => {
		if (isApiReady && !items.length) {
			read();
		}
	}, [isApiReady, items.length, read]);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			clearError();
		}
	}, [error, clearError]);

	function handleClosePanel() {
		setIsDrawerOpen(false);
	}

	function handleSubmitForm() {
		handleSubmit(handleClosePanel);
	}

	// Object.keys(mappedItems[roomTypeId]).forEach((frequencyId) => {
	// 	const frequency = lookupStore?.frequencies?.[frequencyId];
	// 	const tasks = mappedItems[roomTypeId][frequencyId];

	// 	return tasks.map(renderTaskTemplate);
	// })
	return (
		<Panel
			title="Task Template"
			tag="task-template"
			overflow="hidden"
		>
			<Drawer
				id="household-form"
				isOpen={isDrawerOpen}
				size="300px"
				onClose={handleClosePanel}
				position="right"
				overflow="hidden"
			>
				<Panel
					tag="household-form"
					title="Create Household"
					padded
					footer={
						<FieldGroup sided>
							<Submit loading={submitting} success={success}>
								<Icon icon={ic_save} />
							</Submit>
							<Button onClick={() => read?.()}>
								<Icon icon={ic_refresh} />
							</Button>
						</FieldGroup>
					}
				>
					<Form
						ref={formRef}
						data={formData}
						onChange={handleFieldChange}
						onSubmit={handleSubmitForm}
						schema={validationSchema}
					>
						<TextInput
							type="text"
							label="Name"
							name="name"
							autoComplete="true"
							value={formData.name}
							error={errors?.name}
						/>
					</Form>
				</Panel>
			</Drawer>
			<DataTable
				isDataLoaded={status === 'success'}
				columns={columns}
				data={items}
				checkedItems={checkedItems}
				onCheckItems={setCheckedItems}
				expandedItems={expandedItems}
				onExpandItems={setExpandedItems}
				customRenderers={getCustomRenderers()}
				onGetExpandedContent={getExpandedContent}
			/>
			{/* <TaskTemplateList>
				{lookupStore?.roomTypes && Object.keys(mappedItems).map((roomTypeId) => {
					const roomType = lookupStore?.roomTypes?.[roomTypeId];
					return (
						<div key={roomType.id}>
							<br/>
							<h3>{roomType.name}</h3>
							<TaskTemplateList>
								{ mappedItems[roomTypeId].map(renderTaskTemplate) }
							</TaskTemplateList>
						</div>
					);
			})}
			</TaskTemplateList> */}
		</Panel>
	);

	function getCustomRenderers() {
		return {
			roomTypeId: ({ item, column }: RenderProps<TaskTemplateOutput>) => {
				return lookupStore?.roomTypes?.[item.roomTypeId]?.name;
			},
			frequencyId: ({ item, column }: RenderProps<TaskTemplateOutput>) => {
				return lookupStore?.frequencies?.[item.frequencyId]?.name;
			},
			daysOfWeek: ({ item, column }: RenderProps<TaskTemplateOutput>) => {
				return <span>{item.daysOfWeek}</span>;
			},
		};
	}

	function getExpandedContent(item: TaskTemplateOutput) {
		return (
			<p>{item.name}</p>
		);
	}

	function renderTaskTemplate(task: TaskTemplateOutput) {
		return (
			<TaskTemplateItem key={task.id}>
				<TaskTemplateItemInfo>
					<InlineEdit text={task.name} onSetText={(name) => save({ ...task, name }, task.id)} />
					<TaskTemplateIcon icon={ic_delete} onClick={() => remove(task.id)} />
				</TaskTemplateItemInfo>
				{/* <TaskTemplateItemInvite>
					<input
						type="text"
						name="invitation-firstName"
						value={formData.invitation.firstName}
					/>
					<input
						type="text"
						name="invitation-email"
						value={formData.invitation.email}
					/>
					<TaskTemplateIcon icon={ic_save} onClick={() => invite({ taskId: task.id, ...formData.invitation })} />
				</TaskTemplateItemInvite> */}
			</TaskTemplateItem>
		);
	}
});

export default TaskTemplatePage;
