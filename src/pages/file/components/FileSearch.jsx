import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFilesAction } from "../../../redux/doc_slice";

const formatDDMMYYYY = (isoDate) =>
  isoDate
    ? new Date(isoDate).toLocaleDateString("en-GB").split("/").join("-")
    : "";

const FileSearch = () => {
  const docState = useSelector((s) => s.documents);

  const dispatch = useDispatch();
  const [majorHead, setMajorHead] = useState("");
  const [minorHead, setMinorHead] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const addTag = (e) => {
    e.preventDefault();
    if (!tagInput) return;
    if (!tags.includes(tagInput)) setTags((s) => [...s, tagInput]);
    setTagInput("");
  };

  const searchDocs = (e) => {
    e.preventDefault();
    const payload = {
      major_head: majorHead,
      minor_head: minorHead,
      from_date: formatDDMMYYYY(fromDate),
      to_date: formatDDMMYYYY(toDate),
      tags: tags.map((t) => ({ tag_name: t })),
      uploaded_by: "",
      start: 0,
      length: 50,
      filterId: "",
      search: { value: "" },
    };

    dispatch(searchFilesAction({ data: payload, token: docState.user.token }));
  };

  const clearFilters = () => {
    setMajorHead("");
    setMinorHead("");
    setTags([]);
    setTagInput("");
    setFromDate("");
    setToDate("");
    dispatch(
      searchFilesAction({
        data: {
          major_head: "",
          minor_head: "",
          from_date: "",
          to_date: "",
          tags: [],
          uploaded_by: "",
          start: 0,
          length: 50,
          filterId: "",
          search: { value: "" },
        },
        token: docState.user.token,
      })
    );
  };

  return (
    <form onSubmit={searchDocs} className="flex gap-3 flex-wrap text-sm">
      <select
        value={majorHead}
        onChange={(e) => setMajorHead(e.target.value)}
        className="border py-1.5 px-2"
      >
        <option value="" className="text-black">
          Major Head
        </option>
        <option value="Personal" className="text-black">
          Personal
        </option>
        <option value="Professional" className="text-black">
          Professional
        </option>
      </select>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add tag and press Add"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="border py-1.5 px-2 flex-1"
        />
        <button
          onClick={addTag}
          className="bg-[crimson] text-white py-1.5 px-2 rounded cursor-pointer"
        >
          Add
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tags.map((t) => (
          <span
            key={t}
            className="px-2 py-1 bg-gray-500 rounded-sm flex items-center justify-center"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border py-1.5 px-2 scheme-dark"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border py-1.5 px-2 scheme-dark"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-1.5 px-2 rounded cursor-pointer"
      >
        Search
      </button>
      <button
        className="bg-[crimson] text-white py-1.5 px-2 rounded cursor-pointer"
        onClick={clearFilters}
      >
        Clear
      </button>
    </form>
  );
};

export default FileSearch;
