import React, { useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = ({ cancel }) => {

    const [state, handleSubmit] = useForm("mpzgryok");

    useEffect(() => {
        if (state.succeeded) {
            alert('message submitted successfully');
            cancel();
        };
    }, [state.succeeded])


    return (
        <div className='absolute w-full h-full bg-[#000] z-20'>
            <form onSubmit={handleSubmit} className='absolute w-[500px] flex flex-col gap-[20px] text-[white] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#333] p-[20px]'>
                <label htmlFor="email">
                    Email Address
                </label>
                <input
                    className='text-[black]'
                    id="email"
                    type="email"
                    name="email"
                />
                <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                />
                <label>
                    description
                </label>
                <textarea
                    className='text-[black] '
                    id="message"
                    name="message"
                />
                <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                />
                <button type="submit" disabled={state.submitting} className='bg-[#5AB268]'>
                    Submit
                </button>

                <button onClick={cancel} className='bg-[#5AB268]'>
                    Cancel
                </button>

            </form>
        </div>
    );
}

export default ContactForm;