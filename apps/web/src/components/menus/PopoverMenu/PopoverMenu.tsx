import * as React from 'react'
import Popover from '@mui/material/Popover'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { ADD_MENUS } from '../../../constants/menus'
import {
  Button,
  ListItemIcon,
  Menu,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { Plus as PlusIcon } from '@phosphor-icons/react'

const PopoverMenu: React.FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}>
      <Button
        variant="outlined"
        size="small"
        onClick={anchorEl ? handleClose : handleClick}
        color="primary"
        startIcon={<PlusIcon size={16} />}
      >
        <Typography variant="body2">Create</Typography>
      </Button>
      <Popover
        id={id}
        open={Boolean(anchorEl)}
        sx={{ ml: 1 }}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 0,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 14,
                left: -5,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
      >
        <Box sx={{ flexGrow: 1, paddingY: 2, minWidth: '600px' }}>
          <Grid container spacing={0}>
            {ADD_MENUS.map((menuObj: any) => {
              return (
                <Grid
                  key={menuObj.header}
                  item
                  xs={Number(12 / ADD_MENUS.length)}
                  sx={{
                    //padding: 1,
                    borderRight: theme =>
                      ADD_MENUS.indexOf(menuObj) !== ADD_MENUS.length - 1
                        ? `1px solid ${theme.palette.divider}`
                        : 'none',
                  }}
                >
                  <List
                    component="nav"
                    sx={{ width: '100%' }}
                    key={menuObj.header}
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        color="inherit"
                        sx={{
                          fontWeight: 'bold',
                          padding: 0.5,
                          width: '100%',
                        }}
                      >
                        <Typography
                          // variant="h4"
                          noWrap
                          component="div"
                          color="text.primary"
                          sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                            fontWeight: 'bold',
                            paddingX: 2,
                          }}
                        >
                          {menuObj.header}
                        </Typography>
                      </ListSubheader>
                    }
                  >
                    {menuObj.menus.map((subMenuObj: any) => {
                      const IconComponent = subMenuObj.icon
                      const iconSize = subMenuObj.iconSize || 24

                      return (
                        <ListItemButton
                          sx={{
                            padding: 1,
                            '&:hover .hoverColor': {
                              color: 'primary.main',
                            },
                          }}
                          key={subMenuObj.name}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            paddingX={1}
                            spacing={1}
                          >
                            {subMenuObj.icon && (
                              <IconComponent
                                size={iconSize}
                                className="hoverColor"
                              />
                            )}
                            <ListItemText
                              primary={
                                <Typography
                                  overflow={'revert'}
                                  noWrap
                                  color="text.primary"
                                  variant="body2"
                                  sx={{
                                    flexGrow: 1,
                                  }}
                                  className="hoverColor"
                                >
                                  {subMenuObj.name}
                                </Typography>
                              }
                            />
                          </Stack>
                        </ListItemButton>
                      )
                    })}
                  </List>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Popover>
    </Box>
  )
}

export default PopoverMenu
