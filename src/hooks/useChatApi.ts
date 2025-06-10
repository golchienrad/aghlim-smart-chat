import { useCallback } from "react";
import axios from "axios";
import { Message } from "../types/types";
import { useDispatch } from "react-redux";
import { setAllAdvertse } from "../slices/allAdvertise/allAdvertiseSlice.jsx";
export const useChatApi = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const dispatch = useDispatch();
  const sendMessage = useCallback(
    async (newMessage: Omit<Message, "id" | "timestamp">) => {
      const messageWithMeta: Message = {
        ...newMessage,
        id: Date.now().toString(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, messageWithMeta]);

      if (newMessage.role === "user") {
        try {
          // const response = await axios.post(
          //   'http://apiai.eghlym.com/search',
          //   new URLSearchParams({
          //     user_id: 'admsdthg',
          //     message: newMessage.content,
          //   }).toString(),
          //   {
          //     headers: {
          //       'Content-Type': 'application/x-www-form-urlencoded',
          //       Accept: 'application/json',
          //     },
          //   }
          // );
          const response = await axios.post(
            "http://apiai.eghlym.com/search",
            new URLSearchParams({
              user_id: "khgkh",
              query: newMessage.content,
            }).toString(),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
              },
            }
          );
          if (response?.data?.results) {
            dispatch(setAllAdvertse(response?.data?.results));
          }
          console.log(response.data.results);

          const replyContent =
            response.data.reply || "پاسخی از سرور دریافت نشد.";
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              role: "test" as Message["role"], // ✅ این خط وارنینگ رو از بین می‌بره
              content: replyContent,
              timestamp: new Date(),
            },
          ]);

          if (response.data.results && response.data.results.length > 0) {
            const resultsContent = response.data.results
              .map(
                (result: any) =>
                  `- ${result.Title} (${result.AdvertiseGroupName}) در ${result.WHERE_Value} (کد: ${result.advertiseCode})`
              )
              .join("\n");
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                role: "assistant",
                content: resultsContent,
                timestamp: new Date(),
              },
            ]);
          }
        } catch (error) {
          console.error("خطا در ارسال درخواست به API:", error);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              role: "assistant",
              content:
                "متأسفم، مشکلی در ارتباط با سرور رخ داد. لطفاً دوباره تلاش کنید.",
              timestamp: new Date(),
            },
          ]);
        }
      }
    },
    [setMessages]
  );

  return { sendMessage };
};
