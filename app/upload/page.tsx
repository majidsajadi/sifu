"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useDropzone } from "react-dropzone";
import { upload } from "./action";

export default function Page() {
  const [state, action] = useFormState(upload, { message: "" });

  const { getRootProps, getInputProps, fileRejections, isDragActive } =
    useDropzone({
      multiple: false,
      maxFiles: 1,
      accept: {
        "application/json": [".json"],
      },
      async onDropAccepted(files) {
        const formdata = new FormData();
        formdata.append("manifest", files[0]);
        await action(formdata);
      },
    });

  const message = state.message || fileRejections[0]?.errors[0]?.message;

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      <Loading />
      {message}
    </div>
  );
}

function Loading() {
  const { pending } = useFormStatus();

  if (pending) return <div>Pending...</div>;

  return <></>;
}
