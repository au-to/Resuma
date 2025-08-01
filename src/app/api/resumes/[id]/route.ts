import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const updateResumeSchema = z.object({
  title: z.string().min(1).max(255).optional(),
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
  }).optional(),
  template_id: z.string().uuid().optional(),
  is_public: z.boolean().optional(),
});

interface Params {
  id: string;
}

// GET /api/resumes/[id] - 获取特定简历
export async function GET(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    const session = await auth();

    const supabase = await createClient();
    
    let query = supabase
      .from('resumes')
      .select('*')
      .eq('id', id);

    // 如果用户未登录，只能查看公开的简历
    if (!session?.user?.id) {
      query = query.eq('is_public', true);
    } else {
      // 如果用户已登录，可以查看自己的简历或公开的简历
      query = query.or(`user_id.eq.${session.user.id},is_public.eq.true`);
    }

    const { data: resume, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: '简历不存在或无权访问' }, { status: 404 });
      }
      console.error('获取简历失败:', error);
      return NextResponse.json({ error: '获取简历失败' }, { status: 500 });
    }

    return NextResponse.json({ data: resume });
  } catch (error) {
    console.error('服务器错误:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}

// PUT /api/resumes/[id] - 更新简历
export async function PUT(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateResumeSchema.parse(body);

    const supabase = await createClient();
    
    // 首先检查简历是否存在且属于当前用户
    const { data: existingResume, error: fetchError } = await supabase
      .from('resumes')
      .select('id')
      .eq('id', id)
      .eq('user_id', session.user.id)
      .single();

    if (fetchError || !existingResume) {
      return NextResponse.json({ error: '简历不存在或无权访问' }, { status: 404 });
    }

    // 更新简历
    const { data: resume, error } = await supabase
      .from('resumes')
      .update(validatedData)
      .eq('id', id)
      .eq('user_id', session.user.id)
      .select()
      .single();

    if (error) {
      console.error('更新简历失败:', error);
      return NextResponse.json({ error: '更新简历失败' }, { status: 500 });
    }

    return NextResponse.json({ data: resume });
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

// DELETE /api/resumes/[id] - 删除简历
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const supabase = await createClient();
    
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (error) {
      console.error('删除简历失败:', error);
      return NextResponse.json({ error: '删除简历失败' }, { status: 500 });
    }

    return NextResponse.json({ message: '简历删除成功' });
  } catch (error) {
    console.error('服务器错误:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}