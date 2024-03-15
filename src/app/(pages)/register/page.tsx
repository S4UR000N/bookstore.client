'use client';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useState } from 'react';
import RegistrationFormModel from '../../models/form/RegistrationFormModel';
import AuthService from '../../services/AuthService';

export default function Register() {
  const router = useRouter()
  const [form, setForm] = useState(new RegistrationFormModel());
  let errors = new Array<string>();

  async function handleSubmit(e)
  {
    e.preventDefault();
    errors.splice(0, errors.length);

    let response = await AuthService.register(form);
  
    if (!!Object.keys(response.errors).length) {
      Object.keys(response.errors).forEach(key => {
        response.errors[key].forEach(error => {
          errors.push(`${key}: ${error}\n`);
        });
      });

      alert(errors);
    }
    else {
      alert("Registration Successful!");
      router.push('/login');
    }
  }

  return (
    <main>
      <section className="bg-gray-700 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create and account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input minLength={1} type="text" name="first-name" id="first-name" className="bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="New"
                              value={form.firstName}
                              onChange={e => {
                                  setForm(formState => {
                                    formState.firstName = e.target.value
                                    return formState
                                  })
                                }
                              }
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input minLength={1} type="text" name="last-name" id="last-name" className="bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Reader"
                            value={form.lastName}
                            onChange={e => {
                                setForm(formState => {
                                  formState.lastName = e.target.value
                                  return formState
                                })
                              }
                            }
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input minLength={3} type="email" name="email" id="email" className="bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="best@reader.com"
                            value={form.email}
                            onChange={e => {
                                setForm(formState => {
                                  formState.email = e.target.value
                                  return formState
                                })
                              }
                            }
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input minLength={8} type="password" name="password" id="password" className="bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                             placeholder="••••••••"
                             value={form.password}
                              onChange={e => {
                                setForm(formState => {
                                  formState.password = e.target.value
                                  return formState
                                })
                              }
                            }
                             />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input minLength={8} type="password" name="confirm-password" id="confirm-password" className="bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                             placeholder="••••••••"
                             value={form.confirmPassword}
                              onChange={e => {
                                setForm(formState => {
                                  formState.confirmPassword = e.target.value
                                  return formState
                                })
                              }
                            }
                             />
                        </div>
                        <button type="submit" className="w-full text-white
                          bg-gray-700 
                          hover:bg-gray-600 
                          focus:ring-4 focus:outline-none focus:ring-primary-300 
                          font-medium rounded-lg
                          text-sm px-5 py-2.5 text-center
                          dark:bg-primary-400
                          dark:hover:bg-primary-700
                          dark:focus:ring-primary-800">Create an account</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}