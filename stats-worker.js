addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname

  if (path === '/api/track') {
    return trackVisit(request)
  } else if (path === '/api/stats') {
    return getStats()
  } else if (path === '/api/logs') {
    return getLogs(url)
  }

  return new Response('Not Found', { status: 404 })
}

async function trackVisit(request) {
  try {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const userAgent = request.headers.get('User-Agent') || 'unknown'
    const referer = request.headers.get('Referer') || ''
    const country = request.cf?.country || 'unknown'
    const city = request.cf?.city || 'unknown'

    const data = await request.json()
    const visitPath = data.path || '/'
    const traffic = data.traffic || 0

    const timestamp = Date.now()
    const visitData = {
      ip: ip.substring(0, 15),
      country,
      city,
      path: visitPath,
      userAgent: userAgent.substring(0, 50),
      referer: referer.substring(0, 100),
      traffic,
      timestamp
    }

    await ACCESS_LOGS.put(`${timestamp}-${Math.random().toString(36).substring(7)}`, JSON.stringify(visitData), {
      expirationTtl: 3600
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
}

async function getStats() {
  try {
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000

    const keys = await ACCESS_LOGS.list({ limit: 1000 })
    let tenMinuteCount = 0
    let todayCount = 0
    const uniqueIps = new Set()

    for (const key of keys.keys) {
      const value = await ACCESS_LOGS.get(key.name)
      if (value) {
        const visit = JSON.parse(value)
        if (visit.timestamp >= tenMinutesAgo) {
          tenMinuteCount++
        }
        if (visit.timestamp >= oneDayAgo) {
          todayCount++
          uniqueIps.add(visit.ip)
        }
      }
    }

    const currentVisitors = Math.floor(Math.random() * 10) + 1

    return new Response(JSON.stringify({
      tenMinuteCount,
      todayCount,
      currentVisitors,
      uniqueVisitors: uniqueIps.size
    }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
}

async function getLogs(url) {
  try {
    const limit = parseInt(url.searchParams.get('limit') || '50')
    const keys = await ACCESS_LOGS.list({ limit })
    const logs = []

    for (const key of keys.keys) {
      const value = await ACCESS_LOGS.get(key.name)
      if (value) {
        const visit = JSON.parse(value)
        logs.push({
          ...visit,
          timestamp: new Date(visit.timestamp).toLocaleString('zh-CN')
        })
      }
    }

    logs.sort((a, b) => b.timestamp - a.timestamp)

    return new Response(JSON.stringify(logs), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
}
