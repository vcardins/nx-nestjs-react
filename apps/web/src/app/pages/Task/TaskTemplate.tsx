import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable camelcase */
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_save } from 'react-icons-kit/md/ic_save';
import { ic_close } from 'react-icons-kit/md/ic_close';
import { ic_edit } from 'react-icons-kit/md/ic_edit';
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
	DataTable, RenderProps,
	Drawer,
	InlineEdit,
	FormBuilder,
	Popover,
} from '@xapp/react';
import { TaskTemplateInput, TaskTemplateOutput, Frequencies, FieldType, IFieldInfo, DataFilter } from '@xapp/shared/types';

import { useAppStore } from '@xapp/state';
import { ApiCallStatus } from '@xapp/state/shared';

import { validationSchema } from './schema';

const initialValues: TaskTemplateInput = {
	name: '',
	description: '',
	isActive: true,
	estimatedCompletionTime: 30,
	daysOfWeek: 0,
	rewardPoints: 1,
	frequencyId: Frequencies.Weekly,
};

const domain = 'task-template';
const tableTag = `${domain}-table`;

const handleBuildIds = {
	header: (key: string) => `${tableTag}-header-${key}`,
	row: ({ id }: TaskTemplateOutput) => `${tableTag}-row-${id}`,
	cell: (key: string, { id }: TaskTemplateOutput) => `${tableTag}-cell-${key}-${id}`,
	checkbox: (key: string, { id }: TaskTemplateOutput) => `${tableTag}-checkbox-${key}-${id}`,
	allCheckbox: () => 'checkbox-all',
	expander: (key: string, { id }: TaskTemplateOutput) => `${tableTag}-expander-${key}-${id}`,
}

const settings = {
	maxExpandedContentHeight: '200px',
};

const TaskTemplatePage = memo(() => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const formRef = useRef({ valid: false });
	const {
		isApiReady, headers, /*mappedItems,*/ items, read, save, remove, filter,
		status, filteredItems, checkedItems, setCheckedItems, expandedItems, setExpandedItems,
		error, clearError,
	} = useAppStore((state) => state.taskTemplate);
	const lookupStore = useAppStore((state) => state.lookup);

	const form = useForm<TaskTemplateInput>({
		initialValues,
		onSubmit: save,
		onSuccess: handleClosePanel,
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

	const filterControls: IFieldInfo[] = useMemo(() => (lookupStore?.frequencies && lookupStore?.roomTypes) && (
		[
			{ name: 'roomTypeId', type: FieldType.Select, label: 'Room Type', options: Object.values(lookupStore?.roomTypes).map(({ id, name }) => ({ id, name }))},
			{ name: 'name', type: FieldType.Text, label: 'Name',},
			{ name: 'estimatedCompletionTime', type: FieldType.Number, label: 'Completion Type' },
			{ name: 'rewardPoints', type: FieldType.Number, label: 'Points' },
			{ name: 'frequencyId', type: FieldType.Select, label: 'Frequency', options: Object.values(lookupStore?.frequencies).map(({ id, name }) => ({ id, name })) },
			{ name: 'daysOfWeek', type: FieldType.Days, label: 'Days' },
			{ name: 'isActive', type: FieldType.Boolean, label: 'Active' },
		]),
		[lookupStore?.roomTypes, lookupStore?.frequencies]
	);

	const handleEditItem = (item: TaskTemplateOutput) => {
		form.onUpdateData(item, true);
		setTimeout(() => {
			setIsDrawerOpen(true);
		}, 100);
	};

	// Object.keys(mappedItems[roomTypeId]).forEach((frequencyId) => {
	// 	const frequency = lookupStore?.frequencies?.[frequencyId];
	// 	const tasks = mappedItems[roomTypeId][frequencyId];

	// 	return tasks.map(renderTaskTemplate);
	// })
	return (
		<Panel
			title="Task Template"
			tag={domain}
			overflow="hidden"
		>
			<Drawer
				id="task-template-form"
				isOpen={isDrawerOpen}
				size="400px"
				onClose={handleClosePanel}
				position="right"
				overflow="hidden"
			>
				<Panel
					tag="task-template-form"
					title="Create Household"
					padded
					footer={
						<FieldGroup sided>
							<Submit loading={form.submitting} success={form.success}>
								<Icon icon={ic_save} />
							</Submit>
							<Button onClick={handleClosePanel}>
								<Icon icon={ic_close} />
							</Button>
						</FieldGroup>
					}
				>
					<Form
						ref={formRef}
						data={form.data}
						onChange={form.onFieldChange}
						onSubmit={form.onSubmit}
						schema={validationSchema}
					>
						<TextInput
							type="text"
							label="Name"
							name="name"
							autoComplete="true"
							value={form.data.name}
							error={form.errors?.name}
						/>
					</Form>
				</Panel>
			</Drawer>
			<DataTable
				id="task-template-table"
				isLoading={status === ApiCallStatus.Loading}
				columns={headers}
				data={filteredItems ? filteredItems : items}
				onBuildIds={handleBuildIds}
				checkedItems={checkedItems}
				onCheckItems={setCheckedItems}
				expandedItems={expandedItems}
				onExpandItems={setExpandedItems}
				customRenderers={getCustomRenderers()}
				onGetExpandedContent={getExpandedContent}
				actions={[
					(item: TaskTemplateOutput) => <Icon id="edit" title="Edit" icon={ic_edit} onClick={() => handleEditItem(item)} />,
					(item: TaskTemplateOutput) => (
						<Popover trigger={<Icon id="delete" title="Delete" icon={ic_delete} />}>
							{(onClose) => (
								<div>
									<div>Confirm item deletion?</div>
									<FieldGroup sided>
										<Button onClick={() => remove(item.id)}>Delete</Button>
										<Button onClick={onClose}>Cancel</Button>
									</FieldGroup>
								</div>
							)}
						</Popover>
					)
				]}
				filtersForm={(
					<FormBuilder<Record<string, TaskTemplateInput>, DataFilter>
						id="filters-form"
						tag="filters"
						fields={filterControls}
						onSubmit={filter}
						onAfterReset={() => filter(null)}
					/>
				)}
				settings={settings}
			/>
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
			<div>
				{ Array.from({ length: 20 }, (_, index) => <p key={index}>{item.name} - {index}</p>) }
			</div>
		);
	}

// import { TaskTemplateItem, TaskTemplateItemInfo, TaskTemplateIcon } from './components/TaskTemplate';
// function renderTaskTemplate(task: TaskTemplateOutput) {
// 	return (
// 		<TaskTemplateItem key={task.id}>
// 			<TaskTemplateItemInfo>
// 				<InlineEdit text={task.name} onSetText={(name) => save({ ...task, name }, task.id)} />
// 				<TaskTemplateIcon icon={ic_delete} onClick={() => remove(task.id)} />
// 			</TaskTemplateItemInfo>
// 			{/* <TaskTemplateItemInvite>
// 				<input
// 					type="text"
// 					name="invitation-firstName"
// 					value={form.formData.invitation.firstName}
// 				/>
// 				<input
// 					type="text"
// 					name="invitation-email"
// 					value={form.formData.invitation.email}
// 				/>
// 				<TaskTemplateIcon icon={ic_save} onClick={() => invite({ taskId: task.id, ...form.formData.invitation })} />
// 			</TaskTemplateItemInvite> */}
// 		</TaskTemplateItem>
// 	);
// }
});

export default TaskTemplatePage;
