import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectCurrentUser, logout, IUser } from '@/redux/api/features/auth/authSlice'
import { Button } from 'antd'
import authApi from '@/redux/api/features/auth/auth.api'

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const user: IUser | null = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    dispatch(authApi.util.resetApiState())
  }

  return (
    <div className="px-5">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown z-10">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                {user ? (
                  <li><span className="font-bold">{user.name}</span></li>
                ) : (
                  <li><Link to="/login">Login</Link></li>
                )}
                {user?.role === 'admin' && (
                  <>
                    <li><Link to="/productManagement">Product Management</Link></li>
                    <li><Link to="/users-management">User Management</Link></li>
                  </>
                )}
              </ul>
            )}
          </div>

          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Elomus
            </span>
          </a>
        </div>

        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            {user ? (
              <li>
                <Button
                  onClick={handleLogout}
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    height: 40,
                    borderRadius: '8px',
                    fontWeight: 500,
                  }}
                >
                  Logout
                </Button>
              </li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
            {user?.role === 'USER' && <li><Link to="/order-history">Order History</Link></li>}
            {user?.role === 'admin' && <li><Link to="/productManagement">Product Management</Link></li>}
            {user?.role === 'admin' && <li><Link to="/users-management">User Management</Link></li>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
