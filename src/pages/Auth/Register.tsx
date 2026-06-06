import CsForm from '@/components/Form/CSForm'
import CSInput from '@/components/Form/CSInput'
import { useRegisterUserMutation } from '@/redux/api/features/auth/auth.api'
import { setUser } from '@/redux/api/features/auth/authSlice'
import { verifyToken } from '@/utils/verifyToken'
import { Typography, Button } from 'antd'
import { FieldValues } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, Location } from 'react-router-dom'
import { toast } from 'sonner'

const { Title, Text } = Typography

interface LocationState {
  from?: {
    pathname: string
  }
}

function Register() {
  const [registerUser] = useRegisterUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    } catch (error) {
      console.error(error)
      toast.error('Failed to register!', { id: toastId, duration: 3000 })
    }
  }

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
    <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl bg-white">

      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center p-16 bg-[var(--accent-primary-bg)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Join Our Platform
          </h1>

          <p className="text-lg text-white/90 leading-relaxed max-w-md">
            Create your account and start managing products,
            customers, inventory, and orders from a powerful dashboard.
          </p>

          <div className="mt-10 flex gap-4">
            <div className="bg-white/15 backdrop-blur-md px-5 py-3 rounded-xl">
              <h3 className="font-semibold text-xl">1000+</h3>
              <p className="text-sm text-white/80">
                Active Users
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md px-5 py-3 rounded-xl">
              <h3 className="font-semibold text-xl">24/7</h3>
              <p className="text-sm text-white/80">
                Support Available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-[var(--accent-primary-bg)] flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v6m3-3h-6m-9 8h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <Title level={2} className="!mb-2">
              Create Account
            </Title>

            <Text type="secondary">
              Fill in your details to get started
            </Text>
          </div>

          <CsForm
            onSubmit={handleSubmit}
            defaultValues={{
              name: "",
              email: "",
              password: "",
              phone: "",
            }}
          >
            <div className="space-y-5 mb-6">
              <CSInput
                type="text"
                name="name"
                label="Full Name"
                placeholder="John Doe"
              />

              <CSInput
                type="email"
                name="email"
                label="Email Address"
                placeholder="john@example.com"
              />

              <CSInput
                type="password"
                name="password"
                label="Password"
                placeholder="••••••••"
              />

              <CSInput
                type="text"
                name="phone"
                label="Phone Number"
                placeholder="+8801XXXXXXXXX"
              />
            </div>

            <Button
              htmlType="submit"
              size="large"
              block
              className="!h-12 !rounded-xl !bg-[var(--accent-primary-bg)] !text-white border-none font-semibold hover:scale-[1.02] transition-all duration-300"
            >
              Create Account
            </Button>
          </CsForm>

          <div className="text-center mt-8">
            <Text>
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-[var(--accent-primary-bg)] hover:underline"
              >
                Sign In
              </a>
            </Text>
          </div>
        </div>
      </div>

    </div>
  </div>
  )
}

export default Register
