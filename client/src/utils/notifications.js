// Notification helper - will be used with useNotifications hook from Reapop
// This is a simple wrapper to maintain similar API to toastify

export const createNotification = (type, message, title = null) => {
  return {
    title: title || (type === 'success' ? 'Success' : type === 'error' ? 'Error' : type === 'info' ? 'Info' : 'Warning'),
    message: message,
    status: type,
    dismissible: true,
    dismissAfter: type === 'error' ? 5000 : 3000,
    position: 'bottom-right',
    showDismissButton: true,
    allowHTML: false,
  };
};

