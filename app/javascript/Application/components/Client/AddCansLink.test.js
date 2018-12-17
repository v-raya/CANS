import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import AddCansLink from './AddCansLink'

describe('<AddCansLink/>', () => {
  it('renders <Link/> with a child span', () => {
    const wrapper = shallow(<AddCansLink clientIdentifier={'aaa'} />)
    const link = wrapper.find(Link)
    expect(link.exists()).toEqual(true)
    const span = wrapper.find('span.add-cans-span')
    expect(span.exists()).toEqual(true)
  })

  it('renders with <Link /> that navigates to /assessments', () => {
    const link = shallow(<AddCansLink clientIdentifier={'aaa'} />).find(Link)
    expect(link.prop('to')).toBe('./aaa/assessments')
  })

  it('renders a span with the correct text', () => {
    const span = shallow(<AddCansLink clientIdentifier={'bbb'} />).find('span')
    expect(span.text()).toBe('Add CANS')
  })

  it('renders a span only when disabled', () => {
    const wrapper = shallow(<AddCansLink clientIdentifier={'aaa'} disabled={true} />)
    const link = wrapper.find(Link)
    expect(link.exists()).toEqual(false)
    const span = wrapper.find('span.add-cans-span')
    expect(span.exists()).toEqual(true)
  })

  describe('#isDisabled()', () => {
    it('returns true when boolean passed', () => {
      const wrapper = shallow(<AddCansLink clientIdentifier={'aaa'} disabled={true} />)
      expect(wrapper.instance().isDisabled()).toEqual(true)
    })

    it('returns true when string passed', () => {
      const wrapper = shallow(<AddCansLink clientIdentifier={'aaa'} disabled={'true'} />)
      expect(wrapper.instance().isDisabled()).toEqual(true)
    })

    it('returns false when boolean passed', () => {
      const wrapper = shallow(<AddCansLink clientIdentifier={'aaa'} disabled={false} />)
      expect(wrapper.instance().isDisabled()).toEqual(false)
    })

    it('returns false when string passed', () => {
      const wrapper = shallow(<AddCansLink clientIdentifier={'aaa'} disabled={'false'} />)
      expect(wrapper.instance().isDisabled()).toEqual(false)
    })

    it('returns false when random string passed', () => {
      const wrapper = shallow(<AddCansLink clientIdentifier={'aaa'} disabled={'someRandomString'} />)
      expect(wrapper.instance().isDisabled()).toEqual(false)
    })
  })
})
