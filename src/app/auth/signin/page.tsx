import { Metadata } from 'next';
import Link from 'next/link';
import { SignInForm } from '@/components/forms/signin-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '登录 - Resuma',
  description: '登录您的 Resuma 账户，继续制作专业简历',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* 左侧 - 品牌展示 */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center space-x-2 text-white">
            <ArrowLeft className="h-4 w-4" />
            <span>返回首页</span>
          </Link>
        </div>
        
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <FileText className="h-8 w-8" />
            <span className="text-2xl font-bold">Resuma</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            欢迎回来！
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8">
            继续制作您的专业简历，让求职之路更加顺畅。
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>多种精美模板可选</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>实时预览简历效果</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>一键导出PDF文件</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-primary-foreground/60">
          © 2024 Resuma. 保留所有权利。
        </div>
      </div>

      {/* 右侧 - 登录表单 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* 移动端头部 */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center space-x-2 text-muted-foreground mb-4">
              <ArrowLeft className="h-4 w-4" />
              <span>返回首页</span>
            </Link>
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Resuma</span>
            </div>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">登录账户</CardTitle>
              <CardDescription>
                输入您的邮箱地址，我们将发送登录链接给您
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm />
              
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">还没有账户？</span>
                <Link href="/auth/signup" className="text-primary hover:underline ml-1">
                  立即注册
                </Link>
              </div>

              <div className="mt-6 text-center">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    返回首页
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            登录即表示您同意我们的
            <Link href="/terms" className="text-primary hover:underline mx-1">
              服务条款
            </Link>
            和
            <Link href="/privacy" className="text-primary hover:underline mx-1">
              隐私政策
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}