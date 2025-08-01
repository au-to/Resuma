import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Download, 
  Palette, 
  Shield, 
  Zap, 
  Users,
  ArrowRight,
  Star,
  Check
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Resuma</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">登录</Button>
            </Link>
            <Link href="/auth/signin">
              <Button>开始制作</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="py-20 px-4 text-center">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            制作专业的
            <span className="text-primary"> 在线简历</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            使用现代化的简历编辑器，选择精美模板，实时预览效果，一键导出专业PDF简历
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" className="w-full sm:w-auto">
                免费开始制作
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              查看示例
            </Button>
          </div>
        </div>
      </section>

      {/* 特色功能 */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">为什么选择 Resuma？</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              我们提供最现代、最专业的简历制作体验，让您的求职之路更加顺畅
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Palette className="h-10 w-10 text-primary mb-2" />
                <CardTitle>精美模板</CardTitle>
                <CardDescription>
                  多种专业设计的简历模板，适合不同行业和职位需求
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>实时预览</CardTitle>
                <CardDescription>
                  所见即所得的编辑体验，实时查看简历效果，随时调整
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Download className="h-10 w-10 text-primary mb-2" />
                <CardTitle>一键导出</CardTitle>
                <CardDescription>
                  支持导出高质量PDF文件，完美适配各种求职平台
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>数据安全</CardTitle>
                <CardDescription>
                  企业级安全保障，您的个人信息和简历数据完全安全
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>协作分享</CardTitle>
                <CardDescription>
                  支持在线分享简历链接，方便与他人协作和获取反馈
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-primary mb-2" />
                <CardTitle>智能建议</CardTitle>
                <CardDescription>
                  AI驱动的内容建议，帮助您编写更有吸引力的简历内容
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* 用户评价 */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">用户好评如潮</h2>
            <p className="text-muted-foreground">
              已有 10,000+ 用户使用 Resuma 成功找到理想工作
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "界面非常现代化，操作简单直观。制作出来的简历效果很专业，成功帮我拿到了心仪的offer！"
                </p>
                <div className="font-semibold">张小明</div>
                <div className="text-sm text-muted-foreground">前端工程师</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "模板设计很棒，导出的PDF质量很高。最重要的是免费版功能就很丰富，性价比超高！"
                </p>
                <div className="font-semibold">李小红</div>
                <div className="text-sm text-muted-foreground">产品经理</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "编辑器功能强大，支持富文本编辑。实时预览功能让我可以随时调整，太方便了！"
                </p>
                <div className="font-semibold">王小刚</div>
                <div className="text-sm text-muted-foreground">数据分析师</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 定价方案 */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">选择适合您的方案</h2>
            <p className="text-muted-foreground">
              从免费版开始，随时升级解锁更多高级功能
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>免费版</CardTitle>
                <CardDescription>适合个人用户基础需求</CardDescription>
                <div className="text-3xl font-bold">¥0</div>
                <div className="text-sm text-muted-foreground">永久免费</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    3个基础模板
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    PDF导出
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    在线预览
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    基础编辑功能
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  开始使用
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle>专业版</CardTitle>
                <CardDescription>适合求职者和职场人士</CardDescription>
                <div className="text-3xl font-bold">¥29</div>
                <div className="text-sm text-muted-foreground">每月</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    20+精美模板
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    无限PDF导出
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    在线简历分享
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    优先客服支持
                  </li>
                </ul>
                <Button className="w-full mt-6">
                  立即升级
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>企业版</CardTitle>
                <CardDescription>适合团队和企业用户</CardDescription>
                <div className="text-3xl font-bold">¥99</div>
                <div className="text-sm text-muted-foreground">每月</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    所有模板和功能
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    团队协作功能
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    品牌定制
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    专属客服
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  联系销售
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-20 px-4">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">准备好制作您的专业简历了吗？</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            加入 10,000+ 用户的行列，使用 Resuma 制作出色的简历，让您在求职路上脱颖而出
          </p>
          <Link href="/auth/signin">
            <Button size="lg">
              免费开始制作
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t py-12 px-4">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Resuma</span>
              </div>
              <p className="text-sm text-muted-foreground">
                现代化的在线简历制作工具，帮助您创建专业简历，获得理想工作。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">产品</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/templates">简历模板</Link></li>
                <li><Link href="/examples">简历示例</Link></li>
                <li><Link href="/pricing">定价方案</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">支持</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/help">帮助中心</Link></li>
                <li><Link href="/contact">联系我们</Link></li>
                <li><Link href="/feedback">意见反馈</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">公司</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about">关于我们</Link></li>
                <li><Link href="/privacy">隐私政策</Link></li>
                <li><Link href="/terms">服务条款</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Resuma. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}