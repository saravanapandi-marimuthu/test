import { useMsal } from '@azure/msal-react'
import { signUpPublicClient, passwordResetPublicClient } from '../../msalConfig'
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import TaglineCarousel from '../shared/TagLineCarousel/TagLineCarousel'
import horizenLogo from '../../assets/horizen-logo-mini.png'
import { useEffect } from 'react'

const LoggedOutContent = () => {
  const { instance } = useMsal()

  const signUpClient = signUpPublicClient
  const resetPasswordClient = passwordResetPublicClient

  useEffect(() => {
    signUpClient.initialize().then(() => {
      console.log('signUpClient initialized')
    })

    resetPasswordClient.initialize().then(() => {
      console.log('resetPasswordClient initialized')
    })
  }, [])
  const handleLogin = () => {
    instance.loginRedirect().catch(error => {
      console.error('Login failed:', error)
    })
  }

  const handleSignUp = () => {
    signUpClient?.loginRedirect().catch(error => {
      console.error('Login failed:', error)
    })
  }

  const handlePasswordReset = () => {
    resetPasswordClient?.loginRedirect().catch(error => {
      console.error('Login failed:', error)
    })
  }

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
        }}
      >
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <img
              alt="Horizen Logo"
              src={horizenLogo}
              style={{ height: '50px', padding: '10px' }}
            />
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Card
            elevation={10}
            sx={{
              maxWidth: 500,
              minHeight: 600,
              width: {
                xs: '90%', // sets width to 90% of screen size on extra small screens
                sm: '70%', // sets width to 70% of screen size on small screens
                md: '50%', // sets width to 50% of screen size on medium screens
                lg: '35%', // sets width to 30% of screen size on large screens
              },
              aspectRatio: '3/4', // set the aspect ratio of the Paper
              boxShadow: 0,
              borderRadius: 5,
              backgroundSize: 'cover',
            }}
          >
            <CardContent
              sx={{
                textAlign: 'center',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="text.secondary"
                >
                  Login / Sign up
                </Typography>
              </Box>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Stack direction="column" spacing={2}>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        minWidth: '100px',
                      }}
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      sx={{ margin: '1em', minWidth: '100px' }}
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </Button>
                  </Stack>
                  <Button
                    variant="text"
                    color="secondary"
                    size="large"
                    sx={{ margin: '1em', minWidth: '100px' }}
                    onClick={handlePasswordReset}
                  >
                    Reset Password
                  </Button>
                </Stack>
              </CardActions>
            </CardContent>
            <Box sx={{ padding: 2, paddingTop: 10 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize={10}
                align="center"
              >
                Copyright &copy; Horizen Ag inc
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>
      {/* Experimentation: This div is to export Tailwind CSS classes to be used in Azure B2C login template for */}
      <div className="hidden">
        <div className="bg-white"></div>

        <header className="w-full p-4 bg-transparent fixed">
          <img
            src="https://app.horizen.ag/logo-01.svg"
            alt="Logo"
            className="h-8 w-auto"
          ></img>
        </header>

        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-6 rounded-lg max-w-xs w-full">
            <h2 className="mb-4 text-center text-xl font-semibold">Sign Up</h2>
            <button
              id="GoogleExchange"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg mb-2"
            >
              test
            </button>
            <button
              id="MicrosoftAccountExchange"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg mb-2"
            >
              test
            </button>
            <button
              id="SignUpWithLogonEmailExchange"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg mb-2"
            >
              test
            </button>
            <p className="mt-2 text-sm text-gray-500 pt-20">
              <a href="#" className="underline">
                Test
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoggedOutContent
