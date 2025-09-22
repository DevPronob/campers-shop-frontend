/* eslint-disable @typescript-eslint/no-explicit-any */
import CsForm from '@/components/Form/CSForm'
import CSInput from '@/components/Form/CSInput'
import { useRegisterUserMutation } from '@/redux/api/features/auth/auth.api'
import { setUser } from '@/redux/api/features/auth/authSlice'
import { verifyToken } from '@/utils/verifyToken'
import { Row, Card, Typography, Button } from 'antd'
import { FieldValues } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const { Title, Text } = Typography

function Register() {
    const [register] =useRegisterUserMutation()
    const neviagte =useNavigate()
      const dispatch = useDispatch();
  const handleSubmit = async(data: FieldValues) => {
    const toastId =toast.loading('Registering...')
    console.log(data)
    try {
      const res =await   register(data).unwrap()
       console.log(res.data,"data")
       const user =verifyToken(res?.data?.accessToken)
       console.log(user,"user")
       dispatch(setUser({
    user:user as any,
    token: res?.data.accessToken,  
  }))
        toast.success('Registered successfully!', {
            id: toastId,
            duration:3000
        })
        neviagte("/")
        
    } catch (error) {
        console.log(error,"error")
        toast.error('Failed to register!', {
            id: toastId,
            duration:3000
        })
    }
  }

  return (
  <div className='min-h-screen py-8'>
      <Row
      justify="center"
      align="middle"
    >
      <Card
        style={{
          width: 500,
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <Title level={3} style={{ textAlign: 'center', marginBottom: '8px' }}>
          Create Account
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}>
          Please fill in the details to register
        </Text>

        <CsForm
          onSubmit={handleSubmit}
          defaultValues={{ name: '', email: '', password: '', phone: '' }}
        >
          <div style={{ marginBottom: 16 }}>
            <CSInput type="text" name="name" label="Name" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <CSInput type="email" name="email" label="Email" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <CSInput type="password" name="password" label="Password" />
          </div>
          <div style={{ marginBottom: 24 }}>
            <CSInput type="text" name="phone" label="Phone" />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              height: 40,
              borderRadius: '8px',
              fontWeight: 500,
            }}
          >
            Register
          </Button>
        </CsForm>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Text type="secondary">
            Already have an account? <a href="/login">Login</a>
          </Text>
        </div>
      </Card>
    </Row>
  </div>
  )
}

export default Register
