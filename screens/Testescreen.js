import { useRoute } from "@react-navigation/native";
import { GiftedChat } from 'react-native-gifted-chat';
import { useCallback, useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { database } from "../config/firebase";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const { name = "Usuário" } = route.params || {};

  useEffect(() => {
    const q = query(collection(database, 'chats'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const msgs = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: data._id || doc.id,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          text: data.text || '',
          user: data.user || { _id: 'unknown' },
        };
      });
      setMessages(msgs);
    });
    return unsubscribe;
  }, []);

  const mensagemEnviada = useCallback((messages = []) => {
    if (messages.length === 0) return;

    const newMessage = messages[0];

    setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));

    const { _id, createdAt, text, user } = newMessage;
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={mensagemEnviada}
      user={{ _id: name }}
    />
  );
}
