import { useMemo } from 'react';
import { TaskTemplateOutput } from '@xapp/shared/types';
import { ILookupState } from '@xapp/state/global';

interface IUseTaskProps {
	userId: number;
	householdRoomId: number;
	templateId: number;
	lookupState: ILookupState;
	activeHouseholdId: number;
}

export const useHouseholdTask = ({
	userId,
	householdRoomId,
	templateId,
	lookupState,
	activeHouseholdId,
}: IUseTaskProps) => {
	const activeHousehold = useMemo(() =>
		lookupState.households?.find(({ id }) => id === activeHouseholdId),
	[lookupState.households, activeHouseholdId]);

	const rooms = useMemo(() => activeHousehold?.rooms
		? activeHousehold?.rooms.map(({ id, roomType, customName }) => ({ id, name: customName || roomType.name }))
		: []
	, [activeHousehold?.rooms]);

	const members = useMemo(() => activeHousehold?.members
		? activeHousehold?.members.map(({ userId: id, user }) => ({
			id,
			name: `${user.userProfile.firstName} ${id === userId ? '(You)' : ''}`,
		}))
		: []
	, [activeHousehold?.members, userId]);

	const selectedRoom = useMemo(() => (activeHousehold && householdRoomId)
		? activeHousehold?.rooms?.find(({ id }) => id === Number(householdRoomId))
		: null
	, [activeHousehold, householdRoomId]);

	const templates = useMemo(() => (selectedRoom?.roomTypeId
		? lookupState?.tasksTemplates?.[selectedRoom?.roomTypeId]
		: []) as TaskTemplateOutput[]
	, [lookupState?.tasksTemplates, selectedRoom?.roomTypeId]);

	const selectedTemplate = useMemo(() => (templates && templateId)
		? templates.find(({ id }) => id === templateId)
		: null
	, [templateId, templates]);

	const frequencies = useMemo(() => lookupState?.frequencies
		? Object.values(lookupState?.frequencies).map(({ id, name }) => ({ id, name }))
		: []
	, [lookupState?.frequencies]);

	return {
		frequencies,
		members,
		rooms,
		selectedTemplate,
		templates,
	};
};
