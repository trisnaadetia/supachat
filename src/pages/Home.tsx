import Logo from '/logo.png'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signup");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className='p-6 flex flex-col items-center justify-between h-screen bg-cover bg-center bg-no-repeat text-white'
        style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className='w-full flex justify-center items-center'>
            <img src={Logo} className="w-14 logo" alt="React logo" />
            <h4 className=''>Supachat</h4>
        </div>
        <div className=''>
            <h1 className='mb-4 text-6xl leading-snug'>
                Connect friends <span className='font-bold'>easily & quickly</span>
            </h1>
            <h6 className='text-gray-400'>Our chat app is the perfect way to stay connected with friends and family.</h6>
        </div>
        <div className='w-full text-center'>
            <Button onClick={goToSignUp} className='w-full bg-white text-black hover:bg-gray-300 rounded-xl'>Sign up with email</Button>
            <h6 className='mt-2 text-sm text-gray-400'>Existing account? <span onClick={goToLogin} className='text-white'>Login</span></h6>
        </div>
    </div>
  )
}

export default Home
