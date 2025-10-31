import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileAction } from "../../../redux/doc_slice";
import { toast } from "react-toastify";

const FileUploadForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.documents);
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [remarks, setRemarks] = useState("");

  const addTag = (e) => {
    e.preventDefault();
    if (tag && !tags.includes(tag)) setTags([...tags, tag]), setTag("");
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Select a file");
    const userData = JSON.parse(localStorage.getItem("userData"));
    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-GB").split("/").join("-")
      : "";
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "data",
      JSON.stringify({
        major_head: major,
        minor_head: minor,
        document_date: formattedDate,
        document_remarks: remarks,
        tags: tags.map((t) => ({ tag_name: t })),
        user_id: userData?.user_id,
      })
    );
    const res = await dispatch(uploadFileAction(formData));
    toast[res.payload.status ? "success" : "error"](res.payload.message);
  };

  return (
    <form
      onSubmit={uploadFile}
      className="flex flex-col gap-4 w-[30%] shadow-md border p-4 rounded-md h-fit"
    >
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded scheme-dark"
      />
      <select
        value={major}
        onChange={(e) => setMajor(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select Category</option>
        <option value="Personal">Personal</option>
        <option value="Professional">Professional</option>
      </select>
      {major && (
        <select
          value={minor}
          onChange={(e) => setMinor(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">
            Select {major === "Personal" ? "Name" : "Department"}
          </option>
          {(major === "Personal"
            ? ["John", "Tom", "Emily"]
            : ["Accounts", "HR", "IT", "Finance"]
          ).map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      )}
      <div>
        <div className="flex gap-2">
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Add tag"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={addTag}
            className="bg-[crimson] text-white px-3 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2!">
          {tags.map((t) => (
            <span
              key={t}
              className="bg-gray-200 text-black px-2 py-1 rounded text-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <textarea
        placeholder="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-[crimson] text-white p-2 rounded hover:bg-[#b5122b]"
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>
    </form>
  );
};

export default FileUploadForm;
