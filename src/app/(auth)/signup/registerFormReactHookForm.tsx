'use client'

import Spinner from '@/components/loading/spinner'
import React, { useEffect, useState } from 'react'
import { ptMono } from '@/app/fonts'
import { useForm } from 'react-hook-form'
import { TSignUpSchema, signUpSchema } from '@/schemas/signUp.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'

export const RegisterForm = () => {
  const [initialEmail, setInitialEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      usernameOrEmail: initialEmail,
    },
  })

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const email = searchParams.get('email') || ''
    setInitialEmail(email)
    setValue('usernameOrEmail', email)
  }, [setValue])

  const onSubmit = async (data: TSignUpSchema) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const responseData = await response.json()
      if (responseData.errors) {
        for (const [fieldName, message] of Object.entries(
          responseData.errors,
        )) {
          setError(fieldName as keyof TSignUpSchema, {
            type: 'server',
            message: message as string,
          })
        }
        return
      }

      await signIn('credentials', {
        email: data.usernameOrEmail,
        password: data.password,
        callbackUrl: '/onboarding',
      })
    } catch (err) {
      console.log(err)
    }

    // reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex w-full flex-col justify-center ${ptMono.className}`}>
      <input
        {...register('usernameOrEmail')}
        type='text'
        value={initialEmail}
        placeholder='username or email'
        className='input mb-4 h-14 w-full bg-opacity-25 pl-10 placeholder-white'
        onChange={e => {
          setInitialEmail(e.target.value)
          setValue('usernameOrEmail', e.target.value) // Update form field value
        }}
      />
      {errors.usernameOrEmail && (
        <p className='text-red-500'>{`${errors.usernameOrEmail.message}`}</p>
      )}
      <input
        {...register('name')}
        type='text'
        placeholder='name'
        className='input  mb-4 h-14 w-full  bg-opacity-25 pl-10 placeholder-white'
      />
      {errors.name && (
        <p className='text-red-500'>{`${errors.name.message}`}</p>
      )}
      <input
        {...register('password')}
        type='password'
        placeholder='password'
        autoComplete='password'
        className='input  mb-4 h-14 w-full  bg-opacity-25 pl-10 placeholder-white'
      />
      {errors.password && (
        <p className='text-red-500'>{`${errors.password.message}`}</p>
      )}
      <input
        {...register('confirmPassword')}
        type='password'
        placeholder='Confirm password'
        autoComplete='password'
        className='input  mb-4 h-14 w-full  bg-opacity-25 pl-10 placeholder-white'
      />
      {errors.confirmPassword && (
        <p className='text-red-500'>{`${errors.confirmPassword.message}`}</p>
      )}
      <div className='flex items-center justify-center gap-2 px-2 py-8'>
        <input
          {...register('terms')}
          id='terms'
          name='terms'
          type='checkbox'
          className='checkbox rounded-md bg-white bg-opacity-50'
        />
        <label className='ml-4 text-left text-sm' htmlFor='terms'>
          by creating an account, you accept our terms and conditions.
        </label>
      </div>
      {errors.terms && (
        <p className='text-red-500'>{`${errors.terms.message}`}</p>
      )}

      <div className='flex flex-col items-center justify-center gap-3'>
        <button
          disabled={isSubmitting}
          type='submit'
          className=' h-14 w-full rounded-full bg-loginButtons lowercase text-black'>
          {isSubmitting ? (
            <Spinner width='w-4' height='h-4' border='border-2' />
          ) : (
            'create your account'
          )}
        </button>
      </div>
    </form>
  )
}
