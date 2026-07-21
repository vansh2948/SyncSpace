import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

import socket from "../../services/socket";

interface Props {
  roomId: string;
}

const defaultCode = `function hello() {
  console.log("Welcome to SyncSpace");
}
`;

const EditorPanel = ({ roomId }: Props) => {
  const [code, setCode] = useState(defaultCode);

  useEffect(() => {
    socket.on("initial-room-state", ({ code }) => {
      if (code) {
        setCode(code);
      }
    });

    socket.on("code-change", (updatedCode: string) => {
      setCode(updatedCode);
    });

    return () => {
      socket.off("initial-room-state");
      socket.off("code-change");
    };
  }, []);

  const handleEditorChange = (value?: string) => {
    const updatedCode = value ?? "";

    setCode(updatedCode);

    socket.emit("code-change", {
      roomId,
      code: updatedCode,
    });
  };

  return (
    <Editor
      height="100%"
      language="typescript"
      theme="vs-dark"
      value={code}
      onChange={handleEditorChange}
      options={{
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
        fontSize: 15,
        scrollBeyondLastLine: false,
        roundedSelection: true,
        padding: {
          top: 16,
        },
      }}
    />
  );
};

export default EditorPanel;