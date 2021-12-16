import React, { useEffect } from 'react';
import { HouseholdOutput } from '@xapp/shared/types';

interface IHouseholdSelectorProps {
	items: HouseholdOutput[];
	activeHousehold: HouseholdOutput['id'];
	onActivateHousehold: (activeHousehold: HouseholdOutput['id'] | null) => void;
}

export const HouseholdSelector = React.memo(({ items, activeHousehold, onActivateHousehold } : IHouseholdSelectorProps): React.ReactElement => {
	const handleHouseholdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const id = +e.target.value;
		onActivateHousehold(id);
	};

	useEffect(() => {
		if (items?.[0]) {
			onActivateHousehold(items[0].id);
		}
	}, [items, onActivateHousehold])


	const options = items
			? items.map(({ id, name }) => ({ id, name }))
			: [];

		if (!options.length) {
			return null;
		}

		return (
			<select
				name="activeHousehold"
				value={activeHousehold}
				onChange={handleHouseholdChange}
			>
				{ options.map(({ id, name }) => (
					<option key={id} value={id}>{name}</option>)
				)}
			</select>
		);
});
