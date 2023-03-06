function AdminPage() {
  return (
    <div>AdminPage{localStorage.getItem("token")}</div>
  )
}

export default AdminPage
