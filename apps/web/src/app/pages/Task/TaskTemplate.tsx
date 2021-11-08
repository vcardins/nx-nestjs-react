import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable camelcase */
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_save } from 'react-icons-kit/md/ic_save';
import { ic_close } from 'react-icons-kit/md/ic_close';
import { ic_edit } from 'react-icons-kit/md/ic_edit';

import { ic_filter_list } from 'react-icons-kit/md/ic_filter_list';
import { ic_view_headline_outline } from 'react-icons-kit/md/ic_view_headline_outline';
/* eslint-enable camelcase */

import {
	Panel,
	Form,
	TextInput,
	FieldGroup,
	useForm,
	Button,
	Icon,
	DataTable, ITableProps,
	RenderProps,
	Drawer,
	Toolbar,
	ListItems,
	InlineEdit,
	FormBuilder,
	Popover,
	Checkbox,
	Select,
} from '@xapp/react';
import {
	TaskTemplateInput,
	TaskTemplateOutput,
	Frequencies,
	FieldType,
	DataFilter,
	PaginationMode,
} from '@xapp/shared/types';

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
	roomTypeId: null,
};

const domain = 'task-template';

const getId = (tag: string) => `${domain}-${tag}`;

const getTableId = (tag: string, key?: string, id?: number) =>
	`${getId('table')}-${tag}${key ? `-${key}` : ''}${id ? `-${id}` : ''}`;

const handleBuildIds: ITableProps['onBuildIds'] = {
	header: (key: string) => getTableId('header', key),
	row: ({ id }: TaskTemplateOutput) => getTableId('row', null, id),
	cell: (key: string, { id }: TaskTemplateOutput) => getTableId('cell', key, id),
	checkbox: ({ id }: TaskTemplateOutput) => getTableId('checkbox', null, id),
	checkboxAll: () => getTableId('checkbox-all'),
	expander: ({ id }: TaskTemplateOutput) => getTableId('expander', null, id),
};

const settings = {
	maxExpandedContentHeight: '200px',
};

const TaskTemplatePage = memo(() => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const formRef = useRef({ valid: false });
	const store = useAppStore((state) => state.taskTemplate);
	const lookupStore = useAppStore((state) => state.lookup);

	const form = useForm<TaskTemplateInput>({
		initialValues,
		onSubmit: store.save,
		onSuccess: handleClosePanel,
	});

	useEffect(() => {
		if (store.isApiReady && !store.items.length) {
			store.read();
		}
	}, [store.isApiReady, store.items.length, store.read]);

	useEffect(() => {
		if (store.error) {
			toast.error(store.error.message);
			store.clearError();
		}
	}, [store.error, store.clearError]);

	function handleClosePanel() {
		setIsDrawerOpen(false);
	}

	const actions = useMemo(
		() => [
			(item: TaskTemplateOutput) => (
				<Icon
					id={getTableId('edit', null, item.id)}
					title="Edit"
					icon={ic_edit}
					onClick={() => {
						form.onUpdateData(item, true);
						setTimeout(() => setIsDrawerOpen(true), 100);
					}}
				/>
			),
			(item: TaskTemplateOutput) => (
				<Popover trigger={
					<Icon
						id={getTableId('delete', null, item.id)}
						title="Delete"
						icon={ic_delete}
					/>
				}>
					{(onClose) => (
						<div>
							<div>Confirm item deletion?</div>
							<FieldGroup sided>
								<Button onClick={() => store.remove(item.id)}>Delete</Button>
								<Button onClick={onClose}>Cancel</Button>
							</FieldGroup>
						</div>
					)}
				</Popover>
			),
		],
		[form.onUpdateData, store.remove]
	);


	const roomTypes = useMemo(() => lookupStore?.frequencies
		? Object.values(lookupStore?.roomTypes).map(({ id, name }) => ({ id, name }))
		: []
	, [lookupStore?.frequencies]);


	const frequencies = useMemo(() => lookupStore?.frequencies
		? Object.values(lookupStore?.frequencies).map(({ id, name }) => ({ id, name }))
		: []
	, [lookupStore?.frequencies]);


	const filterControls = useMemo(() => {
		if (!frequencies && !roomTypes) {
			return null;
		}

		const options = [
			{
				name: 'roomTypeId',
				type: FieldType.Select,
				label: 'Room Type',
				options: roomTypes,
			},
			{ name: 'name', type: FieldType.Text, label: 'Name' },
			{ name: 'estimatedCompletionTime', type: FieldType.Number, label: 'Completion Type' },
			{ name: 'rewardPoints', type: FieldType.Number, label: 'Points' },
			{
				name: 'frequencyId',
				type: FieldType.Select,
				label: 'Frequency',
				options: frequencies,
			},
			{ name: 'daysOfWeek', type: FieldType.Days, label: 'Days' },
			{ name: 'isActive', type: FieldType.Boolean, label: 'Active' },
		];

		return {
			id: `${domain}-toolbar-filter`,
			icon: <Icon icon={ic_filter_list} />,
			title: 'Filters',
			children: (
				<FormBuilder<Record<string, TaskTemplateInput>, DataFilter>
					id={getId('filter-form')}
					tag="filters"
					fields={options}
					onSubmit={store.filter}
					onAfterReset={() => store.filter(null)}
				/>
			),
		};
	}, [roomTypes, frequencies, store.filter]);

	const columnsDisplayControls = useMemo(() => {
		return {
			id: getId('toolbar-display'),
			icon: <Icon icon={ic_view_headline_outline} />,
			title: 'Columns Display',
			children: (
				<ListItems
					columnsCount={2}
					items={store.columns.filter(({ label }) => !!label).map(({ key, label }) => ({ key, value: key, label }))}
					showCheckbox={true}
					onSelect={store.toggleColumnVisibility}
					selectedItems={store.visibleColumns}
				/>
			),
		};
	}, [store.columns, store.visibleColumns, store.toggleColumnVisibility]);

	function handleSubmitForm() {
		form.onSubmit(form.data.id);
	}

	return (
		<Panel title="Task Template" tag={domain} overflow="hidden">
			<Drawer
				id={getId('form-panel')}
				isOpen={isDrawerOpen}
				size="400px"
				onClose={handleClosePanel}
				position="right"
				overflow="hidden"
			>
				<Form
					ref={formRef}
					data={form.data}
					onChange={form.onFieldChange}
					schema={validationSchema}
				>
					<Panel
						tag={getId('form')}
						title={ form.data.name ? `Edit ${form.data.name}` : 'Create Task Template'}
						padded
						footer={
							<FieldGroup sided>
								<Button disabled={form.submitting} onClick={handleSubmitForm}>
									<Icon icon={ic_save} /> Save
								</Button>
								<Button onClick={handleClosePanel}>
									<Icon icon={ic_close} /> Cancel
								</Button>
							</FieldGroup>
						}
					>
						<TextInput
							type="text"
							label="Name"
							name="name"
							value={form.data.name}
							error={form.errors?.name}
						/>
						<TextInput
							type="textarea"
							label="Notes"
							name="description"
							component="textarea"
							autoComplete="true"
							value={form.data.description ?? ''}
							error={form.errors?.description}
						/>
						<Select
							name="frequencyId"
							label="Frequency"
							value={form.data.frequencyId ?? ''}
							items={frequencies}
						/>
						<Select
							name="roomTypeId"
							label="Room Type"
							value={form.data.roomTypeId ?? ''}
							items={roomTypes}
						/>
						<TextInput
							type="number"
							label="Estimated Completion Time"
							name="estimatedCompletionTime"
							value={form.data.estimatedCompletionTime}
							error={form.errors?.estimatedCompletionTime}
						/>
						<TextInput
							type="number"
							label="Reward Points"
							name="rewardPoints"
							value={form.data.rewardPoints}
							error={form.errors?.rewardPoints}
						/>
						<Checkbox
							label="Active"
							name="isActive"
							value={form.data.isActive}
							error={form.errors?.isActive}
						/>
					</Panel>
				</Form>
			</Drawer>
			<DataTable
				id={getId('table')}
				settings={settings}
				columns={store.columns}
				isLoading={store.status === ApiCallStatus.Loading}
				data={store.filteredItems ? store.filteredItems : store.items}
				pagination={{ mode: PaginationMode.InfiniteScrolling, pageSize: 20 }}
				onBuildIds={handleBuildIds}
				checkedItems={store.checkedItems}
				onCheckItems={store.setCheckedItems}
				expandedItems={store.expandedItems}
				onExpandItems={store.setExpandedItems}
				customRenderers={getCustomRenderers()}
				onGetExpandedContent={getExpandedContent}
				actions={actions}
				toolbar={
					<Toolbar
						id={`${domain}-toolbar`}
						alignment={{ left: [filterControls], right: [columnsDisplayControls] }}
					/>
				}
			/>
		</Panel>
	);

	function getCustomRenderers() {
		return {
			roomTypeId: ({ item }: RenderProps<TaskTemplateOutput>) =>
				lookupStore?.roomTypes?.[item.roomTypeId]?.name,
			frequencyId: ({ item }: RenderProps<TaskTemplateOutput>) =>
				lookupStore?.frequencies?.[item.frequencyId]?.name,
			daysOfWeek: ({ item }: RenderProps<TaskTemplateOutput>) =>
				<span>{item.daysOfWeek}</span>,
		};
	}

	function getExpandedContent(item: TaskTemplateOutput) {
		return (
			<div>
				{Array.from({ length: 20 }, (_, index) => (
					<p key={index}>
						{item.name} - {index}
					</p>
				))}
			</div>
		);
	}
});

export default TaskTemplatePage;

// Object.keys(mappedItems[roomTypeId]).forEach((frequencyId) => {
// 	const frequency = lookupStore?.frequencies?.[frequencyId];
// 	const tasks = mappedItems[roomTypeId][frequencyId];

// 	return tasks.map(renderTaskTemplate);
// })

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
