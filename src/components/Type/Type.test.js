import React from 'react';
import { shallow } from 'enzyme';
import Type from './Type';

const mockType = 'fire';

describe('Type', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Type type={mockType}/>
    )
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});