import React from 'react'
import {
    ListItem,
    ListItemButton,
    ListItemDecorator,
    ListItemContent,
} from '@mui/joy'
const MenuItem = ({ icon: Icon, label, open, onClick, endIcon,active  }) => {
    return (
        <ListItem>
            <ListItemButton
                onClick={onClick}
                sx={{
                    '&:hover': {
                        bgcolor: '#374151' //  grey hover
                    },
                    bgcolor: active ? '#1f2937' : 'transparent'
                }}
            >
                <ListItemDecorator>
                    <Icon sx={{ color: 'white' }} />
                </ListItemDecorator>

                {open && (
                    <>
                        <ListItemContent sx={{ color: 'white' }}>
                            {label}
                        </ListItemContent>
                        {endIcon}
                    </>
                )}
            </ListItemButton>
        </ListItem>
    )
}

export default MenuItem
