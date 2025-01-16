import { MoveLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import LoadingButton from '../components/custom/loading-button'
import { useState } from 'react'
import FormSign from '../components/custom/form-sign'

function Login() {
    const [isLoading, setIsloading] = useState(false)

    const navigate = useNavigate();

    const backToHome = () => {
        navigate("/");
    };
  
    return (
        <div className='p-6'>
            <MoveLeft onClick={backToHome} className='w-4'/>
            <div className='text-center'>
                <h1 className='mt-10 font-bold'>Log in to Supachat</h1>
                <h5 className='mt-4 text-gray-400'>Log in using your email and password to continue us</h5>
            </div>
            <FormSign/>
        </div>
    )
}

export default Login