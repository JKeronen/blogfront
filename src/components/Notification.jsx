const Notification = ({ error, info }) => {
    if (info) {
      return (
        <div className="info"> 
          {info}
        </div>
      )
    }
    if (error) {
      return (
        <div className="error">
          {error}
        </div>
      )
    }
    return null
}
export default Notification