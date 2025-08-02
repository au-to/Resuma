import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: '认证错误 - Resuma',
  description: '登录过程中出现了错误',
};

interface ErrorPageProps {
  searchParams: {
    error?: string;
  };
}

const errorMessages: Record<string, { title: string; description: string }> = {
  Configuration: {
    title: '配置错误',
    description: '服务器配置有误，请联系管理员。',
  },
  AccessDenied: {
    title: '访问被拒绝',
    description: '您没有权限访问此应用程序。',
  },
  Verification: {
    title: '验证失败',
    description: '验证链接无效或已过期，请重新申请登录链接。',
  },
  EmailCreateAccount: {
    title: '无法创建账户',
    description: '无法使用此邮箱创建账户，请尝试其他邮箱或联系管理员。',
  },
  Signin: {
    title: '登录失败',
    description: '登录过程中出现错误，请重试。',
  },
  OAuthSignin: {
    title: 'OAuth 登录错误',
    description: '第三方登录服务出现问题。',
  },
  OAuthCallback: {
    title: 'OAuth 回调错误',
    description: '第三方登录回调处理失败。',
  },
  OAuthCreateAccount: {
    title: 'OAuth 账户创建失败',
    description: '无法通过第三方服务创建账户。',
  },
  EmailSignin: {
    title: '邮件登录错误',
    description: '无法发送登录邮件，请检查邮箱地址或稍后重试。',
  },
  CredentialsSignin: {
    title: '凭据错误',
    description: '用户名或密码不正确。',
  },
  SessionRequired: {
    title: '需要登录',
    description: '访问此页面需要登录，请先完成身份验证。',
  },
  Default: {
    title: '认证错误',
    description: '认证过程中出现未知错误，请重试。',
  },
};

export default function AuthErrorPage({ searchParams }: ErrorPageProps) {
  const error = searchParams.error || 'Default';
  const errorInfo = errorMessages[error] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-900">{errorInfo.title}</CardTitle>
            <CardDescription className="text-red-700">
              {errorInfo.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error === 'Verification' && (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>提示：</strong>登录链接可能已过期或已被使用。每个登录链接只能使用一次。
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Link href="/auth/signin">
                <Button className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  重新登录
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回首页
                </Button>
              </Link>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              如果问题持续存在，请联系技术支持。
              <br />
              错误代码: {error}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}