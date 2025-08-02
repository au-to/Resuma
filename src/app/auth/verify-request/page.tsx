import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '验证邮箱 - Resuma',
  description: '请检查您的邮箱以完成登录',
};

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">验证您的邮箱</CardTitle>
            <CardDescription>
              我们已经向您的邮箱发送了一个登录链接
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-900">邮件已发送</p>
                  <p className="text-sm text-green-700">
                    请检查您的收件箱，点击邮件中的链接即可完成登录。
                  </p>
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>• 邮件可能需要几分钟才能到达</p>
                <p>• 请检查垃圾邮件文件夹</p>
                <p>• 链接有效期为 24 小时</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/auth/signin">
                <Button className="w-full">
                  返回登录页面
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
              如果您没有收到邮件，请尝试重新发送登录链接。
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}