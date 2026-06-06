
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Spin } from 'antd';
import { toast } from 'sonner';
import { FieldValues } from 'react-hook-form';
import { useLoginUserMutation } from '@/redux/api/features/auth/auth.api';
import { setUser } from '@/redux/api/features/auth/authSlice';
import { verifyToken } from '@/utils/verifyToken';
import CsForm from '@/components/Form/CSForm';
import CSInput from '@/components/Form/CSInput';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [login] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: FieldValues) => {
    setLoading(true);
    const toastId = toast.loading('Signing you in...');

    try {
      const res = await login(data).unwrap();
      console.log('Login response:', res);
      const user = verifyToken(res?.data?.accessToken);
      console.log('Decoded user from token:', user);

      dispatch(
        setUser({
          user: user as any,
          token: res?.data.accessToken,
        })
      );

      toast.success('Login successful!', { id: toastId, duration: 2500 });
      navigate('/');
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.data?.message || 'Login failed! Please check your credentials.',
        {
          id: toastId,
          duration: 3000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
    <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl bg-white">

      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center p-16 bg-[var(--accent-primary-bg)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Welcome Back
          </h1>

          <p className="text-lg text-white/90 leading-relaxed max-w-md">
            Sign in to manage products, track orders, monitor inventory,
            and grow your business with ease.
          </p>

          <div className="mt-10 flex gap-4">
            <div className="bg-white/15 backdrop-blur-md px-5 py-3 rounded-xl">
              <h3 className="font-semibold text-xl">500+</h3>
              <p className="text-sm text-white/80">
                Products Managed
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md px-5 py-3 rounded-xl">
              <h3 className="font-semibold text-xl">99%</h3>
              <p className="text-sm text-white/80">
                Customer Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-8 md:p-12">
        <Card
          bordered={false}
          className="w-full max-w-md shadow-none"
        >
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
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            <Title level={2} className="!mb-2">
              Sign In
            </Title>

            <Text type="secondary">
              Access your dashboard and continue managing your store.
            </Text>
          </div>

          <CsForm
            onSubmit={handleSubmit}
            defaultValues={{
              email: "",
              password: "",
            }}
          >
            <div className="space-y-5 mb-6">
              <CSInput
                type="email"
                name="email"
                label="Email Address"
                placeholder="you@example.com"
                required
              />

              <CSInput
                type="password"
                name="password"
                label="Password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex justify-end mb-5">
              <a
                href="/forgot-password"
                className="text-sm text-[var(--accent-primary-bg)] hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <Button
              htmlType="submit"
              block
              size="large"
              disabled={loading}
              className="!h-12 !rounded-xl !bg-[var(--accent-primary-bg)] !text-white border-none font-semibold hover:scale-[1.02] transition-all duration-300"
            >
              {loading ? (
                <Spin size="small" />
              ) : (
                "Sign In"
              )}
            </Button>
          </CsForm>

          <div className="text-center mt-8">
            <Text>
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-[var(--accent-primary-bg)] hover:underline"
              >
                Create Account
              </a>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  </div>
  );
};

export default Login;
