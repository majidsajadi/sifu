"use client";

import {
  FileUploadDropzone,
  FileUploadFileAcceptDetails,
  FileUploadLabel,
  FileUploadRoot,
  FileUploadTrigger,
} from "@ark-ui/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleFileAccept = async (details: FileUploadFileAcceptDetails) => {
    try {
      const file = details.files[0];
      const content = await readFile(file);

      const { dependencies } = JSON.parse(content);
      if (!dependencies || !Object.keys(dependencies).length) {
        throw new Error("No dependency found");
      }

      const dependecies = Object.entries(dependencies).map(([name, range]) => ({
        name,
        range,
      }));

      const query = stringifyDependencyList(dependecies);
      const url = `/?${query}`;
      router.push(url);
    } catch (error) {
      // TODO: toast
      console.log(error);
    }
  };

  return (
    <FileUploadRoot
      accept="application/json"
      onFileAccept={handleFileAccept}
      maxFiles={1}
      name="manifest"
    >
      <FileUploadLabel>File Upload</FileUploadLabel>
      <FileUploadDropzone>Drag your file(s) here</FileUploadDropzone>
      <FileUploadTrigger>Choose file(s)</FileUploadTrigger>
    </FileUploadRoot>
  );
}

function stringifyDependencyList(
  dependencies: {
    name: string;
    range: unknown;
  }[]
): string {
  const searchParams = new URLSearchParams();

  dependencies.forEach(({ name, range }) => {
    searchParams.append("dep", name + "," + range);
  });

  return searchParams.toString();
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (evt) => {
      if (evt.target?.result) {
        resolve(evt.target.result.toString());
      }
    };

    reader.onerror = () => {
      reject("Error reading file");
    };
  });
}
