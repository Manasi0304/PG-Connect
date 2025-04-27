import React, { useLayoutEffect } from 'react'

const Chatbot = () => {
  useLayoutEffect(() => {
    const scriptId = 'botpress-script'
    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true

    const existingScript = document.getElementById(scriptId)
    if (!existingScript) {
      document.body.appendChild(script)
    }

    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: 'Chat with HomeHeaven',
        botConversationDescription: 'HomeHeaven',
        botId: '38ed9c45-d8e2-43ba-bd18-35e4b76f9c97',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '38ed9c45-d8e2-43ba-bd18-35e4b76f9c97',
        webhookId: '7de78305-36fa-4a97-a0cb-7d3962e22582',
        lazySocket: false,
        themeName: 'prism',
        frontendVersion: 'v1',
        useSessionStorage: true,
        enableConversationDeletion: true,
        theme: 'prism',
        themeColor: '#2563eb',
      })
    }

    return () => {
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div>
      <div id="botpress-webchat"></div>
    </div>
  )
}

export default Chatbot
