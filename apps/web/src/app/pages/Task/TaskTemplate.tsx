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
	Table, ITableColumn, TableCellFormats,
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

const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

const data = Array.from({ length: planets.length * 5 }, (_, i) => ({
	id: i + 1,
	distance: Math.floor(Math.random() * 1000),
	name: planets[Math.floor(Math.random() * planets.length)],
	moons: i % 9 + 1,
}));

const columns: ITableColumn[] = [
	{ name: 'id', label: 'ID', width: 30, fixedLeft: true, resizable: false, format: TableCellFormats.Checkbox },
	{ name: 'name', label: 'Name', format: TableCellFormats.StringUpperCase },
	{ name: 'distance', label: 'Distance', width: 50, align: TextAlignment.Center, fixedRight: true, format: TableCellFormats.Decimal },
	{ name: 'moons', label: 'Moons', width: 50, align: TextAlignment.Center, fixedRight: true, format: TableCellFormats.Integer },
]

const TaskTemplatePage = memo(() => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [checkedItems, setCheckedItems] = useState<number[]>([] as number[]);

	const formRef = useRef({ valid: false });
	const { mappedItems, isApiReady, read, save, remove, error, clearError } = useAppStore((state) => state.taskTemplate);
	const lookupStore = useAppStore((state) => state.lookup);

	const { formData, handleSubmit, handleFieldChange, errors, submitting, success } = useForm<TaskTemplateInput>({
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
			<Table
				columns={columns}
				data={data}
				checkedItems={checkedItems}
				onCheckItems={(ids) => setCheckedItems(ids as number[])}
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
