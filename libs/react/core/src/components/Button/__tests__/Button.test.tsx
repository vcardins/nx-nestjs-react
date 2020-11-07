import React from 'react';
import { shallow } from 'enzyme';

import { Button } from '../';
describe('<Button/>', () => {
	it('Should render', () => {
		const wrapper = shallow(<Button/>);
		expect(wrapper).toMatchSnapshot();
	});
});
