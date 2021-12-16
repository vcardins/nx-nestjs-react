import React from 'react';
// import { shallow } from 'enzyme';
// import { shallow } from '../../../../test/jest/context';

import { UserCard } from '../';
describe('<UserCard/>', () => {
	it('Should render', () => {
		const wrapper = shallow(<UserCard/>);
		expect(wrapper).toMatchSnapshot();
	});
});
