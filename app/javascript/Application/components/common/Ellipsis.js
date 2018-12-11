import React from 'react'
import PropTypes from 'prop-types'
import { Popover, PopoverBody } from '@cwds/reactstrap'
import Icon from '@cwds/icons'
import { Link } from 'react-router-dom'

export default class Ellipsis extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      popoverOpen: false,
    }
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    })
  }

  render() {
    const { id, clientId } = this.props
    return (
      <div>
        <Icon id={`icon-${id}`} icon="ellipsis-v" className="icon-ellipsis" onClick={this.toggle} />
        <Popover placement="bottom-start" isOpen={this.state.popoverOpen} target={`icon-${id}`} toggle={this.toggle}>
          <PopoverBody className="popoverbody">
            <Link to={`/clients/${clientId}/assessments/${id}/changelog`}>View CANS Change Log</Link>
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}

Ellipsis.propTypes = {
  clientId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}
