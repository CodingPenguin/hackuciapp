import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Form.css';


function Form() {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const showToast = status => {
        if (status === 'OK') {
            toast.success('Successful!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (status === 'BAD') {
            toast.error('Please try again!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const onSubmit = data => {
        console.log(data);

        fetch(`https://hack-tech-app-endpoint.herokuapp.com/test?name=${data.name}&email=${data.email}&funfact=${data.funFact}`)
        .then(
            response => {
                showToast(response.statusText);
            }
        )
    };

    return (
        <>
            <div className='card-container'>
                <div className='card'>
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <h1>Hack UCI Application</h1>

                        <div className='input-group'>
                            <label className='formLabel'>Name</label>
                            <input 
                                className='formTextbox'
                                type='text'
                                name='name'
                                placeholder='Name'
                                {...register(
                                    'name', {
                                        required: "Please enter your name."
                                    }
                                )}
                            />
                            <span>{errors.name?.message}</span>
                        </div>

                        <div className='input-group'>
                            <label className='formLabel'>Email</label>
                            <input 
                                className='formTextbox'
                                type='text'
                                name='email'
                                placeholder='Email'
                                {...register(
                                    'email', {
                                        required: "Please enter your email.",
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Invalid email address."
                                        }
                                    }
                                )}
                            />
                            <span>{errors.email?.message}</span>
                        </div>

                        <div className='input-group fun'>       
                            <label className='formLabel'>Fun Fact</label>
                            <textarea
                                className='formTextbox funFact'
                                name='funFact'
                                placeholder='Fun Fact'
                                {...register(
                                    'funFact', {
                                        required: "Please enter a fun fact!"
                                    }
                                )}
                            />
                            <span>{errors.funFact?.message}</span>
                        </div>

                        <div className='pull-right'>
                            <button className='submit' type='submit' >Submit</button>
                            <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Form;