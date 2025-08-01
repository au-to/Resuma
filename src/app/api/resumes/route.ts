import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const createResumeSchema = z.object({
  title: z.string().min(1, '简历标题不能为空').max(255, '标题长度不能超过255个字符'),
  content: z.object({
    personal: z.object({
      name: z.string(),
      email: z.string().email().optional().or(z.literal('')),
      phone: z.string().optional(),
      location: z.string().optional(),
      website: z.string().url().optional().or(z.literal('')),
      linkedin: z.string().optional(),
      github: z.string().optional(),
    }),
    summary: z.string().optional(),
    experience: z.array(z.any()).default([]),
    education: z.array(z.any()).default([]),
    skills: z.array(z.any()).default([]),
    projects: z.array(z.any()).default([]),
    languages: z.array(z.any()).default([]),
    certifications: z.array(z.any()).default([]),
  }),
  template_id: z.string().uuid().optional(),
  is_public: z.boolean().default(false),
});

// GET /api/resumes - 获取用户的所有简历
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const supabase = await createClient();
    
    const { data: resumes, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', session.user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('获取简历列表失败:', error);
      return NextResponse.json({ error: '获取简历列表失败' }, { status: 500 });
    }

    return NextResponse.json({ data: resumes });
  } catch (error) {
    console.error('服务器错误:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}

// POST /api/resumes - 创建新简历
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createResumeSchema.parse(body);

    const supabase = await createClient();
    
    const { data: resume, error } = await supabase
      .from('resumes')
      .insert({
        user_id: session.user.id,
        title: validatedData.title,
        content: validatedData.content,
        template_id: validatedData.template_id,
        is_public: validatedData.is_public,
      })
      .select()
      .single();

    if (error) {
      console.error('创建简历失败:', error);
      return NextResponse.json({ error: '创建简历失败' }, { status: 500 });
    }

    return NextResponse.json({ data: resume }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '数据验证失败', details: error.errors },
        { status: 400 }
      );
    }

    console.error('服务器错误:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}