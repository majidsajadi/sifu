"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useDropzone } from "react-dropzone";
import { clsx } from "clsx";
import { upload } from "./action";
import styles from "./page.module.css";
import { Spinner } from "@/ui/spinner";

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
    <div
      {...getRootProps()}
      className={clsx(styles.container, isDragActive && styles.active)}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here or click to select files</p>
      )}
      <Loading />
      {message && !isDragActive && <div className={styles.error}>{message}</div>}
    </div>
  );
}

function Loading() {
  const { pending } = useFormStatus();

  if (pending) return <Spinner />;

  return <></>;
}
