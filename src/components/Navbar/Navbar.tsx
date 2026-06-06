
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectCurrentUser, logout, IUser } from '@/redux/api/features/auth/authSlice';
import { Button, Badge } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import authApi from '@/redux/api/features/auth/auth.api';
import { useGetCartQuery } from '@/redux/api/features/cart/cartApi';
import { useGetWishlistQuery } from '@/redux/api/features/wishlist/wishlist.api';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const user: IUser | null = useSelector(selectCurrentUser);
  console.log(user, "user in navbar");
  const { data: cart } = useGetCartQuery(undefined);
  console.log(cart, "cart in navbar");
  console.log(cart,"cart in navbar")
  const { data: wishlist } = useGetWishlistQuery(undefined, { skip: !user });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItemCount = cart
    ? cart?.data?.items.reduce((total: number, item: any) => total + item.quantity, 0)
    : 0;
  const wishlistCount = wishlist?.data?.length || 0;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(authApi.util.resetApiState());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold tracking-tight text-[#004E64]">
            Elomus
          </span>
        </Link>

        
        <ul className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-[#004E64] transition">Home</Link></li>
          <li><Link to="/products" className="hover:text-[#004E64] transition">Products</Link></li>
          <li><Link to="/about" className="hover:text-[#004E64] transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-[#004E64] transition">Contact</Link></li>
          {user?.role === 'USER' && <li><Link to="/dashboard" className="hover:text-[#004E64] transition">Dashboard</Link></li>}
          {user?.role === 'admin' && <li><Link to="/dashboard" className="hover:text-[#004E64] transition">Dashboard</Link></li>}
        </ul>

        
        <div className="flex items-center gap-4">
          {user && (
            <Link to="/wishlist">
              <Badge count={wishlistCount} offset={[0, 5]}>
                <HeartOutlined className="text-2xl text-gray-600 hover:text-[#004E64] transition" />
              </Badge>
            </Link>
          )}

          <Link to="/cart">
            <Badge count={cartItemCount} offset={[0, 5]}>
              <ShoppingCartOutlined className="text-2xl text-gray-600 hover:text-[#004E64] transition" />
            </Badge>
          </Link>

          {user ? (
            <Button
              onClick={handleLogout}
              type="primary"
              style={{
                backgroundColor: '#004E64',
                borderColor: '#004E64',
                borderRadius: '8px',
                fontWeight: 500,
                height: 40,
              }}
            >
              Logout
            </Button>
          ) : (
            <Link
              to="/login"
              className="text-white bg-[#004E64] px-5 py-2 rounded-lg font-medium hover:bg-[#003C4C] transition"
            >
              Login
            </Link>
          )}

          
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {isDropdownOpen ? <CloseOutlined className="text-2xl" /> : <MenuOutlined className="text-2xl" />}
          </button>
        </div>
      </nav>

      
      {isDropdownOpen && (
        <div className="lg:hidden absolute top-[70px] left-0 w-full bg-white border-t border-gray-100 shadow-md animate-slideDown">
          <ul className="flex flex-col items-start px-6 py-4 space-y-3 font-medium text-gray-700">
            <li><Link to="/" onClick={() => setIsDropdownOpen(false)}>Home</Link></li>
            <li><Link to="/products" onClick={() => setIsDropdownOpen(false)}>Products</Link></li>
            {user && <li><Link to="/wishlist" onClick={() => setIsDropdownOpen(false)}>Wishlist ({wishlistCount})</Link></li>}
            <li><Link to="/cart" onClick={() => setIsDropdownOpen(false)}>Cart ({cartItemCount})</Link></li>
            {user && <li className="font-bold">{user.name}</li>}
            {user?.role === 'admin' && (
              <>
                <li><Link to="/productManagement" onClick={() => setIsDropdownOpen(false)}>Product Management</Link></li>
                <li><Link to="/users-management" onClick={() => setIsDropdownOpen(false)}>User Management</Link></li>
              </>
            )}
            <li><Link to="/about" onClick={() => setIsDropdownOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setIsDropdownOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
