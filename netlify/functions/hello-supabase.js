// netlify/functions/hello-supabase.js
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  // 从 Netlify 环境变量中安全地读取 Supabase 配置
  //const supabaseUrl = process.env.SUPABASE_URL;
  //const supabaseKey = process.env.SUPABASE_ANON_KEY;
// 硬编码测试（仅供测试，测试成功后请改回）
const supabaseUrl = 'https://gpeuooddcdobgchquzgp.supabase.co';
const supabaseKey = 'sb_publishable_-fF9qz5MguFn0ZQjcD3s0A_2KvnUu94';
  // 检查环境变量是否配置成功
  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Supabase 环境变量未配置' }),
    };
  }

  // 初始化 Supabase 客户端
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 尝试从 'posts' 表读取数据（限制 1 条，仅用于测试）
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .limit(1);

    if (error) {
      // 如果查询出错，返回错误信息
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }

    // 查询成功，返回连接成功的信息和读取到的数据
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: '🎉 Supabase 连接成功！',
        data: data,
      }),
    };
  } catch (error) {
    // 捕获其他意外错误
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
