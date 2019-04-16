import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

describe('App', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(
      <App />
    )
    instance = wrapper.instance();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call upon fetchGenOne on componentDidMount', () => {
    const spy = jest.spyOn(instance, 'fetchGenOne');

    instance.componentDidMount();

    expect(spy).toHaveBeenCalled();
  });

  it('should call upon cleanData on fetchGenOne', async () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    instance.fetchGenOne();      

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/generation/1/');
  });
});