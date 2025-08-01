import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /api/templates - 获取所有可用模板
export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: templates, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('获取模板列表失败:', error);
      return NextResponse.json({ error: '获取模板列表失败' }, { status: 500 });
    }

    // 将模板按类型分组
    const freeTemplates = templates.filter(template => !template.is_premium);
    const premiumTemplates = templates.filter(template => template.is_premium);

    return NextResponse.json({
      data: {
        free: freeTemplates,
        premium: premiumTemplates,
        all: templates,
      },
    });
  } catch (error) {
    console.error('服务器错误:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}