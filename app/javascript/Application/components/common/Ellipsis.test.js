import React from 'react'
import { Popover, PopoverBody } from '@cwds/reactstrap'
import Ellipsis from '../common/Ellipsis'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'
import { Button } from '@cwds/components'
import PageModal from '../common/PageModal'
import AssessmentService from '../Assessment/Assessment.service'
import { AssessmentStatus } from '../Assessment/'

jest.mock('../Assessment/Assessment.service')

const deletedAssessment = { id: 1, status: 'DELETED' }
const defaultAllowedOperations = ['read', 'update', 'create', 'complete', 'write']
const defaultProps = {
  clientId: 'C76Jg230X3',
  assessmentId: 1234,
  inheritUrl: '/staff/0X5',
  updateAssessmentHistoryCallback: () => {},
}

const getWrapper = (status, hasDeletePermission = true) => {
  const allowedOperations = hasDeletePermission ? [...defaultAllowedOperations, 'delete'] : defaultAllowedOperations
  const assessmentMetaData = {
    assessmentMetaData: { allowed_operations: allowedOperations },
  }
  const props = {
    assessmentStatus: status,
    ...assessmentMetaData,
    ...defaultProps,
  }
  return shallow(<Ellipsis {...props} />)
}

describe('<Ellipsis />', () => {
  describe('render', () => {
    let wrapper
    beforeEach(() => {
      wrapper = getWrapper(AssessmentStatus.inProgress)
    })

    it('renders a Button component with the correct props', () => {
      expect(wrapper.find('Button').length).toBe(1)
      expect(wrapper.find('Button').props().id).toBe('icon-1234')
      expect(wrapper.find('Button').props().type).toBe('button')
      expect(wrapper.find('Button').props()['aria-label']).toBe('Ellipsis Menu Button')
      expect(typeof wrapper.find('Button').props().onClick).toBe('function')
    })

    it('renders an Icon component', () => {
      expect(wrapper.find('Icon').length).toBe(1)
    })

    describe('Popover', () => {
      it('renders a Popover component', () => {
        expect(wrapper.find(Popover).length).toBe(1)
      })

      it('renders an Popover component with the correct props', () => {
        expect(wrapper.find(Popover).props().isOpen).toEqual(false)
      })

      it('updates the isOpen prop to true when clicked', () => {
        expect(wrapper.find(Popover).props().isOpen).toEqual(false)
        wrapper.find(Button).simulate('click')
        expect(wrapper.find(Popover).props().isOpen).toEqual(true)
      })
    })

    describe('PopoverBody component', () => {
      it('renders a PopoverBody component', () => {
        expect(wrapper.find(PopoverBody).length).toBe(1)
      })
    })

    describe('PopOver Menu Items', () => {
      let popoverBody
      beforeEach(() => {
        popoverBody = wrapper.find(PopoverBody)
      })

      describe('view change log menu item', () => {
        let changeLogMenuItem
        beforeEach(() => {
          changeLogMenuItem = popoverBody.find('button.view-change-log-button')
        })

        describe('button props', () => {
          it('renders a button with the correct props', () => {
            expect(changeLogMenuItem.props().className).toBe('view-change-log-button')
            expect(typeof changeLogMenuItem.props().onClick).toBe('function')
            expect(changeLogMenuItem.props().role).toBe('menuitem')
          })
        })

        describe('in progress assessment', () => {
          it('renders the menu item', () => {
            expect(changeLogMenuItem.exists()).toBe(true)
            expect(changeLogMenuItem.text()).toBe('View CANS Change Log')
          })
        })

        describe('completed assessment', () => {
          it('renders the menu item', () => {
            const wrapper = getWrapper(AssessmentStatus.completed)
            const popoverBody = wrapper.find(PopoverBody)
            const changeLogMenuItem = popoverBody.find('button.view-change-log-button')
            expect(changeLogMenuItem.exists()).toBe(true)
            expect(changeLogMenuItem.text()).toBe('View CANS Change Log')
          })
        })

        describe('deleted assessment', () => {
          it('renders the menu item', () => {
            const wrapper = getWrapper(AssessmentStatus.deleted)
            const popoverBody = wrapper.find(PopoverBody)
            const changeLogMenuItem = popoverBody.find('button.view-change-log-button')
            expect(changeLogMenuItem.exists()).toBe(true)
            expect(changeLogMenuItem.text()).toBe('View CANS Change Log')
          })
        })
      })

      describe('delete cans menu item', () => {
        let deleteMenuItem
        beforeEach(() => {
          deleteMenuItem = popoverBody.find('button.delete-assessment-button')
        })

        describe('button props', () => {
          it('renders a button with the correct props', () => {
            expect(deleteMenuItem.props().className).toBe('delete-assessment-button')
            expect(typeof deleteMenuItem.props().onClick).toBe('function')
            expect(deleteMenuItem.props().role).toBe('menuitem')
          })
        })

        describe('assessment with delete permission', () => {
          describe('in progress assessment', () => {
            it('renders the menu item', () => {
              expect(deleteMenuItem.exists()).toBe(true)
              expect(deleteMenuItem.text()).toBe('Delete CANS')
            })
          })

          describe('completed assessment', () => {
            it('renders the menu item', () => {
              const wrapper = getWrapper(AssessmentStatus.completed)
              const popoverBody = wrapper.find(PopoverBody)
              const deleteMenuItem = popoverBody.find('button.delete-assessment-button')
              expect(deleteMenuItem.exists()).toBe(true)
              expect(deleteMenuItem.text()).toBe('Delete CANS')
            })
          })

          describe('deleted assessment', () => {
            it('does not render the menu item', () => {
              const wrapper = getWrapper(AssessmentStatus.deleted)
              const popoverBody = wrapper.find(PopoverBody)
              const deleteMenuItem = popoverBody.find('button.delete-assessment-button')
              expect(deleteMenuItem.exists()).toBe(false)
            })
          })
        })

        describe('assessment without delete permission', () => {
          describe('in progress assessment', () => {
            it('does not render the menu item', () => {
              const wrapper = getWrapper(AssessmentStatus.inProgress, false)
              const popoverBody = wrapper.find(PopoverBody)
              const deleteMenuItem = popoverBody.find('button.delete-assessment-button')
              expect(deleteMenuItem.exists()).toBe(false)
            })
          })

          describe('completed assessment', () => {
            it('does not render the menu item', () => {
              const wrapper = getWrapper(AssessmentStatus.completed, false)
              const popoverBody = wrapper.find(PopoverBody)
              const deleteMenuItem = popoverBody.find('button.delete-assessment-button')
              expect(deleteMenuItem.exists()).toBe(false)
            })
          })

          describe('deleted assessment', () => {
            it('does not render the menu item', () => {
              const wrapper = getWrapper(AssessmentStatus.deleted, false)
              const popoverBody = wrapper.find(PopoverBody)
              const deleteMenuItem = popoverBody.find('button.delete-assessment-button')
              expect(deleteMenuItem.exists()).toBe(false)
            })
          })
        })
      })
    })

    describe('Redirect', () => {
      describe('when the View CANS Change Log menu item is clicked', () => {
        it('renders a Redirect component with the correct props', () => {
          const changeLogMenuItem = wrapper.find(PopoverBody).find('button.view-change-log-button')
          changeLogMenuItem.simulate('click', {
            target: { className: 'view-change-log-button' },
          })
          const redirect = wrapper.find(Redirect)
          expect(redirect.exists()).toBe(true)
          expect(redirect.props().to).toEqual({
            pathname: '/staff/0X5/clients/C76Jg230X3/assessments/1234/changelog/IN_PROGRESS',
          })
        })
      })
    })

    describe('Delete CANS Warning Modal', () => {
      describe('when the Delete CANS menu item is clicked', () => {
        it('renders a PageModal component with the correct props', () => {
          const deleteMenuItem = wrapper.find(PopoverBody).find('button.delete-assessment-button')
          deleteMenuItem.simulate('click', {
            target: { className: 'delete-assessment-button' },
          })
          const pageModal = wrapper.find(PageModal)
          const pageModalProps = pageModal.props()
          expect(pageModal.exists()).toBe(true)
          expect(pageModalProps.isOpen).toBe(true)
          expect(pageModalProps.title).toBe('Deleting CANS Warning')
          expect(pageModalProps.warningDescription).toEqual(<div>You are attempting to delete this CANS.</div>)
          expect(pageModalProps.description).toBe('This cannot be undone.')
          expect(pageModalProps.removeButtonLabel).toBe('Delete CANS')
          expect(pageModalProps.cancelButtonLabel).toBe('Cancel')
          expect(typeof pageModalProps.onCancel).toEqual('function')
          expect(typeof pageModalProps.onRemove).toEqual('function')
        })
      })

      describe('Modal Buttons', () => {
        describe('when the cancel button is clicked', () => {
          it('calls the handleWarningCancel method and sets state', () => {
            const spy = jest.spyOn(wrapper.instance(), 'handleWarningCancel')
            const deleteMenuItem = wrapper.find(PopoverBody).find('button.delete-assessment-button')
            deleteMenuItem.simulate('click', {
              target: { className: 'delete-assessment-button' },
            })
            const cancelButton = wrapper
              .find(PageModal)
              .dive()
              .find('.warning-modal-logout')
            expect(wrapper.state().isDeleteAssessmentWarningShown).toBe(true)
            expect(wrapper.state().isPopOverOpen).toBe(false)
            cancelButton.simulate('click')
            expect(spy).toHaveBeenCalledTimes(1)
            expect(wrapper.state().isDeleteAssessmentWarningShown).toBe(false)
          })
        })

        describe('when the delete cans button is clicked', () => {
          it('calls the handleWarningDelete method and sets state', async () => {
            const handleWarningDeleteSpy = jest.spyOn(wrapper.instance(), 'handleWarningDelete')
            const deleteServiceSpy = jest.spyOn(AssessmentService, 'delete')
            deleteServiceSpy.mockReturnValue(Promise.resolve(deletedAssessment))
            const closeModalSpy = jest.spyOn(wrapper.instance(), 'closeModal')
            const deleteMenuItem = wrapper.find(PopoverBody).find('button.delete-assessment-button')
            deleteMenuItem.simulate('click', {
              target: { className: 'delete-assessment-button' },
            })
            const deleteButton = wrapper
              .find(PageModal)
              .dive()
              .find('.warning-modal-stay-logged-in')
            expect(wrapper.state().isDeleteAssessmentWarningShown).toBe(true)
            expect(wrapper.state().isPopOverOpen).toBe(false)
            await deleteButton.simulate('click')
            expect(handleWarningDeleteSpy).toHaveBeenCalledTimes(1)
            expect(deleteServiceSpy).toHaveBeenCalledTimes(1)
            expect(closeModalSpy).toHaveBeenCalledTimes(1)
            expect(wrapper.state().isDeleteAssessmentWarningShown).toBe(false)
          })
        })
      })
    })
  })
})
