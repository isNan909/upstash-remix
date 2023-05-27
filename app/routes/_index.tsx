import { useEffect, useRef } from "react";
import type {
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction
} from "@remix-run/node";
import Modal from "~/components/modal";
import { useTransition  } from "@remix-run/react";

import { insertData } from "~/utils/database";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix Upstash App" },
    { name: "description", content: "Remix Upstash Feedback Widget" },
  ];
};

export const loader: LoaderFunction = async () => {
  return '';
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  if (request.method === "POST") {
    const user = formData.get("email");
    const message = formData.get("message");
    const id = Date.now().toString();
    await insertData(id, {user, message});
  }
  return ''
};


export default function Index() {
  const transition = useTransition();
  const isSubmitting = transition.submission?.method === "POST";
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // reset the form after submission
    if (isSubmitting) return;
    formRef.current?.reset();
    inputRef.current?.focus();
  }, [isSubmitting]);

  return (
    <div className="container px-5 py-24 mx-auto">
      <Modal status={isSubmitting} formRef={formRef} inputRef={inputRef}/>
    </div>
  );
}
