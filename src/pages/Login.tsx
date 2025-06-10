import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { LuChartBarBig } from "react-icons/lu";
import { FiMail, FiLock } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const Login = () => {
  const [isDark, setIsDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userNameOrEmailAddress: '',
    password: '',
    rememberMe: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await axios.post(
      'https://api.eghlym.com/api/account/check-password',
      {
        userNameOrEmailAddress: formData.userNameOrEmailAddress,
        password: formData.password,
        rememberMe: formData.rememberMe,
      },
      {
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
        },
      }
    );

    setTimeout(async () => {
      // Mark the setTimeout callback as async
      setIsLoading(false);
      if (response.data.result === 1) {
        try {
          const tokenResponse = await axios.post(
            "https://api.eghlym.com/connect/token",
            new URLSearchParams({
              client_id: "tavigh_App",
              grant_type: "password",
              username: formData.userNameOrEmailAddress,
              password: formData.password,
              scope: "openid profile offline_access tavigh",
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          console.log('Token Response:', tokenResponse.data);
          sessionStorage.setItem('userName', formData.userNameOrEmailAddress);
          sessionStorage.setItem('usertoken', tokenResponse.data.access_token);
          navigate('/chat');
        } catch (tokenError) {
          console.error('Token Error:', tokenError);
          setIsLoading(false);
          alert('خطایی در دریافت توکن رخ داد. لطفاً دوباره تلاش کنید.');
        }
      } else {
        alert('ورود ناموفق: ' + response.data.description);
      }
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      setIsLoading(false);
      alert('خطایی در ورود رخ داد. لطفاً دوباره تلاش کنید.');
    }, 1000);
  }
};
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-vazir ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <nav className="bg-white dark:bg-custom-dark p-4 flex justify-between items-center fixed w-full z-50">
        <div className="flex items-center nav-icon-logo">
          <button className="menu-icon text-gray-600 dark:text-white">
            <LuChartBarBig className="h-8 w-8" />
          </button>
          <Link to="/" className="logo text-xl font-bold text-gray-800 dark:text-white">اقلیم</Link>
        </div>
        <div className="flex items-center gap-6">
          <button className="search-icon text-gray-600 dark:text-gray-300">
            <CiSearch className="h-8 w-8" />
          </button>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center pt-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">ورود به اقلیم</h2>
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ایمیل یا نام کاربری
                </label>
                <div className="relative">
                  <FiMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="userNameOrEmailAddress"
                    value={formData.userNameOrEmailAddress}
                    onChange={handleInputChange}
                    className="w-full pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com یا نام کاربری"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  رمز عبور
                </label>
                <div className="relative">
                  <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    disabled={isLoading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-700 dark:text-gray-300">
                    مرا به خاطر بسپار
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  فراموشی رمز عبور؟
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    در حال بارگذاری...
                  </div>
                ) : (
                  'ورود'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                حساب کاربری ندارید؟{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  ثبت نام کنید
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <div className="mt-auto">
        <div className="text-center py-4 text-sm text-gray-600 dark:text-gray-400">
          <button
            onClick={() => setIsDark(!isDark)}
            className="btn-base btn-footer flex items-center gap-2 mx-auto"
          >
            {isDark ? 'حالت روز' : 'حالت شب'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;