import { Form } from "@remix-run/react";
import {  RefObject } from "react";
const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

interface IModalProps {
  status: boolean;
  formRef: RefObject<HTMLFormElement>;
  inputRef: RefObject<HTMLInputElement>;
}

export default function Modal({ status, inputRef,  formRef  }: IModalProps) {
    return (
    <div className="p-4">
      <div  className="mb-3">
        <h1>Hi 👋</h1>
        <p>Have feedback? We'd love to hear it</p>
      </div>
      <Form method="post" ref={formRef}>
        <p>
          <label>
            Your email:
            <input
              type="email"
              name="email"
              ref={inputRef}
              className={inputClassName}
            />
          </label>
        </p>
        <p>
          <label>
            Your message:
            <textarea
              name="message"
              className={inputClassName}
            />
          </label>
        </p>
        {/*avatar picker*/}
        <div className="mt-3">
          <button
            type="submit"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
            disabled={status}
          >
            Submit feedback
          </button>
        </div>
      </Form>
    </div>
    );
}