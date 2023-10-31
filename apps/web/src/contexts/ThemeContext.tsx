// contexts/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FunctionComponent,
  useMemo,
} from 'react'
import {
  createTheme,
  Theme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'
import { deepPurple, red } from '@mui/material/colors'

export const backgroundColor = '#572CB4FF' // '#00BDD6FF'
export const gap = '16px'
const secondaryBackgroundColor = '#B2F7F6'
const ultraLightGrayColor = '#fafafa'

const createThemeWithMode = (mode: 'light' | 'dark'): Theme =>
  createTheme({
    typography: {
      //fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      //fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;`,
      //fontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    palette: {
      mode,
      primary: deepPurple,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: mode === 'dark' ? 'black' : 'white',
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          colorDefault: {
            backgroundColor: backgroundColor,
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.customColor': {
              textColor: backgroundColor,
            },
          },
        },
      },
      // Add other components here
      MuiTabs: {
        styleOverrides: {
          root: {
            color: backgroundColor,
            textTransform: 'none',
            '& .MuiTabs-indicator': {
              color: backgroundColor,
              backgroundColor: backgroundColor,
              height: '4px',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            color: '#565D6DF',
            '&.Mui-selected': {
              color: backgroundColor,
              fontWeight: 600,
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            borderRadius: 5,
            textTransform: 'none',
          },
          outlinedPrimary: {
            borderColor: backgroundColor,
            color: backgroundColor,
          },
          containedPrimary: {
            backgroundColor: backgroundColor,
            //color: palette.text.primary, // this will use the primary text color
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            borderRadius: 4,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 4,
          },
        },
      },
      MuiFormControl: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              borderLeftColor: backgroundColor,
              borderRightColor: backgroundColor,
              borderTopColor: ultraLightGrayColor,
              borderBottomColor: ultraLightGrayColor,
              borderLeftWidth: 0,
              borderRightWidth: 2,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderStyle: 'solid',
              '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                color: backgroundColor,
              },
              '& .MuiListItemText-primary': {
                fontWeight: 700,
              },
            },
          },
        },
      },
      MUIDataTable: {
        styleOverrides: {
          paper: {
            boxShadow: 'none',
          },
          // @ts-ignore
          responsiveBase: {
            overflow: 'auto',
          },
        },
      },
      MUIDataTableToolbarSelect: {
        styleOverrides: {
          root: {
            // You can replace "root" with the correct class name.
            // add other styles
            boxShadow: 'none',
            padding: 12,
          },
        },
      },
      MUIDataTableHeadCell: {
        styleOverrides: {
          root: {
            fontWeight: '600',
            '.MuiButtonBase-root': {
              fontWeight: '600',
            },
          },
        },
      },
      MUIDataTableBodyRow: {
        styleOverrides: {
          root: {
            '&:nth-of-type(odd)': {
              backgroundColor: mode === 'dark' ? 'black' : ultraLightGrayColor,
            },
          },
        },
      },
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {},
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '0 8px',
          },
        },
      },
      MUIDataTableResize: {
        styleOverrides: {
          resizer: {
            height: '100%',
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: '#db3131',
            '&$error': {
              color: '#db3131',
            },
          },
        },
      },
    },
  })

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
  updateResizerHeight: (newHeight: string) => void
  collapsedMenu: boolean
  toggleCollapsedMenu: () => void
}>({
  theme: createThemeWithMode('light'),
  toggleTheme: () => {},
  updateResizerHeight: () => {},
  collapsedMenu: false,
  toggleCollapsedMenu: () => {},
})

export const useThemeMode = () => {
  return useContext(ThemeContext)
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState(() => {
    const storageValue = localStorage.getItem('themeMode')
    return createThemeWithMode(storageValue === 'dark' ? 'dark' : 'light')
  })

  const [collapsedMenu, setCollapsedMenu] = useState(false)

  const updateResizerHeight = (newHeight: string) => {
    setTheme(prevTheme => ({
      ...prevTheme,
      components: {
        ...prevTheme.components,
        MUIDataTableResize: {
          styleOverrides: {
            resizer: {
              height: newHeight,
            },
          },
        },
      },
    }))
  }

  const toggleTheme = () => {
    const newMode = theme.palette.mode === 'light' ? 'dark' : 'light'
    setTheme(createThemeWithMode(newMode))
    localStorage.setItem('themeMode', newMode)
  }

  const toggleCollapsedMenu = () => {
    setCollapsedMenu(!collapsedMenu)
  }

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      collapsedMenu,
      toggleCollapsedMenu,
      updateResizerHeight,
    }),
    [theme, toggleTheme, collapsedMenu, updateResizerHeight],
  )

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
