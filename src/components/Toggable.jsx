// This component set to show or hide the selected children component. It can be used to select multiple children.
import PropTypes from 'prop-types'
import React from 'react'

const Togglable = React.forwardRef((props, ref) => {

  const hideWhenVisible = { display: props.visibility ? 'none' : '' }
  const showWhenVisible = { display: props.visibility ? '' : 'none' }

  const toggleVisibility = () => {
    props.setVisibility(!props.visibility)
  }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children} 
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'

export default Togglable