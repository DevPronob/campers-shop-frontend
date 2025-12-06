/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Card, Typography, Button, Spin } from 'antd';
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
      const user = verifyToken(res?.data?.accessToken);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      <Row justify="center" align="middle" className="w-full max-w-md">
        <Card
          bordered={false}
          className="w-full shadow-xl rounded-2xl p-8 bg-white"
          style={{
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <Title level={3} className="!mb-1 !text-[#1F2937]">
              Welcome Back
            </Title>
            <Text type="secondary" className="!text-[#6B7280]">
              Please log in to continue
            </Text>
          </div>

          {/* Form */}
          <CsForm
            onSubmit={handleSubmit}
            defaultValues={{ email: '', password: '' }}
          >
            <div className="space-y-5 mb-6">
              <CSInput
                type="email"
                name="email"
                label="Email"
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

<Button
  htmlType="submit"
  block
  disabled={loading}
  size="large"
  className="!rounded-lg font-medium !bg-[#004E64] !text-white 
             hover:!bg-[#006B80] hover:!text-white 
             focus:!bg-[#006B80] active:!bg-[#003F52] 
             border-none transition-all duration-300"
>
  {loading ? <Spin size="small" /> : 'Login'}
</Button>

          </CsForm>

          {/* Footer */}
          <div className="text-center mt-6 font-medium">
            <Text type="secondary" className="!text-black">
              New here?{' '}
              <a
                href="/register"
                className="!text-[#004E64]  font-medium transition-colors"
              >
                Create an account
              </a>
            </Text>
          </div>
        </Card>
      </Row>
    </div>
  );
};

export default Login;
