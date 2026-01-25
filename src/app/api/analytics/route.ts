import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const metric = await request.json();
    
    // Log metric (in production, send to analytics service)
    console.log('Web Vital:', metric);
    
    // TODO: Send to analytics service (Google Analytics, Vercel Analytics, etc.)
    // Example: await sendToAnalytics(metric);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
