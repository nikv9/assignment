import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFilesAction } from "../../../redux/doc_slice";

const FileList = () => {
  const dispatch = useDispatch();
  const docState = useSelector((s) => s.documents);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    dispatch(
      searchFilesAction({
        data: {
          major_head: "",
          minor_head: "",
          from_date: "",
          to_date: "",
          uploaded_by: "",
          start: 0,
          length: 50,
          filterId: "",
          search: { value: "" },
        },
        token: docState.user.token,
      })
    );
  }, []);

  return (
    <div className="text-sm mx-auto w-fit">
      {docState.loading && <p className="my-4!">Loading...</p>}
      {!docState.loading && !docState.files?.length && (
        <p className="my-4!">No files found.</p>
      )}

      {!docState.loading && docState.files?.length > 0 && (
        <>
          <button className="px-4 py-2 my-4! bg-[#0d162f] text-white rounded-md border border-gray-700 hover:bg-[#1a2340]">
            Download All (ZIP)
          </button>

          <div className="flex flex-wrap gap-4">
            {docState.files.map((f) => (
              <div
                key={f.document_id}
                className="border border-gray-700 rounded-sm p-4 w-64 bg-[#0d162f] hover:bg-[#162040] transition-all"
              >
                <p className="font-semibold text-white">{f.major_head}</p>
                <p className="text-sm text-gray-400">{f.minor_head}</p>
                <p className="text-xs text-gray-500 my-1!">
                  Uploaded by: {f.uploaded_by}
                </p>

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => setPreview(f.file_url)}
                    className="px-3 py-1 text-sm bg-gray-500 text-white border border-gray-700 rounded-sm hover:bg-[#1a2340] transition"
                  >
                    Preview
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-500 text-white border border-gray-700 rounded-sm hover:bg-[#1a2340] transition">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {preview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreview("")}
        >
          <div
            className="bg-[#0d162f] p-4 rounded-xl w-[30%] max-h-[90vh] overflow-auto border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const clean = preview.split("?")[0];
              if (/\.(jpeg|jpg|png|gif)$/i.test(clean))
                return (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-40 w-full object-contain"
                  />
                );
              if (/\.pdf$/i.test(clean))
                return (
                  <iframe
                    src={preview}
                    title="Preview"
                    className="h-40 w-full object-contain"
                  />
                );
              return (
                <p className="text-center text-gray-300">
                  Preview not supported.
                </p>
              );
            })()}

            <button
              className="mt-4! bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700 block float-end"
              onClick={() => setPreview("")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileList;
