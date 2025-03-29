
import React from 'react';
import Layout from '../../components/employeeCompo/Layout';
import ChatUI from '../../components/Chatbot/ChatUI';

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
