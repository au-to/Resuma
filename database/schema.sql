-- 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 用户表（由 NextAuth 自动创建，这里仅做参考）
-- 实际表结构由 @auth/supabase-adapter 管理

-- 简历表
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL DEFAULT '新建简历',
  content JSONB NOT NULL DEFAULT '{
    "personal": {
      "name": "",
      "email": "",
      "phone": "",
      "location": "",
      "website": "",
      "linkedin": "",
      "github": ""
    },
    "summary": "",
    "experience": [],
    "education": [],
    "skills": [],
    "projects": [],
    "languages": [],
    "certifications": []
  }',
  template_id UUID REFERENCES templates(id),
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 模板表
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  styles JSONB NOT NULL DEFAULT '{
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    },
    "colors": {
      "primary": "#3b82f6",
      "secondary": "#64748b",
      "text": "#1f2937",
      "background": "#ffffff"
    },
    "layout": "single-column",
    "spacing": "normal"
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 用户配置表
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_template_id UUID REFERENCES templates(id),
  settings JSONB DEFAULT '{
    "theme": "light",
    "auto_save": true,
    "email_notifications": true
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON resumes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_resumes_updated_at ON resumes(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_resumes_is_public ON resumes(is_public);
CREATE INDEX IF NOT EXISTS idx_templates_is_premium ON templates(is_premium);

-- 更新时间戳触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_resumes_updated_at 
  BEFORE UPDATE ON resumes 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at 
  BEFORE UPDATE ON templates 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at 
  BEFORE UPDATE ON user_settings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (行级安全) 策略
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- 简历访问策略
CREATE POLICY "用户只能查看自己的简历" ON resumes
  FOR SELECT USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "用户只能创建自己的简历" ON resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户只能更新自己的简历" ON resumes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "用户只能删除自己的简历" ON resumes
  FOR DELETE USING (auth.uid() = user_id);

-- 用户设置访问策略
CREATE POLICY "用户只能查看自己的设置" ON user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户只能创建自己的设置" ON user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户只能更新自己的设置" ON user_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- 模板对所有人可见
CREATE POLICY "所有人都可以查看模板" ON templates
  FOR SELECT TO authenticated USING (true);

-- 插入默认模板数据
INSERT INTO templates (id, name, description, thumbnail, is_premium, styles) VALUES
(
  '00000000-0000-0000-0000-000000000001',
  '经典简约',
  '经典的单栏布局，适合各行各业',
  '/templates/classic.png',
  false,
  '{
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    },
    "colors": {
      "primary": "#1f2937",
      "secondary": "#6b7280",
      "text": "#111827",
      "background": "#ffffff"
    },
    "layout": "single-column",
    "spacing": "normal"
  }'
),
(
  '00000000-0000-0000-0000-000000000002',
  '现代双栏',
  '现代感十足的双栏设计，突出个人信息',
  '/templates/modern.png',
  false,
  '{
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    },
    "colors": {
      "primary": "#3b82f6",
      "secondary": "#64748b",
      "text": "#1f2937",
      "background": "#ffffff"
    },
    "layout": "two-column",
    "spacing": "normal"
  }'
),
(
  '00000000-0000-0000-0000-000000000003',
  '创意设计',
  '富有创意的设计风格，适合设计师和创意工作者',
  '/templates/creative.png',
  true,
  '{
    "fonts": {
      "heading": "Poppins",
      "body": "Open Sans"
    },
    "colors": {
      "primary": "#8b5cf6",
      "secondary": "#a78bfa",
      "text": "#1f2937",
      "background": "#ffffff"
    },
    "layout": "modern",
    "spacing": "spacious"
  }'
) ON CONFLICT (id) DO NOTHING;