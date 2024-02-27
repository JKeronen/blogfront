const Notification = ({ error, info }) => {
    if (info) {
      console.log(info)
      return (
        <div className="info"> 
          {info}
        </div>
      )
    }
    if (error) {
      console.log(error)
      return (
        <div className="error">
          {error}
        </div>
      )
    }
    return null
}
export default Notification