'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail } from 'lucide-react';

const signInSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      const result = await signIn('nodemailer', {
        email: data.email,
        redirect: false,
        callbackUrl: '/dashboard',
      });

      if (result?.ok) {
        setIsEmailSent(true);
      } else {
        // 处理错误
        console.error('Sign in failed:', result?.error);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">检查您的邮箱</h3>
        <p className="text-muted-foreground">
          我们已向 <strong>{getValues('email')}</strong> 发送了登录链接。
          请点击邮件中的链接完成登录。
        </p>
        <div className="text-sm text-muted-foreground">
          没有收到邮件？请检查垃圾邮件文件夹，或者
          <button
            onClick={() => setIsEmailSent(false)}
            className="text-primary hover:underline ml-1"
          >
            重新发送
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">邮箱地址</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        发送登录链接
      </Button>

      <div className="text-xs text-muted-foreground text-center">
        我们将向您的邮箱发送一个安全的登录链接，无需记住密码。
      </div>
    </form>
  );
}