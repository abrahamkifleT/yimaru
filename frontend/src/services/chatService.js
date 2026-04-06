import api from './api';

const chatService = {
  /**
   * Send a message to the AI and get a response.
   * @param {string} message - The user's message
   * @param {Array} history - Optional previous messages for context
   */
  sendMessage: async (message, history = []) => {
    try {
      const response = await api.post('/chat', { message, history });
      return response.data; // Expected: { reply: '...', success: true }
    } catch (error) {
      console.error('Chat service error:', error);
      throw error;
    }
  },

  /**
   * Fetch chat history for the current user.
   */
  getHistory: async () => {
    try {
      const response = await api.get('/chat/history');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
      throw error;
    }
  }
};

export default chatService;
