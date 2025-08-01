'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  FileText, 
  Edit, 
  Eye, 
  Download, 
  Share2, 
  MoreVertical, 
  Trash2,
  Globe,
  Lock
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Resume } from '@/types';

interface ResumeGridProps {
  userId: string;
}

export function ResumeGrid({ userId }: ResumeGridProps) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch('/api/resumes');
        if (response.ok) {
          const { data } = await response.json();
          setResumes(data);
        } else {
          setError('获取简历列表失败');
        }
      } catch (error) {
        console.error('获取简历时发生错误:', error);
        setError('网络错误，请稍后重试');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, [userId]);

  const handleDelete = async (resumeId: string) => {
    if (!confirm('确定要删除这份简历吗？此操作无法撤销。')) {
      return;
    }

    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setResumes(resumes.filter(resume => resume.id !== resumeId));
      } else {
        alert('删除失败，请稍后重试');
      }
    } catch (error) {
      console.error('删除简历时发生错误:', error);
      alert('删除失败，请稍后重试');
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="flex justify-between">
                <div className="h-8 bg-gray-200 rounded w-16"></div>
                <div className="h-8 bg-gray-200 rounded w-8"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">加载失败</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>重试</Button>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">还没有简历</h3>
        <p className="text-muted-foreground mb-4">
          创建您的第一份简历，开始您的求职之旅
        </p>
        <Button asChild>
          <Link href="/templates">
            选择模板创建
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resumes.map((resume) => (
        <Card key={resume.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-1">{resume.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>更新于 {formatDate(resume.updated_at)}</span>
                  {resume.is_public ? (
                    <Badge variant="secondary" className="text-xs">
                      <Globe className="h-3 w-3 mr-1" />
                      公开
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      <Lock className="h-3 w-3 mr-1" />
                      私密
                    </Badge>
                  )}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/editor/${resume.id}`}>
                      <Edit className="h-4 w-4 mr-2" />
                      编辑
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/preview/${resume.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      预览
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    导出PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2" />
                    分享链接
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleDelete(resume.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    删除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            {/* 简历预览 */}
            <div className="bg-white border rounded-lg p-4 mb-4 h-32 overflow-hidden text-xs">
              <div className="font-semibold text-gray-900 mb-1">
                {resume.content.personal.name || '未填写姓名'}
              </div>
              <div className="text-gray-600 mb-2">
                {resume.content.personal.email || '未填写邮箱'}
              </div>
              {resume.content.summary && (
                <div className="text-gray-700 line-clamp-3">
                  {resume.content.summary}
                </div>
              )}
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/preview/${resume.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  预览
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={`/editor/${resume.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  编辑
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}