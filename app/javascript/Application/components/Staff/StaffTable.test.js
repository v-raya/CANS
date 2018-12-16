import React from 'react'
import { shallow } from 'enzyme'
import { DataGrid } from '@cwds/components'
import StaffTable from './StaffTable'
import StaffNameLink from './StaffNameLink'
import { staff as mockStaff } from './staff.mocks.test'

describe('<StaffTable />', () => {
  const render = staff => shallow(<StaffTable staff={staff} />)

  const findColumn = headerText =>
    render([])
      .props()
      .columns.find(column => column.Header === headerText)

  const assertColumnIsCentered = headerText => {
    const column = findColumn(headerText)
    expect(column.className).toBe('text-center')
    expect(column.headerClassName).toBe('text-center')
  }

  it('renders a DataGrid', () => {
    expect(
      render([])
        .find(DataGrid)
        .exists()
    ).toBe(true)
  })

  it('shows all rows with pagination', () => {
    const grid = render([]).find(DataGrid)
    expect(grid.props().showPagination).toBe(true)
    expect(grid.props().pageSizeOptions).toEqual([10, 25, 50])
  })

  it('always displays enough rows for a No Records message', () => {
    const grid = render([]).find(DataGrid)
    const spaceForMessage = 3
    expect(grid.props().minRows).toBe(spaceForMessage)
  })

  it('sorts by staffName by default', () => {
    const grid = render([]).find(DataGrid)
    expect(grid.props().defaultSorted).toEqual([{ id: 'staffName' }])
  })

  it('uses the list of staff people as data', () => {
    const grid = render(mockStaff)
    expect(grid.props().data).toBe(mockStaff)
  })

  it('renders staff names as links', () => {
    const staffNameColumn = findColumn('Staff Name')
    expect(staffNameColumn.Cell).toBe(StaffNameLink)
  })

  it('centers the "Total Clients" column', () => {
    assertColumnIsCentered('Total Clients')
  })

  it('centers the "No Prior" column', () => {
    assertColumnIsCentered('No Prior')
  })

  it('centers the "In Progress" column', () => {
    assertColumnIsCentered('In Progress')
  })

  it('centers the "Completed" column', () => {
    assertColumnIsCentered('Completed')
  })
})
