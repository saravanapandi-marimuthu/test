import { Alert, Button, Stack } from '@mui/material'

const ClearDataButton = () => {
  const clearDataAndReload = () => {
    // Clear local storage
    localStorage.clear()

    // Clear cookies
    const cookies = document.cookie.split(';')

    for (const element of cookies) {
      const cookie = element
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
    }

    // Reload page
    window.location.reload()
  }

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Alert severity="error">
          Something went wrong. Please clear cache and reload. Please note that
          you'll have to log back in.
        </Alert>
        <Button variant="outlined" onClick={clearDataAndReload}>
          Clear Data and Reload
        </Button>
      </Stack>
    </>
  )
}

export default ClearDataButton
