
import React from 'react';
import Layout from '../components/Layout';
import ChatUI from '../components/ChatUI';

const EmployeeChat = () => {
  return (
    <Layout>
      <div className="h-[calc(100vh-12rem)]">
        <ChatUI />
      </div>
    </Layout>
  );
};

export default EmployeeChat;
