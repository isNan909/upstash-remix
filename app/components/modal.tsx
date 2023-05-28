import { Form } from "@remix-run/react";
import { RefObject, useState } from "react";
import Rating from "~/components/rating";
import EmojiSad from "~/images/emoji-sad";
import EmojiNice from "~/images/emoji-nice";
import EmojiMeh from "~/images/emoji-meh";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export type TypeRate = "" | "bad" | "meh" | "nice";

interface IModalProps {
  status: boolean;
  formRef: RefObject<HTMLFormElement>;
  inputRef: RefObject<HTMLInputElement>;
}

export default function Modal({ status, inputRef,  formRef  }: IModalProps) {
  const [formRate, setFormRate]  = useState<TypeRate>('');

  const onChangeFormRate = (value: TypeRate) => {
    setFormRate(value);
  };

    return (
    <div className="absolute max-width-sm bottom-20 right-20">
      <div className="p-4 bg-white">
        <div  className="mb-3">
          <h1>Hi 👋</h1>
          <p>Have feedback? We'd love to hear it</p>
        </div>
        <Form method="post" ref={formRef}  reloadDocument>
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
          <div className="flex">
            <Rating value="nice" name="rating" selected={formRate} onChange={onChangeFormRate}>
              <EmojiNice color={formRate === "nice" ? "#000" : "#999"} />
            </Rating>
            <Rating value="meh" name="rating" selected={formRate} onChange={onChangeFormRate}>
              <EmojiMeh color={formRate === "meh" ? "#000" : "#999"} />
            </Rating>
            <Rating value="bad" name="rating" selected={formRate} onChange={onChangeFormRate}>
              <EmojiSad color={formRate === "bad" ? "#000" : "#999"} />
            </Rating>
          </div>
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
    </div>
    );
}