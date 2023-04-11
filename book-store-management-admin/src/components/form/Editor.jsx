import React from "react";
import JoditEditor from "jodit-react";
import './style/editor.scss'
import { useRef } from "react";
const Editor = ({ setValue, name, config, value, onChange }) => {
  const editor = useRef();

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <JoditEditor
      name={name}
      ref={editor}
      onChange={(content) => onChange(convertToDefEventPara(name, content))}
      config={config}
      value={value}
    />
  );
};

export default Editor;
