"use client";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Inbox, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const res = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return res.data;
    },
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size limit exceeded");
        return;
      }
      setUploading(true);
      try {
        const data = await uploadToS3(file);
        if (!data.file_key || !data.file_name) {
          toast.error("Something went wrong");
          return;
        }
        mutate(data, {
          onSuccess({ chat_id }) {
            toast.success("Chat created successfully");
            router.push(`/chats/${chat_id}`);
          },
          onError(err) {
            toast.error("Error creating chat");
            console.error(err);
          },
        });
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  return (
    <div className=" bg-slate-800 p-2 rounded-xl">
      <div
        {...getRootProps()}
        className=" border-dashed border-2 rounded-xl cursor-pointer bg-slate-700 flex gap-4 flex-col items-center p-4"
      >
        {isPending || uploading ? (
          <Loader2 className=" animate-spin" size={40} />
        ) : (
          <Inbox size={40} />
        )}
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};
export default FileUpload;
