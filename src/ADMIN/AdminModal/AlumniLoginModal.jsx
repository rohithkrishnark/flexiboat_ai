import React, { useState, useEffect } from 'react'
import {
    Modal,
    ModalDialog,
    ModalClose,
    Typography,
    Input,
    FormControl,
    FormLabel,
    Button,
    Box,
    Checkbox
} from '@mui/joy'
import { successNotify, warningNotify } from '../../constant/Constant'
import axiosLogin from '../../Axios/axios'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

const AlumniLoginModal = ({ open, onClose, alumni, onSent }) => {
    const [loginDetail, setLoginDetail] = useState({
        email: '',
        password: ''
    })
    const [sendEmail, setSendEmail] = useState(true)

    useEffect(() => {
        if (alumni) {
            setLoginDetail({
                email: alumni.alum_email || '',
                password: '' // placeholder for temp password
            })
        }
    }, [alumni])

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginDetail({ ...loginDetail, [name]: value })
    }

    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
        let password = ''
        for (let i = 0; i < 8; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setLoginDetail({ ...loginDetail, password })
    }

    const handleSendLogin = async () => {
        if (!loginDetail.email || !loginDetail.password) {
            return warningNotify('Email and password are required')
        }

        try {
            const response = await axiosLogin.post('/training/alumini/send-login', {
                alum_id: alumni.alum_id,
                alum_name: alumni.alum_name,
                email: loginDetail.email,
                password: loginDetail.password,
                send_email: sendEmail ? 1 : 0
            })

            if (response.data.success === 1) {
                successNotify('Login details sent successfully')
                onSent && onSent()
                onClose()
            } else {
                warningNotify(response.data.message || 'Failed to send login')
            }
        } catch (error) {
            console.error(error)
            warningNotify('Something went wrong')
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                variant="outlined"
                sx={{ maxWidth: 500, width: '100%', p: 4 }}
            >
                <ModalClose />

                <Typography level="h5" sx={{ mb: 2 }}>
                    Send Login Details
                </Typography>

                {/* Alumni Info */}
                {alumni && (
                    <Box sx={{ mb: 3 }}>
                        <Typography><strong>Name:</strong> {alumni.alum_name}</Typography>
                        <Typography><strong>Company:</strong> {alumni.alum_company}</Typography>
                        <Typography><strong>Designation:</strong> {alumni.alum_company_designation}</Typography>
                    </Box>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="email"
                            value={loginDetail.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            fullWidth
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Temporary Password</FormLabel>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Input
                                type="text"
                                name="password"
                                value={loginDetail.password}
                                onChange={handleChange}
                                placeholder="Enter temporary password"
                                fullWidth
                            />
                            <Button size="sm" variant="outlined" onClick={generatePassword}>
                                Generate
                            </Button>
                        </Box>
                    </FormControl>

                    <Checkbox
                        checked={sendEmail}
                        onChange={(e) => setSendEmail(e.target.checked)}
                    >
                        Send login credentials to email
                    </Checkbox>

                    <Typography level="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                        <strong>Security Note:</strong> Please share these credentials securely. Avoid sending passwords in public channels.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                        <Button variant="outlined" color="neutral" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button startDecorator={<MarkEmailReadIcon />} variant="solid" color="primary" onClick={handleSendLogin}>
                            Send to Mail Address
                        </Button>
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    )
}

export default AlumniLoginModal