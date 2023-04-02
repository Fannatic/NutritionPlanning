export const handleError = (err : any) => {
  console.error(err)
    return <p><strong>Sorry error has occured </strong><br/><span>{err.status}</span></p>
}
