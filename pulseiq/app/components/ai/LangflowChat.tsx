'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { useDashboardStore } from '@/app/store/dashboardStore';

export function LangflowChat() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const updateAPIStatus = useDashboardStore((state) => state.updateAPIStatus);

  useEffect(() => {
    if (scriptLoaded && containerRef.current && !containerRef.current.querySelector('langflow-chat')) {
      // Create the custom element
      const chatElement = document.createElement('langflow-chat');
      
      // Set required attributes for Langflow widget
      chatElement.setAttribute('window_title', 'PulseIQ AI Assistant');
      chatElement.setAttribute('flow_id', 'ce0bea51-8829-4115-990b-6cbd8bb51ca3');
      chatElement.setAttribute('host_url', 'https://langflow.servicesessentials.ibm.com');
      chatElement.setAttribute('api_key', 'sk-F1sRs8TrNwAkWGR-DUHBs4xdFEpeRSkCO7ntvvroHhU');
      
      // Additional configuration for better UX
      chatElement.setAttribute('chat_position', 'bottom-right');
      chatElement.setAttribute('chat_trigger_style', 'button');
      chatElement.setAttribute('placeholder', 'Ask me anything about products...');
      chatElement.setAttribute('input_style', 'underlined');
      chatElement.setAttribute('send_button_style', 'icon');
      chatElement.setAttribute('online_message', 'PulseIQ AI is ready to help!');
      
      containerRef.current.appendChild(chatElement);
      console.log('Langflow chat widget initialized with config:', {
        flow_id: 'ce0bea51-8829-4115-990b-6cbd8bb51ca3',
        host_url: 'https://langflow.servicesessentials.ibm.com'
      });
      
      // Update chatbot status to active
      updateAPIStatus('chatbot', 'active');
    }
  }, [scriptLoaded, updateAPIStatus]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/gh/logspace-ai/langflow-embedded-chat@v1.0.7/dist/build/static/js/bundle.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Langflow script loaded successfully');
          setScriptLoaded(true);
        }}
        onError={(e) => {
          console.error('Failed to load Langflow script:', e);
          updateAPIStatus('chatbot', 'inactive');
        }}
      />
      
      <div
        ref={containerRef}
        id="langflow-chat-container"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          width: '400px',
          height: '600px',
          maxHeight: '80vh',
        }}
      />
    </>
  );
}

// Made with Bob
