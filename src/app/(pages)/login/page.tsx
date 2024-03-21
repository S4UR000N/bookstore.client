'use client';
import Link from 'next/link';
import { useState } from 'react';
import AuthService from '../../services/AuthService';
import LoginFormModel from '../../models/form/LoginFormModel';
import JwtService from '../../services/JwtService';

export default function Login() {
  const [form, setForm] = useState(new LoginFormModel());
  let errors = new Array<string>();

  async function handleSubmit(e)
  {
    e.preventDefault();
    errors.splice(0, errors.length);

    let response = await AuthService.login(form);
  
    if (!!Object.keys(response.errors).length) {
      Object.keys(response.errors).forEach(key => {
        response.errors[key].forEach(error => {
          errors.push(`${key}: ${error}\n`);
        });
      });

      alert(errors);
    }
    else {
      JwtService.handleJwt(response.result as string);
      alert("Login Successful!");
      document.location.href = '/';
    }
  }

  return (
    <main>
      <section className="bg-gray-700 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Log in
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmit(e)}>
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
                        <button type="submit" className="w-full text-white
                          bg-gray-700 
                          hover:bg-gray-600 
                          focus:ring-4 focus:outline-none focus:ring-primary-300 
                          font-medium rounded-lg
                          text-sm px-5 py-2.5 text-center
                          dark:bg-primary-400
                          dark:hover:bg-primary-700
                          dark:focus:ring-primary-800">Let's read</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Do not have an account? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create one here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}