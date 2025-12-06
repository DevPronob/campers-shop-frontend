/* eslint-disable @typescript-eslint/no-explicit-any */
import CsForm from '@/components/Form/CSForm'
import CSInput from '@/components/Form/CSInput'
import { useRegisterUserMutation } from '@/redux/api/features/auth/auth.api'
import { setUser } from '@/redux/api/features/auth/authSlice'
import { verifyToken } from '@/utils/verifyToken'
import { Card, Typography, Button } from 'antd'
import { FieldValues } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, Location } from 'react-router-dom'
import { toast } from 'sonner'

const { Title, Text } = Typography

// Define the type of location.state
interface LocationState {
  from?: {
    pathname: string
  }
}

function Register() {
  const [registerUser] = useRegisterUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Tell TS that location.state has our expected type
  const location = useLocation() as Location & { state?: LocationState }

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Registering...')
    try {
      const res = await registerUser(data).unwrap()
      const user = verifyToken(res?.data?.accessToken)

      dispatch(
        setUser({
          user: user as any,
          token: res?.data.accessToken,
        })
      )

      toast.success('Registered successfully!', { id: toastId, duration: 3000 })

      // Redirect user to previous page or home
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    } catch (error) {
      console.error(error)
      toast.error('Failed to register!', { id: toastId, duration: 3000 })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            padding: '32px',
          }}
        >
          <div className="text-center mb-6">
            <Title level={3}>Create Account</Title>
            <Text type="secondary">
              Please fill in the details to register
            </Text>
          </div>

          <CsForm
            onSubmit={handleSubmit}
            defaultValues={{ name: '', email: '', password: '', phone: '' }}
          >
            <div className="mb-4">
              <CSInput type="text" name="name" label="Name" />
            </div>
            <div className="mb-4">
              <CSInput type="email" name="email" label="Email" />
            </div>
            <div className="mb-4">
              <CSInput type="password" name="password" label="Password" />
            </div>
            <div className="mb-6">
              <CSInput type="text" name="phone" label="Phone" />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size='large'
              block
              className="!rounded-lg font-medium !bg-[#004E64] !text-white 
                hover:!bg-[#006B80] hover:!text-white 
                focus:!bg-[#006B80] active:!bg-[#003F52] 
                border-none transition-all duration-300"
            >
              Register
            </Button>
          </CsForm>

          <div className="text-center mt-6">
            <Text className=" font-medium">
              Already have an account? <a className='!text-[#004E64]' href="/login">Login</a>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Register
