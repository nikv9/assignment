import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileAction } from "../../../redux/doc_slice";
import { toast } from "react-toastify";

const FileUploadForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.documents);

  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [majorHead, setMajorHead] = useState("");
  const [minorHead, setMinorHead] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [remarks, setRemarks] = useState("");

  const personalList = ["John", "Tom", "Emily"];
  const professionalList = ["Accounts", "HR", "IT", "Finance"];

  const addTags = (e) => {
    e.preventDefault();
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Select a file");

    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-GB").split("/").join("-")
      : "";

    const userData = JSON.parse(localStorage.getItem("userData"));

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "data",
      JSON.stringify({
        major_head: majorHead,
        minor_head: minorHead,
        document_date: formattedDate,
        document_remarks: remarks,
        tags: tags.map((t) => ({ tag_name: t })),
        user_id: userData?.user_id,
      })
    );

    const res = await dispatch(uploadFileAction(formData));
    if (res.payload.status === true) {
      toast.success(res.payload.message);
    } else {
      toast.error(res.payload.message);
    }
  };

  return (
    <form
      onSubmit={uploadFile}
      className="flex flex-col gap-4 w-[30%] shadow-md border p-4 rounded-md"
    >
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded"
      />

      <select
        value={majorHead}
        onChange={(e) => setMajorHead(e.target.value)}
        className="border p-2 rounded text-black"
      >
        <option value="">Select Category</option>
        <option value="Personal">Personal</option>
        <option value="Professional">Professional</option>
      </select>

      {majorHead && (
        <select
          value={minorHead}
          onChange={(e) => setMinorHead(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">
            Select {majorHead === "Personal" ? "Name" : "Department"}
          </option>
          {(majorHead === "Personal" ? personalList : professionalList).map(
            (item) => (
              <option key={item}>{item}</option>
            )
          )}
        </select>
      )}

      <div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add tag"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={addTags}
            className="bg-[crimson] text-white px-3 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2!">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-black px-2 py-1 rounded text-sm"
            >
              {tag}
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
