'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Loader2 } from 'lucide-react';
import { useResumeStore } from '@/store/resume';
import { useAuthStore } from '@/store/auth';

export function CreateResumeButton() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { createNewResume } = useResumeStore();
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !title.trim()) return;

    setIsLoading(true);
    try {
      const newResume = createNewResume(user.id, title.trim());
      
      // 调用 API 创建简历
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newResume.title,
          content: newResume.content,
          is_public: newResume.is_public,
        }),
      });

      if (response.ok) {
        const { data } = await response.json();
        router.push(`/editor/${data.id}`);
      } else {
        console.error('创建简历失败');
      }
    } catch (error) {
      console.error('创建简历时发生错误:', error);
    } finally {
      setIsLoading(false);
      setOpen(false);
      setTitle('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建简历
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>创建新简历</DialogTitle>
          <DialogDescription>
            为您的新简历起一个有意义的名称，方便后续管理。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">简历标题</Label>
            <Input
              id="title"
              placeholder="例如：前端工程师简历"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              取消
            </Button>
            <Button type="submit" disabled={isLoading || !title.trim()}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              创建简历
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}