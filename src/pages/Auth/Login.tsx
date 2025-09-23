/* eslint-disable @typescript-eslint/no-explicit-any */
import CsForm from '@/components/Form/CSForm'
import CSInput from '@/components/Form/CSInput'
import { useLoginUserMutation } from '@/redux/api/features/auth/auth.api'
import { setUser } from '@/redux/api/features/auth/authSlice'
import { verifyToken } from '@/utils/verifyToken'
import { Row, Card, Typography, Button } from 'antd'
import { FieldValues } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const { Title, Text } = Typography

function Login() {
     const [login] =useLoginUserMutation()
          const dispatch = useDispatch();
          const navigate = useNavigate();
      const handleSubmit = async(data: FieldValues) => {
        const toastId =toast.loading('Login Inn...')
        console.log(data)
        try {
          const res =await login(data).unwrap()
           console.log(res.data,"data")
           const user =verifyToken(res?.data?.accessToken)
           console.log(user,"user")
           dispatch(setUser({
        user:user as any,
        token: res?.data.accessToken,  
      }))
            toast.success('Login successfully!', {
                id: toastId,
                duration:3000
            })
            navigate("/")
            
        } catch (error) {
            console.log(error,"error")
            toast.error('Failed to Login!', {
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
          Login Account
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}>
          Please fill in the details to Login
        </Text>

        <CsForm
          onSubmit={handleSubmit}
          defaultValues={{ name: '', email: '', password: '', phone: '' }}
        >
          <div style={{ marginBottom: 16 }}>
            <CSInput type="email" name="email" label="Email" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <CSInput type="password" name="password" label="Password" />
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
            Login
          </Button>
        </CsForm>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Text type="secondary">
            New to here? <a href="/register">Register</a>
          </Text>
        </div>
      </Card>
    </Row>
  </div>
  )
}

export default Login