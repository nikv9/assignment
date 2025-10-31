import FileList from "./components/FileList";
import FileSearch from "./components/FileSearch";

const File = () => {
  return (
    <div className="p-4">
      <FileSearch />
      <FileList />
    </div>
  );
};

export default File;
