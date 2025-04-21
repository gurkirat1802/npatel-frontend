import { useEffect, useState } from 'react';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../np-ui-library/buttons/button';
import { useForm } from 'react-hook-form';
import OTPInput from 'react-otp-input';
import { addAuthTokens } from '../../auth/authDetail';
import { postCall } from '../../../heimdall-portal/connector.engine';
import { toast } from 'react-toastify';

const AuthPage = () => {
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false)
    const [otpMode, setOtpMode] = useState(false)
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        setFocus,
        reset,
        formState: { errors }
      } = useForm()

    const handleRegisterClick = () => {
        setIsActive(true);
        clearErrors()
    };

    const handleLoginClick = () => {
        setIsActive(false);
        clearErrors()
    };

    const handleSignIn = async () => {
        setLoading(true)
        await postCall(
            '/auth/login',
            {
                email: watch('emailSignin'),
                password: watch('passwordSignin')
            }
        ).then( async (res) => {
            if(res.code < 2000){
                toast.error(res?.code == 1103 ? res.bucket.msg : res.msg || "Sign in failed.")
                if (res?.bucket?.isVerified == false){
                    await OTPGeneration();
                }
                setLoading(false)
            } else {
                res?.bucket?.accessToken && addAuthTokens(JSON.stringify(res?.bucket)).then(
                    navigate('/')
                )
                setLoading(false)
            }
        })
    };

    const OTPGeneration = async () => {
        await postCall(
            '/otp/generate',
            {
                email: watch('emailSignin')
            }
        ).then((res) => {
                if(res.code < 2000){
                    toast.error(res?.bucket?.msg || "OTP generation failed.")
                } else {
                    if (res?.code == 2104){
                        toast.success(res?.msg)
                        setOtpMode(true)
                    } else {
                        toast.error(res?.msg)
                    }
                }
                setLoading(false)
            }
        )
    }

    const otpVerify = async () => {
        if( !isNaN(otp) ){
            await postCall(
                '/otp/verify',
                {
                    email: watch('emailSignin'),
                    otp
                }
            ).then( async (res) => {
                    if(res.code < 2000){
                        toast.error(res.msg || "OTP Verification failed!")
                        setLoading(false)
                    } else {
                        if (res?.code == 2105){
                            toast.success(res?.msg)
                            setOtpMode(false)
                            handleSignIn()
                        } else {
                            toast.error(res?.msg)
                        }
                        setLoading(false)
                    }
                }
            )
        } else {
            toast.error('Enter valid OTP!');
        }
    }

    const handleSignUp = async (data) => {
        setLoading(true)
        await postCall(
            '/users/signup',
            {
                ...data
            }
        ).then( async (res) => {
                if(res.code < 2000){
                    toast.error(res.bucket.error.split(':')?.[1] || "Sign up failed!")
                } else {
                    if (res?.code == 2106){
                        reset({
                            emailSignin: watch('email'),
                            passwordSignin: watch('password')
                        })
                        setIsActive(false)
                    } else {
                        toast.error(res?.bucket?.error || res?.msg)
                    }
                }
                setLoading(false)
            }
        )
    };

    const navigateHome = () => {
        navigate('/');
    }

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            navigate('/auth');
        }
    }, []);    

    return (
        <div className="auth-container">
            <div className={`container ${isActive ? 'active' : ''}`}>
                <div className={`form-container sign-up ${isActive ? 'show' : 'hide'}`}>
                    <div className='form'>
                        <h1>Create Account</h1>
                        {/* <div className="social-icons">
                            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span> */}
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            {...register('username', {required: isActive})}
                        />
                        {errors.username && <div className='errorMessage'>Please enter a username.</div>}
                        <input 
                            type="text" 
                            name="firstName" 
                            placeholder="First Name" 
                            {...register('firstName', {required: isActive})}
                        />
                        {errors.firstName && <div className='errorMessage'>Please enter a first name.</div>}
                        <input 
                            type="text" 
                            name="lastName" 
                            placeholder="Last Name" 
                            {...register('lastName', {required: isActive})}
                        />
                        {errors.lastName && <div className='errorMessage'>Please enter a last name.</div>}
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            {...register('email', {required: isActive})}
                        />
                        {errors.email && <div className='errorMessage'>Please enter a email address.</div>}
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            {...register('password', {required: isActive})}
                        />
                        {errors.password && <div className='errorMessage'>Please enter a Password.</div>}
                        <button onClick={handleSubmit(handleSignUp)}>Sign Up</button>
                        <p className="mobile-switch">Already have an account? <a href="#" onClick={handleLoginClick}>Sign In</a></p>
                    </div>
                </div>
                <div className={`form-container sign-in ${isActive ? 'hide' : 'show'}`}>
                    <div className='form'>
                        { otpMode == false ? 
                        <>
                            <h1>Sign In</h1>
                            {/* <div className="social-icons">
                                <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                                <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                                <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                                <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your email and password</span> */}
                            <input 
                                type="email"
                                placeholder="Email"
                                {...register('emailSignin', {required: !isActive})}
                            />
                            {errors.emailSignin && <div className='errorMessage'>Please enter a email address.</div>}
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                {...register('passwordSignin', {required: !isActive})}
                            />
                            {errors.passwordSignin && <div className='errorMessage'>Please enter a Password.</div>}
                            <a href="#">Forgot Your Password?</a>
                            <Button label={'SIGN IN'} clickEvent={handleSubmit(handleSignIn)} loading = {loading}/>
                        </>
                        :
                        <>
                            <h1>Enter OTP</h1>
                            <p style={{ fontSize: '13px' }}>We've sent an OTP for <i>{watch('emailSignin')}</i></p>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={4}
                                renderInput={(i) => <input {...i}/>}
                                inputStyle={{ width: '55px', fontSize: '16px', appearance: 'textarea' }}
                                renderSeparator={<>&nbsp;&nbsp;</>}
                                inputType='text'
                            />
                            <a style={{ cursor: 'pointer' }} onClick={() => OTPGeneration}>Resend OTP</a>
                            <Button label={'SUBMIT'} clickEvent={handleSubmit(otpVerify)} loading = {loading} disabled = {otp.length != 4} />
                            <a style={{ cursor: 'pointer' }} onClick={() => {setOtpMode(false); setOtp('')}}>Cancel and sign in again.</a>
                        </>
                        }
                        <p className="mobile-switch">Don't have an account? <a href="#" onClick={handleRegisterClick}>Sign Up</a></p>
                    </div>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <div style={{ cursor: 'pointer' }} onClick={navigateHome}>
                                <img style={{ margin: '50px', height:'70px'}} src='/npatelLogoName.svg'/>
                            </div>
                            <h1>Welcome Back!</h1>
                            <p>Enter your credentials to access all of PichHub's features</p>
                            <button className="hidden" onClick={handleLoginClick}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <div style={{ cursor: 'pointer' }} onClick={navigateHome}>
                                <img style={{ margin: '50px', height:'70px'}} src='/npatelLogoName.svg'/>
                            </div>
                            <h1>Hello, Photographer!</h1>
                            <p>Register with your details to explore PichHub's premium features</p>
                            <button className="hidden" onClick={handleRegisterClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;