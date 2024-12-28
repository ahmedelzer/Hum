import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

export interface Message {
  notifications?: any;
  message?: any;
  notification?: any;
  type?: any;
}

const useNotifications = () => {
  // const [userId, setUserId] = useAsyncStorage('userId', '');
  const [notification, setNotification] = useState<any>();

  const socketUrl = `wss://scc.eventy.cloud/cable?subdomain_name=scc&token=1231dasda2e12easd1241easd123123asd`;

  const { lastMessage, sendMessage, readyState, lastJsonMessage } =
    useWebSocket(socketUrl, {
      onOpen: () => {
        sendMessage(
          JSON.stringify({
            command: "subscribe",
            identifier: `{"channel":"AppNotificationsChannel","data": {"subdomain_name":"scc"}}`,
          })
        );
        setTimeout(() => {
          sendMessage(
            JSON.stringify({
              command: "subscribe",
              identifier: `{"channel":"MessageNotificationsChannel","data": {"subdomain_name":"scc"}}`,
            })
          );
        }, 300);
      },
      onClose: () => {
        sendMessage(
          JSON.stringify({
            command: "unsubscribe",
            identifier: `{"channel":"AppNotificationsChannel","data": {"subdomain_name":"scc"}}`,
          })
        );
        setTimeout(() => {
          sendMessage(
            JSON.stringify({
              command: "unsubscribe",
              identifier: `{"channel":"MessageNotificationsChannel","data": {"subdomain_name":"scc"}}`,
            })
          );
        }, 300);
      },
      onError: (e) => {
        console.log(e, "error");
      },

      share: true,
    });

  useEffect(() => {
    if (lastMessage?.data) {
      const { message, type } = JSON.parse(lastMessage.data) as Message;
      message && setNotification([...message]);
      console.log(message, "message");
    }
  }, [lastMessage?.data]);

  return {
    lastMessage,
    sendMessage,
    readyState,
    notification,
  };
};

export default useNotifications;
