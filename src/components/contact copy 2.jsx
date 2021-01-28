import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Waypoint } from 'react-waypoint';
import { useSpring, animated, config } from 'react-spring';
import useMeasure from "../hooks/useMeasure";

import validate from './validator';
import InputErrors from './inputErrors';

const Contact = ({ CONTACT }) => {
    const { SECTION_TITLE, PARAGRAF1, PARAGRAF2, PARAGRAF3, PARAGRAF4, NAME, EMAIL, MESSAGE, SUBMIT, ERRORS } = CONTACT;

    const [header, setHeadre] = useState(false);
    const [accordion1, setAccordion1] = useState(false);
    const [accordion2, setAccordion2] = useState(false);
    const [accordion3, setAccordion3] = useState(false);
    const [accordion4, setAccordion4] = useState(false);
    const [bind1, { height1 }] = useMeasure();
    const [bind2, { height2 }] = useMeasure();
    const [bind3, { height3 }] = useMeasure();
    const [bind4, { height4 }] = useMeasure();

    const [isSubmmited, setIsSubmmited] = useState('')

    const [values, setValues] = useState({
        name: {
            value: '',
            errors: [],
            validations: {
                required: true,
                minLength: 3,
                pattern: /^[a-zא-תA-Z ]*$/
            }
        },
        email: {
            value: '',
            errors: [],
            validations: {
                required: true,
                minLength: 0,
                pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            }
        },
        message: {
            value: '',
            errors: [],
            validations: {
                required: true,
                minLength: 10,
                pattern: /^[a-zא-תA-Z0-9!?/(),. _%+-]*$/
            }
        }
    })

    const headrSwap = useSpring({
        opacity: header ? 1 : 0,
        config: config.molasses,
        transform: header
            ? `translate3d(0,0,0)`
            : `translate3d(-50%,0,0)`
    })

    const accordion1Animation = useSpring({
        height: accordion1 ? height1 : 0,
        marginBottom: '2rem',
        overflow: 'hidden'
    })

    const accordion2Animation = useSpring({
        height: accordion2 ? height2 : 0,
        marginBottom: '2rem',
        overflow: 'hidden'
    })

    const accordion3Animation = useSpring({
        height: accordion3 ? height3 : 0,
        marginBottom: '2rem',
        overflow: 'hidden'
    })

    const accordion4Animation = useSpring({
        height: accordion4 ? height4 : 0,
        overflow: 'hidden'
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: {
                ...values[name],
                value
            }
        });
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;

        const errors = validate(name, value, values[name].validations, ERRORS);

        setValues({
            ...values,
            [name]: {
                ...values[name],
                value,
                errors
            }
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        let isOK = true;

        for (const name in values) {
            console.log(name)
            const field = values[name];
            const errors = validate(name, field.value, field.validations, ERRORS);
            if (errors.length) {
                isOK = false;
                setIsSubmmited('fillErr')
                console.log('errors', errors)
                setValues({
                    ...values,
                    [name]: {
                        ...values[name],
                        errors
                    }
                })
            }
        }

        if (isOK) {
            emailjs.sendForm('service_56lr3eh', 'template_x4r5xea', e.target, "user_s4TwhJIxgZNXyXz3WcQwI")
                .then((result) => {
                    console.log('result', result);
                    setIsSubmmited(result && 'ok')
                }, (error) => {
                    console.log('error', error);
                    setIsSubmmited(error && 'submitErr')
                });
            setValues({
                ...values,
                ['name']: {
                    ...values['name'],
                    value: '',
                    error: []
                },
                ['email']: {
                    ...values['email'],
                    value: '',
                    error: []
                },
                ['message']: {
                    ...values['message'],
                    value: '',
                    error: []
                }
            });
            e.target.reset()
        }
    }

    console.log('values', values);

    return (
        <div id={'contact'}>
            <svg preserveAspectRatio="none" viewBox="0 0 100 102" height="75" width="100%">
                <path d="M0 0 L50 100 L100 0 Z" fill="#e2e2e2" stroke="#e2e2e2"></path>
            </svg>
            <div className="container">
                <div>
                    <Waypoint
                        bottomOffset="20%"
                        topOffset='-20%'
                        onEnter={() => {
                            if (!header) setHeadre(true);
                        }}
                    />
                    <animated.h1 style={headrSwap}
                        className="component-header">
                        {SECTION_TITLE}
                    </animated.h1>
                </div>
                <div className="container">
                    <div className={'wrapper row align-items-center'}>
                        <div className={'col-md-4 col-lg ml-4 mr-4 ml-sm-0 mr-sm-0'}>
                            <div>
                                <Waypoint
                                    bottomOffset="20%"
                                    topOffset='-20%'
                                    onEnter={() => {
                                        if (!accordion1) setAccordion1(true);
                                    }}
                                />
                                <animated.div style={accordion1Animation}>
                                    <h3 {...bind1}>{PARAGRAF1}</h3>
                                </animated.div>
                            </div>
                            <div>
                                <Waypoint
                                    bottomOffset="20%"
                                    topOffset='-20%'
                                    onEnter={() => {
                                        if (!accordion2) setAccordion2(true);
                                    }}
                                />
                                <animated.div style={accordion2Animation}>
                                    <h3 {...bind2}>{PARAGRAF2}</h3>
                                </animated.div>
                            </div>
                            <div>
                                <Waypoint
                                    bottomOffset="20%"
                                    topOffset='-20%'
                                    onEnter={() => {
                                        if (!accordion3) setAccordion3(true);
                                    }}
                                />
                                <animated.div style={accordion3Animation}>
                                    <h3 {...bind3}>{PARAGRAF3}</h3>
                                </animated.div>
                            </div>
                            <div>
                                <Waypoint
                                    bottomOffset="20%"
                                    topOffset='-20%'
                                    onEnter={() => {
                                        if (!accordion4) setAccordion4(true);
                                    }}
                                />
                                <animated.div style={accordion4Animation}>
                                    <h3 {...bind4}>{PARAGRAF4}</h3>
                                </animated.div>
                            </div>
                        </div>
                        <form className={'form col'} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name={'name'}
                                value={values['name'].value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={NAME} />
                            {
                                values['name'].errors &&
                                <InputErrors errors={values['name'].errors}></InputErrors>
                            }
                            <input
                                type="email"
                                name={'email'}
                                value={values['email'].value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={EMAIL} />
                            {
                                values.email.errors &&
                                <InputErrors errors={values['email'].errors}></InputErrors>
                            }
                            <textarea
                                type="text"
                                name={'message'}
                                value={values['message'].value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={MESSAGE}
                                rows="6"
                                cols="50" />
                            {
                                values['message'].errors &&
                                <InputErrors errors={values['message'].errors}></InputErrors>
                            }
                            <input type="submit" value={SUBMIT} className={'submit'} />
                            {
                                isSubmmited === 'fillErr' &&
                                <div>
                                    {ERRORS['submit']['fillErr']}
                                </div>
                            }
                            {
                                isSubmmited === 'submitErr' &&
                                <div>
                                    {ERRORS['submit']['submitErr']}
                                </div>
                            }
                            {
                                isSubmmited === 'ok' &&
                                <div>
                                    {ERRORS['submit']['ok']}
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;