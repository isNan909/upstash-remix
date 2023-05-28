import { useEffect, useRef, useState } from "react";
import type {
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction
} from "@remix-run/node";
import { useTransition  } from "@remix-run/react";
import Modal from "~/components/modal";
import { BsMessenger } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
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
    const rating = formData.get("rating");
    const id = Date.now().toString();
    //additional validations
    await insertData(id, {user, message, rating});
  }
  return ''
};


export default function Index() {
  const transition = useTransition();
  const [openModal, setOpenModal] = useState(false);
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
    <div className="h-full relative bg-amber-50">
      <div className="container px-5 py-24 mx-auto  h-full">
        <h1 className="text-4xl font-bold">A form feedback widget</h1>
        <p className="text-sm font-normal leading-6 text-gray-900">Built with Remix and Upstash</p>
        <div className="absolute bottom-10 right-10">
          <button className="rounded-full bg-white py-2 px-4 text-white hover:gray-100 drop-shadow-lg" onClick={() => setOpenModal(!openModal)}>{openModal ? <BsXLg /> : <BsMessenger />}</button>
        </div>
        {openModal && <Modal status={isSubmitting} formRef={formRef} inputRef={inputRef}/>}
      </div>
    </div>
  );
}
