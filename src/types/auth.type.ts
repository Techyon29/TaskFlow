import {z} from 'zod'
import { forgetEmailValidation, otpVerifyValidation, resetPasswordValidation } from '../lib/validation/auth.validation'


export type forgetEmailType = z.infer<typeof forgetEmailValidation>

export type otpVerifyType = z.infer<typeof otpVerifyValidation>

export type resetPasswordType = z.infer<typeof resetPasswordValidation>